import express from 'express'
import mainRoutes from './api-routes/router'
import database from './config/database.config'
import { join } from 'path'
import cors from 'cors'

const app = express()
app.use(cors({
    origin: '*'
}));
app.use(express.json());
app.use(express.urlencoded());
database()

app.use('/', mainRoutes);
app.use("/images", express.static(join(__dirname, '../public/images')))

app.listen(3000,()=>{
    console.log(`Server started on port 3000`)
})