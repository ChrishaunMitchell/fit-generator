import React from "react";
import { ItemContext } from "../Context/ItemContext";
import { useContext, useEffect } from "react";
import Dropdown from "./Dropdown/Dropdown";
import DropdownItems from "./Dropdown/DropdownItems";
import {TypeOptions, TopOptions, BottomOptions, ShoeOptions, AccessoryOptions, ColorOptions} from "./ItemOptions";

function ItemSelection(props) {
    const { setitemValues, itemValues} = useContext(ItemContext);
    function TypeChange(type) {
    
        if(type) {
          type = type.value;
          setitemValues({...itemValues, type:type});
        }
      }
      
    useEffect(() => {
    }, [itemValues.type]);

    return (
        <>
        <Dropdown isSearchable placeHolder="Type..." options={TypeOptions}
          onChange={(value) => TypeChange(value)}
        />
        {itemValues.type==="Top" ? <DropdownItems options={TopOptions}/> : 
        itemValues.type==="Bottom" ? <DropdownItems options={BottomOptions}/> : 
        itemValues.type==="Shoes" ? <DropdownItems options={ShoeOptions}/> : 
        itemValues.type==="Accessory" ? <DropdownItems options={AccessoryOptions}/> : undefined}

        <Dropdown isSearchable isMulti placeHolder="Color1..." options={ColorOptions}
          onChange={(value) => value[0] ? setitemValues({...itemValues, color1:value[0].value}):
          setitemValues({...itemValues, color2:""})}
        />
        <Dropdown isSearchable isMulti placeHolder="Color2..." options={ColorOptions}
          onChange={(value) => value[0] ? setitemValues({...itemValues, color2:value[0].value}):
          setitemValues({...itemValues, color2:""})}
        />

        <form onSubmit={props.submitButton}>
        <div className="input-group">
          <label name="designer">Designer</label>
          <input type="checkbox" id="designer" value={itemValues.designer} onChange={() => {setitemValues({...itemValues, designer: !itemValues.designer})}} />
        </div>
        <div className="input-group">
          <label name="solid">Solid</label>
          <input type="checkbox" id="solid" value={itemValues.solid} onChange={() => {setitemValues({...itemValues, solid: !itemValues.solid})}} />
        </div>
        {props.submitText==='Search' ?
        <button type="submit" className="submit-btn">
            {props.submitText}
        </button> :''}
      </form>
      </>
      )
}

export default ItemSelection;