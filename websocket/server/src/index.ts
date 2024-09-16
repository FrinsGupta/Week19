import express from "express"
import { WebSocketServer, WebSocket } from "ws"

const app = express();
app.get('/',(req,res)=>{
    res.json({msg:"Hi there from server"})
})
const httpServer = app.listen(8080);

const wss = new WebSocketServer({server: httpServer})

wss.on('connection',function connection(ws){
  ws.on('error',console.error);
  ws.on('message',function message(data,isBinary){
    wss.clients.forEach(function each(client){
        if (client.readyState === WebSocket.OPEN) {
            client.send(data,{binary: isBinary})
        }
    })
  })
  ws.send("Helo, Message form webScoket")
})