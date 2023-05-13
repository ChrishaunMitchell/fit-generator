import {React, useContext} from "react";
import { ItemContext } from './ItemContext';


function MenuOptions(){
    const { setshowMenu} = useContext(ItemContext);

    function updateMenuOption(e){
        console.log()
        setshowMenu(e.target.innerText);
    }
    return (
        <>
        <h1>We'll list options</h1>
        <button onClick={(e)=> {updateMenuOption(e)}}> Add New Item</button>
        <button onClick={(e)=> {updateMenuOption(e)}}> View Items</button>
        <button onClick={(e)=> {updateMenuOption(e)}}> Generate Fit</button>
        </>
    );
}

export default MenuOptions;