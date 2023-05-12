import {React, useContext, useState, useRef} from 'react';
import { ItemContext } from "./ItemContext";
import { useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { render } from '@testing-library/react';
import AnyAttribute, { asObject, asString } from 'react-any-attr';
import ItemSelection from './ItemSelection';

function ViewItem() {
    const {itemValues, displayPics, setdisplayPics} = useContext(ItemContext);
    const [info, setinfo] = useState({Id:1});
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (image) => {
        
        console.log(image);
        console.log(image.objectasObject);
        setinfo(image.objectAsObject.data);
        setShow(true);
        console.log(info);
    }
    useEffect(()=>{
        setdisplayPics();
     },[]);
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
        axios.get(`https://x3c6sahq93.execute-api.us-east-1.amazonaws.com/items${qString}`)
        .then(response => {
          let picList = [];
          response.data.forEach(s => {
            picList.push(s);
          });
          console.log(picList)
          setdisplayPics(picList);
        });
      };
    return (
        <>
        <ItemSelection submitButton={handleSubmit} submitText='Search'/>
        {displayPics ? displayPics.map(image => (
            <AnyAttribute
            attributes={{objectAsObject: asObject({data: image})}}>
            <img className = 'image-view' src={image.pic} alt={image.Id}
            onClick={(image)=> handleShow(image.target)}/>
            </AnyAttribute>
        )) : 'No images available'}
        <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{info.Id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal! <br></br>
        Type: {info.type} <br></br>
        Subtype: {info.type2} <br></br>
        Color: {info.color1} <br></br>
        {info.color2 ? 'Color2: '+info.color2 : undefined} <br></br>
        Designer: {info.designer ? 'Yes' : 'No'} <br></br>
        {info.solid ? 'Plain' : 'Graphics/Pattern'} <br></br>
        TimesWorn: {info.timesWorn} <br></br>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Delete Item
          </Button>
        </Modal.Footer>
      </Modal>
        <h2>We'll view images</h2>
        </>
    )
}
export default ViewItem;