const express = require("express");
const app = express();
const server = require("http").Server(app);
const {findObject, updateObject, deleteObject } = require('./utils/utils')

app.set("view engine", "ejs");
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))


var calls = [];

app.get("/videocall", (request, response)=>{
  let { hostid, guestid } = request.query
  if(!hostid || !guestid){
    response.send({
      statusCode: 400,
      errorMessage: "Bad Request",
      payload: null
    })
  }



  if(findObject(calls,hostid, guestid)[0] == 0){
    calls.push({
      hostid,
      guestid,
      hostpeer: null,
      guestpeer: null
    })
   
  }

  response.render("./videocall", {hostid, guestid})
})



app.post("/peers/list", (request, response)=>{
  let { hostPeer, hostid, guestid } = request.body
  calls = updateObject(calls,hostid, guestid, hostPeer)
  var [counter,object] = findObject(calls,hostid, guestid)
  response.send({
    statusCode: 200,
    errorMessage: null,
    payload: object[0]
  })
})

app.post("/peers/close", (request, response) => {
  let { hostid, guestid } = request.body

    calls = deleteObject(calls,hostid, guestid)
    response.send(null)
})

server.listen(3030, () => {
    console.log("Server started on port 3030")
})