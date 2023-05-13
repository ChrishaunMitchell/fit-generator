import {React, useState, useEffect, useContext} from 'react';

function GenerateFit(){
    function Generate() {
        console.log('Select a top/bottom/shoe by random, then probability to add accessories');
    }
    return(
        <>
        <button className='reset-button' onClick={() => {
            Generate()
            }}>Generate Fit</button>
        </>
    )
}

export default GenerateFit;