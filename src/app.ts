import express from 'express';
import bodyParser from 'body-parser';

import route from './routes/todos'

const app=express();

app.use(bodyParser.json());

app.use(route);

app.listen(3000,()=>console.log("listening to 3000"));

