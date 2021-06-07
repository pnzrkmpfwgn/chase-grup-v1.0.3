import {useState,useEffect} from 'react';
import styles from "./dropdown.module.css";
import {useContext} from 'react';
import {Context} from '../context';
import {useMediaQuery} from '../utils/hooks';

export default function Dropdown() {
    const {state,dispatch} = useContext(Context);
    const [langArr,setLangArr] = useState([]);

  return <div className={styles.dropdown}>
  <button className={styles.dropbtn}> {state.language} <i className="fas fa-chevron-down"></i> </button>
  <div className={styles.dropdown_content}>
    <p onClick={()=>dispatch({type:"TR",payload:"TR"})} >TR</p>
    <p onClick={()=>dispatch({type:"EN",payload:"EN"})} >EN</p>
  </div>
</div>

  
}
