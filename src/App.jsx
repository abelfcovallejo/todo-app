import { useState,useEffect } from "react";
import { Header } from "./components/Header";
import { Tabs } from "./components/Tabs";
import { TodoInput } from "./components/TodoInput";
import { TodoList } from "./components/TodoList";


function App() {
  // const todos = [
  //  { input: 'Hello! Add your first todo!', complete: true },
  // { input: 'Get the groceries!', complete: false },
  // { input: 'Learn how to web design', complete: false },
  // { input: 'Say hi to gran gran', complete: true },
  // ]


  //useState recibe un argumento, el cual es usado como valor default
  const [todos,setTodos] = useState([{ input: 'Hello! Add your first todo!', complete: true }]);

  // selectedTab will be used to know which tab are we now.
  const [selectedTab, setSelectedTab] = useState('Open');

  const [todoToEdit, setTodoToEdit] = useState(null);

  //Select the todo to be edited based on the index clicked
  function handleEditTodo(index) {
    const todo = todos[index];
    console.log("index to edit:" + index);
    console.log("Todo input:" + todo.input);
    setTodoToEdit({ ...todo, index });
  }

  function handleUpdateTodo(updatedTodo) {
    const updatedList = [...todos];
    updatedList[updatedTodo.index] = {
      input: updatedTodo.input,
      complete: updatedTodo.complete,
    };
    setTodos(updatedList);
    setTodoToEdit(null); // Limpiar
    handleSaveData(updatedList);
  }


  function hadndleAddTodo (newTodo){

    // Creates a new list by passing the todos and adding the new todo
    const newTodoList = [...  todos, {input: newTodo, complete : false}];

    //use setTodos to update the useState
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  }
  
  //This will update the todo to Complete
  function hadndleCompleteTodo (index){
    //Create a duplicate so we can manipulate it
    let todoList = [...  todos]; 
    
    //Get the todo to complete
    let completeTodo = todoList[index];
    
    //Complete the todo
    completeTodo['complete'] = true;
    
    //Update the task in the list
    todoList[index] = completeTodo;
    
    //Tell react to update the page
    setTodos(todoList);
    handleSaveData(todoList);
  } 

  function hadndeDeleteTodo (index){
    console.log('hadndeDeleteTodo index:' + index );
    let newTodoList = todos.filter((val,valIndex) => {
      return valIndex !== index
    })
    setTodos(newTodoList);
    handleSaveData(newTodoList);
  } 

  const dbName = 'todo-app';

  //Adding side effects to handle localstorage
  useEffect( () => {
    //If localstorage does not exist, then return and do nothing
    //Parameter for localStorage.getItem should be a unique identifier, otherwise it could overwrite another db
    if (!localStorage || !localStorage.getItem(dbName)) { return }

    let db = JSON.parse(localStorage.getItem(dbName));
    setTodos(db.todos);
  },[])
  

  const handleSaveData = (currentTodos) => {
    localStorage.setItem(dbName, JSON.stringify({todos: currentTodos}));
  }

  return (
    <>
      <Header todos={todos}/>
      <Tabs  todos={todos} selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
      <TodoList hadndeDeleteTodo={hadndeDeleteTodo} hadndleCompleteTodo={hadndleCompleteTodo} todos={todos} selectedTab={selectedTab} handleEditTodo={handleEditTodo}/>
      <TodoInput hadndleAddTodo= {hadndleAddTodo}  handleUpdateTodo={handleUpdateTodo} todoToEdit={todoToEdit} />
    </>
  )
}

export default App
