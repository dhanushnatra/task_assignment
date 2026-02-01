import {useState} from 'react'
import {update_task} from '../utils/api_calls.js';

function UpdateCard({task_id,title, description, is_done,onUpdate}) {
    const [new_title, setTitle] = useState(title)
    const [new_description, setDescription] = useState(description)
    const [new_is_done, setIsDone] = useState(is_done)

    const handleSubmit =(e) => {
        e.preventDefault()
        update_task({task_id:task_id,title:new_title, description:new_description,is_done:new_is_done ? 1 : 0}).then((data) => {
            onUpdate();
        });
        setTitle("")
        setDescription("")
        setIsDone(false)
        
    }

  return (
    <div className="flex flex-col items-center justify-center w-full">
        <div className="text-2xl lg:text-3xl font-bold mb-5">Update Task</div>
        <form className="flex flex-col space-y-4 w-70 md:w-80 lg:w-96" 
        onSubmit={handleSubmit}
        >
        <input
            type="text"
            placeholder="Title"
            value={new_title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border-2 border-slate-500 rounded-lg bg-slate-800 text-slate-300 focus:outline-none focus:border-slate-400"
            required
        />
        <textarea

            placeholder="Description"
            value={new_description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border-2 border-slate-500 rounded-lg bg-slate-800 text-slate-300 focus:outline-none focus:border-slate-400"
            required
        />
        <div className="flex flex-row items-center space-x-2">
            <input
                type="checkbox"
                className="peer rounded w-3 h-3 cursor-pointer checked:accent-slate-400 md:w-5 md:h-5"
                checked={new_is_done}
                onChange={(e) => setIsDone(e.target.checked)}
            />
            <label className="text-slate-300 lg:text-2xl">Done</label>
        </div>
        <button
            type="submit"
            className="bg-slate-600 text-slate-200 p-2 rounded-lg hover:bg-slate-500 transition-all duration-200 ease-in-out"
        >
            Update Task
        </button>
        </form>
   </div>
  )
}

export default UpdateCard