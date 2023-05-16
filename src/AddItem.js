import React from "react";
import ItemSelection from "./ItemSelection";
import Upload from "./components/Upload";

function AddItem() {
    const handleSubmit = (e)=>{
      console.log('AddItem');
    }
      return (
        <>
        <h1>Add Item</h1>
        <ItemSelection submitButton={handleSubmit} submitText='Submit'/>
        <Upload/>
      </>
      )

}

export default AddItem;