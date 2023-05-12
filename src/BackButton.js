import {React, useContext} from "react";
import { ItemContext } from "./ItemContext";

function BackButton() {
    const {setshowMenu} = useContext(ItemContext);
    return(
        <>
        <button className='back-button' onClick={() => {setshowMenu('Main')}}>Back</button>
        </>
    )
}

export default BackButton;