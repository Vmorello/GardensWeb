import React, { useState, useEffect } from 'react';
import Head from "next/head";

import {saveAs} from 'file-saver';
import JSZip from 'jszip';

import {CanvasComp} from './canvas_components'
import {Diary} from './diary_components'
import {CardSelect} from './options_components'

export function GotPage(props) {

  const [currentRepInfo,setCurrentRepInfo] = useState([]);
  const [allRepInfoZip, setAllRepInfoZip] = useState(new JSZip)

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
  const [background,setBackground] = useState(props.background)
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

  const resetRep = () => {
      setCurrentRepInfo([])
      setidNumeration(0)
      resetDiary()
  }

  const addRepEvent = () => {
      return ((event) => {
            addRep(currentItem, event.pageX, event.pageY)
        })
  }
  
  const addRep = (selected, x, y) =>{
    const info_copy = currentRepInfo.slice()
    info_copy.push({
        "icon": selected,
        "x": x,
        "y": y,
        "data": [],
        "id":idNumeration,
        "visibleName" : selected
    })

    setidNumeration(idNumeration+1)
    setCurrentRepInfo(info_copy)
  }

  const removeRepEvent = () => {
    return ((event) => {
        removeRep( event.pageX, event.pageY)
      })
}
  const removeRep = (x,y) => {

    const info_copy = currentRepInfo.slice()

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

    setCurrentRepInfo(info_copy)
  }

  const selectionEvent = () => {
    return ((event) => {
        selection(event.pageX, event.pageY)
    })
  }

  const selection = (x,y) => {
      const info_onlocation = currentRepInfo.filter((item) => 
        {return item["x"]+ props.clickRadius > x && 
            item["x"]- props.clickRadius < x && 
            item["y"]+ props.clickRadius > y && 
            item["y"]- props.clickRadius < y})

      setDiary({
            x:x, 
            y:y,
            info_on_location: info_onlocation
          })
  }

  const canvasOnclickSwitch = () =>{
    return modeEvents[mode]()
  } 
  const modeEvents = {
    "place": addRepEvent,
    "select":selectionEvent,
    "remove":removeRepEvent
  }

  //================ Diary functions =======================

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

  //==================Card button Actions =======================

  const importButt = () => {
    const inputFileObject = document.getElementById("jsonLoadInsert")
    const zipFile = inputFileObject.files[0]

    resetDiary()

    JSZip.loadAsync(zipFile)
        .then((zip)=>{
          zip.files["rep.json"].async("string")
            .then((allRepInfoString)=> JSON.parse(allRepInfoString))
            .then((json)=> {
              const allRepInfo = json.allRepInfo
              setCurrentRepInfo(allRepInfo)
              const infoSorted = allRepInfo.slice()
              infoSorted.sort((a, b)=>{return b.id - a.id})
              setidNumeration(infoSorted[0].id + 1)
              setWidth(json.width)
              setLength(json.length)
            })
          
          zip.files["map.png"].async("arraybuffer")
            .then((mapArray)=> {
              setBackground(new Blob([mapArray], { type: "image/png" }))
            })
        })     
  }

  const exportButt = ()=> {

      let zip = new JSZip();

      const allInfoJson = JSON.stringify({
        "allRepInfo": currentRepInfo,
        "width":width,
        "length":length,
      })
      zip.file("rep.json", allInfoJson)
      
      if (background === undefined || background === "tentowns") {
        saveZip(zip)
        return
      }
      zip.file("map.png", background.arrayBuffer())  // {base64: true} {binary: true}
      saveZip(zip)
  }

  const saveZip = (zip) => {
    zip.generateAsync({type:"blob"})
    .then((blob)=> {
        saveAs(blob, `${props.title}.zip`);
    });
  }



  const backgroundButt = ()=> {
      const inputFileObject = document.getElementById(`backgroundLoadInsert`)
      const inputFile = inputFileObject.files[0]
      
      setBackground(inputFile)

      const imageURL = URL.createObjectURL(inputFile)
      const tempImage = new Image();
      tempImage.addEventListener("load", ()=>{
        setLength(tempImage.naturalHeight)
        setWidth(tempImage.naturalWidth)
      })
      tempImage.src = imageURL

      resetRep()
      
  }

  return(
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <div>
        <CanvasComp mode={mode} itemList={currentRepInfo} onPress={canvasOnclickSwitch} 
              width={width} length={length} currentItem={currentItem} 
              background={background} />
        
        <CardSelect mode={mode} setMode={setModeDReset} setCurrentItem={setCurrentItem} 
                    currentItem={currentItem} pageRepList ={props.pageRepList}
                    inputButt={importButt} exportButt={exportButt} 
                    backgroundButt={backgroundButt}     />

      <Diary diaryInfo={diary} 
      currentRepInfo={currentRepInfo} setCurrentRepInfo={setCurrentRepInfo}/>
    </div>
  </>
  )
}
