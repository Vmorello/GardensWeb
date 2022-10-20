import React, { useState, useEffect } from 'react';
import Head from "next/head";

import {saveAs} from 'file-saver';
import JSZip from 'jszip';

import {CanvasComp} from './canvas_components'
import {Diary} from './diary_components'
import {CardSelect} from './options_components'

export function GotPage(props) {

  const [currentRepInfo,setCurrentRepInfo] = useState([]);
  const [allBGsPlusRepInfo, setAllBGsPlusRepInfo] = useState(
    {index:  
      { bg: props.background, 
        repInfo:[], 
        width:props.width, 
        length:props.length,
        idNumeration:0
      }
    })
  const [currentPageID, setCurrentPageID] = useState("index")

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


  //================= Main Interaction with canvas with control card ==============

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

  //================ Sub-map tranfers =====================


  const goToNestedLink = (childID, parentID) => (event) => {

   // console.log(allBGsPlusRepInfo)

    //const allBG_RepCopy = JSON.parse(JSON.stringify(allBGsPlusRepInfo))
    allBGsPlusRepInfo[parentID] = {width:width, length:length, bg: background, 
      repInfo: currentRepInfo, idNumeration: idNumeration,}
    
    setCurrentRepInfo(allBGsPlusRepInfo[childID].repInfo) 
    setBackground(allBGsPlusRepInfo[childID].bg)
    setLength(allBGsPlusRepInfo[childID].length)
    setWidth(allBGsPlusRepInfo[childID].width)
    setidNumeration(allBGsPlusRepInfo[childID].idNumeration)

    setAllBGsPlusRepInfo(allBGsPlusRepInfo)
    setCurrentPageID(childID)

    resetDiary()


  } 

  const addNestedRep = (id) => (event) => {

    const info_copy = currentRepInfo.slice()
    const listIndex = info_copy.findIndex(indexOf => id === indexOf.id)
    info_copy[listIndex]["link"] = true
    setCurrentRepInfo(info_copy)

    //const allBG_RepCopy = JSON.parse(JSON.stringify(allBGsPlusRepInfo))
    allBGsPlusRepInfo[id] = {width:1000, length:920, bg: undefined, idNumeration: 0,
      repInfo:[{icon:"fort",x:20,y:20,data:[],id:"index",visibleName:"Go Back", link:true}]
    }
    setAllBGsPlusRepInfo(allBGsPlusRepInfo)
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
          const newBGsPlusRepInfo = {}
          zip.forEach((relativePath, file)=>{
            if (file.dir) {return}

            console.log("iterating over", relativePath);
            //console.log("iterating on", file);
            const path = relativePath.split("/")
            console.log("split ", path);

            const loadFunction = getLoadFunction(path[1])
            
            if (loadFunction===undefined) {return}

            loadFunction(file, newBGsPlusRepInfo, path[0])
            

            
          })

          setTimeout(()=> {
            console.log("newAllInfo" , newBGsPlusRepInfo)
            setAllBGsPlusRepInfo(newBGsPlusRepInfo)

            setCurrentRepInfo(newBGsPlusRepInfo.index.repInfo) 
            setLength(newBGsPlusRepInfo.index.length)
            setWidth(newBGsPlusRepInfo.index.width)
            setidNumeration(newBGsPlusRepInfo.index.idNumeration)

            setCurrentPageID("index")
            
            setBackground(newBGsPlusRepInfo.index.bg)


          }, 200);
        })     
  }

  const importJsonRep = (jsonFile, newBGsPlusRepInfo, saveIndex)=> {
    jsonFile.async("string")
      .then((allRepInfoString)=> JSON.parse(allRepInfoString))
      .then((json)=> {
        newBGsPlusRepInfo[saveIndex] = json
    })
  }

  const importMap = (pngFile, newBGsPlusRepInfo, saveIndex)=> {
    try {
      pngFile.async("blob")
        .then((mapblob) => newBGsPlusRepInfo[saveIndex].bg = mapblob)
    } catch (error) {
      console.log("Catching Error:" + error)
    }
  }

  const getLoadFunction = (fileString) =>{
    return importFileEvents[fileString]
  } 
  const importFileEvents = {
    "rep.json": importJsonRep,
    "map.png": importMap,
  }

  const exportButt = ()=> {

      //const allBG_RepCopy = JSON.parse(JSON.stringify(allBGsPlusRepInfo))
      allBGsPlusRepInfo[currentPageID] = {width:width, length:length, bg: background, 
        repInfo: currentRepInfo, idNumeration: idNumeration,}
      setAllBGsPlusRepInfo(allBGsPlusRepInfo)

      let zip = new JSZip();
      let folder 

      Object.entries(allBGsPlusRepInfo).map((key_value)=> {
        const key= key_value[0]

        const valueObject = key_value[1]
        console.log(key_value)
        folder = zip.folder(key)

        const valueString = JSON.stringify(valueObject)
        folder.file("rep.json", valueString)
        
        try{
          //console.log()
          folder.file("map.png", valueObject.bg)
        }catch (error) {
          console.log("Catching Error:" + error)
        }
          
      })

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

      //resetRep()
      
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

      <Diary diaryInfo={diary} addLink={addNestedRep} goToNestedLink={goToNestedLink}
      currentRepInfo={currentRepInfo} setCurrentRepInfo={setCurrentRepInfo} currentPageID={currentPageID}/>
    </div>
  </>
  )
}
