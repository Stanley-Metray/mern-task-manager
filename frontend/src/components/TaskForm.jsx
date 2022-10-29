
const TaskForm = (props)=>{
    return(
        <form onSubmit={props.handleFormSubmit}>
            <div className="input-group">
                <input type="text" className="form-control" onChange={props.handleInputChange} value={props.value}/>
                <button className="btn btn-primary px-4" type="submit">{props.isEditing ? "Update" : "Add"}</button>
            </div>
        </form>
    )
}

export default TaskForm;