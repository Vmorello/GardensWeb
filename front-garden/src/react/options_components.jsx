import React from 'react';
import {styled, Card, Radio, Dropdown, Button, Input} from "@nextui-org/react"

import {get_keys} from '../js/image_lookup';



// used as a wrapper for the radio buttons
const VariantsSelectorWrapper = styled("div", {
    dflex: "center",
    position: "fixed",
    width: "100%",
    bottom: "10px",
    "& .nextui-radio-group-items": {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "1fr",
        gridColumnGap: "$8",
        gridRowGap: "$2",
    }
})


export function CardSelect(props){

    const inputButt = () => {

        const inputFileObject = document.getElementById(`jsonLoadInsert`)
        const inputFile = inputFileObject.files[0]
        const jsonURL = URL.createObjectURL(inputFile)

        fetch(jsonURL).then(
            response => response.json()
        ).then(
            json => {
                const allRepInfo = json.allRepInfo
                props.setAllRepInfo(json.allRepInfo)
            }
        )
    }

    const exportButt = ()=> {
        let json = {"allRepInfo":props.allRepInfo}
        json = JSON.stringify(json)
        const a = document.createElement("a")
        a.href = URL.createObjectURL(
            new Blob([json], {type:"application/json"})
        )
        a.download = "TenTown.json"
        a.click()
    }

    return ( <VariantsSelectorWrapper>
    <Card css={{maxW: "35%"}}>
            <Card.Body css={{pt: "$8", px: "$8"}}>
                <Radio.Group
                    //defaultValue="default"
                    label="Select variant"
                    orientation="horizontal"
                    size="sm"
                    value={props.mode}
                    onChange={props.setMode}
                    >
                        <Radio value = {"select"}>Journal</Radio>
                        <Radio value = {"place"}>Place Landmark</Radio>
                        <Radio value = {"remove"}>Remove</Radio>
                        
                </Radio.Group>
                
                <IconDropdown setCurrentItem={props.setCurrentItem} 
                    currentItem={props.currentItem} pageRepList ={props.pageRepList}/>
            </Card.Body>
        </Card>
        <Card css={{maxW: "20%"}}>
            <Card.Body css={{pt: "$8", px: "$8"}}>
                <input type={"file"} id={`jsonLoadInsert`} accept={".json"}></input>

                <Button.Group color="primary"  css={{maxW: "20%"}}>
                    <Button onPress={inputButt}>Import</Button>
                    <Button onPress={exportButt}>Export</Button>
                </Button.Group>
            </Card.Body>
        </Card>
    </VariantsSelectorWrapper>
    )
}

export function IconDropdown(props){  
    
    
    const setCurrentItem = (event) => {
        props.setCurrentItem(event.values().next().value)
    }

    const listItems = props.pageRepList.map(element => {
        return <Dropdown.Item key= {element}>{element}</Dropdown.Item>
    });
    
    return (
        <Dropdown>
            <Dropdown.Button flat color="success" css={{ tt: "capitalize" }}>
                {props.currentItem}
            </Dropdown.Button>
            <Dropdown.Menu
                aria-label="Single selection actions"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={props.currentItem}
                onSelectionChange={setCurrentItem}
            >
                {listItems}
            </Dropdown.Menu>
        </Dropdown>
    )
}