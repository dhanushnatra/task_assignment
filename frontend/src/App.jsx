import { useEffect, useState } from "react"
import {TaskHeader,TaskTile} from "./components/tasktile"
import AddCard from "./components/addCard"
import {get_all_tasks,delete_task} from "./utils/api_calls"
import UpdateCard from "./components/updateCard"

function Tasks() {
  const [tasks, setTasks] = useState([])
  const [openaddPopup, setOpenaddPopup] = useState(false);
  const [openupdatePopup, setOpenupdatePopup] = useState(false);
  const [update_title, setUpdateTitle] = useState("");
  const [update_description, setUpdateDescription] = useState("");
  const [update_task_id, setUpdateTaskId] = useState(null);
  const [update_isdone, setUpdateIsDone] = useState(false);

  const reload =()=> window.location.reload();

  const fetchTasks = () => {
    get_all_tasks().then((data) => {
      setTasks(data["tasks"]);
    });
  }
  
  useEffect(() => {
    fetchTasks();
  }, [openaddPopup, openupdatePopup]);

  return <>
    <div className="flex flex-col items-center 
    justify-center 
    mt-10
    ">
      <TaskHeader onClickAdd={() => {
        setOpenaddPopup(true);
      }} />
      {openaddPopup &&
      <div className="fixed top-0 left-0 w-full h-full">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"
        onClick={() => setOpenaddPopup(false)}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        bg-slate-900 p-6 rounded-lg z-10 border-3 border-slate-700
        ">
          <AddCard
            onAdd={() => { 
              setOpenaddPopup(false);
              reload();
             }}
          />
        </div>
      </div>
      }
      {openupdatePopup &&
      <div className="fixed top-0 left-0 w-full h-full">
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"
        onClick={() => setOpenupdatePopup(false)}
        >
        
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
        bg-slate-900 p-6 rounded-lg z-10 border-3 border-slate-700
        ">
          <UpdateCard
            title={update_title}
            description={update_description}
            is_done={update_isdone}
            task_id={update_task_id}
            onUpdate={() => {
              setOpenupdatePopup(false);
              reload();
            }}
          />
        </div>
      </div>
      }
      <div className="flex flex-col w-full self-center items-center 
      mt-5
      ">
        {tasks && tasks.map((task, index) => (
        <TaskTile 
          key={task['id']}
          id={task['id']} 
          title={task['title']} 
          description={task['description']} 
          is_done={task['is_done']} 
          onClickEdit={() => {
            setOpenupdatePopup(true);
            setUpdateTaskId(task['id']);
            setUpdateTitle(task['title']);
            setUpdateDescription(task['description']);
            setUpdateIsDone(task['is_done']);
          }}
          onClickDelete={async()=>{
            await delete_task(task['id']);
            fetchTasks();
          }}
        />
      ))}
        </div>
    </div>
  </>

}

function App() {
  return (
    <div className="App">
      <Tasks />
    </div>
  )
}


export default App
