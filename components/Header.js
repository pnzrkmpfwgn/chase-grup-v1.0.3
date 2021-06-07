import { useEffect, useState, useRef } from "react";

//utils
import { useOnClickOutside, useMediaQuery } from "../utils/hooks";
//components
import Mobile from './mobile_nav';
import Nav from './nav';

export default function Header() {
  const isBreakpoint = useMediaQuery(768);
  //Ref
  const node = useRef();

  //State
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();

  //Handlers
  // useOnClickOutside(node,()=>setOpen(false));
  return (
    <header>
      <nav>
        {
          isBreakpoint ? <Mobile /> : <Nav />
        }
      </nav>
    </header>
  );
}
