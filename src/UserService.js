import axios from "axios";
export function GetItems(){
    console.log("Whatever");
    axios.get(`https://x3c6sahq93.execute-api.us-east-1.amazonaws.com/items`)
    .then(response => {
      return response.data;
    });
  }

export async function AddItem(data){
  const response = await fetch(`https://x3c6sahq93.execute-api.us-east-1.amazonaws.com/items`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
  return await response.json();
}