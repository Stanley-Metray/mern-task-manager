const Spinner = (props) => {
    return (
        <div className={`${props.display} w-100 justify-content-center py-3`} >
            <div className="spinner-grow text-primary" role="status">
                <span className="visually-hidden px-1">Loading...</span>
            </div>
            <div className="spinner-grow text-success" role="status">
                <span className="visually-hidden px-1">Loading...</span>
            </div>
            <div className="spinner-grow text-danger" role="status">
                <span className="visually-hidden px-1">Loading...</span>
            </div>
            <div className="spinner-grow text-warning" role="status">
                <span className="visually-hidden px-1">Loading...</span>
            </div>
        </div>
    )
}

export default Spinner;