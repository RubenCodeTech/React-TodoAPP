import logo from './logo.svg';
import './App.css';  //IMPORT DEL CSS
import React from 'react';
function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: "Wash dishes", done: false },
    { id: 2, text: "Do laundry", done: false },
    { id: 3, text: "Take shower", done: false }
  ]);
  return (
    <div className="App">
      <h1>ToDo List</h1>
      <AddTodo setTodos={setTodos}/>
      <TodoList todos={todos} setTodos={setTodos}/>
    </div>
  );
}
function TodoList({todos, setTodos}) {
  function handleToggleTodo(todo){
    const updatedTodos = todos.map((clickedTodo)=>
    clickedTodo.id === todo.id ? {...clickedTodo, done: !clickedTodo.done}:clickedTodo
    );
    // setTodos(updatedTodos)
  }
  if(!todos.length){
    return <p>No hay más tarea</p>
  }
  return(<ul> 
    {todos.map(todo => (
      <li
      onDoubleClick={()=> handleToggleTodo(todo)}
      style={{
        textDecoration:todo.done ? "line-through" : ""
      }} 
      key={todo.id}>{todo.text}
      <DeleteTodo todo={todo} setTodos={setTodos}/></li>
   ))}
  </ul>)
}

let numId=4
function AddTodo({setTodos}) {
  const inputRef = React.useRef();

  function handleAddTodo(event){  
    event.preventDefault();
    const text = event.target.elements.addTodo.value;
    // console.log(event.target.elements.addTodo.value);
    // console.log(inputRef.current.value);
    const todo = {
      id: numId++,
      text,
      done:false
    }
    setTodos((prevTodos)=>{
      return prevTodos.concat(todo)
    })
  }
  return (
    <form onSubmit={handleAddTodo}>
      <input name="addTodo" placeholder="Add todo" ref={inputRef}/>
      <button type="submit">Submit</button>
    </form>
  );
}
function DeleteTodo({ todo, setTodos }){
  function handleDeleteTodo() {
    const confirmed = window.confirm("Do you want to delete this?");
    if (confirmed) {
      // take care of deleting the todo
      setTodos((prevTodos)=>{
        return prevTodos.filter((t)=> t.id !==todo.id);
      })
    }
  }
  return (
    <span onClick={
      handleDeleteTodo
    }
    role="button" style={{
      color: "olive",
      fontWeight: "bold",
      margin: 10,
      cursor: "pointer",
    }}>x</span>
  );
}

export default App;