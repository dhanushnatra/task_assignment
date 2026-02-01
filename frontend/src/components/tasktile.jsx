import edit_icon from '../assets/edit_icon.svg'
import delete_icon from '../assets/delete_icon.svg'
import add_icon from '../assets/add_icon.svg'
import {toggle_task,delete_task} from '../utils/api_calls.js'

import { useEffect } from 'react'



function TaskTile({id,title, description, is_done,onClickEdit,onClickDelete}) {
  
  useEffect(() => {
    console.log(`is_done: ${title}, ${is_done}`);
  }, []);
  
  const handleToggle = (e) => {
    console.log(`Toggling task ${id} to ${e.target.checked}`);
    // await add_task({title:new_title, description:new_description});
    toggle_task({task_id:id, is_done:e.target.checked ? 1 : 0});
  }


  return (
    <div className="flex flex-row items-center justify-between 
    pl-4 pr-4 md:px-10 border-2 h-20 md:mx-10 mb-4 w-[90%] md:w-[70%]
    border-slate-500 text-slate-200 lg:w-[40%] 
    rounded-lg bg-slate-800 hover:bg-slate-700 transition-all duration-200 ease-in-out"
    >
      
      <div className="flex items-center">
        <input 
          type="checkbox" 
          className="peer rounded w-5 h-5 cursor-pointer mr-4  checked:accent-slate-400 md:w-6 md:h-6"
          onChange={async(e)=>{
            await handleToggle(e);
          }}
          defaultChecked={is_done}
        />
      </div>

      <div className="flex flex-col justify-center px-2 w-[70%]">
        <h2 className="font-bold text-md md:text-text-xl lg:text-2xl">{title}</h2>
        <p className='text-sm md:text-md text-slate-300'>{description}</p>
      </div>

      <div className="flex items-center space-x-2 w-8 mr-7 flex-end md:w-10 ">
        <img src={edit_icon} alt="Edit" className="cursor-pointer" onClick={() => onClickEdit(id)} />
        <img src={delete_icon} alt="Delete" className="cursor-pointer" onClick={() => onClickDelete(id)} />
      </div>
    </div>

    );
}

function TaskHeader({onClickAdd}) {
  return <div className="flex flex-row justify-between items-center w-full px-10 lg:w-[40%]">
          <div className="text-2xl lg:text-3xl font-bold mb-5">Tasks</div>
          <img src={add_icon} alt="Add Task" className="w-8 lg:w-10 ml-4 cursor-pointer" onClick={onClickAdd}/>
    </div>
  
}


export {  TaskTile, TaskHeader }