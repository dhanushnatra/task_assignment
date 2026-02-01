const baseUrl = `${import.meta.env.VITE_API_BASE_URL}/tasks`;


console.log("🔥 api_calls.js LOADED");


const get_all_tasks= async() => {
    try{
        const res = await fetch(baseUrl,{
            method:'GET',
        });
        if (res.ok){
            console.log(res.body)
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


const toggle_task=async({task_id,is_done})=>{
    try{
        const res = await fetch(baseUrl+'/'+task_id,{
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(
                {
                    is_done:is_done
                }
            )
        });
        if (res.ok) return res.json()
        else throw Error('error toggling task'+task_id)
    }
    catch (e){
        console.log(e)
    }
}


const add_task=async({title,description})=>{
    console.log("adding task", {title, description})
    try{
        const res = await fetch(baseUrl,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(
                {
                    title:title,
                    description:description
                }
            )
        });
        if (res.ok) {
            const resp = await res.json()
            console.log("Added task response:", resp['task'])
            return resp['task']
        }
        else throw Error('error Adding Title'+title+'description'+description)
    }
    catch (e){
        console.log(e)
    }
}


const delete_task=async(task_id)=>{
    try{
    const res = await fetch(baseUrl+'/'+task_id,{
        method:"DELETE"
    })
    if (res.ok) return res.json()
    else throw Error('error deleting the task'+task_id)
    }
    catch (e){
        console.log(e)
    }
}


const update_task=async({task_id,title,description,is_done})=>{
    try{
        const res = await fetch(baseUrl+'/'+task_id,{
            method:'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(
                {
                    title:title,
                    description:description,
                    is_done:is_done
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
        const res = await fetch(baseUrl+'/'+task_id,{
            method:"GET",
        });
        if (res.ok) return res.json()
        else throw Error('error getting task of id '+task_id)
    }
    catch (e){
        console.log(e)
    }
}

export {get_all_tasks,add_task,delete_task,update_task,get_one_task,toggle_task}