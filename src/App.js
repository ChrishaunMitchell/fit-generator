import logo from './logo.svg';
import './App.css';
import { useState, useEffect} from "react";

import { ItemContext } from './ItemContext';
import MenuOptions from './MenuOptions';
import AddItem from './AddItem';
import ViewItem from './ViewItem';
import BackButton from './BackButton';
import ViewAllItems from './ViewAllItems';

function App() {
  // const {TypeOptions, TopOptions, BottomOptions, ShoeOptions, AccessoryOptions, ColorOptions} = ItemOptions;
  // const [displayPics, setdisplayPics] = useState({images: {url:'https://comicvine.gamespot.com/a/uploads/original/11133/111335377/7083786-3602507891-hqdef.jpg'}});
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
  // useEffect(() => {
  //   switch (showMenu) {
  //     case "Add New Item":
  //       alert('Hey');
  //       MenuMap="Hey";
  //       break;
  //   }
  // },[showMenu])

  
  return (
    <div className="App">
      <ItemContext.Provider value={{setshowMenu,itemValues, setitemValues, displayPics, setdisplayPics}}>
        {showMenu=="Main" ? <MenuOptions /> : <BackButton/>}
        {showMenu=="Add New Item" ? <AddItem/> :
        showMenu=="View 1 Item" ? <ViewItem/> : 
        showMenu=="View All Items" ? <ViewAllItems/> : undefined}
      </ItemContext.Provider>
    </div>
  );
}

export default App;
