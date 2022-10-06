import React, { useState, useEffect } from 'react';
import Head from "next/head";

import {CanvasComp} from './canvas_components'
import {Diary} from './diary_components'
import {CardSelect} from './options_components'

export function GotPage(props) {

  const [allRepInfo,setAllRepInfo] = useState([]);

  const [mode,setMode] = useState("place");
  //const [user,setUser] = useState(props.user);
  const [length,setLength] = useState(props.length);
  const [width,setWidth] = useState(props.width);
  const [currentItem, setCurrentItem] = useState(props.startIcon);
  const [diary,setDiary] = useState({
    x: 0,
    y: 0,
    info_on_location: [],
  });
  const [idNumeration,setidNumeration] = useState(0);


  // useEffect(()=>{
  //   if (typeof window !== 'undefined') {
  //     setWidth(window.innerWidth-10)
  //     setLength(window.innerHeight-100)
  // }},[])

  

  // -------- Event Functions & Util -------------// 

  const clear_button = () => {
    return ((event) => {
      emptyRep()
    })
  }

  const size_adjustment = (side)=> {
      return ((event) => {
        if (side === "length") {
          setLength(event.target.value)
        } else if (side === "width"){
          setWidth(event.target.value)
        } 
        emptyRep() 
      })
  }

  const emptyRep = () => {
      setAllRepInfo([])
      setidNumeration(0)
      resetDiary()
  }

  const addRepEvent = () => {
      return ((event) => {
            addRep(currentItem, event.pageX, event.pageY)
        })
  }
  
  const addRep = (selected, x, y) =>{
    const info_copy = allRepInfo.slice()
    info_copy.push({
        "icon": selected,
        "x": x,
        "y": y,
        "data": [],
        "id":idNumeration,
        "visibleName" : selected
    })

    setidNumeration(idNumeration+1)
    setAllRepInfo(info_copy)
  }

  const removeRepEvent = () => {
    return ((event) => {
        removeRep( event.pageX, event.pageY)
      })
}
  const removeRep = (x,y) => {

    const info_copy = allRepInfo.slice()

    // see if you test this vs select 
    const notInRange = (listOut,item)=> {
      if ( ! (item["x"]+ props.clickRadius > x && 
        item["x"]- props.clickRadius < x && 
        item["y"]+ props.clickRadius > y && 
        item["y"]- props.clickRadius < y)){
          listOut.push(item)
        }
      return listOut
    }
    info_copy = info_copy.reduce(notInRange,[])

    //console.log(info_copy)

    setAllRepInfo(info_copy)
  }

  const selectionEvent = () => {
    return ((event) => {
        selection(event.pageX, event.pageY)
    })
  }

  const selection = (x,y) => {
    
      console.log("starting up the journal")
      
      const in_click_range = (item) => {return item["x"]+ props.clickRadius > x && 
              item["x"]- props.clickRadius < x && 
              item["y"]+ props.clickRadius > y && 
              item["y"]- props.clickRadius < y}
      const info_onlocation = allRepInfo.filter(in_click_range)

      setDiary({
            x:x, 
            y:y,
            info_on_location: info_onlocation
          })
  }

  // can probably be changed with a object for faster access
  const canvasOnclickSwitch = () =>{
    return modeEvents[mode]()
  } 
  const modeEvents = {
    "place": addRepEvent,
    "select":selectionEvent,
    "remove":removeRepEvent
  }

  //================ Diary functions ============

  const resetDiary = () =>{
    setDiary({
      x: 0,
      y: 0,
      info_on_location: [],
    });
  }
  
  const setModeDReset =(event) => {
    //console.log(event)
    if(event!=="select"){resetDiary()}
    setMode(event)
  }

  return(
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <div>
        <CanvasComp mode={mode} itemList={allRepInfo} onPress={canvasOnclickSwitch} 
              width={width} length={length} currentItem={currentItem} 
              background={props.background} />
        
        <CardSelect mode={mode} setMode={setModeDReset} setCurrentItem={setCurrentItem} 
                    currentItem={currentItem} pageRepList ={props.pageRepList}
                    allRepInfo={allRepInfo} setAllRepInfo={setAllRepInfo} 
                    setidNumeration={setidNumeration} />

      <Diary diaryInfo={diary} 
      allRepInfo={allRepInfo} setAllRepInfo={setAllRepInfo}/>
    </div>
  </>
  )
}



// fetch(`http://${ip_addr}/v0/health`)
//     .then(() => {
//         console.log("got a response from the database")
//       //   this.setState({
//       //       db_connected: true
//       //   })
//     })
//     .catch((error) => {
//         console.log("did not connect to db")
//     });