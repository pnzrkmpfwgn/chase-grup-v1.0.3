module.exports = {
  images: {
    domains: [
      "s2.coinmarketcap.com",
      "localhost",
    ] /*We have to configure this dynamically */,
  },
  /* async redirects kullanıp permenant:true opsiyonu kullanan zavallı ruha sesleniyorum tarayıcı cache'ni temizle ve .next 
  klasörünü silip serveri yeniden başlat
  To the poor soul who used the permenant option as true, just clean the browser cache and delete the .next folder and restart the server.
  */
  async redirects() {
    // if(typeof Cookies.get("language") === "undefined"){
    //   return[{
    //    ]
    // }
    return [
      {
        source: "/",
        has: [
          {
            type: "cookie",
            key: "language",
            value: "tr",
          },
        ],
        destination: "/tr/anasayfa",
        permanent: false,
      },
      {
        source: "/",
        has: [
          {
            type: "cookie",
            key: "language",
            value: "en",
          },
        ],
        destination: "/en/main-menu",
        permanent: false,
      },
      {
        source: "/",
        destination: "/tr/anasayfa",
        permanent: false,
      },
    ];
  },
};
