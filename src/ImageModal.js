import {React, useState, useContext, useEffect} from 'react';
import { ItemContext } from "./ItemContext";
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { render } from '@testing-library/react';
import AnyAttribute, { asObject, asString } from 'react-any-attr';

function ImageModal(props){
    const {info, show, setShow, itemValues, displayPics, setdisplayPics} = useContext(ItemContext);

    const handleClose = () => setShow(false);
    useEffect(()=>{
        setdisplayPics();
     },[]);
    const handleDelete = () => {
        console.log("Trying to delete",props.imageID);
        axios.delete(`https://x3c6sahq93.execute-api.us-east-1.amazonaws.com/items/${props.imageID}`)
        .then(res => {setShow(false);});
        
    };

    return(
        <Modal show={props.show} onHide={handleClose} centered>
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
          <Button variant="primary" onClick={handleDelete}>
            Delete Item
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default ImageModal;