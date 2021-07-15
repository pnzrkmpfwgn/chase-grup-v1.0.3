import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import { Provider } from "../context";
import "../styles/globals.css";
import Layout from "../components/layout";

import { motion, AnimatePresence } from "framer-motion";

let copies = [];

const onLoad = () => {
  const nodes = document.querySelectorAll(
    "link[rel=stylesheet], style:not([media=x])"
  );
  copies = [...nodes].map((el) => el.cloneNode(true));

  for (let copy of copies) {
    copy.removeAttribute("data-n-p");
    copy.removeAttribute("data-n-href");

    document.head.appendChild(copy);
  }
};

const onExit = () => {
  for (let copy of copies) {
    document.head.removeChild(copy);
  }
};
class MyApp extends App {
  componentDidMount() {
    Router.events.on("beforeHistoryChange", onLoad);
  }
  componentWillUnmount() {
    Router.events.off("beforeHistoryChange", onLoad);
  }
  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <>
        <Provider>
          <Head>
            <link
              rel="stylesheet"
              href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
              integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp"
              crossOrigin="anonymous"
            ></link>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
              rel="stylesheet"
            ></link>
            <link
              rel="stylesheet"
              type="text/css"
              charSet="UTF-8"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
            />
            <link
              rel="stylesheet"
              type="text/css"
              href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
            />
            <script
              type="text/javascript"
              src="https://files.coinmarketcap.com/static/widget/currency.js"
            ></script>
          </Head>
          <Layout>
            <AnimatePresence exitBeforeEnter={true} onExitComplete={onExit}>
              <motion.div
                key={router.route}
                initial="pageInitial"
                exit="pageExit"
                animate="pageAnimate"
                variants={{
                  pageInitial: {
                    opacity: 0,
                  },
                  pageAnimate: {
                    opacity: 1,
                  },
                  pageExit: {
                    opacity: 0,
                    transition: {
                      duration: 0.5,
                      delay: 0.2,
                      ease: "easeInOut",
                    },
                  },
                }}
              >
                <Component {...pageProps} key={router.route} />
              </motion.div>
            </AnimatePresence>
          </Layout>
        </Provider>
      </>
    );
  }
}

export default MyApp;
