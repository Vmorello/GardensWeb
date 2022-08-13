export function Diary(props){
    const plant_list =  props.diaryInfo.plant_on_location.map((plant) => {
        return <div>
            <b onClick={()=>{console.log(plant.name)}}> {plant.name} </b>
            <DataListPlant plantData={plant.data} />
            <div>
                <input type="text" id={`label_insert_${plant.id}`} placeholder="What's up"></input>
                <input type="date" id={`date_insert_${plant.id}`} ></input>
                <button onClick={props.dateClick(plant)}>Submit a date</button>
            </div>
            <div>
            <input type="file"  id={`img_insert_${plant.id}`} accept="image/*"></input>
            </div>
        </div>
    })
  
    return (<div style={{
              position: "absolute",
              left: `${props.diaryInfo.x}px`,
              top: `${props.diaryInfo.y}px`,
              backgroundColor: 'violet'
            }}>{plant_list}</div>
    )
  }
  
  
  function DataListPlant(props){
    return props.plantData.map((data) => {
      return <div> {data.label} {data.date} 
        <DiaryImage src = {data.img.src}/>
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