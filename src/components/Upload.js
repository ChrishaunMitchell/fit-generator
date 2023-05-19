import React,{useState, useContext} from 'react';
import axios from 'axios';
import './Upload.css';
import { S3Context } from '../S3Context';
import { ItemContext } from '../ItemContext';
import { PutObjectCommand } from "@aws-sdk/client-s3";

const Upload = (props) => {
    const {user, FitGenClient} = useContext(S3Context);
    const {validItem, itemValues, setitemValues} = useContext(ItemContext);
    // State to keep the selected file
    const [selectedFile, setSelectedFile] = useState(null);
    // State to keep the upload status
    const [status, setStatus] = useState({ statusCode: 0, message: 'Ready to upload' });

    const onFileSelect= async(event) =>{
        setSelectedFile(null);
        const file = event.target.files;
        if(!file) return;
        setSelectedFile(file[0]);
        console.log(selectedFile);
        let newID= Date.now() + Math.floor(Math.random() * 9000);
        let newPic= `https://fit-generator-dev.s3.amazonaws.com/Images/${user.email}/${newID}`;
        setitemValues({...itemValues, Id: newID, pic: newPic})
        setStatus({ statusCode: 0, message:'Ready to upload'});
         
    }
    function Add(Data){
        console.log("Make api call");
        axios.post(`https://x3c6sahq93.execute-api.us-east-1.amazonaws.com/items`, Data)
        .then(response => {
          console.log(response.data);
          console.log('You did it man');
        });
      }

    // Click action for Upload file button
    const onUploadClick = async() => {
        const Data = itemValues;
        console.log(Data);
        if(validItem()){
            console.log('clicked upload');
            Add(Data);
            const command = new PutObjectCommand({
                Body: selectedFile,
                Bucket: "fit-generator-dev",
                Key: `Images/${user.email}/${itemValues.Id}`
            });
            try {
                await FitGenClient.send(command);
                setStatus({ statusCode: 1, message: 'File uploaded successfully'});
            }
            catch {
                setStatus({ statusCode: 404, message: 'File failed to upload'});
            }
        } else {
            setStatus({ statusCode: 2, message: 'Item missing information'});
        }
        
    }

    // Convert the bytes to sizes
    const bytesToSize= (bytes)=> {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
     }

     // Created custom file list to showcase file information and upload status
     const createFileList = () => {
        var size = bytesToSize(selectedFile.size);
        return (
            <div className="e-upload custom-template">
                <ul className="e-upload-files">
                    <li className="e-upload-file-list">
                        <span className="e-file-container">
                            <span className="e-file-name">{selectedFile.name}</span>
                            <span className="e-file-size">{size}</span>
                            <span className={ status.statusCode ? "e-file-status e-upload-success" : "e-file-status"}>{status.message}</span> 
                        </span>
                    </li>
                </ul>
            </div>
        )
     }

    return (
        <div className="control-wrapper">
            {selectedFile && selectedFile.name && (
                <div>
                <img
                    alt="not found"
                    width={"250px"}
                    src={URL.createObjectURL(selectedFile)}
                />
                <br />
                <button onClick={() => setSelectedFile(null)}>Remove</button>
                </div>
            )}
            <input
                type="file"
                accept='image/*'
                name="myImage"
                onChange={(event) => {
                console.log(event.target.files[0]);
                onFileSelect(event);
                }}
            />

            {/* Rendering the file list after selecting the file */}
            { selectedFile !== null && selectedFile !== undefined && createFileList() }
            
            <button className='upload-btn e-btn e-primary' disabled={!(selectedFile !== null && !status.statusCode)} onClick = {onUploadClick}>Upload Item</button>
        </div>
    );
}

export default Upload