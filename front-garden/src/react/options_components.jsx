import React from 'react';
import {Radio, Collapse} from "@nextui-org/react"


export function FooterDrop(props){

    return(<React.Fragment>
        <div style={{ backgroundColor: "#F8F8F8",
                        borderTop: "1px solid #E7E7E7",
                        textAlign: "center",
                        padding: "20px",
                        position: "fixed",
                        left: "0",
                        bottom: "0",
                        width: "100%",}}>
        <Collapse.Group divider={false}>              
        <Collapse expanded title={"Show/Hide Options"} contentLeft={
            <ModeSelect mode={props.mode} onChange={props.setMode} />
                }>
                <OptionsDrop length={props.length} width={props.width} size_adjustment={props.size_adjustment}
                    clear_button={props.clear_button} user={props.user} changed_user={props.setUser}
                    load={props.load} save={props.save} plant_options={props.plant_options}/>
        </Collapse></Collapse.Group>      
    </div>
    <div style={ {
        display: 'block',
        padding: '20px',
        width: '100%',
    }} />
    </React.Fragment>
    )
}

function ModeSelect(props){
    return(
        <Radio.Group label="" orientation="horizontal" 
        value={props.mode} onChange={props.onChange}>
            <Radio value="place" color="success" labelColor="success">
                Place new items
            </Radio>
            <Radio value="select" color="secondary" labelColor="secondary">
                Select an item
            </Radio>
            <Radio value="set-up" color="warning" labelColor="warning" isDisabled>
                Put Soil
            </Radio>
        </Radio.Group>
    )
}

function OptionsDrop(props){

    return(<React.Fragment>
        <PlantDropdown plant_options={props.plant_options} />
            <div>
                <label >Length: </label>
                <input name="length" value={props.length} type="number" 
                onChange={props.size_adjustment("length")}/>
                <label>Width: </label>
                <input name="width" value={props.width} type="number" 
                onChange={props.size_adjustment("width")}/>
                <button onClick={props.clear_button()}>Clear Plot</button>
            </div>
            <div>
                <label >This garden/plot belongs to ~ </label>
                <input name="owner" value={props.user} 
                    onChange={props.changed_user()}/> 
                
                <div>
                    <button onClick={props.load()}>Load</button>
                    <button onClick={props.save()}>Save</button>
                </div>
            </div>
        </React.Fragment>
    ) 
}  



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


// lagacy that ould give a list of plants based on old db structure 
// function PlantedList(props){
//   const plantList = props.plant_list.map((plant) => 
//       <div> You got {plant.amount} {plant.name} planted in the garden </div>
//     )
//   return <div>{plantList}</div>
// }

