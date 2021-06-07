import {useEffect,useState,useCallback,useRef} from 'react';

export function useSticky() {
  const [isSticky, setSticky] = useState(false)
  const element = useRef(null)

  const handleScroll = () => {
    window.scrollY > element.current.getBoundingClientRect().bottom
      ? setSticky(true)
      : setSticky(false)
  }

  // This function handles the scroll performance issue
  const debounce = (func, wait = 20, immediate = true) => {
    let timeOut
    return () => {
      let context = this,
        args = arguments
      const later = () => {
        timeOut = null
        if (!immediate) func.apply(context, args)
      }
      const callNow = immediate && !timeOut
      clearTimeout(timeOut)
      timeOut = setTimeout(later, wait)
      if (callNow) func.apply(context, args)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", debounce(handleScroll))
    return () => {
      window.removeEventListener("scroll", () => handleScroll)
    }
  }, [debounce, handleScroll])

  return { isSticky, element }
}

export const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
};

export const useMediaQuery = (width) => {
    const [targetReached, setTargetReached] = useState(false);

    const updateTarget = useCallback(e =>{
        if(e.matches){
            setTargetReached(true);
        }else{
            setTargetReached(false);
        }
    },[]);

    useEffect(()=>{
        const media = window.matchMedia(`(max-width:${width}px)`);
        media.addEventListener('change',e => updateTarget(e))
        //Check on mount (callback is not called until a change occurs)
        if(media.matches){
            setTargetReached(true)
        }

        return () => media.removeEventListener('change',e => updateTarget(e))
    },[])

    return targetReached;
}