import {Card,Button, Textarea} from "@nextui-org/react"



export function Diary(props){

  const newTextBoxAdded = (item)=> (event)=>{
    //const img = extract_img(item)

    const info_copy = props.currentRepInfo.slice()
    const index = info_copy.findIndex(indexOf => item.id === indexOf.id)
    info_copy[index]["data"].push({"text":"write here"})

    props.setCurrentRepInfo(info_copy)
  }  

  // const newLinkAdded = (item) => (event)=>{
  //   const info_copy = props.currentRepInfo.slice()
  //   const index = info_copy.findIndex(indexOf => item.id === indexOf.id)
  //   info_copy[index]["link"] = {} 

  //   props.setCurrentRepInfo(info_copy)
  // }

  const titleOnChange = (item)=>((event) => {
    const info_copy = props.currentRepInfo.slice()
    const index = info_copy.findIndex(indexOf => item.id === indexOf.id)
    info_copy[index]["visibleName"] = event.target.value
    props.setCurrentRepInfo(info_copy)
  })

  const CatagoryOnChange = (repID, indexOfPara)=>((event) => {
    const info_copy = props.currentRepInfo.slice()
    const index = info_copy.findIndex(indexOf => repID === indexOf.id)
    info_copy[index]["data"][indexOfPara] = {"text":event.target.value}
    props.setCurrentRepInfo(info_copy)
  })



  const info_list =  props.diaryInfo.info_on_location.map((item) => {
      return <div key={`journalRep${item.id}`}>
          <input type="text" value={item.visibleName}
          onChange={titleOnChange(item)}
          id={`journalRepTitle${item.id}`}
          style={{
              background: "transparent",
              border: "none"
          }}></input>
          <DataListofItem entries={item.data} repID={item.id} CatagoryOnChange={CatagoryOnChange}/>
          <div>
              <Button onPress={newTextBoxAdded(item)} bordered >New Entry</Button>
          </div>
          {/* <DairyLink link={item.link}  onAdd={newLinkAdded(item)} /> */}

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
      return <div key={`rep${props.repID}_div${index}`}>
        <Textarea underlined aria-labelledby={`rep${props.repID}_data${index}`}
        value={entry.text} onChange={props.CatagoryOnChange(props.repID,index)} />
      </div>
    })
  
  }

  function DairyLink(props){

    // console.log(props.link)

    return (<div>
              <Button onPress={props.onAdd} bordered >Add Link</Button>
          </div>)
  }



  const extract_img= (item) =>{
    const img_insert = document.getElementById(`img_insert_${item.id}`)
    const img_file  = img_insert.files[0]

    if (typeof img_file === 'undefined') return {src:""}

    const img = new Image()
    img.src = URL.createObjectURL(img_file);
    return img
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