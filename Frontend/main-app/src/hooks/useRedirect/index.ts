import { NavigateOptions, useNavigate } from "react-router-dom";
import { useInjectLang } from "../useLang";

export function useCustomNavigate() {
  const nagative = useNavigate();
  const injectLang = useInjectLang();
  return (path: string, options: NavigateOptions | undefined = undefined) => {
    nagative(injectLang(path), options);
  };
}
