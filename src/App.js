import React, { useState, useRef } from "react";
import TimeSlider from "react-input-slider";
//import 'normalize.css';
import './App.css';
import {IoMdHeart, IoIosShuffle,IoIosSkipBackward, IoIosPlay, IoIosPause, IoIosSkipForward, IoIosRepeat } from 'react-icons/io';
import audios from './media'; 



function AudioItem({id, cover, name, artist, time, handle, isPlay}){
  const [like, setLike] = useState(false);
  const handleLike = () => {
    setLike(!like);
  }

  let activeLike = like ? "#ff867e" : '#888';

  return (
    <li className="audios__item" >
      <span className="audios__item_id">{isPlay ? (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" color="#4834d4" viewBox="0 0 24 24">
  <rect className="eq-bar eq-bar--1" x="4" y="4" width="3.7" height="8"/>
  <rect className="eq-bar eq-bar--2" x="10.2" y="4" width="3.7" height="16"/>
  <rect className="eq-bar eq-bar--3" x="16.3" y="4" width="3.7" height="11"/>
</svg>) : id}</span>
      <span className="audios__item_thumb"><img src={cover} height={50} alt="{name}" /></span>
      <span className="audios__item_name" onClick={handle}>{name}</span>
      <span className="audios__item_artist">{artist}</span>
      <span className="audios__item_time">{time}</span>
      <span className="audios__item_like"><IoMdHeart onClick={handleLike} color={activeLike} /></span>
  </li>
  )
}

function App() {

  const audioRef = useRef();
  const [audioIndex, setAudioIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlay, setPlay] = useState(false);


  const total = audios.length;

  const handleLoadedData = () => {
    setDuration(audioRef.current.duration);
    if (isPlay) audioRef.current.play();
  };

  const handlePausePlayClick = () => {
    if (isPlay) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlay(!isPlay);
  };

  const handleTimeSliderChange = ({ x }) => {
    audioRef.current.currentTime = x;
    setCurrentTime(x);

    if (!isPlay) {
      setPlay(true);
      audioRef.current.play();
    }
  };
  
  const handlePre = () => {
    setAudioIndex((audioIndex - 1) % total);
  }
  const handleNext = () => {
    setAudioIndex((audioIndex + 1) % total);
  }
 
 
  
  const min_duration = duration / 60;
  const min_current = currentTime / 60;
  //console.log(duration,currentTime);

  /**
   * Tự chuyển bài
   */
  const AutoNext = () => {
    
    setAudioIndex((audioIndex + 1) % total);
    setPlay(true);
   
    
  }


   const listItems = audios.map((row,index) => 
        <AudioItem key={index.toString()} isPlay={isPlay && audioIndex === index} id={index+1} src={row.src} cover={row.cover} name={row.title}  artist={row.artist} time={row.time} handle={() => {
          setAudioIndex(index);
          setPlay(true);
        }} />);

  return (
    <main className="App">
      <div className="main_container">
        <div className="layout_wrapper">
            <div className="layout_left">
              <h2 className='audios__list_title' style={{}}>TOP 10 Songs</h2>
                  <ul className="audios__list">
                     {listItems}
                  </ul>
            </div>
            <div className="layout_right">
            <h2 className='playing_title'>Now Playing</h2>
                <div className="playing_box">
                    
                    <div className="playing_now">
                      <div className="playing_cover_wrapper">
                          <div className={isPlay ? 'playing_cover rotate' : 'playing_cover'} style={{backgroundImage: `url(${audios[audioIndex].cover})`}}>
                            <span className="playing_cover_disc"></span>
                          </div>
                          <audio
                            ref={audioRef}
                            src={audios[audioIndex].src}
                            onLoadedData={handleLoadedData}
                            onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
                            onEnded={AutoNext}
                          />
                      </div>
                      <div className="playing_info">
                          <h3 className='playing_info_singname'>{audios[audioIndex].title}</h3>
                          <p className='playing_info_artist'>{audios[audioIndex].artist}</p>
                      </div>
                      <div className="playing_timeline">
                      <TimeSlider
                            axis="x"
                            xmax={duration}
                            x={currentTime}
                            onChange={handleTimeSliderChange}
                            styles={{
                              track: {
                                backgroundColor: "#e3e3e3",
                                height: "2px",
                                width: '100%'
                              },
                              active: {
                                backgroundColor: "#4834d4",
                                height: "2px",
                              },
                              thumb: {
                                marginTop: -1,
                                width: 12,
                                height: 12,
                                backgroundColor: "#4834d4",
                                borderRadius: 12,
                              },
                            }}
                          />
                          <div className="timeline_status">
                            <span className="timeline_current">{min_current.toFixed(2)}</span>  <span className="timeline_duration">{min_duration.toFixed(2)}</span>
                          </div>
                      </div>
                    </div>
                    <div className="playing_controls">
                       <div className="controls_shuffle" title="Shuffle">
                          <IoIosShuffle  color='#a4b0be'/>
                       </div>
                       <div className="controls_pre" title="Pre" onClick={handlePre}>
                          <IoIosSkipBackward color='#a4b0be' />
                       </div>
                       <div className="controls_playpause" title="Play Or Pause" onClick={handlePausePlayClick}>
                          {isPlay ?  <IoIosPause color='#fff' /> :  <IoIosPlay color='#fff' />}
                       </div>
                       <div className="controls_next" title="Next" onClick={handleNext}>
                         <IoIosSkipForward color='#a4b0be'/>
                       </div>
                       <div className="controls_repeat" title="Repeat">
                          <IoIosRepeat color='#a4b0be'/>
                       </div>
                  </div>
                </div>
                
            </div>
        </div>
      </div>
    </main>
  );
}

export default React.memo(App);
