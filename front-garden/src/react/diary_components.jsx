export function Diary(props){



  const info_list =  props.diaryInfo.info_on_location.map((item) => {
    

      return <div id={`journalRep${item.id}`}>
          <input type="text" value={item.visibleName}
          onChange={props.titleChange(item)}
          style={{
              background: "transparent",
              border: "none"
          }}></input>
          <DataListofItem entries={item.data} repID={item.id}/>
          <div>
              <input type="text" id={`label_insert_${item.id}`} placeholder="What's up"></input>
              <button onClick={props.entered(item)}>Submit Info</button>
          </div>
          <div>
          <input type="file"  id={`img_insert_${item.id}`} accept="image/*"></input>
          </div>
      </div>
  })

  return (<div style={{
              position: "absolute",
              left: `${props.diaryInfo.x}px`,
              top: `${props.diaryInfo.y}px`,
              backgroundColor: 'violet'
            }}>{info_list}</div>
    )
  }
  
  
  function DataListofItem(props, index){
    return props.entries.map((entry) => {
      return <div id={`rep${props.repID}_dataFrag${index}`}> {entry.text} {entry.date} 
        <DiaryImage src = {entry.img.src}/>
      </div>
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