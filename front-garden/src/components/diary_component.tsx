import React from "react"

import {representation} from "./representation_page"

export function Diary(props:{diaryInfo:{x:number,y:number,info_on_location:Array<representation>}, 
                            addLink:(id:string)=>()=>void, 
                            goToNestedLink:(childID:string, parentID:string) => () => void ,
                            currentRepInfo:Array<representation>,
                            setCurrentRepInfo:React.Dispatch<React.SetStateAction<representation[]>>, 
                            currentPageID:string})   
  {

  const newTextBoxAdded = (item:representation)=> ()=>{
    // console.log(item)
    const info_copy = props.currentRepInfo.slice()
    const listIndex = info_copy.findIndex(indexOf => item.id === indexOf.id)
    info_copy[listIndex]["data"].push("write here")

    props.setCurrentRepInfo(info_copy)
  }  

  const titleOnChange = (item:representation)=>((event:React.ChangeEvent<HTMLInputElement>) => {
    const info_copy = props.currentRepInfo.slice()
    const listIndex = info_copy.findIndex(indexOf => item.id === indexOf.id)
    info_copy[listIndex]["visibleName"] = event.target.value
    props.setCurrentRepInfo(info_copy)
  })

  const CatagoryOnChange = (repID:string, indexOfPara:number)=>((event:React.ChangeEvent<HTMLTextAreaElement>) => {
    const info_copy = props.currentRepInfo.slice()
    const listIndex = info_copy.findIndex(indexOf => repID === indexOf.id)
    info_copy[listIndex]["data"][indexOfPara] = event.target.value
    props.setCurrentRepInfo(info_copy)
  })

  const info_list =  props.diaryInfo.info_on_location.map((item:representation) => {
    // console.log(item)
      return (
      <div key={`journalRep${item.id}`}>
          <input value={item.visibleName}
          onChange={titleOnChange(item)}
          id={`journalRepTitle${item.id}`}
          style={{
              background: "transparent",
              border: "none"
          }}/>
          <DataListofItem entries={item.data} repID={item.id} CatagoryOnChange={CatagoryOnChange}/>
          <div>
              <button onClick={newTextBoxAdded(item)} >New Entry</button>
          </div>
          <DairyLink link={item.link} goToNestedLink={props.goToNestedLink(item.id, props.currentPageID)} 
          addLink={props.addLink(item.id)} repID={item.id} currentPageID={props.currentPageID}/>
      </div>
      )
  })

  return (<div  style={{
              position: "absolute",
              left: `${props.diaryInfo.x}px`,
              top: `${props.diaryInfo.y}px`,
              backgroundColor: 'violet'
            }}>{info_list}</div>
    )
  }
  
  function DataListofItem(props:{
    entries:Array<string>, repID:string, 
    CatagoryOnChange: (repID:string, indexOfPara:number)=>(event:React.ChangeEvent<HTMLTextAreaElement>) => void
  }){
    return <>
    {props.entries.map((entry,index:number) => {
        return <div key={`rep${props.repID}_div${index}`}>
          <textarea cols={35} rows={5} value = {entry}
          onChange={props.CatagoryOnChange(props.repID,index)}/>
        </div>
      })}
    </>
  
  }

  function DairyLink(props:{link:boolean,goToNestedLink:()=>void, addLink:()=>void, repID:string, currentPageID:string}) {
    
    if (props.link) {
      return (<div>
          <button id={`link_btn_${props.repID}`} onClick={props.goToNestedLink} >Jump In</button>
      </div>)
    }
    else if (props.currentPageID === "index") {
      return (<div>
                <button id={`link_btn_${props.repID}`} onClick={props.addLink} >Add Link</button>
            </div>)
    }
    return <></>
  }

