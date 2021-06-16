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
    setInitialLangValue(Cookies.get("language") || "tr");
  }, [state.language]);

  const onClickHandler = (option) => {
    dispatch({
      type: option,
      payload: option,
    });
    Cookies.set("language", option);
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
      <button className={styles.dropbtn}>
        {" "}
        {initialLangValue.toUpperCase()}{" "}
        <i className="fas fa-chevron-down" style={{ marginLeft: "5px" }}></i>{" "}
      </button>
      <div className={styles.dropdown_content}>
        <p onClick={() => onClickHandler("tr")}>TR</p>
        <p onClick={() => onClickHandler("en")}>EN</p>
      </div>
    </div>
  );
}
export default Dropdown;
