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
        set_rep_empty()
    })
  }

  const size_adjustment = (side)=> {
      return ((event) => {
        if (side === "length") {
          setLength(event.target.value)
        } else if (side === "width"){
          setWidth(event.target.value)
        } 
        set_rep_empty() 
      })
  }

  const set_rep_empty = () => {
      setAllRepInfo([])
      resetDiary()
  }

  const resetDiary = () =>{
    setDiary({
      x: 0,
      y: 0,
      info_on_location: [],
    });
  }


  const canvasOnclickSwitch = () =>{
    if (mode === "place"){
        return add_rep()
    } else if (mode === "select"){
        return selection()
    } else if (mode === "remove"){
      return removeRepEvent()
    }
  } 

  const add_rep = () => {
      return ((event) => {
            add_rep_info(currentItem, event.pageX, event.pageY)
        })
  }
  
  const add_rep_info = (selected, x, y) =>{
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
    const in_click_range = (item) => {return item["x"]+ 20 > x && 
            item["x"]- 20 < x && item["y"]+ 20 > y && item["y"]- 20 < y}

    const listInfoToRemove = allRepInfo.filter(in_click_range)


    //TODO 
    listInfoToRemove.forEach(info => {
      
    });

  }

  const selection = () => {
    return ((event) => {

      console.log("starting up the journal")
      const x = event.pageX
      const y = event.pageY
      
      const in_click_range = (item) => {return item["x"]+ 20 > x && 
            item["x"]- 20 < x && item["y"]+ 20 > y && item["y"]- 20 < y}

      const info_onlocation = allRepInfo.filter(in_click_range)
      setDiary({
            x:x, 
            y:y,
            info_on_location: info_onlocation
          })
      // console.log(diary)
      })  
  }


  //================ Diary functions ============

  const infoFragAdded = (item)=> (event)=>{
        
        console.log("trying to write in the diary")
    
        const text = document.getElementById(`label_insert_${item.id}`).value 
        
        console.log(text)

        const img = extract_img(item)

        const info_copy = allRepInfo.slice()

        //TODO once delete is in this wont work anymore 
        info_copy[item["id"]]["data"].push({"text":text,"img":img})

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

  
  const titleChange = (item)=>((event) => {
    const info_copy = allRepInfo.slice()

    info_copy[item.id]["visibleName"] = event.target.value
    
    setAllRepInfo(info_copy)
  })
  

  return(
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <div>
        <CanvasComp mode={mode} itemList={allRepInfo} onClick={canvasOnclickSwitch} 
              width={width} length={length} currentItem={currentItem} 
              background={props.background} />
        
        <CardSelect mode={mode} setMode={setMode} setCurrentItem={setCurrentItem} 
                    currentItem={currentItem} pageRepList ={props.pageRepList}
                    allRepInfo={allRepInfo} setAllRepInfo={setAllRepInfo}  />

      <Diary diaryInfo={diary} entered={infoFragAdded} titleChange={titleChange} />
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