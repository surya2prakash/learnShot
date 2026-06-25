import React, { useEffect } from 'react'

export default function useClickOutSide(ref,handle) {

    useEffect(()=>{
        const listener = (event) =>{

            // if current value is not then and  if ref contains that target element then return
                if(!ref.current || ref.current.contains(event.target)){
                       return;
                }

                // other wise run the handle --> setOpen(false);
            handle(event);
        };
        // listener for mouse -->
           document.addEventListener("mousedown",listener);
        //    listener for touch event -->
            document.addEventListener("touchstart",listener);
        return ()=>{
            //  remove the listeners
              document.removeEventListener("mousedown",listener)
              document.removeEventListener("touchstart",listener)
        }

    },[ref,handle])
  
}
