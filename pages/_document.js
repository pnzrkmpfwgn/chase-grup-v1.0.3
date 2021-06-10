import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script
            type="text/javascript"
            src="https://files.coinmarketcap.com/static/widget/coinMarquee.js"
          ></script>
        </Head>
        <body>
          <div
            id="coinmarketcap-widget-marquee"
            coins="1,1027,825,1839,2010,74,52"
            currency="USD"
            theme="dark"
            transparent="false"
            show-symbol-logo="true"
            style={{position:"fixed",top:"0",zIndex:"1000"}}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
