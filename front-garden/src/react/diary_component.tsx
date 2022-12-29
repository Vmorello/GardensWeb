
export function Diary(props){

  const newTextBoxAdded = (item)=> (event)=>{
    //const img = extract_img(item)

    const info_copy = props.currentRepInfo.slice()
    const listIndex = info_copy.findIndex(indexOf => item.id === indexOf.id)
    info_copy[listIndex]["data"].push({"text":"write here"})

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
    const listIndex = info_copy.findIndex(indexOf => item.id === indexOf.id)
    info_copy[listIndex]["visibleName"] = event.target.value
    props.setCurrentRepInfo(info_copy)
  })

  const CatagoryOnChange = (repID, indexOfPara)=>((event) => {
    const info_copy = props.currentRepInfo.slice()
    const listIndex = info_copy.findIndex(indexOf => repID === indexOf.id)
    info_copy[listIndex]["data"][indexOfPara] = {"text":event.target.value}
    props.setCurrentRepInfo(info_copy)
  })



  const info_list =  props.diaryInfo.info_on_location.map((item) => {
      return <div key={`journalRep${item.id}`}>
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
          <DairyLink link={item.link} goToNestedLink={props.goToNestedLink(item.id, props.currentPageID)} addLink={props.addLink(item.id)} />
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
    ////aria-labelledby={`rep${props.repID}_data${index}`} value={entry.text}
    return props.entries.map((entry,index) => {
      return <div key={`rep${props.repID}_div${index}`}>
        <textarea cols={35} rows={5} value = {entry.text}
        onChange={props.CatagoryOnChange(props.repID,index)}/>
      </div>
    })
  
  }

  function DairyLink(props){

    // console.log(props.link)
    if (props.link) {
      return (<div>
          <button onClick={props.goToNestedLink} >Jump In</button>
      </div>)
    }
    return (<div>
              <button onClick={props.addLink} >Add Link</button>
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