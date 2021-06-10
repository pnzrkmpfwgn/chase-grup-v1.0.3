import React, { useState, useEffect,Component } from "react";
import styles from "./dropdown.module.css";
import { useContext } from "react";
import { Context } from "../context";
import Cookies from "js-cookie";
import { render } from "react-dom";


export default function Dropdown(){
  const {state,dispatch} = useContext(Context);
  const [initialLangValue,setInitialLangValue] = useState("");
  const [dropdownStyle,setDropdownStyle] = useState(styles.dropdown);

  useEffect(()=>{
    setInitialLangValue(Cookies.get("language") || "tr")
  },[state.language])

  const onClickHandler=(option)=>{
      dispatch({
        type:option,
        payload:option
      })
      Cookies.set("language",option);
  }
  console.log("Dropdown");


  return <div
        className={dropdownStyle}
        onMouseOver={() =>
          setDropdownStyle(styles.dropdown + " " + styles.dropdown_hover)
        }
        onMouseLeave={() => setDropdownStyle(styles.dropdown)}
      >
        <button className={styles.dropbtn}>
          {" "}
          {initialLangValue.toUpperCase()}{" "}
          <i className="fas fa-chevron-down" style={{ marginLeft: "5px" }}></i>{" "}
        </button>
        <div className={styles.dropdown_content}>
          <p
            onClick={() => {
              onClickHandler("tr"), setDropdownStyle(styles.dropdown);
            }}
          >
            TR
          </p>
          <p
            onClick={() => {
              onClickHandler("en"), setDropdownStyle(styles.dropdown);
            }}
          >
            EN
          </p>
        </div>
      </div>
  }


