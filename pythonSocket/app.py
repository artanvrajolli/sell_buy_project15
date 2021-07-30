from aiohttp import web
import socketio
import pymongo
import random
import string
import time
import json
from bson.objectid import ObjectId
from copy import deepcopy



def get_database():
    from pymongo import MongoClient
    import pymongo

    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = "" 

    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    from pymongo import MongoClient
    client = MongoClient(CONNECTION_STRING)

    # Create the database for our example (we will use the same database throughout the tutorial
    return client['sbp15']





## creates a new Async Socket IO Server
sio = socketio.AsyncServer(async_mode='aiohttp', cors_allowed_origins='*')
## Creates a new Aiohttp Web Application
app = web.Application()

# Binds our Socket.IO server to our Web App
## instance
sio.attach(app)

## we can define aiohttp endpoints just as we normally
## would with no change



@sio.on('getMessages')
async def getMessages(sid,message):
    myDB = get_database()
    myCol = myDB['chat']
    #yourmongocoll.find({"$or":[ {"vals":1700}, {"vals":100}]})
    obj = {"$or":[{
            "seller": message.get('seller'),
            "client": message.get('client')
        },{
            "seller": message.get('client'),
            "client": message.get('seller')
        }

        ]
    }
    x = myCol.find_one(obj)

    if (not x):
        x = myCol.insert_one({
            "seller": message.get('seller'),
            "client": message.get('client'),
            "messages": [
                {
                    "sender": "60db91ce84700f15bcf9cbf7",
                    "message": "Welcome SBP15 Chat",
                    "timestamp": time.time() * 1000
                }
            ]
        })

        y = myCol.find_one(obj)
        await sio.emit('getMessages', y.get("messages"),sid)
    else:
        await sio.emit('getMessages',x.get("messages"),sid)
    clone_clientsList = ClientsList.copy()
    for key, value in clone_clientsList.items():

        if key == message.get("seller"):
            await inboxRender(value, {"userId": key})

## If we wanted to create a new websocket endpoint,
## use this decorator, passing in the name of the
## event we wish to listen out for
@sio.on('message')
async def print_message(sid, message):
    myDB = get_database()
    myCol = myDB["chat"]
    obj = {"$or":[{
            "seller": message.get('seller'),
            "client": message.get('client')
        },{
            "seller": message.get('client'),
            "client": message.get('seller')
        }

        ]
    }
    ClientsList[message.get('client')] = sid
    xfind = myCol.find_one(obj)
    messages = xfind.get("messages")
    messages.append({
                "sender": message.get("client"),
                "message": message.get("message"),
                "timestamp": time.time() * 1000
    })
    newval = {"$set": {'messages':messages}}
    x = myCol.update_one(obj,newval )
    print("Socket ID: ", sid)
    await sio.emit('message', messages,sid) # emit to current soket
    clone_clientsList = ClientsList.copy()
    for key,value in clone_clientsList.items():

        if key == message.get("seller"):
            await inboxRender(value,{"userId":key})


ClientsList = dict() #save socket sid of clients


@sio.on('inbox')
async def inboxRender(sid,data):
    ClientsList[data.get("userId")] = sid

    myDB = get_database()
    myCol = myDB["chat"]
    myUsers = myDB["users"]
    obj = {"$or": [{
        "seller": data.get('userId'),
    }, {
        "client": data.get('userId')
    }]
    }
    output = []
    for x in myCol.find(obj):
        userSender = None
        if (data.get("userId") == x.get("client")):
            userSender = x.get("seller")
        else:
            userSender = x.get("client")
        usernameSender = myUsers.find_one({"_id": ObjectId(userSender)})
        output.append({"sender": userSender, "usernameSender":usernameSender.get("username"), "messages": x.get("messages")})
    await sio.emit('inbox', output, sid)

#### Demo Zone begin
# ClientsListDemo = dict()
#
# @sio.on('test_connect')
# async def test_connect(sid,data):
#     ClientsListDemo[data.get("myname")] = sid;
#     print("sid:",sid,"data:",data)
#     await func1(data)
#
# async def func1(data):
#     for key,value in ClientsListDemo.items():
#         if key == data.get("toname"):
#             await sio.emit("test_connect",data,value)
#### Demo zone end


# run Server
if __name__ == '__main__':
    web.run_app(app)
