import React, { useState, useEffect } from "react";
import styles from "./dropdown.module.css";
import { useContext } from "react";
import { Context } from "../context";
import Cookies from "js-cookie";
import next from "next";

function Dropdown(){
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
  console.log("dropdown");
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

  React.memo(Dropdown,(props,nextProps)=>{
    if(props ===nextProps){
      return true
    }
  })

export default Dropdown;

// import React,{useContext} from 'react';
// import styles from './dropdown.module.css';
// import {Context} from '../context';
// import Cookies from 'js-cookie';

// function DropdownConsumer({children}){
//   return <Context.Consumer>
//     {
//       context => {
//         if(context === undefined){
//           throw new Error('DropdownConsumer must be used within a DropdownProvider')
//         }
//         return children(context)
//       }
//     }
//   </Context.Consumer>
// }
// class Dropdown extends React.Component{
//   constructor(props){
//     super(props);
//     this.state ={
//       dropdownStyle:styles.dropdown
//     }
//     this.onClickHandler = this.onClickHandler.bind(this)
//   }

//   dropdownHoverHandler=()=>{
//     this.setState({
//       dropdownStyle:this.state.dropdownStyle.concat(' ',styles.dropdown_hover)
//     })
//   }

//   dropdownLeaveHandler=()=>{
//     this.setState({
//       dropdownStyle:styles.dropdown
//     })
//   }

//   onClickHandler=(lang)=>{
//     //dispatchHandler(lang);
//     console.log("Fuck off")
//     Cookies.set("language",lang);
//   }

//   componentDidMount(){
    
//   }

//   render(){
//     return <DropdownConsumer>
//       {(context,dispatch) => (<div
//         className={this.state.dropdownStyle}
//         onMouseOver={() =>
//           this.dropdownHoverHandler()
//         }
//         onMouseLeave={() => this.dropdownLeaveHandler()}
//       >
//         <button className={styles.dropbtn}>
//           {" "}
//           {context.state.language.toUpperCase()}{" "}
//           <i className="fas fa-chevron-down" style={{ marginLeft: "5px" }}></i>{" "}
//         </button>
//         <div className={styles.dropdown_content}>
//           <p
//             onClick={()=>dispatch.dispatch({type:"tr",payload:"tr"})}
//           >
//             TR
//           </p>
//           <p
//             onClick={()=>dispatch.dispatch({type:"tr",payload:"tr"})}
//           >
//             EN
//           </p>
//         </div>
//       </div>
//       )}
//     </DropdownConsumer>
//   }
// }

// export default Dropdown