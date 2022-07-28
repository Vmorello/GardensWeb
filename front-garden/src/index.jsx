import React from 'react';
import ReactDOM from 'react-dom/client';

import {CanvasControl} from './js/canvas_utils';
import {default_plant_list} from './js/plant_image_lookup';


class GotPlant extends React.Component {
  constructor(props) {
      super(props)

      this.state = {
          mode:"place",
          user: props.user,
          all_plant_info: [],
          length: props.length,
          width: props.width,
          diary_x: props.width + 40, 
          diary_y: 200
          //db_connected: false
      }
      this.plant_options= default_plant_list
      this.canvas_ref = React.createRef()
      this.number_plants = 0
      this.ip_addr = "0.0.0.0:9110" 
  }


  // This function happen once the component is mounted the first time
  componentDidMount() {
      const canvas = this.canvas_ref.current
      this.canvas_util = new CanvasControl(canvas)

      fetch(`http://${this.ip_addr}/v0/health`)
          .then(() => {
              console.log("got a response from the database")
            //   this.setState({
            //       db_connected: true
            //   })
          })
          .catch((error) => {
              console.log("did not connect to db")
          });
  }

  componentDidUpdate() {}

  componentWillUnmount() {
      //this will activate if the component is removed 
  }

  render() {
    return(
      <div>
        <div >
          <PlantDropdown plant_options={this.plant_options} />
          <div>
            <label >Length: </label>
            <input name="length" value={this.state.length} type="number" 
              onChange={this.size_adjustment("length")}/>
            <label>Width: </label>
            <input name="width" value={this.state.width} type="number" 
              onChange={this.size_adjustment("width")}/>
            <button onClick={this.clear_button()}>Clear Plot</button>
          </div>
          <div>
            <label >This garden/plot belongs to ~ </label>
            <input name="owner" value={this.state.user} 
                onChange={this.set_state_onchange("user")}/> 
            <button onClick={this.load()}>Load</button>
          </div>
          <ModeDropdown current_mode={this.state.mode} onChange={this.set_state_onchange("mode")}/>
        </div>
        <canvas ref={this.canvas_ref} style={{border:"3px dotted #000000"}}
          width={this.state.width} height={this.state.length}
          onClick={this.canvas_onclick_switch()} />
        <div><button onClick={this.save_plot()}>Save</button></div>
        <PlantedList plant_list={this.state.all_plant_info}/>
        <div style={{
            position: "absolute",
            left: `${this.state.diary_x}px`,
            top: `${this.state.diary_y}px`,
            backgroundColor: 'yellowgreen'
          }}>TEST BOOK</div>
      </div>
    )
  }
  //this.added_plant()
  // -------- Event Functions & Util -------------// 

  clear_button() {
    return ((event) => {
        this.set_plants_empty()
    })
  }

  size_adjustment(side) {
      return ((event) => {
          this.setState({
              [side]: event.target.value,
          })
          this.set_plants_empty()
      })
  }

  set_state_onchange(state) {
    return ((event) => {
        this.setState({
            [state]: event.target.value
        })
    })
  }

  set_plants_empty() {
      this.canvas_util.clear()
      this.number_plants = 0
      this.setState({
          all_plant_info: []
      })
  }

  /**
   * returns a function for react that sends a return to save:
   * @json {"plant_list": this.state.all_plant_info, "owner":this.state.user,
   *          "width": this.state.width, "length":this.state.length}
   */
  save_plot() {

      return (() => {
          fetch(`http://${this.ip_addr}/v0/save_plot`, {
                  method: "POST",
                  headers: {
                      'Content-Type': 'application/json' //needs to match the body 
                  },
                  body: JSON.stringify({
                      "plant_list": this.state.all_plant_info,
                      "owner": this.state.user,
                      "width": this.state.width,
                      "length": this.state.length
                  }),
              })
              .then(() => {
                      alert(`Request to save under ${this.state.user} sent`)
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
   * @json {"plant_list": this.state.all_plant_info, "owner":this.state.user,
   *          "width": this.state.width, "length":this.state.length}
   */
  load() {
      return ((event) => {
          this.set_plants_empty()
          fetch(`http://${this.ip_addr}/v0/load?user=${this.state.user}`)
              .then(response => {
                      return response.json()
                  },
                  error => {
                      alert("Could not reach DB")
                  })
              .then(response => {
                  if (response["canvas_list"].length === 0){
                    alert("Load is empty")
                  }
                  this.canvas_util.visual_load(response["canvas_list"])
                  this.setState({
                      all_plant_info: response["db_entry"]["plants"],
                      length: response["db_entry"]["grow_location"]["length"],
                      width: response["db_entry"]["grow_location"]["width"],
                  })
              });
      })
  }

  canvas_onclick_switch(){
    if (this.state.mode === "place"){
        return this.added_plant()
    } else if (this.state.mode === "select"){
        return this.select_plant()
    }
  } 

  added_plant() {
      return ((event) => {
            const plant_selected = document.getElementById("plant_selection")

            this.canvas_util.visual_draw(plant_selected, event.pageX, event.pageY)

            this.add_plant_info(plant_selected, event.pageX, event.pageY)
            
        })
  }

  select_plant() {
    return ((event) => {
        
        this.setState({
                diary_x:event.pageX, 
                diary_y:event.pageY
            })
        })
  }

  add_plant_info(plant_selected, x, y){
    const plant_info_slice = this.state.all_plant_info.slice()

    const seach = (element) => element["name"] === plant_selected.value
    const index = plant_info_slice.findIndex(seach)

    if (index === -1) { //doesnt exist yet
        plant_info_slice.push({
            "name": plant_selected.value,
            "amount": 1,
            "locations": [{
                "order": this.number_plants,
                "x": x,
                "y": y
            }]
        })
    } else {
        plant_info_slice[index]["amount"] += 1
        plant_info_slice[index]["locations"].push({
            "order": this.number_plants,
            "x": x,
            "y": y
        })
    }
    this.number_plants++

    this.setState({
        all_plant_info: plant_info_slice
    })
  }

  
}

// ----------- State-less React Components ------------- // 

function PlantedList(props){
  const plantList = props.plant_list.map((plant) => 
      <div> You got {plant.amount} {plant.name} planted in the garden </div>
    )
  return <div>{plantList}</div>
}

function PlantDropdown(props){  
      const listItems = props.plant_options.map((plant) => 
            <option value={plant.name}>{plant.name}</option>
          )
      return(
        <div>
          <label for="plant_dropdown">You Got ~ </label>
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

  //ReactDOM.render(<GotPlant user={"Victorio_Natalie"} />, 
  //                  document.getElementById("root"));
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<GotPlant user={"Victorio_Natalie"} length={550} width={1200}/>);
  