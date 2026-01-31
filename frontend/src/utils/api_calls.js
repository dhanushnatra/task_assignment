import { transformWithEsbuild } from "vite";

var base_ip='localhost';
const baseUrl = `http://${base_ip}:5000/tasks/`

const get_all_tasks= async() => {
    try{
        const res = await fetch(baseUrl,{
            method:'GET',
        });
        if (res.ok){
            return res.json()
        }
        else{
            throw Error('error occured while get all tasks')
        }
    }
    catch (e){
        console.log(e)
    }
}


const add_task=async(title,description)=>{
    try{
        const res = await fetch(baseUrl,{
            method:'POST',
            body:JSON.stringify(
                {
                    title,description
                }
            )
        });
        if (res.ok) return res.json()
        else throw Error('error Adding Title'+title+'description'+description)
    }
    catch (e){
        console.log(e)
    }
}


const delete_task=async(task_id)=>{
    try{

    const res = await fetch(baseUrl+task_id,{
        method:"DELETE"
    })
    if (res.ok) return res.json()
    else throw Error('error deleting the task'+task_id)
    }
    catch (e){
        console.log(e)
    }
}


const update_task=async(task_id,title,description)=>{
    try{
        const res = await fetch(baseUrl+task_id,{
            method:'PUT',
            body:JSON.stringify(
                {
                    title,description
                }
            )
        });
        if (res.ok) return res.json()
        else throw Error('error updating task'+title+task_id+description)
    }
    catch (e){
        console.log(e)
    }
}

const get_one_task=async(task_id)=>{
    try{
        const res = await fetch(baseUrl+task_id,{
            method:"GET",
        });
        if (res.ok) return res.json()
        else throw Error('error getting task of id '+task_id)
    }
    catch (e){
        console.log(e)
    }
}