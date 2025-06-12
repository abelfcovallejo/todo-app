import { useState } from "react";

export function TodoInput (props) {
    
    const {hadndleAddTodo} = props;
    const [inputValue, setInputValue] = useState('');
    //console.log(inputValue);

    // The input logic makes the input to add the value into inputValue and the on change invokes the setInputValue to update the inputValue

    // The logic of the button verifies if the inputValue has a value, if not, returns, if it does then calls the handleAddTodo
    return (
        <div className="input-container">
            
            <input value={inputValue} onChange={(e) => {
                setInputValue(e.target.value)

            }} placeholder="Add task"/>
            <button onClick={() => {
                if (!inputValue) {return};
                hadndleAddTodo(inputValue);
                setInputValue('');
            }}>
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>
    )
}