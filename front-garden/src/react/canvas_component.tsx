import React, { useState, useEffect } from 'react';

import {CanvasControl} from '../js/canvas_utils';

export interface canvasUtilBase {
  canvas:HTMLCanvasElement
  ctx:CanvasRenderingContext2D
  setup(props:any): void
  startAnimation(props:any): (()=> void)
}

interface canvaProps {
  width:number
  height:number
  offsetX?:number
  offtsetY?:number
  onPress():(()=> void)
}

type canvasStateType = {
  ref:React.RefObject<HTMLCanvasElement>
  util?:canvasUtilBase
}

export function CanvasComp(props:canvaProps){

  const refreshRate = 20

  const canvas_ref = React.createRef<HTMLCanvasElement>()
  const canvasState: canvasStateType = {
    ref: canvas_ref,
    util: undefined 
    }
  const [canvas,setCanvas] = useState(canvasState);
    
  // This function happen once the component is mounted the first time
  useEffect(()=>{
    const canvas_current = canvas_ref.current
    
    const canvas_util = new CanvasControl(canvas_current!)

    setCanvas({
      ref: canvas_ref,
      util: canvas_util
    })
  }, [])

  // This function happen every time the component is updated
  useEffect(()=>{
    if (canvas.util === undefined) 
      {return} // Makes this safe to do canvas-util operations

    canvas.util.setup(props)
    
    setTimeout(()=> {
      canvas.util!.startAnimation(props)()
    }, refreshRate);
  })


  return(
      <canvas ref={canvas_ref} onClick={props.onPress()} 
          width={props.width} height={props.height}
          style={{border:"3px dotted #000000"}}/>
  )
}
