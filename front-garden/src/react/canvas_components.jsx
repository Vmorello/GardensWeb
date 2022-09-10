import React, { useState, useEffect } from 'react';

import {CanvasControl} from '../js/canvas_utils';

export function CanvasComp(props){

  const canvas_ref = React.createRef()
  const [canvas,setCanvas] = useState({
      ref: canvas_ref,
      util: undefined
      });
  let raf = undefined
    
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
    if (props.plantList.length > 0){
      let visualPlants = canvas.util.visual_load(props.plantList, canvas_ref.current);
      
      setTimeout(function() {
        raf = requestAnimationFrame(
          canvas.util.startAnimation(visualPlants)
        )
      }, 40);
    }
  })

  return(
      <canvas ref={canvas.ref} style={{border:"3px dotted #000000"}}
          width={props.width} height={props.length}
          onClick={props.onClick()} />
  )
}
