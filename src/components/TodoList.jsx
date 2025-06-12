import { TodoCard } from "./TodoCard";

export function TodoList (props) {
    const {todos,selectedTab} = props;

    
    const filteredTodos = selectedTab === 'All' ? 
    todos 
    : selectedTab === 'Open' ? todos.filter(val =>  !val.complete)
    : todos.filter(val =>  val.complete);

    
    return (
        <>
            {filteredTodos.map((todo,todoIndex) => {
                console.log('todoIndex:' + todoIndex)
                    return (
                        <TodoCard key={todoIndex} 
                                 {...props} 
                                  todoIndex = {todos.findIndex(val => val.input == todo.input )}
                                  todo = {todo}/> //{...props} this passes the parent property to this child   
                        
                    )
            })}
            
        </>
    )
}