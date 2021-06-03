import styles from "./dropdown.module.css";
import {useContext} from 'react';
import {Context} from '../context';
export default function Dropdown() {
    const {state,dispatch} = useContext(Context);
  return (
   <div className={styles.dropdown}>
     <button className={styles.dropbtn}> {state.language} <i className="fas fa-chevron-down" ></i> </button>
     <div className={styles.dropdown_content}>
       <p onClick={()=>dispatch({type:"TR",payload:"TR"})} >TR</p>
       <p onClick={()=>dispatch({type:"EN",payload:"EN"})} >EN</p>
     </div>
   </div>
  );
}
