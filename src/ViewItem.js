import {React, useContext, useState, useRef} from 'react';
import { ItemContext } from "./ItemContext";
import { useEffect } from 'react';
import axios from 'axios';
import AnyAttribute, { asObject, asString } from 'react-any-attr';
import ItemSelection from './ItemSelection';
import ImageModal from './ImageModal';
import ResetButton from './ResetButton';
import { ReactDOM } from 'react';

function ViewItem() {
    const {info, setinfo, show, setShow, itemValues, displayPics, setdisplayPics} = useContext(ItemContext);
    
    const currentPic = useRef(0);
    const QList = useRef("");

    const handleShow = (image) => {
        
        console.log(image);
        console.log(image.objectasObject);
        setinfo(image.objectAsObject.data);
        currentPic.current = image.alt;
        setShow(true);
        
        console.log(info);
    }
    useEffect(()=>{
        console.log('calling useeffect');
        UpdateDisplay("");
    },[itemValues])
    useEffect(()=>{
        console.log('calling useeffect');
        UpdateDisplay(QList.current);
    },[show])
    useEffect(()=>{
        setdisplayPics();
     },[]);
    function UpdateDisplay(qString) {
        QList.current = qString;
        axios.get(`https://x3c6sahq93.execute-api.us-east-1.amazonaws.com/items${qString}`)
        .then(response => {
          let picList = [];
          response.data.forEach(s => {
            picList.push(s);
          });
          console.log(picList)
          setdisplayPics(picList);
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Make api call");
        let qString = itemValues ? "?" : "";
        if(itemValues.type) {
            if(qString!="?") { qString += "&"; }
            qString += "type="+itemValues.type;
        }
        if(itemValues.type2) {
            if(qString!="?") { qString += "&"; }
            qString += "type2="+itemValues.type2;
        }
        if(itemValues.color1) {
            if(qString!="?") { qString += "&"; }
            qString += "color1="+itemValues.color1;
        }
        if(itemValues.color2) {
            if(qString!="?") { qString += "&"; }
            qString += "color2="+itemValues.color2;
        }
        if(itemValues.solid) {
            if(qString!="?") { qString += "&"; }
            qString += "solid="+itemValues.solid;
        }
        if(itemValues.designer) {
            if(qString!="?") { qString += "&"; }
            qString += "designer="+itemValues.designer;
        }
        UpdateDisplay(qString);
      };
    return (
        <>
        <ResetButton/>
        <ItemSelection submitButton={handleSubmit} submitText='Search'/>
        
        {displayPics ? displayPics.map(image => (
            <AnyAttribute
            attributes={{objectAsObject: asObject({data: image})}}>
            <img className = 'image-view' src={image.pic} alt={image.Id}
            onClick={(image)=> handleShow(image.target)}/>
            </AnyAttribute>
        )) : 'No images available'}
        <ImageModal show={show} imageID={currentPic.current}/>
        <h2>We'll view images</h2>
        </>
    )
}
export default ViewItem;