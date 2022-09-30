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

  // can probably be changed with a object for faster access
  const canvasOnclickSwitch = () =>{
    if (mode === "place"){
        return addRepEvent()
    } else if (mode === "select"){
        return selection()
    } else if (mode === "remove"){
      return removeRepEvent()
    }
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
    //console.log(info_copy)
  }

  const removeRepEvent = () => {
    return ((event) => {
        removeRep( event.pageX, event.pageY)
      })
}
  const removeRep = (x,y) => {

    const info_copy = allRepInfo.slice()

    // see if you combine this with select 
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

  const selection = () => {
    return ((event) => {

      console.log("starting up the journal")
      const x = event.pageX
      const y = event.pageY
      
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
      //console.log(diary)
      })  
  }


  //================ Diary functions ============

  const resetDiary = () =>{
    setDiary({
      x: 0,
      y: 0,
      info_on_location: [],
    });
  }

  const newTextBoxAdded = (item)=> (event)=>{
        
        console.log("trying to write in the diary")
    
        //const label = document.getElementById(`labeledTextBox_insert_${item.id}`).value 

        //const img = extract_img(item)

        const info_copy = allRepInfo.slice()
        const index = info_copy.findIndex(indexOf => item.id === indexOf.id)
        info_copy[index]["data"].push({"text":"Start writing here "})

        setAllRepInfo(info_copy)
    }  
  

  const extract_img= (item) =>{
    const img_insert = document.getElementById(`img_insert_${item.id}`)
    const img_file  = img_insert.files[0]

    if (typeof img_file === 'undefined') return {src:""}

    const img = new Image()
    img.src = URL.createObjectURL(img_file);
    return img
  }

  
  const titleOnChange = (item)=>((event) => {
    const info_copy = allRepInfo.slice()
    const index = info_copy.findIndex(indexOf => item.id === indexOf.id)
    info_copy[index]["visibleName"] = event
    setAllRepInfo(info_copy)
  })

  const CatagoryOnChange = (repID, indexOfPara)=>((event) => {
    const info_copy = allRepInfo.slice()
    const index = info_copy.findIndex(indexOf => repID === indexOf.id)
    info_copy[index]["data"][indexOfPara] = {"text":event.target.value}
    setAllRepInfo(info_copy)
  })

  
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
        <CanvasComp mode={mode} itemList={allRepInfo} onClick={canvasOnclickSwitch} 
              width={width} length={length} currentItem={currentItem} 
              background={props.background} />
        
        <CardSelect mode={mode} setMode={setModeDReset} setCurrentItem={setCurrentItem} 
                    currentItem={currentItem} pageRepList ={props.pageRepList}
                    allRepInfo={allRepInfo} setAllRepInfo={setAllRepInfo} 
                    setidNumeration={setidNumeration} />

      <Diary diaryInfo={diary} entered={newTextBoxAdded} titleOnChange={titleOnChange}
        CatagoryOnChange ={CatagoryOnChange} />
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