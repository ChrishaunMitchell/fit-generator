import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect} from "react";

import { ItemContext } from './Context/ItemContext';
import MenuOptions from './components/MenuOptions';
import AddItem from './components/AddItem';
import ViewItem from './components/ViewItem';
import BackButton from './components/Buttons/BackButton';
import GenerateFit from './components/GenerateFit';
import { S3Context } from './Context/S3Context';
import { S3Client } from "@aws-sdk/client-s3";
import jwt_decode from "jwt-decode";

function App() {
  const [user, setUser] = useState({});
  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token" + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    localStorage.setItem("User",JSON.stringify({"email":userObject.email,"name":userObject.name,"picture":userObject.picture}));
    document.getElementById("signInDiv").hidden = true;
  }
  function handleSignOut(event) {
    setUser({});
    localStorage.removeItem("User");
    document.getElementById("signInDiv").hidden = false;
    resetitemValues();
  }
  useEffect(()=>{
    /* global google google.accounts.id.initialize()*/
    google.accounts.id.initialize({
      client_id:'37741548644-06all6kdav6lvucqek6bnlae0q928c6a.apps.googleusercontent.com',
      callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {them: "outline", size: "large"}
    )
    const loadUser = JSON.parse(localStorage.getItem("User"));
    console.log(loadUser);
    if(loadUser){
      setUser(loadUser)
      document.getElementById("signInDiv").hidden = true;
    } else {
      google.accounts.id.prompt();
    }
  },[]);
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
      <header className='App-header'>
      <div id="signInDiv"></div>
      { Object.keys(user).length===0 ? 
      <div>
      <h3>You must login first</h3>
      </div> :
      <div width='80%'>
        <img src={user.picture}></img>
        <h3>{user.name}</h3>
        <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
      <S3Context.Provider value={{user,FitGenClient}}>
      <ItemContext.Provider value={{validItem, info, setinfo, show, setShow, setshowMenu,itemValues, setitemValues, displayPics, setdisplayPics,resetitemValues}}>
        {showMenu==="Main" ? <MenuOptions /> : <BackButton/>}
        {showMenu==="Add New Item" ? <AddItem/> :
        showMenu==="View Items" ? <ViewItem/> : 
        showMenu==="Generate Fit" ? <GenerateFit/> : undefined}
      </ItemContext.Provider>
      </S3Context.Provider>
      </div>
      }
      </header>
    </div>
  );
}

export default App;
