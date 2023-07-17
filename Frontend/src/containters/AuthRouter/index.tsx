import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";

import { useDispatch, useSelector } from "react-redux";
import reducer, { actLogin } from "store/Auth";
import { useInjectReducer } from "utils/injectReducer";
import { stateName } from "store/Types";

import saga from "store/Auth/saga";
import { useInjectSaga } from "utils/injectSaga";
// import withLayout from 'HOCs/withLayout';
import { history } from "configs/history";
import get from "lodash/get";
import { languageShortNames } from "_constants/language";
import { useInjectLang } from "hooks/useLang";
import useTranslation from "hooks/useTranslation";

import SKYJOI from "configs/skyjoi";
import { authService } from "services";
import { PROVIDER } from "_constants/provider";
import message from "utils/message";
import WithLayoutWrapper from "HOCs/withLayoutWrapper";

export const LOGIN_PROVIDER = {
  Skyclub: "Skyclub",
  Skyjoi: "Skyjoy",
};

export function AuthContainer({ component: Component, ...props }: any) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [isLoading2, setLoadingLogin] = useState(false);
  const [provider, setProvider] = useState(LOGIN_PROVIDER.Skyjoi);
  useInjectReducer({ key: stateName.USER, reducer });
  useInjectSaga({ key: stateName.USER, saga });
  const injectLang = useInjectLang();
  const locale = useSelector((state) => {
    return get(state, "locale.locale.shortName");
  });
  const { location } = history;
  const providerState = get(location, "state.provider");
  //prev path before go to this page
  const formatMessage = useTranslation();

  const isFirstLoad = useRef(true);

  const isLogin = useSelector((state: any) => state.user?.isLogin || null);
  useEffect(() => {
    if (providerState) {
      setProvider(providerState);
    }
  }, [providerState]);

  useEffect(() => {
    if (isLogin !== null) {
      setLoading(false);
    }
  }, [isLogin]);

  const hideLoading = useCallback(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
    isFirstLoad.current = false;
  }, []);
  const handleLogin = useCallback(
    (cb?: any, errorHandler?: any) => (event) => {
      const { data } = event;
      if (event.origin === SKYJOI.DOMAIN) {
        if (get(event, "data.func") === "onSuccess") {
          setLoadingLogin(true);
          const goToResultScreen = async () => {
            await authService
              .logoutSkyjoi(data.data.refreshToken)
              .catch((err) => {
                console.log(err);
              });
            history.push(injectLang("/"));
            setLoadingLogin(false);

            message(
              formatMessage("String.loginSuccessfully", "Đăng nhập thành công"),
              "success"
            );
          };
          setLoading(true);

          dispatch(
            actLogin({
              ...data.data,
              type: LOGIN_PROVIDER.Skyjoi,
              cb: goToResultScreen,
              errorHandler: () => {
                errorHandler();
                hideLoading();
              },
            })
          );
        }
      } else if (event.origin === SKYJOI.BASE_URL) {
        if (get(data, "func") === "onLoading") {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        } else if (get(data, "func") === "onLoaded") {
          setLoading(false);
        }

        if (get(data, "func") === "onOpenTermCondition") {
          window.open(data.data.link);
        } else if (get(data, "func") === "onOpenSignup") {
          setProvider(PROVIDER.SKYJOI);
          history.push(injectLang("/signup"));
        }
      } else if (data.type === "login" && data.code) {
        const authCodeQ = data.code.split("?")[1].split("&")[0].split("=")[1];
        const authCodeP = data.code.split("?")[1].split("&")[1].split("=")[1];

        setLoading(true);

        dispatch(
          actLogin({
            authCode: [authCodeQ, authCodeP],
            type: "Skyclub",
            cb,
            errorHandler: () => {
              errorHandler();
              hideLoading();
            },
          })
        );
      } else if (data.type === "registernow" && data.code) {
        history.push(injectLang("/signup"));
      } else if (data.type === "loginnow" && data.code) {
        history.push(injectLang("/signin"));
      } else if (data.type === "policyclick" && data.code) {
        locale?.toUpperCase() === languageShortNames.VI
          ? history.push(injectLang("/skyclub/chinh-sach-dieu-khoan/vi"))
          : history.push(injectLang("/skyclub/chinh-sach-dieu-khoan/en"));
      }
    },
    []
  );
  const title = useMemo(() => {
    const type = props.type === "signin" ? "SignIn" : "SignUp";
    const id = provider === PROVIDER.SKYJOI ? "SkyJoy" : "Skyclub";
    return {
      id: `${type}.${id}.Header`,
      defaultMessage: `${type} ${id}`,
    };
  }, [provider, props.type]);
  return (
    <WithLayoutWrapper {...props} title={title}>
      <Component
        isLoading={isLoading || isLoading2}
        handleLogin={handleLogin}
        hideLoading={hideLoading}
        isFirstLoad={isFirstLoad.current}
        fromPath={props.location?.state?.fromPath}
        setProvider={setProvider}
        provider={provider}
        setLoading={setLoading}
      />
    </WithLayoutWrapper>
  );
}

export default AuthContainer;
