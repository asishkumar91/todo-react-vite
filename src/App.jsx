import React, { useState, useRef, useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import './App.css'
import './index.css'

function App() {
    const [todo_arr, setTodo_arr] = useState([]);
    const Input = useRef(null);
    const [showfinished, setShowfinished] = useState(false);

  const Add_Todo =  () => {
    const Value = Input.current.value.trim();  //trim() is used to ignore any leading or trailing spaces from input.
    if (!Value) return;
    setTodo_arr([...todo_arr,{name:Value, Completed:false}]);
    Input.current.value='';
    Input.current.focus();
  }

  const Todo = ({Mytodo, index}) =>{
    if(Mytodo.Completed==false || showfinished==true){ 
        return ( 
        <div className='flex justify-between font-medium px-5 my-1'>
          <div className=''>
          <input className='w-3 h-3 mr-5 ml-2' type='checkbox' checked={Mytodo.Completed} onChange={() => Handle_Check(index)}/>
         <span className={ Mytodo.Completed ? "line-through" : null }>{Mytodo.name}</span>
          </div>
          <div>
            <button className='bg-gray-700 text-white px-5 py-1 rounded-xl font-bold hover:bg-black cursor-pointer' onClick={() =>Edit_Todo(index)}>Edit</button>
            <button className='bg-lime-500 text-white px-5 py-1 ml-2 rounded-xl font-bold hover:bg-lime-400 cursor-pointer' onClick={()=>Delete_Todo(index)}>Delete</button> 
        {/* onClick={myFunc} → React stores the function reference and will only call it when the click happens. ✅
        onClick={myFunc()} → You’re immediately calling the function during render, so React gets the return value, not the function. 🚫 */}
          </div>
      </div>
      )
    }
    else return null;
  }
 

  const Delete_Todo =  (index) =>{
      setTodo_arr(todo_arr.filter((_, ind) => ind != index)) // '_' do not care about the element, only index is needed.
  }



  const Edit_Todo = (index) =>{
    const data = todo_arr[index];
    setTodo_arr(todo_arr.filter((_, ind) => ind != index));
    Input.current.value = data.name;

  setTimeout ( () =>{
      Input.current.focus();  // foucs on Input element.
      Input.current.selectionStart = 0; //Selects the data from 0th index to full.
      Input.current.selectionEnd = data.name.length;
  }, 0);
  };


  useEffect ( () =>{
      Input.current.focus();
      
      let temp = JSON.parse(localStorage.getItem("todos")); // 'todos' is a key-name present in LocalStorage.
      (temp) ? setTodo_arr(temp) : null;
  },[])

  const SaveToLS = () =>{
        localStorage.setItem( "todos", JSON.stringify(todo_arr));
  }

  useEffect ( () =>{
    setTimeout(() => {
      SaveToLS();
    }, 0);  //By using setTimeout(..., 0), you tell JS: “run this after the current call stack(setTodo_arr()) is done”.
  }, [todo_arr]);

  const Handle_Check = (index) => {
  setTodo_arr(todo_arr.map( (element,ind) =>{
      return  (ind == index) ? {...element, Completed: !(element.Completed) } : element;
  }
  ))
  }

  const toggleFinish  = () =>{
      setShowfinished(!showfinished)
  }

  return (
    <>
    
      <Navbar />
      <div className='flex justify-center my-3 '>
        <div className='container bg-violet-100 w-1/2 h-[80vh] border-3 rounded-lg border-lime-500'>
          <div className='m-2 p-3  font-bold font text-2xl text-center'>iTask - Manage your todos at one place
          </div>
          <div>
            <div className='font-bold py-2 px-3 text-lg'>Add a Todo</div>
            <div className='flex gap-2 m-2'><input  ref={Input} className='bg-white border-black border-2 rounded-2xl w-full px-2' type='text' name='data'/>
          
              <button className='bg-violet-600 text-white px-5 py-2 rounded-2xl font-bold hover:bg-violet-500 cursor-pointer' onClick={Add_Todo}>Save</button>
            </div>
            <div>
              <input className='m-5 mr-3 w-5 h-5' type='checkbox' checked={showfinished} onChange={toggleFinish}/>Show All
              <div className='w-3/4 mx-auto border-t-2 border-gray-400 my-2'></div>
              <div className='font-bold py-2 px-3 text-lg mt-4'>Your Todos</div>
            {
                (todo_arr.length > 0) ? 
                
                  todo_arr.map((item, index) => {
                      return <Todo key={index} index={index} Mytodo={item}/>
                  })
                
            :  <div className='text-center font-medium text-lg'>No Todos to display.</div>
}
            </div>
          </div>
        </div>
      </div>
        </>
        )
}

        export default App
