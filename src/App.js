import React, { useState, useRef } from "react";


import "./App.css";
import { audios } from "./Data";
import Controls from "./components/Controls";
import SliderTime from "./components/SliderTime";
import CoverDisc from "./components/CoverDisc";
import AlbumInfo from "./components/AlbumInfo";
import PlayList from "./components/PlayLists";

function App() {
  const audioRef = useRef();
  const [audioIndex, setAudioIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlay, setPlay] = useState(false);
  const [isRepeat, setRepeat] = useState(true);
  const [isShuffer, setShuffer] = useState(false);

  const total = audios.length;

  /* sự kiện click các button controls */
  const handleControls = (action)=> {
    switch(action) {
      case 'play':
            audioRef.current.play();
            setPlay(true);
        break;
      case 'pause':
          audioRef.current.pause();
          setPlay(false);
        break;
      case 'next':
          setAudioIndex((audioIndex + 1) % total);
        break;
      case 'previous':
          setAudioIndex((audioIndex - 1) % total);
        break;
      case 'repeat':
          console.log('repeat');
          setRepeat(!isRepeat);
          /* trộn bài luôn tắt khi repeat false */
          setShuffer(!isRepeat ? false: false);
        break;
      case 'shuffer':
          /* trộn bài cho phép tắt bật khi repeat true */
          setShuffer(isRepeat ? !isShuffer : false);
        break;
      default:
        
    }
  }

  /* Kéo thanh time thì cập nhật */
  const handleTimeSliderChange = ({ x }) => {
    audioRef.current.currentTime = x;
    setCurrentTime(x);

    if (!isPlay) {
      setPlay(true);
      audioRef.current.play();
    }
  };

  /* tính toán bài tiếp theo để gán vào sự kiện onEnded khi kết thúc 1 bài */
  const handeonEnded = ()=> {
      /* mặc định tự chuyển bài kế tiếp */
      if(isRepeat){
          /* tính toán bài hát tiếp theo được chạy với mặt định là bài kế tiếp  */
          let nextID = (audioIndex + 1) % total;
          /* khi shuffer bật thì chạy random và khác bài hiện tại */
          if(isShuffer){
            const randomID = Math.floor(Math.random() * (total-1)) + 0;
            nextID = randomID === audioIndex ? nextID : randomID;
          }
          console.log(nextID);
          setAudioIndex(nextID);
          setPlay(true);
      } 
      else {
        /* nếu đang play ở bài cuối của danh sách */
        if(audioIndex === total -1){
          setAudioIndex((audioIndex + 1) % total);
          if (isPlay) {
            setPlay(false);
            audioRef.current.pause();
          }
         
        }
      }
  };



  return (
    <main className="App">
      <div className="main_container">
        <div className="layout_wrapper">
          <div className="layout_left">
            <h2 className="audios__list_title" style={{}}>
              TOP 10 Songs
            </h2>
            <PlayList isPlay={isPlay} audioIndex={audioIndex} tracks={audios} callback={(currentIndex) => {
              setAudioIndex(currentIndex);
              setPlay(true);
            }} />
          </div>
          <div className="layout_right">
            <h2 className="playing_title">Now Playing</h2>
            <div className="playing_box">
              <div className="playing_now">
                <audio
                    ref={audioRef}
                    src={audios[audioIndex].src}
                    onLoadedData={() => {
                      setDuration(audioRef.current.duration);
                      if (isPlay) audioRef.current.play();
                    }}
                    onTimeUpdate={() =>
                      setCurrentTime(audioRef.current.currentTime)
                    }
                    onEnded={handeonEnded}
                  />
                <CoverDisc isPlay={isPlay} audioIndex={audioIndex} tracks={audios} />
                <AlbumInfo audioIndex={audioIndex} tracks={audios}/>
                <SliderTime currentTime={currentTime} duration={duration} callback={handleTimeSliderChange} />
              </div>
              <Controls isPlay={isPlay} isRepeat={isRepeat} isShuffer={isShuffer} callback={handleControls} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
