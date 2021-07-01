import React, { useState, useEffect } from "react";
import styles from "./dropdown.module.css";
import { useContext } from "react";
import { Context } from "../context";
import Cookies from "js-cookie";


function Dropdown() {
  const { state, dispatch } = useContext(Context);
  const [initialLangValue, setInitialLangValue] = useState("");
  const [dropdownStyle, setDropdownStyle] = useState(styles.dropdown);

  useEffect(() => {
    if(Cookies.get("language")==="" || typeof Cookies.get("language")==="undefined"){
      setInitialLangValue("tr");
    }else{
      setInitialLangValue(Cookies.get("language"));
    }
  }, [state.language]);
  const onClickHandler = (option) => {
    dispatch({
      type: option,
      payload: option,
    });
    console.log(option)
    Cookies.set("language", option,{sameSite:'none', secure:true});
    setDropdownStyle(styles.dropdown);
  };
  return (
    <div
      className={dropdownStyle}
      onMouseOver={() =>
        setDropdownStyle(styles.dropdown + " " + styles.dropdown_hover)
      }
      onMouseLeave={() => setDropdownStyle(styles.dropdown)}
    >
      <button id={state.language==="tr" ? "dil_secimi":"select_language"} title={state.language==="tr" ? "Dil Seçimi" : "Select Language"} className={styles.dropbtn}>
        {" "}
        {initialLangValue.toUpperCase()}{" "}
        <i className="fas fa-chevron-down" style={{ marginLeft: "5px" }}></i>{" "}
      </button>
      <div className={styles.dropdown_content}>
        <p id={state.language==="tr" ? "Turkce" :"Turkish"} title={state.language==="tr" ? "Türkçe" : "Turkish"} onClick={() => onClickHandler("tr")}>TR</p>
        <p id={state.language==="tr" ? "Ingilizce" : "English"} title={state.language==="tr" ? "İngilizce" : "English"} onClick={() => onClickHandler("en")}>EN</p>
      </div>
    </div>
  );
}
export default Dropdown;
