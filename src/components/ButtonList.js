import React from 'react'
import Button from './Button'

const list = ['All','Game','Songs','News','Soccer','Cooking','Cricket']
const ButtonList = () => {
  return (
    <div className='flex'>
        {list.map((item,index)=>( <Button name={item} key={index}/>)
       )}
       
        
    </div>
  )
}

export default ButtonList