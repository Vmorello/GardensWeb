'use client';

import React, { useState, useEffect, UIEventHandler } from 'react';

import {CanvasControl} from '../classes/canvas_utils';

export interface CanvasUtilBase {
  canvas:HTMLCanvasElement
  ctx:CanvasRenderingContext2D
  setup(props:any): void
  startAnimation(props:any): (()=> void)
  updateOffset:(offset:{x:number,y:number})=>void
  offset:{
    x: number,
    y: number
  }
}


type canvasStateType = {
  ref:React.RefObject<HTMLCanvasElement>
  util?:CanvasUtilBase
}

export function CanvasComp(props:{
  width:number
  height:number
  offsetX?:number
  offtsetY?:number
  onPress: (x:number,y:number,offsetX:number,offsetY:number) => void 
  currentItem:string
  mode:string
  repList:Array<{icon:string,x:number,y:number}>
  background?:string|Blob
}){

  const refreshRate = 100 

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

    // console.log("setting up canvas util")
    setCanvas({
      ref: canvas_ref,
      util: canvas_util
    })
    // canvas_util.setup(props)
  }, [])

  // This function happen every time the component is updated
  useEffect(()=>{
    if (canvas.util === undefined) 
      {return} // Makes this safe to do canvas-util operations

    canvas.util.setup(props)
    
    setTimeout(()=> {
      canvas.util!.startAnimation(props.repList)()
    }, refreshRate);
  })

  const onSideScroll = (event: React.MouseEvent<HTMLInputElement>)=>{
    // if (canvas.util === undefined) {return}
    if (event.target instanceof Element){
      canvas.util!.updateOffset({x:event.target.scrollLeft,y:event.target.scrollTop})
    }
  } 

  const onCanvasPress = (event:{pageX:number,pageY:number})=>{
      if (canvas.util === undefined) {return}

      // console.log("Clicked Canvas")
      props.onPress(event.pageX, event.pageY,
                    canvas.util.offset.x, 
                    canvas.util.offset.y)
      //action(event)
  }


  return(
    <div style={{overflowY:"scroll"}} onScroll={onSideScroll}>
      <canvas ref={canvas_ref} onClick={onCanvasPress} 
      
          width={props.width} height={props.height}
          style={{border:"3px dotted #000000"}}/>
    </div>
  )
}
