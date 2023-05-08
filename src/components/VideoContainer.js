import React, { useEffect, useState } from 'react'
import { YOUTUBE_VIDEOS_API } from '../utils/constants';
import VideoCard from './VideoCard';
import { Link } from 'react-router-dom';
import { AdvideoCard } from './VideoCard';
const VideoContainer = () => {
    const [videos,setVideos] = useState([])
    useEffect(()=>{
getVideos();
    },[]);
    const getVideos = async() =>{
        const data = await fetch(YOUTUBE_VIDEOS_API);
        const json = await data.json();
        setVideos(json.items);
    }
  return (
    <div className='flex flex-wrap'>
    
    {/* { videos[0] &&   <AdvideoCard info={videos[0]}/>} */}
        {videos.map(video =>(
       <Link to={'/watch?v='+video.id} key={video.id}>  <VideoCard info={video} />   </Link>))}

    </div>
  )
}

export default VideoContainer