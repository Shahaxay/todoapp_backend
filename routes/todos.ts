import {Router} from 'express';

import { ToDo } from '../models/todos';
import { text } from 'body-parser';

const router=Router();

let todo_array:ToDo[]=[];

router.post('/add-todo',(req,res,next)=>{
    const todo_obj={
        id:new Date().toISOString(),
        text:req.body.text
    }
    todo_array.push(todo_obj);
    res.json(todo_array);

})

router.delete('/delete-todo',(req,res,next)=>{
    const id=req.body.id;
    let length=todo_array.length;
    for(let i=0;i<length;i++){
        if(todo_array[i].id===id){
            todo_array.splice(i,1);
            break;
        }
    }
    if(todo_array.length==length){
        return res.status(404).json({message:"item not found"});
    }
    res.status(201).json({status:"success"});
})

router.put('/edit-todo',(req,res,next)=>{
    const id=req.body.id;
    let index=todo_array.findIndex((item)=>item.id===id);
    if(index>=0){
        todo_array[index].text=req.body.text;
        return res.status(201).json({status:"success"});

    }else{
        res.status(404).json({message:"item not found"});
    } 
})

router.get('/',(req,res,next)=>res.status(201).json(todo_array));

export default router;