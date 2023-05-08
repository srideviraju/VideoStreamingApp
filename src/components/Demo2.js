import React, { useState , useRef, useEffect} from 'react'

const Demo2 = () => {
    let x=0;
    // not like  ref=0
    // but ref= {current: 0}
    const ref = useRef(0);
    const [y,setY] = useState(0);
    const i = useRef(null);
    useEffect(()=>{
i.current = setInterval(()=>{
    console.log('hello',Math.random());
}, 1000)
return () => clearInterval(i.current);
    },[])
  return (
    <div className='m-4 p-2 border border-black bg-slate-50 w-96 h-96'>
        <div>
            <button className= 'bg-green-100 px-2 m-4' onClick={()=>{ x= x+1; console.log(x)}}>Increase X</button>
            <span className='font-bold text-lg'>let = {x}</span>
           
        </div>
        <div>
            <button className= 'bg-green-100 px-2 m-4' onClick={()=>{setY(y+1)}}>Increase Y</button>
            <span className='font-bold text-lg'>State = {y}</span>
           
        </div>
        <div>
            <button className= 'bg-green-100 px-2 m-4' onClick={()=>{ref.current =ref.current + 1;console.log('ref', ref.current) }}>Increase Ref</button>
            <span className='font-bold text-lg'>Ref = {ref.current}</span>
           
        </div>
        <button className='bg-red-900 p-4 m-4 text-white font-bold rounded-sm' onClick={()=>{clearInterval(i.current)}}>stop Printing</button>
    </div>
  )
}

export default Demo2