import React, { useState, useEffect } from 'react';

import {CanvasControl} from '../src/js/canvas_utils';
import {default_plant_list} from '../src/js/plant_image_lookup';
import {Diary} from '../src/react/diary_components'

const ip_addr = "0.0.0.0:9110" 

export default function GotPlant(props) {

  const [mode,setMode] = useState("place");
  const [user,setUser] = useState(props.user);
  const [allPlantInfo,setAllPlantInfo] = useState([]);
  const [length,setLength] = useState(props.length);
  const [width,setWidth] = useState(props.width);
  const [diary,setDiary] = useState({
    x: props.width + 40,
    y: 200,
    plant_on_location: [],
  });
  let numberPlants= 0;

  const canvas_ref = React.createRef()
  const [canvas,setCanvas] = useState({
    ref: canvas_ref,
    util: undefined
  });


  // This function happen once the component is mounted the first time
  useEffect(()=>{
    const canvas_current = canvas_ref.current
    const canvas_util = new CanvasControl(canvas_current)
    setCanvas({
      ref: canvas_ref,
      util: canvas_util
    })
  },[]) //notice the empty array here

  // -------- Event Functions & Util -------------// 

  const clear_button = () => {
    return ((event) => {
        set_plants_empty()
    })
  }

  const size_adjustment = (side)=> {
      return ((event) => {
        if (side === "length") {
          setLength(event.target.value)
        } else if (side === "width"){
          setWidth(event.target.value)
        } 
        set_plants_empty() 
      })
  }
   
  const changed_mode = () => {
    return ((event) => {
      setMode(event.target.value);
      console.log(mode)
    })
  }

  const changed_user = () => {
    return ((event) => {
      setUser(event.target.value);
    })
  }

  const set_plants_empty = () => {
      canvas.util.clear()
      numberPlants =0 
      setAllPlantInfo([])
  }


  const canvas_onclick_switch = () =>{
    if (mode === "place"){
        return added_plant()
    } else if (mode === "select"){
        return select_plant()
    }
  } 

  const added_plant = () => {
      return ((event) => {
            const plant_selected = document.getElementById("plant_selection")

            canvas.util.visual_draw(plant_selected, event.pageX, event.pageY)

            add_plant_info(plant_selected, event.pageX, event.pageY)

        })
  }

  
  const select_plant = () => {
    return ((event) => {

      // console.log("selecting plants")

      const x = event.pageX
      const y = event.pageY
      
      const in_click_range = (plant) => {return plant["x"]+ 64 > x && 
            plant["x"]- 64 < x && plant["y"]+ 64 > y && plant["y"]- 64 < y}

      const plants_onlocation = allPlantInfo.filter(in_click_range)
      setDiary({
            x:x, 
            y:y,
            plant_on_location: plants_onlocation
          })
      // console.log(diary)
      })  
  }

  const add_plant_info = (plant_selected, x, y) =>{
    const plant_info_copy = allPlantInfo.slice()
    

    plant_info_copy.push({
        "name": plant_selected.value,
        "x": x,
        "y": y,
        "data": [],
        "id":numberPlants
    })

    //console.log(plant_info_copy)
    numberPlants++
    setAllPlantInfo(plant_info_copy)
  }

  //================ Diary functions ============

  const date_added = () =>{ return (plant)=> (event)=>{
        const label = document.getElementById(`label_insert_${plant.id}`).value 
        const date  = document.getElementById(`date_insert_${plant.id}`).value 
        
        const img = extract_img(plant)

        const plant_info_copy = allPlantInfo.slice()

        plant_info_copy[plant["id"]]["data"].push({"label":label,"date":date,"img":img})

        setAllPlantInfo(plant_info_copy)
    }  
  } 

  const extract_img= (plant) =>{
    const img_insert = document.getElementById(`img_insert_${plant.id}`)
    const img_file  = img_insert.files[0]

    if (typeof img_file === 'undefined') return {src:""}

    const img = new Image()
    img.src = URL.createObjectURL(img_file);
    return img
  }

  //=============== Saving & Loading ===============
  /**
   * returns a function for react that sends a return to save:
   * @json {"plant_list": this.state.allPlantInfo, "owner":this.state.user,
   *          "width": this.state.width, "length":this.state.length}
   */
  const save_plot = () =>{

    return ((event) => {
        fetch(`http://${ip_addr}/v0/save_plot`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json' //needs to match the body 
                },
                body: JSON.stringify({
                    "plant_list": allPlantInfo,
                    "owner": user,
                    "width": width,
                    "length": length
                }),
            })
            .then(() => {
                    alert(`Request to save under ${user} sent`)
                    console.log("request to save sent")
                },
                (error) => {
                    alert("Could not reach DB")
                    console.log("request to save failed")
                })
    })
}

/**
 * returns a function for react that loads a db_entry & a sorted list for canvas:
 * @json {"plant_list": this.state.allPlantInfo, "owner":this.state.user,
 *          "width": this.state.width, "length":this.state.length}
 */
const load = () =>{
    return ((event) => {
        set_plants_empty()
        fetch(`http://${ip_addr}/v0/load?user=${user}`)
            .then(response => {
                    return response.json()
                },
                error => {
                    alert("Could not reach DB")
                })
            .then(response => {
                if (response["plants"].length === 0){
                  alert("Load is empty")
                }
                canvas.util.visual_load(response["plants"])
                setAllPlantInfo(response["plants"])
                setLength(response["grow_location"]["length"])
                setWidth(response["grow_location"]["width"])
            });
    })
}


return(
      
  <div>
    <div >
      <PlantDropdown plant_options={default_plant_list} />
      <div>
        <label >Length: </label>
        <input name="length" value={length} type="number" 
          onChange={size_adjustment("length")}/>
        <label>Width: </label>
        <input name="width" value={width} type="number" 
          onChange={size_adjustment("width")}/>
        <button onClick={clear_button()}>Clear Plot</button>
      </div>
      <div>
        <label >This garden/plot belongs to ~ </label>
        <input name="owner" value={user} 
            onChange={changed_user()}/> 
        <button onClick={load()}>Load</button>
        <div><button onClick={save_plot()}>Save</button></div>
      </div>
    </div>
  <canvas ref={canvas.ref} style={{border:"3px dotted #000000"}}
    width={width} height={length}
    onClick={canvas_onclick_switch()} />
  {/* <PlantedList plant_list={allPlantInfo}/> */}
  <ModeDropdown current_mode={mode} onChange={changed_mode()}/>
  <Diary diaryInfo={diary} dateClick={date_added()} />
</div>

)

}

// ----------- State-less React Components ------------- // 

// function PlantedList(props){
//   const plantList = props.plant_list.map((plant) => 
//       <div> You got {plant.amount} {plant.name} planted in the garden </div>
//     )
//   return <div>{plantList}</div>
// }

function PlantDropdown(props){  
      const listItems = props.plant_options.map((plant) => 
            <option value={plant.name}>{plant.name}</option>
          )
      return(
        <div>
          <label htmlFor="plant_dropdown">You Got ~ </label>
          <select id="plant_selection" name="plant_dropdown">
            {listItems}
          </select>
        </div>
      )
}

function ModeDropdown(props){
    return(
        <select id="mode_select" value={props.current_mode} onChange={props.onChange}>
            <option value="place">Place new items</option>
            <option value="select">Select an item</option>
          </select>
    )
}

// ========================================
  // ReactDOM.render(<NextUIProvider>
  //                   <GotPlant user={"Vito"} length={550} width={1200} />
  //                 </NextUIProvider>, 
  //       document.getElementById("root"));
  // const root = ReactDOM.createRoot(document.getElementById("root"));
  // root.render(
  //   <GotPlant user={"Vito"} length={550} width={1200}/>
  // );
  

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