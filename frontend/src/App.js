import TaskList from "./components/TaskList";

export const URL = process.env.REACT_APP_SERVER_URL;

function App() {
  return (
    <div className="container mt-md-5">
        <div className="row">
            <div className="col-lg-6 mx-lg-auto">
                <TaskList/>
            </div>
        </div>
    </div>
  );
}

export default App;
