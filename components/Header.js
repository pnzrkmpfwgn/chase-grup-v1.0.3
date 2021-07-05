import { useEffect, useState } from "react";
import { en_nav_url, nav_url, base_url, images_url } from "./urls";

import Mobile from "./mobile_nav";
import NavSection from "./nav";
import Loading from "./Loading";

export default function Header({ visible, breakpoint }) {
  const [trData, setTrData] = useState();
  const [enData, setEnData] = useState();
  const [trPath, setTrPath] = useState("");
  const [enPath, setEnPath] = useState("");
  const [logo, setLogo] = useState("");

  useEffect(async () => {
    const controller = new AbortController();
    try {
        await Promise.all([
        fetch(nav_url, { method: "GET", signal: controller.signal }),
        fetch(en_nav_url, { method: "GET", signal: controller.signal }),
        fetch(images_url, { method: "GET", signal: controller.signal })
      ]).then(async ([trdata, endata, logodata]) => {
        const trData = await trdata.json();
        const enData = await endata.json();
        const logo = await logodata.json();
        return [trData, enData, logo];
      }).then(data => {
        setTrData(data[0]);
        setEnData(data[1]);
        setLogo(base_url +data[2][0].image.url)
      })
      // await fetch(images_url, { method: "GET", signal: controller.signal })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log("Executed")
      //     for (let i = 0; i < data.length; i++) {
      //       if (data[i].Name === "chase_logo") {
      //         setLogo(base_url + data[i].image.url);
      //       }
      //     }
      //   });
      // await fetch(nav_url, { method: "GET", signal: controller.signal })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log("Executed")
      //     setTrData(data);
      //     for (let i = 0; i < data.menu_item.length; i++) {
      //       if (data.menu_item[i].title === "Anasayfa") {
      //         setTrPath("/tr/" + data.menu_item[i].page.slug);
      //       }
      //     }
      //   });
      // await fetch(en_nav_url, { method: "GET", signal: controller.signal })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log("Executed")
      //     setEnData(data);
      //     for (let i = 0; i < data.menu_item.length; i++) {
      //       if (data.menu_item[i].title === "Main Menu") {
      //         setEnPath("/en/" + data.menu_item[i].en_page.slug);
      //       }
      //     }
      //   });
    } catch (error) {
      return <div style={{ color: "white" }}> Birşeyler ters gitti </div>
    }
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <header>
      {logo === "" ? (
        <Loading />
      ) : typeof trData!="undefined" && typeof enData!="undefined" ?  (
          <nav>
          {breakpoint ? (
            <Mobile
              trData={trData}
              enData={enData}
              trPath={trPath}
              enPath={enPath}
              breakpoint={breakpoint}
              logo={logo}
            />
          ) : (
            <NavSection
              trData={trData}
              enData={enData}
              trPath={trPath}
              enPath={enPath}
              breakpoint={breakpoint}
              logo={logo}
              visible={visible}
            />
          )}
        </nav>
      ) : null}
    </header>
  );
}
