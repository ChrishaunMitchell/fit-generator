import {React, useContext} from 'react';
import Dropdown from "./Dropdown";
import { ItemContext} from './ItemContext';
import {TypeOptions, TopOptions, BottomOptions, ShoeOptions, AccessoryOptions, ColorOptions} from "./ItemOptions";

function DropdownItems(props){
    const {itemValues, setitemValues} = useContext(ItemContext);
    return(
        <Dropdown isSearchable placeHolder="Subtype..." options={props.options}
          onChange={(value) => {
            value.value ? //If you click X and now it's blank
                setitemValues({...itemValues, type2:value.value}) :
                setitemValues({...itemValues, type2:""})}
          }
        />
    )
}

export default DropdownItems;