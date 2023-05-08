import React, { useEffect, useState } from 'react'
import ChatMessage from './ChatMessage'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../utils/chatSlice';
import { generateRandomName , generateRandomMessage} from '../utils/helper';

const LiveChat = () => {
    const [liveMessage, setLiveMessage] = useState('');
    const dispatch = useDispatch();
    const chatMessages = useSelector(store=>store.chat.messages);
    useEffect(()=>{
   const i =   setInterval(()=>{
//API polling
dispatch(addMessage({
    name: generateRandomName(),
    message: generateRandomMessage(20),
}))
        },2000);
        return ()=>clearInterval(i);
     
    },[])
  return (
    <>
    <div className='w-full h-[500px] ml-2 p-2 border  border-black bg-slate-100 rounded-lg overflow-y-scroll flex-col-reverse'>
       {chatMessages.map((c,index)=><ChatMessage  key={index} name={c.name} message={c.message}/> )} 
      
    </div>
    <form className='w-full p-2 ml-2 border border-black' 
    onSubmit={(e)=>{
         e.preventDefault() ; 
         dispatch(addMessage({
    name: 'sridevi',
    message: liveMessage,
}))
setLiveMessage('')
}
}>
<input className='w-96 px-2' type='text'  value={liveMessage} onChange={(e)=> setLiveMessage(e.target.value)}/>
<button className='bg-green-700 px-2 mx-2'>Send</button>
    </form>
    </>
  )
}

export default LiveChat