import { useEffect, useState, useContext } from "react";
import {  useMediaQuery } from "../utils/hooks";
import {en_nav_url,nav_url,base_url,images_url} from './urls'
import {Context} from '../context';
import Mobile from "./mobile_nav";
import Nav from "./nav";

export default function Header() {
  const {state,dispatch} =useContext(Context);
  const [logo, setLogo] = useState("");
  const [data, setData] = useState();
  const isBreakpoint = useMediaQuery(768);

  useEffect( async ()=>{

    const mobileController = new AbortController();
    const desktopController = new AbortController();
    if(isBreakpoint){
      await fetch(images_url,{method:"GET",signal:mobileController.signal}).then(res => res.json()).then(data => {
        for(let i = 0 ; i < data.length; i++){
          if(data[i].Name === "chase_logo"){
            setLogo(base_url + data[i].image.url)
          }
        }
      })
      if(state.language === "TR"){
        await fetch(nav_url,{method:"GET",signal:mobileController.signal}).then(res => res.json()).then(data =>{
          setData(data);
        })
      }else {
        await fetch(en_nav_url,{method:"GET",signal:mobileController.signal}).then(res => res.json()).then(data => {
          setData(data);
        })
      }
    }else{
      await fetch(images_url,{method:"GET",signal:desktopController.signal}).then(res => res.json()).then(data=>{
        for(let i = 0 ; i < data.length ; i++){
          if(data[i].Name ==="chase_logo"){
            setLogo(base_url + data[i].image.url);
          }
        }
      })
      if(state.language === "TR"){
        await fetch(nav_url,{method:"GET",signal:desktopController.signal}).then(res => res.json()).then(data =>{
          setData(data)
        })
      }else{
      await fetch(en_nav_url,{method:"GET",signal:desktopController.signal}).then(res => res.json()).then(data =>{
        setData(data);
      })
      }
    }

    return()=>{
      if(isBreakpoint){
        mobileController.abort();
      }else{
        desktopController.abort();
      }
    }
  },[state.language])
  
  //Handlers
  // useOnClickOutside-----------------------> We might not need this one
  return (
    <header>
      <nav>{isBreakpoint ? <Mobile logo={logo} data={data} /> : <Nav logo={logo} data={data} />}</nav>
    </header>
  );
}
