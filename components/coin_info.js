import useSWR, { SWRConfig } from "swr";
import styles from "./coin_info.module.css";
import Image from "next/image";
import Loading from "./Loading";

const fetcher = (...args) => fetch(args).then((res) => res.json());

export default function Coin() {
  let url = "http://localhost:1337/getcoin";
  //Dummy data to not exceed the coinmarketcap basic plan

  const dummy_data = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: 40423.55,
      percent_change_24h: 3.67,
      logo: "/images/1.png",
      website: "/",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: 2866.25,
      percent_change_24h: 7.56,
      logo: "/images/1.png",
      website: "/",
    },
    {
      name: "Tether",
      symbol: "USDT",
      price: 1.0,
      percent_change_24h: 0.02,
      logo: "/images/1.png",
      website: "/",
    },
    {
      name: "Binance Coin",
      symbol: "BNB",
      price: 375.07,
      percent_change_24h: 5.2,
      logo: "/images/1.png",
      website: "/",
    },
    {
      name: "Cardano",
      symbol: "ADA",
      price: 1.77,
      percent_change_24h: 12.34,
      logo: "/images/1.png",
      website: "/",
    },
    {
      name: "XRP",
      symbol: "XRP",
      price: 1.04,
      percent_change_24h: 1.79,
      logo: "/images/1.png",
      website: "/",
    },
    {
      name: "Dogecoin",
      symbol: "DOGE",
      price: 0.36,
      percent_change_24h: 0.11,
      logo: "/images/1.png",
      website: "/",
    },
    {
      name: "SHIBA INU",
      symbol: "SHIB",
      price: 0.00001,
      percent_change_24h: 0.23,
      logo: "/images/1.png",
      website: "/",
    },
  ];
  // const { data } = useSWR(url, fetcher);
  // if (!data)
  //   return (
  //     <Image src="/images/Pulse-1s-200px.gif" width={200} height={200}></Image>
  //   );
  return (
    <SWRConfig value={{ revalidateOnFocus: false, fetcher }}>
      <ul className={styles.marquee}>
        {!dummy_data ? <Loading /> : dummy_data.map((i) => (
          <div className={styles.marquee_items} key={i.symbol}>
            <a href={i.website}>
              <li className={styles.marquee_items} key={i.symbol}>
                {" "}
                <Image src={i.logo} height={32} width={32}></Image>{" "}
                {/*Bu resime şimdilik çok takma fetch sıkıntısı çözüldükten sonra ayarlarık*/}
                <div className={styles.marquee_item}>
                  {" "}
                  <div className={styles.marquee_item_info}>
                    <strong>{i.name}</strong> <small>{i.symbol}</small>
                  </div>{" "}
                </div>{" "}
                <div>
                  ${i.price} {i.percent_change_24h}%
                </div>{" "}
              </li>
            </a>
            <hr className={styles.vertical_line} />
          </div>
        ))}
        {/* <Image
        src="/images/Pulse-1s-200px.gif"
        width={200}
        height={200}
      ></Image>  */}
      </ul>
    </SWRConfig>
  );
}
