/* const TasksUI = () => {

    return (

        <div className="container">
            <div id="task-container">

                <div id="form-wrapper">
                    <form id="form" onSubmit={this.handleSubmit}>
                        <div className="flex-wrapper">
                            <div style={{flex: 6}}>
                                <input id="title" className="form-control" onChange={this.handleChange} value={this.state.activeTask.title} type="text" name="title" placeholder="Add task.." />
                            </div>

                            <div style={{flex: 1}}>
                                <input id="submit" className="btn btn-warning" type="submit" name="Add" />
                            </div>
                        </div>
                    </form>
                </div>

                <div id="list-wrapper">

                    { tasks.map( (task, index) => {

                        return (
                            <div className="task-wrapper flex-wrapper" key={index}>
                                <div onClick={ () => superthis.strikeUnstrike(task) } style={{ flex:7 }}>

                                    
                                    {task.completed == false ? (
                                        
                                        <span>{task.title}</span>
                                    ) : (

                                        <strike>{task.title}</strike>
                                    )}

                                </div>

                                <div style={{ flex:1 }}>
                                    <button onClick={ () => { superthis.startEdit(task) } } className="btn btn-sm btn-outline-info">Edit</button>
                                </div>

                                <div style={{ flex:1 }}>
                                    <button onClick={ () => { superthis.deleteTask(task) } } className="btn btn-sm btn-outline-dark delete">Remove</button>
                                </div>
                            </div>
                        )

                    }) }

                </div>

            </div>
        </div>
    )
}

export default TasksUI */