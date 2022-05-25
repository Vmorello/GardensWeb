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
    const ctx = canvas.getContext("2d")
    set_up_canvas(canvas, ctx)

    const ip_addr = "192.168.0.64:54545"

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


// class Square extends React.Component {

//     render() {
//       return (
//         <button 
//           className="square" 
//           onClick={()=> this.props.onClick()}
//         >
//           {this.props.value}
//         </button>
//       );
//     }
//   }




// function Square(props) {
//   return (
//     <button 
//         className="square" 
//         onClick={ props.onClick}
//       >
//         {props.value}
//       </button>
//   )
// }



// class Board extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       squares: Array(9).fill(null)
//     };
//   }

//   handleClick(i){
//     const squares = this.state.squares.slice();
//     squares[i] = "X"
//     this.setState({squares:squares})
//   }

//   renderSquare(i) {
//     return (
//             <Square 
//               value={this.state.squares[i]} 
//               onClick={()=> this.handleClick(i)}
//             />
//     );
//   }

//   render() {
//     const status = 'Next player: X';

//     return (
//       <div>
//         <div className="status">{status}</div>
//         <div className="board-row">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(6)}
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//         </div>
//       </div>
//     );
//   }
// }

// class Game extends React.Component {
//   render() {
//     return (
//       <div className="game">
//         <div className="game-board">
//           <Board />
//         </div>
//         <div className="game-info">
//           <div>{/* status */}</div>
//           <ol>{/* TODO */}</ol>
//         </div>
//       </div>
//     );
//   }
// }



  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<GotPlant />);
  