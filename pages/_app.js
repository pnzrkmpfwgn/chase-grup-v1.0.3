import App from "next/app";
import Head from "next/head";
import { Provider } from "../context";
import "../styles/globals.css";
import Layout from "../components/layout";

import { motion, AnimatePresence } from "framer-motion";

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;
    return (
      <>
        <Provider>
          <AnimatePresence>
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
                  transition: { duration: 0.5, delay: 0.2, ease: "easeInOut" },
                },
              }}
            >
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
                <Component {...pageProps} />
              </Layout>
            </motion.div>
          </AnimatePresence>
        </Provider>
      </>
    );
  }
}

export default MyApp;
