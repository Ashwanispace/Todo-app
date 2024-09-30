import { useState, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



function App() {

  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(()=>{ // runs once at the starting because the dependency list is empty
    let t = localStorage.getItem("todos");
    if(t){
      setTodos(JSON.parse(t));
    }
  },[])

  const saveToLS = (updatedTodos)=>{
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
 }
  
  
  const handleAdd = ()=>{
    let todo = {
      id:uuidv4(),
      text:input,
      isCompleted:false,
    }
    const updatedTodos = [...todos,todo];
    setTodos(updatedTodos);
    setInput("");
    saveToLS(updatedTodos);  // Save the updated todos to localStorage
  }

  const handleCheckbox = (e,id)=>{
    const updatedTodos = todos.map( (item) =>
      (item.id === id) ? {...item, isCompleted: e.target.checked} : item  // Update the completion status
    );
    setTodos(updatedTodos);
    saveToLS(updatedTodos);  // Save the updated todos to localStorage
  }

  const handleEdit = (id)=>{
    let t = todos.filter((item)=>item.id===id);
    setInput(t[0].text);
    const updated_todos = todos.filter(item=> item.id!==id);
    setTodos(updated_todos);
    saveToLS(updated_todos);  // Save the updated todos to localStorage
  }

  const handleDelete = (id)=>{
    const updatedTodos = todos.filter(item => item.id !== id);
    setTodos(updatedTodos);
    saveToLS(updatedTodos);  // Save the updated todos to localStorage
  }
  const handleChange = (e)=>{
     setInput(e.target.value);
  }

  const handleShowFinishedChange = (e) => {
    setShowFinished(e.target.checked);  // Toggle between showing all todos and unfinished todos
  }

  return (
    <>
      <Navbar />
      <div className=" mx-3 container md:mx-auto my-5 rounded-xl bg-violet-100 p-5 min-h-[80vh] md:w-1/2">

      <h1 className='font-bold text-center text-xl'>iTask - Manage Your Task at one place</h1>

        <div className="addtodo my-6">
          <h1 className="text-lg font-bold my-4">Add a Todo</h1>
        

        <div className='flex gap-2'>
        <input onChange={handleChange} value={input} type="text" placeholder="Type your todo here" className='w-full rounded-full px-5'/>
        <button onClick={handleAdd} disabled={input.length<=2} className="bg-violet-800 hover:bg-violet-950 disabled:bg-violet-400 px-2 py-2 text-sm font-bold text-white rounded-full cursor-pointer">Save</button>
        </div>
        
        </div>

        {/* Checkbox to toggle finished todos */}
        <div className="show-finished my-4">
          
            <input type="checkbox" checked={showFinished} onChange={handleShowFinishedChange} className="mr-2" />
            Show Finished Todos
          
        </div>

        <h2 className='text-xl font-bold my-5 pl-5'>Your Todos</h2>
        <div className='bg-black h-[1px] w-[95%] m-auto'></div> 

        <div className="todos mt-9">
          {todos.length===0 && <div className='m-5'>No Todos to Display</div>}
          {
            // Filter todos based on the showFinished state
            todos
              .filter((item) => showFinished || !item.isCompleted) // Only show unfinished if showFinished is false
              .map( (item)=> {
              return (
                <div key={item.id} className="todo flex my-3  border-pink-100 w-3/2">
                  <input onChange={(e)=>handleCheckbox(e,item.id)} type="checkbox" checked={item.isCompleted} className='mr-4'/>
                <div className='flex justify-between w-[90%]'>
                
                <div className={`${(item.isCompleted)?"line-through":""} break-words w-[70%]`}>{item.text}</div>
                
                <div className="buttons flex gap-3">
                  <button  onClick={()=>{handleEdit(item.id)}} className="bg-violet-800 hover:bg-violet-950 px-2 py-1 text-white rounded-md cursor-pointer h-8"><FaEdit /></button>
                  <button  onClick={()=>{handleDelete(item.id)}} className="bg-violet-800 hover:bg-violet-950 px-2 py-1 text-white rounded-md cursor-pointer h-8"><MdDelete /></button>
                </div>
                </div>
              </div>
              )
            })
          }
        </div>
      
      </div>
    </>
  )
}

export default App
