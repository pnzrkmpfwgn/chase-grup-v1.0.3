import FooterSection from "./footer";
import Header from "./Header";
import styles from "./layout.module.css";
import {useMediaQuery, useOnScreen} from '../utils/hooks';

export default function Layout({ children }) {
  const [ref,visible] = useOnScreen({rootMargin:'-100px'});
  const isBreakpoint = useMediaQuery(768);
  return (
    <>
      <div ref={ref} className={styles.content}></div>
      <Header visible={visible} breakpoint={isBreakpoint} />
      {children}
      <FooterSection />
    </>
  );
}
