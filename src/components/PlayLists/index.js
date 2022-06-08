import React from 'react'
import EqualizerIcon from '../EqualizerIcon';
import LoveButton from '../LoveButton';
import PropTypes from 'prop-types';
import styles from "./playlist.module.css";

function PlayListItem({ id, cover, name, artist, time, callback, isPlay }) {
 
  /* Callback to parent */
  const handleOnClick = () => {
    if (callback && typeof callback === 'function') {
      callback();
    }
  };

  return (
    <li className={styles.audios__item}>
      <span className={styles.audios__item_id}>
        {isPlay ? <EqualizerIcon /> : id}
      </span>
      <span className={styles.audios__item_thumb}>
        <img src={cover} height={50} alt="{name}" onClick={handleOnClick} />
      </span>
      <span className={styles.audios__item_name} onClick={handleOnClick}>
        {name}
      </span>
      <span className={styles.audios__item_artist}>{artist}</span>
      <span className={styles.audios__item_time}>{time}</span>
      <span className={styles.audios__item_like}>
        <LoveButton />
      </span>
    </li>
  );
}

function PlayList({tracks, isPlay, audioIndex, callback }){

  const listItems = tracks.map((row, index) => (
    <PlayListItem
      key={index.toString()}
      isPlay={isPlay && audioIndex === index}
      id={index + 1}
      src={row.src}
      cover={row.cover}
      name={row.title}
      artist={row.artist}
      time={row.time}
      callback={() => {
        if (callback && typeof callback === 'function') {
          callback(index);
        }
      }}
    />
  ));

  return (
    <ul className={styles.audios__list}>{listItems}</ul>
  )
}

PlayListItem.protoType = {
  id: PropTypes.number,
  isPlay: PropTypes.bool,
  name: PropTypes.string,
  callback: PropTypes.func,
  cover: PropTypes.string,
  artist: PropTypes.string,
  time: PropTypes.string
}


PlayList.protoType = {
  tracks: PropTypes.array,
  isPlay: PropTypes.bool,
  audioIndex: PropTypes.number,
  callback: PropTypes.func
}


export default PlayList