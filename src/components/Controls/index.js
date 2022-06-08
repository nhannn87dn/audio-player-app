import React from 'react'
import {
  IoIosShuffle,
  IoIosSkipBackward,
  IoIosPlay,
  IoIosPause,
  IoIosSkipForward,
  IoIosRepeat
} from "react-icons/io";

import styles from "./controls.module.css";
import PropTypes from 'prop-types';

function Controls({isPlay,isRepeat, isShuffer, callback}) {
    /* Callback to parent */
    const handleClick = (actionName)=> {
        if(callback && typeof callback === 'function'){
          callback(actionName);
        }
    };
  return (
    <>
        <div className={styles.playing_controls}>
                <div className={styles.controls_shuffle} title="Shuffle" onClick={() => handleClick('shuffer')}>
                  <IoIosShuffle color={isShuffer? '#4834d4': '#a4b0be'} />
                </div>
                <div className={styles.controls_pre} title="Pre" onClick={() => handleClick('previous')}>
                  <IoIosSkipBackward color="#a4b0be" />
                </div>
                
                  {isPlay ? (
                    <div
                    className={styles.controls_playpause}
                    title="Play Or Pause"
                    onClick={() => handleClick('pause')}
                  ><IoIosPause color="#fff" /></div>
                  ) : (
                    <div
                    className={styles.controls_playpause}
                    title="Play Or Pause"
                    onClick={() => handleClick('play')}
                  ><IoIosPlay color="#fff" /></div>
                  )}
                
                <div
                  className={styles.controls_next}
                  title="Next"
                  onClick={() => handleClick('next')}
                >
                  <IoIosSkipForward color="#a4b0be" />
                </div>
                <div className={styles.controls_repeat} title="Repeat" onClick={() => handleClick('repeat')}>
                  <IoIosRepeat color={isRepeat? '#4834d4': '#a4b0be'} />
                </div>
              </div>
    </>
  )
}

Controls.propTypes = {
  callback: PropTypes.func,
  isPlay: PropTypes.bool,
  isRepeat: PropTypes.bool,
  isShuffer: PropTypes.bool
}


export default React.memo(Controls)