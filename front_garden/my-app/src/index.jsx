import React from 'react';
import ReactDOM from 'react-dom/client';

import {CanvasUtil} from './js/canvas_utils';



class GotPlant extends React.Component {
  constructor(props){
    super(props)

    this.state= {
      user: props.user,
      plant_options: null,
      plants_inserted:[],
      length: props.length,
      width: props.width
    }

    this.canvas_ref = React.createRef()

  }

  // This function happen once the component is mounted the first time
  componentDidMount() {
    const canvas = this.canvas_ref.current
    // const ctx = canvas.getContext("2d")
    const canvas_util = new CanvasUtil(canvas)
    canvas_util.set_up_canvas()


    const ip_addr = "0.0.0.0:9110"

    const user = this.state.user
    fetch(`http://${ip_addr}/v0/get_list?user=${user}`)
      .then(response => {
        return response.json()
        },
        error => {
          console.log("Could not connect to DB")
        })
      .then(json =>{
        this.setState({
          user: user,
          plant_options: json,
        })
      });
  }

  componentWillUnmount() {
    //this will activate if the component is removed 
  }


  render() {
    return(
      <div>
        <div  >
          <PlantDropdown plant_options={this.state.plant_options} />
          <label >Length: </label>
          <input name="length" value={this.state.length} type="number" 
            onChange={this.size_adjustment("length")}/>
            <label>Width: </label>
          <input name="width" value={this.state.width} type="number" 
            onChange={this.size_adjustment("width")}/>
        </div>
        <canvas ref={this.canvas_ref} width={this.state.width} 
          height={this.state.length} style={{border:"3px dotted #000000"}} />
      </div>
    )
  }

  size_adjustment(side){
    return ((event)=> {
      this.setState({[side]:event.target.value})
      console.log(`${side}} changed to ${event.target.value}`)
    })
  }

  added_plant(){
    return ((event)=> {
      const plant_list = this.state.plants_inserted

      // this.setState()
    })

  }

}

function PlantedList(props){
  return 
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
          <select id="plant_options" name="plant_dropdown">
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
  root.render(<GotPlant user={"Victorio_Natalie"} length={600} width={1200}/>);
  