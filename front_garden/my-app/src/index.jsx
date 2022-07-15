import React from 'react';
import ReactDOM from 'react-dom/client';

import {CanvasUtil} from './js/canvas_utils';
import {default_plant_list} from './js/plant_image_lookup';


class GotPlant extends React.Component {
  constructor(props){
    super(props)

    this.state= {
      user: props.user,
      plant_options: default_plant_list,
      plants_inserted:[],
      length: props.length,
      width: props.width,
      db_connected: false
    }

    this.canvas_ref = React.createRef()
    this.number_plants = 0
    this.ip_addr = "0.0.0.0:9110"

  }

  // This function happen once the component is mounted the first time
  componentDidMount() {
    const canvas = this.canvas_ref.current
    this.canvas_util = new CanvasUtil(canvas)
    this.canvas_util.set_up_canvas_clicks(this.added_plant)

    fetch(`http://${this.ip_addr}/v0/health`)
      .then(() => {
        console.log("got a response from the database")
        this.setState({db_connected: true}) 
      })
      .catch((error) => {
        console.log("did not connect to db")
      });
  }


  componentWillUnmount() {
    //this will activate if the component is removed 
  }


  render() {
    return(
      <div>
        <div >
          <PlantDropdown plant_options={this.state.plant_options} />
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
                onChange={this.set_user()}/> 
            <button onClick={this.load()}>Load</button>
          </div>
        </div>

        <canvas ref={this.canvas_ref} style={{border:"3px dotted #000000"}}
          width={this.state.width} height={this.state.length}
          onClick={this.added_plant()} />
        <PlantedList plant_list={this.state.plants_inserted}/>
        <button onClick={this.save_plot()}>Save</button>
      </div>
    )
  }

  clear_button(){
    return ((event)=> {
      this.canvas_util.clear()
      this.set_plants_empty()
    })
  }

  size_adjustment(side){
    return ((event)=> {
      this.setState({[side]:event.target.value})
      this.set_plants_empty()
      console.log(`${side}} changed to ${event.target.value}`)
    })
  }

  set_plants_empty(){
    this.number_plants = 0
    this.setState({plants_inserted:[]})
  }

  save_plot(){
    return (()=>{
        fetch(`http://${this.ip_addr}/v0/save_plot`,{
          method:"POST",
          headers: {
            'Content-Type': 'application/json' //needs to match the body 
          },
          body: JSON.stringify({
            "plant_list": this.state.plants_inserted, "owner":this.state.user,
            "width": this.state.width, "length":this.state.length
          }),
        })
        .then((response)=>{return response})
        .then(()=>{console.log("request to save sent")},
          (error)=>{console.log("request to save failed")})
    })
  }

  load(){
    return ((event)=>{

      fetch(`http://${this.ip_addr}/v0/load?user=${this.state.user}`)
      .then(response => {
        return response.json()
        },
        error => {
          console.log("Could not connect to DB")
        })
      .then(response =>{
        this.canvas_util.load(response["canvas_list"])
        this.setState({
          plants_inserted: response["db_entry"]["plants"],
          length: response["db_entry"]["grow_location"]["length"],
          width: response["db_entry"]["grow_location"]["width"],
        })
      });
    })
  }

  set_user(){
    return ((event)=> {
      this.setState({user:event.target.value})
    })
  }

  added_plant(){
    return ((event)=> {
      const plant_selected = document.getElementById("plant_selection")
      const planted_list = this.state.plants_inserted.slice();

      const seach = (element) => element["name"] === plant_selected.value
      const index = planted_list.findIndex(seach)

      if(index === -1){//doesnt exist yet
        planted_list.push({"name":plant_selected.value, "amount":1,
        "locations":[{"order":this.number_plants,"x":event.clientX, "y":event.clientY}]})
      }
      else{
        planted_list[index]["amount"] += 1
        planted_list[index]["locations"].push({"order":this.number_plants,"x":event.clientX, "y":event.clientY})
      }
      this.number_plants++
      // const new_amount = planted_list[plant_selected.value] + 1 || 1
      
      this.setState({plants_inserted: planted_list}) 
    })
  }

 
}

function PlantedList(props){
  //console.log(`checking the bottom list: ${props.plant_list}`)
  const plantList = props.plant_list.map((plant) => 
      <div> You got {plant.amount} {plant.name} planted in the garden </div>
    );
  
  return <div>{plantList}</div>
}

function PlantDropdown(props){ //class PlantDropdown extends React.Component { 
  //render(){
    if (props.plant_options) {   
      const listItems = props.plant_options.map((plant) => 
            <option value={plant.image}>{plant.name}</option>
          );
      return(
        <div>
          <label for="plant_dropdown">You Got ~ </label>
          <select id="plant_selection" name="plant_dropdown">
            {listItems}
          </select>
        </div>
      )} 
    else {
      return(
        <div>MongoDB has not been started</div>
      )}
  //}
}

// ========================================

  //ReactDOM.render(<GotPlant user={"Victorio_Natalie"} />, 
  //                  document.getElementById("root"));
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<GotPlant user={"Victorio_Natalie"} length={550} width={1200}/>);
  