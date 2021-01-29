import React, { useState } from 'react';
import './Video.mobile.css';
import './Video.style.css';
import './Video.tablet.css';


const Video = ({ url }) => {
  const [play, handlePlay] = useState(false);
  return (
    <div className='video'>
      {
        play
        ? <iframe title='video' className='video__item' src={`${url}?autoplay=1`} frameBorder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowFullScreen='allowFullScreen' />
        : <div className='video__preview' onClick={() => handlePlay(true)} />
      }
    </div>
  );
};


export default Video;
