import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {nanoid} from "nanoid"

function App() {
  const [data,setData]= useState([])
  const [newPost1,setNewPost1] = useState("")
  const [updatep,setUpdatep] = useState("")
  const [ show,setShow] = useState(false)
  useEffect(()=>{
    const fetchPosts = async () => {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
      const res = await response.data;
      console.log(res)
      setData(res)
    }
    fetchPosts();
  },[])
  const createPost = async () => {
    const newPost = {
      id: data.legth+1,
      title:newPost1,
      userId:nanoid(),
      body:"expected"
    }
    const response = await axios.post("https://jsonplaceholder.typicode.com/posts",newPost)
    const res = await response.data
    console.log(res)
    setData([...data,res])
    
  }
  const deletePost = async (id) => {
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
    const res = await response.data
    console.log(res)
    const newData = data.filter((each)=>each.id!==id)
    setData(newData)
  }
  const updatePost = async (id) => {
    const newPost = {
      id:id,
      title:updatep,
      body:"changed",
      userId:nanoid()
    }
    const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`,newPost)
    const res = await response.data
    console.log(res)
    const newData = data.map((each)=>{
      return each.id === id ? newPost : each
    })
    setData(newData)
    setShow(false)
  }
  console.log(data)
  
  return (
    <div className="App">
      <input type="text" placeholder='enter' value={newPost1} onChange={(e)=>setNewPost1(e.target.value)}/>
      <button onClick={createPost}>Create</button>
      {data.map((each,index)=>{
        return (
          <>
          <div key={index} className='data'>
            {each.id}
            {!show?<button onClick={()=>setShow(true)}>update</button>:(<div><input type="text" value={updatep} onChange={(e)=>setUpdatep(e.target.value)}/> <button onClick={()=>updatePost(each.id)}>save</button> </div>)}
            <button onClick={()=>deletePost(each.id)}>delete</button>
            </div>
          </>  
        )
      })}

    </div>
  );
}

export default App;
