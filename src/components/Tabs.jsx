const getNumberOfTasks = (tab,todos) => {
    const numberOfTasks = tab === 'All' ? todos.length 
        : tab === 'Open' ? todos.filter(val =>  !val.complete).length
        : todos.filter(val =>  val.complete).length;

    return numberOfTasks;
}


export function Tabs (props) {
    const {todos, selectedTab,setSelectedTab} = props;
    
    const tabs = ['All','Open','Completed'];
    return(
        <nav className="tab-container">
            {tabs.map((tab,tabIndex) => {
                const numberOfTasks = getNumberOfTasks(tab,todos);
                return (
                    <button onClick={()=>setSelectedTab(tab)} key={tabIndex} className={"tab-button " +
                       (tab === selectedTab ? ' tab-selected' : ' ') 
                     }>
                        <h4>{tab} <span>({numberOfTasks})</span> </h4>
                    </button>
                )
            })}
            <hr />
        </nav>
    )
}