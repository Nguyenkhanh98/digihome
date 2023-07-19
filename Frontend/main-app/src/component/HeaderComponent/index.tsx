import LogoMitsubishi from "@/assets/images/icons/Mitsubishi_logo.svg.png";
import useHeaderStyle from "./style";
import classnames from "classnames";
import { useInjectLang } from "@/hooks/useLang";
import { useNavigate } from "react-router-dom";

export function FooterComponent() {
  const classes = useHeaderStyle();
  const injectLang = useInjectLang();
  const navigate = useNavigate();

  console.log(injectLang('/login'),'ssssss');
  return (
    <header id="header">
      <div className="header-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-sm-6 col-4 header-top-left no-padding">
              <a href="tel:+84 886998283">+84 886998283</a>
              <a href="mailto:support@colorlib.com">nhkhanh861998@gmail.com</a>
            </div>
            <div
              className={classnames(
                "col-lg-6 col-sm-6 col-8 header-top-right ",
                { [classes.authCom]: true }
              )}
            >
              <div className={classes.loginButton} onClick={()=>navigate(injectLang('register'))}>Sign up</div>
              <div className={classes.loginButton} onClick={()=>navigate(injectLang('login'))}>Login</div>
            </div>
          </div>
        </div>
      </div>
      <div className="container main-menu">
        <div className="row align-items-center justify-content-between d-flex">
          <div id="logo">
            <a href="index.html" style={{ color: "white", fontWeight: "bold" }}>
              <img
                src={LogoMitsubishi}
                width="50px"
                height="50px"
                alt=""
                title=""
              />
              Digi home
            </a>
          </div>
          <nav id="nav-menu-container">
            <ul className="nav-menu">
         
              <li>
                <a href="">About</a>
              </li>
              <li>
                <a href="">Services</a>
              </li>
              <li>
                <a href="">Projects</a>
              </li>
              <li className="menu-has-children">
                <a href="">Blog</a>
                <ul>
                  <li>
                    <a href="">Blog Home</a>
                  </li>
                  <li>
                    <a href="">Blog Single</a>
                  </li>
                </ul>
              </li>
              <li className="menu-has-children">
                <a href="">Pages</a>
                <ul>
                  <li>
                    <a href="">Project Details</a>
                  </li>
                  <li>
                    <a href="">Elements</a>
                  </li>
                  <li className="menu-has-children">
                    <a href="">Level 2 </a>
                    <ul>
                      <li>
                        <a href="#">Item One</a>
                      </li>
                      <li>
                        <a href="#">Item Two</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>
                <a href="contact.html">Contact</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default FooterComponent;
