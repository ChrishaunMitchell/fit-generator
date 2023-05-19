import {React, useContext} from "react";
import { ItemContext } from "./ItemContext";

function ResetButton() {
    const {resetitemValues} = useContext(ItemContext);
    return(
        <>
        <button className='reset-button' onClick={() => {
            resetitemValues();
            }}>Reset Filters</button>
        </>
    )
}

export default ResetButton;