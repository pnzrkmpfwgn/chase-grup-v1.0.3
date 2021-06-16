import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";

const NotFound = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      if (Cookies.get("language") === "tr") {
        router.push("/tr/anasayfa");
      } else {
        router.push("/en/main-menu");
      }
    }, 3000);
    return () => {
      clearTimeout(() => {
        if (Cookies.get("language") === "tr") {
          router.push("/tr/anasayfa");
        } else {
          router.push("/en/main-menu");
        }
      });
    };
  }, []);
  return (
    <div className="container_404">
      <div className="page_404"></div>
    </div>
  );
};

export default NotFound;
