import React from 'react';

export function CardSelect(props){

    return ( <div style={{ 
                    position: "fixed",
                    bottom: "10px",}}>
        <ModeSelectCard mode={props.mode} setMode={props.setMode} setCurrentItem={props.setCurrentItem} 
            currentItem={props.currentItem} pageRepList ={props.pageRepList}/>
        <BackgroundCard backgroundButt={props.backgroundButt}/>
        <SaveCard inputButt={props.inputButt} exportButt={props.exportButt}/>
    </div>
    )
}

function BackgroundCard(props){
    return <div>
            <input type={"file"} id={`backgroundLoadInsert`} accept={"image/*"}></input>
            <button onClick={props.backgroundButt}>Change BG</button>
    </div>
}

function ModeSelectCard(props){
    return (
    <div>
        <select defaultValue={props.mode} onChange={(event)=> props.setMode(event.target.value)}>
            <option value="select">Journal</option> 
            <option value="place">Place</option>
            <option  value="remove" >Remove</option>
        </select>
        {props.mode === "place" &&
            <IconDropdown setCurrentItem={props.setCurrentItem} 
                currentItem={props.currentItem} pageRepList ={props.pageRepList}/>
        }
    </div>
    )
}

function SaveCard(props){

    return <div>
        <input type={"file"} id={`jsonLoadInsert`} accept={".zip"}></input>
        <div>
            <button onClick={props.inputButt}>Import</button>
            <button onClick={props.exportButt}>Export</button>
        </div>
</div>
}

function IconDropdown(props){  
    
    const setCurrentItem = (event) => {
        props.setCurrentItem(event.target.value)
    }

    const listItems = props.pageRepList.map(element => {
        return <option value= {element}>{element}</option>
    });
    
    return (
        <select onChange={setCurrentItem} defaultValue={props.currentItem}>
            {listItems}
        </select>
    )
}