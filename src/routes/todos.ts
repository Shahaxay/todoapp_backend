import {Router} from 'express';

import { ToDo } from '../models/todos';
import { text } from 'body-parser';

//alias
type reqestBody1= {text:string};
type reqestBody2= {id:string};
type requestBody3={text:string;id:string;};

const router=Router();

let todo_array:ToDo[]=[];

router.post('/add-todo',(req,res,next)=>{
    const body:reqestBody1=req.body;
    const todo_obj={
        id:new Date().toISOString(),
        text: body.text
    }
    todo_array.push(todo_obj);
    res.json(todo_array);

})

router.delete('/delete-todo',(req,res,next)=>{
    const body=req.body as reqestBody2;
    const id=body.id;
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
    const body=req.body as requestBody3;
    const id=body.id;
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