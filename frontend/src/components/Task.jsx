

const Task = ({task, editing, index, deleteTask, setCompleted}) => {
    return (
        <>
            <li className={`list-group-item list-group-item-action`}>
                <div className="row">
                    <div className="col-8 d-flex justify-content-start overflow-auto">
                        <strong className="text-muted">{index + 1}.&nbsp;</strong>
                        <span className={`${task.completed && (
                            "text-success text-bold fw-bold"
                        )}`}>{task.name} {task.completed}</span>
                    </div>
                    <div className="col-4 d-flex justify-content-end">
                    <div className="btn-group btn-group-sm" role="group" aria-label="Basic outlined example">
                        <i name={task.name} onClick={()=>{setCompleted(task)}} className="bi bi-check-lg btn btn-outline-success align-content-center"></i>
                        <i name={task.name} id={task._id} onClick={editing} className="bi bi-pen-fill btn btn-outline-dark align-content-center"></i>
                        <i name={task.name} onClick={deleteTask} className="bi bi-trash btn btn-outline-danger btn-sm align-content-center"></i>
                    </div>
                    </div>
                </div>
            </li>
        </>
    )
}


export default Task;