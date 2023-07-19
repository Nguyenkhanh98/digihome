import { useParams } from "react-router-dom";

const generatePath = (path: string) => (path ? `${path}` : "");

export function useInjectLang() {
  const params = useParams();
  const langPath = params.langPath;

  return (path: string) => {
    const genPath = generatePath(path);
    const regex = new RegExp(
      `^(/${langPath}/|${langPath}/|/${langPath}$|${langPath}$)`,
      "i"
    );
    if (genPath.match(regex)) {
      return genPath;
    }
    return `/${langPath}/${genPath}`.replace(/\/\//g, "/");
  };
}
