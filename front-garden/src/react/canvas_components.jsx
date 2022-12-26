import React, { useState, useEffect } from 'react';

import {CanvasControl} from '../js/canvas_utils';

export function CanvasComp(props){

  const refreshRate = 20

  const canvas_ref = React.createRef()
  const [canvas,setCanvas] = useState({
      ref: canvas_ref,
      util: undefined
      });
    
  // This function happen once the component is mounted the first time
  useEffect(()=>{
    const canvas_current = canvas_ref.current
    const canvas_util = new CanvasControl(canvas_current)

    setCanvas({
      ref: canvas_ref,
      util: canvas_util
    })
  },[]) //notice the empty array here

  // This function happen every time the component is updated
  useEffect(()=>{
    if (canvas.util === undefined) 
      {return} // Makes this safe to do canvas-util operations

    canvas.util.setup(props)
    
    setTimeout(()=> {
      canvas.util.restartAnimation(props)()
    }, refreshRate);
  })


  return(
      <canvas ref={canvas.ref} onClick={props.onPress()} 
          width={props.width} height={props.length}
          style={{border:"3px dotted #000000"}}/>
  )
}
