import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null)
  const [latestMessage, setLatestMessage] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
   const newSocket = new WebSocket('ws://localhost:8080')

   newSocket.onopen = () => {
      console.log("WebSocket Connection Established");
      newSocket.send("Hello WebSocket")
      setSocket(newSocket)
   }

   newSocket.onmessage = (message) => {
     console.log("Message received", message.data)
     setLatestMessage(message.data)
   }

   return () => newSocket.close();
  }, [])
  
  if (!socket) {
    return <div>
      Connection Loading...
    </div>
  }

  return (
    <>
    <input onChange={(e)=>{setMessage(e.target.value)}} type="text" />
    <button onClick={()=>{
      socket.send(message)
    }}>Send</button>
     {latestMessage}
    </>
  )
}

export default App
