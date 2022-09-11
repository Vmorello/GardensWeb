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
      {return}
    
    canvas.util.setHover(props.currentPlant)
    //canvas.util.updateHoverPlant(hoverLocation.plant)
    let visualPlants = canvas.util.visual_load(props.plantList);
    setTimeout(()=> {
      canvas.util.animate(visualPlants)()
    }, refreshRate);
  
  })

  return(
      <canvas ref={canvas.ref} style={{border:"3px dotted #000000"}}
          width={props.width} height={props.length}
          onClick={props.onClick()} />
  )
}
