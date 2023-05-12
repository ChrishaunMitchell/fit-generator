import React from "react";
import { ItemContext } from "./ItemContext";
import { useContext, useEffect } from "react";
import axios from "axios";
import ItemSelection from "./ItemSelection";

function AddItem(props) {
    const { setitemValues, itemValues, displayPics, setdisplayPics} = useContext(ItemContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        setitemValues({...itemValues, Id: Date.now() + Math.floor(Math.random() * 9000)}) //Date+ rand num
        const Data = itemValues;
        console.log(Data);
        const {type,type2,color1,color2,pic} = Data;
        if(type && type2 && color1 && color2 && pic) {
          console.log('We got everything');
          console.log(Data);
          Add(Data);
        }
        else {
          console.log(`We don't have everything`);
        }
        
      };
    function Add(Data){
        console.log("Make api call");
        axios.post(`https://x3c6sahq93.execute-api.us-east-1.amazonaws.com/items`, Data)
        .then(response => {
          console.log(response.data);
          console.log('You did it man');
        });
      }

      return (
        <>
        <h1>Add Item</h1>
        <ItemSelection submitButton={handleSubmit} submitText='Submit'/>
      </>
      )

}

export default AddItem;