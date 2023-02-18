export function Debug(props:{pageID:string}){
    return(

        <div style={{ position: "fixed",
                    bottom: "10px",
                    right: "10px",
                    backgroundColor: "rgba(156, 153, 153, 0.75)"}}>
                        <label>current page ID: </label>
                        <label id={"pageID"}>{props.pageID}</label>

        
        </div>
    )
}
