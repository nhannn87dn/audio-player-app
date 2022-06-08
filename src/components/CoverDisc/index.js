import React from 'react';
import styles from "./disc.module.css";
import PropTypes from 'prop-types';

function CoverDisc({isPlay=false,audioIndex=0,tracks = []}) {
  let cover = tracks[audioIndex].cover;
  return (
    <div className={styles.playing_cover_wrapper} >
        <div
        className={
            isPlay ? styles.playing_cover + (' ') +  styles.rotate : styles.playing_cover
        }
        style={{
            backgroundImage: `url(${cover})`
        }}
        >
        <span className={styles.playing_cover_disc}></span>
        </div>
    </div>  
  )
}
CoverDisc.protoType = {
    tracks: PropTypes.array,
    isPlay: PropTypes.bool,
    audioIndex: PropTypes.number
}

export default React.memo(CoverDisc);