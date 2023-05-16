import logo from './logo.svg';
import './App.css';
import { useState, useEffect} from "react";

import { ItemContext } from './ItemContext';
import MenuOptions from './MenuOptions';
import AddItem from './AddItem';
import ViewItem from './ViewItem';
import BackButton from './BackButton';
import GenerateFit from './GenerateFit';
import { S3Context } from './S3Context';
import { DeleteObjectsCommand, PutObjectCommand, GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

function App() {
  const [itemValues, setitemValues] = useState({
    Id: Math.floor(Math.random() * 9000),
    type: "",
    type2: "",
    designer: false,
    solid: false,
    worn: false,
    color1: "",
    color2: "",
    timesWorn: 0,
    dripLevel: 3,
    pic: ""
  });
  const [displayPics, setdisplayPics] = useState(['https://comicvine.gamespot.com/a/uploads/original/11133/111335377/7083786-3602507891-hqdef.jpg','https://comicvine.gamespot.com/a/uploads/original/11133/111335377/7083786-3602507891-hqdef.jpg']);
  const [showMenu, setshowMenu] = useState("Main");
  let MenuMap = "We'll display something"

  const [info, setinfo] = useState({Id:1});
  const [show, setShow] = useState(false);
  function resetitemValues() {
    setitemValues({
    Id: Math.floor(Math.random() * 9000),
    type: "",
    type2: "",
    designer: false,
    solid: false,
    worn: false,
    color1: "",
    color2: "",
    timesWorn: 0,
    dripLevel: 3,
    pic: ""})
    setdisplayPics([]);
  }
  const FitGenClient = new S3Client({
    region:"us-east-1",
    credentials:{
        accessKeyId:'AKIA3ZK4W32CBPIRW7DG',
        secretAccessKey:'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'
    }})
  function validItem() {
    const {type,type2,color1,color2,pic} = itemValues;
    if(type && type2 && color1 && color2 && pic) {
      return true;
    } else {
      return false;
    }
  }
  
  return (
    <div className="App">
      <S3Context.Provider value={{FitGenClient}}>
      <ItemContext.Provider value={{validItem, info, setinfo, show, setShow, setshowMenu,itemValues, setitemValues, displayPics, setdisplayPics,resetitemValues}}>
        {showMenu=="Main" ? <MenuOptions /> : <BackButton/>}
        {showMenu=="Add New Item" ? <AddItem/> :
        showMenu=="View Items" ? <ViewItem/> : 
        showMenu=="Generate Fit" ? <GenerateFit/> : undefined}
      </ItemContext.Provider>
      </S3Context.Provider>
    </div>
  );
}

export default App;
