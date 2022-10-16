import React from 'react';
import {styled, Card, Radio, Dropdown, Button, Input} from "@nextui-org/react"


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

    return ( <VariantsSelectorWrapper>
        <BackgroundCard backgroundButt={props.backgroundButt}/>
        <ModeSelectCard mode={props.mode} setMode={props.setMode} setCurrentItem={props.setCurrentItem} 
            currentItem={props.currentItem} pageRepList ={props.pageRepList}/>
        <SaveCard inputButt={props.inputButt} exportButt={props.exportButt}/>
    </VariantsSelectorWrapper>
    )
}

function BackgroundCard(props){
    return <Card css={{maxW: "20%"}}>
    <Card.Body css={{pt: "$8", px: "$8"}}>
        <input type={"file"} id={`backgroundLoadInsert`} accept={"image/*"}></input>
        <Button onPress={props.backgroundButt}>Change BG</Button>

    </Card.Body>
    </Card>
}

function ModeSelectCard(props){
    return <Card css={{maxW: "35%"}}>
    <Card.Body css={{pt: "$8", px: "$8"}}>
        <Radio.Group
            label={"Options"} 
            //aria-labelledby="react-aria-6"
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
}

function SaveCard(props){

    return <Card css={{maxW: "20%"}}>
    <Card.Body css={{pt: "$8", px: "$8"}}>
        <input type={"file"} id={`jsonLoadInsert`} accept={".zip"}></input>

        <Button.Group id="saveButtonGroup" color="primary" css={{maxW: "20%"}}>
            <Button onPress={props.inputButt}>Import</Button>
            <Button onPress={props.exportButt}>Export</Button>
        </Button.Group>
    </Card.Body>
</Card>
}

function IconDropdown(props){  
    
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