import { useNavigate } from "react-router-dom";
import { useInjectLang } from "../useLang";

export function useCustomNavigate() {
  const nagative = useNavigate();
  const injectLang = useInjectLang();
  return (path: string) => {
    nagative(injectLang(path));
  };
}
