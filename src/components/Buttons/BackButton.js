import {React, useContext} from "react";
import { ItemContext } from "../../Context/ItemContext";

function BackButton() {
    const {resetitemValues, setshowMenu} = useContext(ItemContext);
    return(
        <>
        <button className='back-button' onClick={() => {
            setshowMenu('Main');
            resetitemValues();
            }}>Back</button>
        </>
    )
}

export default BackButton;