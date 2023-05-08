import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu } from '../utils/appSlice';
import { YOUTUBE_SEARCH_API } from '../utils/constants';
import { cacheResults } from '../utils/searchSlice';


const Head = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions,setShowSuggestions] = useState('');

    const searchCache = useSelector((store)=> store.search);

    /*

    */

    useEffect(()=>{
     const timer =  setTimeout(()=> {
        if(searchCache[searchQuery]){
            setSuggestions(searchCache[searchQuery]); 
        }
        else{
            getSearchsuggestions();
        }
       
    },200);
     return () =>{
        clearTimeout(timer);
     };
    },[searchQuery]);
    const getSearchsuggestions = async() =>{
const data = await fetch(YOUTUBE_SEARCH_API+ searchQuery);
const json = await data.json();
setSuggestions(json[1]);
//update cache
dispatch(cacheResults({
    [searchQuery]: json[1],
}));
    }
     const dispatch = useDispatch();
    const toggleMenuHAndler = () =>{
dispatch(toggleMenu())
    }

  return (
  
    <div className='grid grid-flow-col p-5 m-2 shadow-lg'>
        <div className='flex col-span-1'>
 
        <img className='h-8 cursor-pointer' onClick={()=>toggleMenuHAndler()} src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png' alt='menu'/>
      <a href='/'>  <img className='h-8 mx-2' src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png' alt='logo' /></a>
        </div>
        
        <div className='col-span-10 px-10'>
            <div>
            <input className='p-2 w-1/2 border border-gray-400 rounded-l-full' type='text'
            onFocus={()=>setShowSuggestions(true)}  onBlur={()=>setShowSuggestions(false)} onChange={(e)=>setSearchQuery(e.target.value)}/>
            <button className='py-2 px-5 bg-gray-50 border border-gray-400 rounded-r-full' > Search</button>

        </div>
        {showSuggestions &&
        <div className='fixed bg-white py-2 px-12 w-[37rem] shadow-lg rounded-lg border-gray-100'>
            <ul>
                {suggestions.map(searchItem=><li className='shadow-sm py-2 hover:bg-gray-100' key={searchItem}>{searchItem} </li>) }
            </ul>
        </div>
}
</div>
       
        <div className='col-span-1'>
            <img className='h-8' src='https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png' alt='usericon'/>
        </div>
        </div>
  )
}

export default Head