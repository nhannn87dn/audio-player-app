import React from 'react'
import styles from "./album.module.css";
import PropTypes from 'prop-types';

function AlbumInfo({audioIndex,tracks = []}) {
  return (
    <div className={styles.playing_info}>
    <h3 className={styles.playing_info_singname}>
    {tracks[audioIndex].title}
    </h3>
    <p className={styles.playing_info_artist}>
    {tracks[audioIndex].artist}
    </p>
</div>
  )
}

AlbumInfo.protoType = {
    tracks: PropTypes.array,
    audioIndex: PropTypes.number
}
export default React.memo(AlbumInfo);