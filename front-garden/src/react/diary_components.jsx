import {Card, Textarea} from "@nextui-org/react"



export function Diary(props){

  const info_list =  props.diaryInfo.info_on_location.map((item) => {
    

      return <div id={`journalRep${item.id}`}>

          <input type="text" value={item.visibleName}
          onChange={props.titleOnChange(item)}
          style={{
              background: "transparent",
              border: "none"
          }}></input>
          <DataListofItem entries={item.data} repID={item.id} CatagoryOnChange={props.CatagoryOnChange}/>
          <div>
              {/* <input type="text" id={`labeledTextBox_insert_${item.id}`} placeholder="New Catagory"></input> */}
              <button onClick={props.entered(item)}>New TextBox</button>
          </div>
          {/* <div>
          <input type="file"  id={`img_insert_${item.id}`} accept="image/*"></input>
          </div> */}
      </div>
  })

  return (<div  style={{
              position: "absolute",
              left: `${props.diaryInfo.x}px`,
              top: `${props.diaryInfo.y}px`,
              backgroundColor: 'violet'
            }}>{info_list}</div>
    )
  }
  
  
  function DataListofItem(props){
    return props.entries.map((entry,index) => {
      return <div>
        <Textarea underlined id={`rep${props.repID}_dataFrag${index}`} 
        label={entry.label} value={entry.text} onChange={props.CatagoryOnChange(props.repID,index)} />
      </div>
      {/* <DiaryImage src = {entry.img.src}/> */}
    })
  
  }

  function DiaryImage(props){
    if (props.src === "") return (<span/>)
    
    return(
      <img src={props.src} alt="lost in translation" style={{
              display: "block",
              height: "150px",
              width: "150px"
            }}/> 
    )
  }