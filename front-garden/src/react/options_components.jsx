import React from 'react';
import {Radio, Collapse, Dropdown} from "@nextui-org/react"

import {default_plant_list} from '../js/plant_image_lookup';


export function FooterDrop(props){

    return(<>
        <div style={{ backgroundColor: "#F8F8F8",
                        borderTop: "1px solid #E7E7E7",
                        textAlign: "center",
                        // padding: "20px",
                        position: "fixed",
                        left: "0",

                        bottom: "0",
                        width: "100%",}}>
        <Collapse.Group divider={false}>              
        <Collapse title="Open/Close" expanded={true} contentLeft={
            <ModeSelect mode={props.mode} onChange={props.setMode} />
                }>
                <OptionsDrop {...props} />
        </Collapse></Collapse.Group>      
    </div>
    {/* phantom footer for rest of UI */}
    <div style={ {
        display: 'block',
        padding: '20px',
        width: '100%',
        height: '110px '
    }} />
    </>
    )
}

function ModeSelect(props){
    return(
        <Radio.Group label="" orientation="horizontal" 
        value={props.mode} onChange={props.onChange}>
            <Radio value="setup" color="warning" labelColor="warning">
                Set-up Plot
            </Radio>
            <Radio value="place" color="success" labelColor="success">
                Place Plants
            </Radio>
            <Radio value="select" color="secondary" labelColor="secondary">
                Select Plants
            </Radio>
        </Radio.Group>
    )
}

function OptionsDrop(props){

    return(<>
        <PlantDropdown currentPlant={props.currentPlant} setCurrentPlant={props.setCurrentPlant}  />
        <SetupOptions {...props}/>
        </>
    ) 
}  

function SetupOptions(props){
    return(
        <>
        <div>
            <div>
                <label>Length:  </label>
                <input name="length" value={props.length} type="number" 
                    onChange={props.size_adjustment("length")}/>
            </div>
            <div>
                <label>Width:  </label>
                <input name="width" value={props.width} type="number" 
                    onChange={props.size_adjustment("width")}/>
            </div>
            <button onClick={props.clear_button()}>Clear Plot</button>
        </div>
        <div>
            <label >This garden/plot belongs to ~ </label>
            <input name="owner" value={props.user} 
                onChange={props.setUser()}/> 
            
            <div>
                <button onClick={props.load()}>Load</button>
                <button onClick={props.save()}>Save</button>
            </div>
        </div>
        </>
    )
} 


function PlantDropdown(props){  
    
    const setCurrentPlantName = (event) => {
        props.setCurrentPlant(event.values().next().value)
    }

    const listItems = default_plant_list.map((plant) => 
            <Dropdown.Item key={plant.image}>{plant.name}</Dropdown.Item>
        )
    return(
        <Dropdown>
            <Dropdown.Button flat color="success" css={{ tt: "capitalize" }}>
                {props.currentPlant}
            </Dropdown.Button>
            <Dropdown.Menu
                aria-label="Single selection actions"
                color="secondary"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={props.currentPlant}
                onSelectionChange={setCurrentPlantName}
            >
                {listItems}
            </Dropdown.Menu>
        </Dropdown>
    )
}


// lagacy that ould give a list of plants based on old db structure 
// function PlantedList(props){
//   const plantList = props.plant_list.map((plant) => 
//       <div> You got {plant.amount} {plant.name} planted in the garden </div>
//     )
//   return <div>{plantList}</div>
// }

