import React from 'react';
import ReactDOM from 'react-dom';

import {set_up_canvas} from './js/sample_scene';



class GotPlant extends React.Component {
  constructor(props){
    super(props)

    this.state= {
      user: "Victorio_Natalie",
      plant_list: null,
    }

    this.canvas_ref = React.createRef()

  }

  componentDidMount() {
    const canvas = this.canvas_ref.current
    // const ctx = canvas.getContext("2d")
    set_up_canvas(canvas)

    const ip_addr = "0.0.0.0:9110"

    const user = this.state.user
    fetch(`http://${ip_addr}/v0/get_list?user=${user}`)
      .then(response => {
        return response.json()
        })
      .then(json =>{
        this.setState({
          user: user,
          plant_list: json,
        })
      });
  }


  render() {
    return(
      <div>
          <PlantDropdown plant_list={this.state.plant_list} ></PlantDropdown>
      <canvas ref={this.canvas_ref}></canvas>
      </div>
    )
  }
}


class PlantDropdown extends React.Component {  
  render(){

    if (this.props.plant_list) {      
      const listItems = this.props.plant_list.map((plant) =>
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
        <div>Connecting to MongoDB...</div>
      )}
  }
}
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<GotPlant />);
  