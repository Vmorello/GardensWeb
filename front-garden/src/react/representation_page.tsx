'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import Head from "next/head";

import {saveAs} from 'file-saver';
import JSZip from 'jszip';

import {CanvasComp} from './canvas_component'
import {Diary} from './diary_component'
import {CardSelect} from './options_component'

interface repPage {
  length: number 
  width: number 
  startIcon: string
  title: string
  background?: string|Blob
  pageRepList: Array<string>
  clickRadius: number
}

export type representation = {icon: string, 
  x: number, y: number,
  data : Array<string>,
  id :string,
  visibleName  : string,
  link: boolean
}

type fullPageRepresentation = {
  background?: string|Blob, 
  repInfo: Array<representation>, 
  width:number, 
  length:number,
  index:string}

type dict_fullPageRepresentation = {[key: string]: fullPageRepresentation}


export function GotPage(props:repPage) {

  const [currentRepInfo,setCurrentRepInfo] = useState([] as Array<representation>);
  const [allBGsPlusRepInfo, setAllBGsPlusRepInfo] = useState(
    {index:  
      { background: props.background, 
        repInfo:[] as Array<representation>, 
        width:props.width, 
        length:props.length,
        index:"index"
      }
    } as dict_fullPageRepresentation)
    
  const [currentPageID, setCurrentPageID] = useState("index")

  const [mode,setMode] = useState("place");
  //const [user,setUser] = useState(props.user);
  const [length,setLength] = useState(props.length);
  const [width,setWidth] = useState(props.width);
  const [currentItem, setCurrentItem] = useState(props.startIcon);
  const [diary,setDiary] = useState({
    x: 0,
    y: 0,
    info_on_location: [] as Array<representation>,
  });
  const [background,setBackground] = useState(props.background)
  const [idNumeration,setidNumeration] = useState("0");


  // useEffect(()=>{
  //   if (typeof window !== 'undefined') {
  //     setWidth(window.innerWidth-10)
  //     setLength(window.innerHeight-100)
  // }},[])

  

  // -------- Event Functions & Util -------------// 

  // const clear_button = () => {
  //   return ((event:Event) => {
  //     resetRep()
  //   })
  // }

  // const size_adjustment = (side)=> {
  //     return ((event:ChangeEvent) => {
  //       if (side === "length") {
  //         setLength(event.target.value)
  //       } else if (side === "width"){
  //         setWidth(event.target.value)
  //       } 
  //       resetRep() 
  //     })
  // }

  // const resetRep = () => {
  //     setCurrentRepInfo([])
  //     setidNumeration(0)
  //     resetDiary()
  // }


  //================= Main Interaction with canvas with control card ==============
  
  const addRep = (x:number, y:number,offsetX:number,offsetY:number) =>{
    x = x + offsetX
    y = y + offsetY

    const info_copy = currentRepInfo.slice()
    info_copy.push({
        "icon": currentItem,
        "x": x,
        "y": y,
        "data": [],
        "id":idNumeration,
        "visibleName" : currentItem,
        "link":false
    })


    // console.log(idNumeration+1)
    setidNumeration(idNumeration+1)
    setCurrentRepInfo(info_copy)
  }


  const removeRep = (x:number,y:number,offsetX:number,offsetY:number) => {

    x = x + offsetX
    y = y + offsetY

    let info_copy = currentRepInfo.slice()

    // see if you test this vs select 
    const notInRange = (listOut:Array<representation>,item:representation)=> {
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


  const selection = (x:number,y:number,offsetX:number,offsetY:number) => {
    const selectX=x +offsetX
    const selectY=y +offsetY

      const info_on_location = currentRepInfo.filter((item) => 
        {return item["x"]+ props.clickRadius > selectX && 
            item["x"]- props.clickRadius < selectX && 
            item["y"]+ props.clickRadius > selectY && 
            item["y"]- props.clickRadius < selectY})

      // console.log(`${x} & ${y} ${info_on_location.entries}`)
      setDiary({
            x:x, 
            y:y,
            info_on_location: info_on_location
          })
  }

  const canvasOnclickSwitch = (x:number,y:number,offsetX:number,offsetY:number) =>{
    //console.log(event)
    return modeEvents[mode](x, y, offsetX, offsetY)
  } 
  const modeEvents:{ [key: string]: (x:number,y:number,offsetX:number,offsetY:number) =>void }  = {
    // "place": addRepEvent,
    // "select":selectionEvent,
    // "remove":removeRepEvent
    "place": addRep,
    "select":selection,
    "remove":removeRep
  }

  //================ Sub-map tranfers =====================


  const goToNestedLink = (childID:string, parentID:string) => () => {

   // console.log(allBGsPlusRepInfo)

    //const allBG_RepCopy = JSON.parse(JSON.stringify(allBGsPlusRepInfo))
    allBGsPlusRepInfo[parentID] = {width:width, length:length, background: background, 
      repInfo: currentRepInfo, index: idNumeration,}
    
    setCurrentRepInfo(allBGsPlusRepInfo[childID].repInfo) 
    setBackground(allBGsPlusRepInfo[childID].background)
    setLength(allBGsPlusRepInfo[childID].length)
    setWidth(allBGsPlusRepInfo[childID].width)
    setidNumeration(allBGsPlusRepInfo[childID].index)

    setAllBGsPlusRepInfo(allBGsPlusRepInfo)
    setCurrentPageID(childID)

    resetDiary()

  } 

  const addNestedRep = (id:string) => () => {

    const info_copy = currentRepInfo.slice()
    const listIndex = info_copy.findIndex(indexOf => id === indexOf.id)
    info_copy[listIndex]["link"] = true
    setCurrentRepInfo(info_copy)

    //const allBG_RepCopy = JSON.parse(JSON.stringify(allBGsPlusRepInfo))
    allBGsPlusRepInfo[id] = {width:1000, length:920, background: undefined, index: "0",
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
  
  const setModeDReset =(selected:string) => {
    //console.log(event)
    if(selected!=="select"){resetDiary()}
    setMode(selected)
  }

  //==================Card button Actions =======================

  const importButt = () => {
    const inputFileObject = document.getElementById("jsonLoadInsert") as HTMLInputElement;
    if (inputFileObject.files === null) {
      return
    }
    const zipFile = inputFileObject.files[0]

    resetDiary()

    JSZip.loadAsync(zipFile)
        .then((zip)=>{
          const newBGsPlusRepInfo = {} as dict_fullPageRepresentation
          zip.forEach((relativePath, file)=>{
            if (file.dir) {return}

            //console.log("iterating on", file);
            const path = relativePath.split("/")

            const filename = path[1]
            const saveIndex = path[0]

            const loadFunction = getLoadFunction(filename)
            if (loadFunction===undefined) {return}

            loadFunction(file, newBGsPlusRepInfo, saveIndex)
          })

          setTimeout(()=> {
            // console.log("newAllInfo" , newBGsPlusRepInfo)
            setAllBGsPlusRepInfo(newBGsPlusRepInfo)

            setCurrentRepInfo(newBGsPlusRepInfo.index.repInfo) 
            setLength(newBGsPlusRepInfo.index.length)
            setWidth(newBGsPlusRepInfo.index.width)
            setidNumeration(newBGsPlusRepInfo.index.index)

            setCurrentPageID("index")
            
            setBackground(newBGsPlusRepInfo.index.background)


          }, 200);
        })     
  }

  const importJsonRep = (jsonFile:JSZip.JSZipObject, newBGsPlusRepInfo:dict_fullPageRepresentation, saveIndex:string)=> {
    jsonFile.async("string")
      .then((allRepInfoString)=> JSON.parse(allRepInfoString))
      .then((json:fullPageRepresentation)=> {
        console.log(json)
        newBGsPlusRepInfo[saveIndex] = json
    })
  }

  const importMap = (pngFile:JSZip.JSZipObject, newBGsPlusRepInfo:dict_fullPageRepresentation, saveIndex:string)=> {
    try {
      pngFile.async("blob")
        .then((mapblob:Blob) => newBGsPlusRepInfo[saveIndex].background = mapblob)
    } catch (error) {
      console.log("Catching Error:" + error)
    }
  }

  const getLoadFunction = (fileString:string) =>{
    return importFileEvent[fileString]
  } 

  const importFileEvent:{[fileType:string]:(jsonFile: JSZip.JSZipObject, newBGsPlusRepInfo: dict_fullPageRepresentation, saveIndex: string) => void} = {
    "rep.json": importJsonRep,
    "map.png": importMap,
  }

  const exportButt = ()=> {

      //const allBG_RepCopy = JSON.parse(JSON.stringify(allBGsPlusRepInfo))
      allBGsPlusRepInfo[currentPageID] = {width:width, length:length, background: background, 
        repInfo: currentRepInfo, index: idNumeration,}
      setAllBGsPlusRepInfo(allBGsPlusRepInfo)

      let zip = new JSZip();
      let folder 

      Object.entries(allBGsPlusRepInfo).map((key_value)=> {
        const key= key_value[0]

        const valueObject = key_value[1]
        // console.log(key_value)
        folder = zip.folder(key)

        const valueString = JSON.stringify(valueObject)
        folder!.file("rep.json", valueString)
        
        try{
          //console.log()
          folder!.file("map.png", valueObject.background as Blob)
        }catch (error) {
          console.log("Catching Error:" + error)
        }
          
      })
      saveZip(zip)
  }

  const saveZip = (zip:JSZip) => {
    zip.generateAsync({type:"blob"})
    .then((blob:Blob)=> {
        saveAs(blob, `${props.title}.zip`);
    });
  }

  const backgroundButt = ()=> {
      const inputFileObject = document.getElementById(`backgroundLoadInsert`) as HTMLInputElement;
      if (inputFileObject.files === null) {
        return
      }

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
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </Head>
      <div>
        <CanvasComp repList={currentRepInfo} onPress={canvasOnclickSwitch} 
              width={width} height={length} currentItem={currentItem} mode={mode}
              background={background}/>
        
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
