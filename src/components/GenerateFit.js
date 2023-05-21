import {React, useEffect, useContext} from 'react';
import axios from 'axios';
import { ItemContext } from '../Context/ItemContext';
import AnyAttribute from 'react-any-attr';
import { asObject } from 'react-any-attr';
import { S3Context } from '../Context/S3Context';

function GenerateFit(){
    const {user} = useContext(S3Context);
    const {displayPics,setdisplayPics} = useContext(ItemContext);
    function PickRandom(item) {
        return item[Math.floor(Math.random()*item.length)];
    }
    function Generate() {
        console.log('Select a top/bottom/shoe by random, then probability to add accessories');
        let allItems = [];
        axios.get(`https://x3c6sahq93.execute-api.us-east-1.amazonaws.com/items?owner=${user.email}&type=Top`)
        .then(response => {
            if(response.data[0] != null) {allItems.push(PickRandom(response.data));}
            axios.get(`https://x3c6sahq93.execute-api.us-east-1.amazonaws.com/items?owner=${user.email}&type=Bottom`)
            .then(response => {
                if(response.data[0]!= null) {allItems.push(PickRandom(response.data));}
                axios.get(`https://x3c6sahq93.execute-api.us-east-1.amazonaws.com/items?owner=${user.email}&type=Shoes`)
                .then(response => {
                    if(response.data[0]!= null) {allItems.push(PickRandom(response.data));}
                    setdisplayPics(allItems);
                });
            });
        });
      }
    useEffect(()=>{
        setdisplayPics();
    },[]);
    return(
        <>
        <button className='reset-button' onClick={() => {
            Generate()
            }}>Generate Fit</button>
            {displayPics ? displayPics.map(image => (
            <AnyAttribute
                attributes={{objectAsObject: asObject({data: image})}}>
                <img className = 'image-view' src={image.pic} alt={image.Id}/>
            </AnyAttribute>
        )) : 'No images available'}
        </>
    )
}

export default GenerateFit;