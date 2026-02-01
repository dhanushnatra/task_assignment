import {useState} from 'react'
import {add_task} from '../utils/api_calls';

function AddCard({onAdd}) {
    const [new_title, setTitle] = useState("")
    const [new_description, setDescription] = useState("")



    const handleSubmit = (e) => {
        e.preventDefault()
        add_task({title:new_title, description:new_description}).then((data) => {
                onAdd();
        });
        setTitle("")
        setDescription("")
    }

    return (
    <div className="flex flex-col items-center justify-center ">
            <div className="text-2xl lg:text-3xl font-bold mb-5">Add New Task</div>
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
            <button
                    type="submit"
                    className="bg-slate-600 text-slate-200 p-2 rounded-lg hover:bg-slate-500 transition-all duration-200 ease-in-out"
            >
                    Add Task
            </button>
            </form>
 </div>
)
}

export default AddCard