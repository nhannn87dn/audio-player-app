import React, { useEffect } from 'react'
import styles from "./slider.module.css";
import PropTypes from 'prop-types';
import TimeSlider from "react-input-slider";
/**
 * 
 * @param currentTime thời gian hiện tại của playing 
 * @param duration thời gian của song hiện tại
 * @param onChange callback function bắt lấy giá trị của thanh inout range để truyền callback ngoài
 * @returns 
 */

function SliderTime({currentTime, duration, callback}) {
    const  [currentValue, setcurrentValue] = React.useState(currentTime);
    useEffect(()=> {
        setcurrentValue(currentTime);
    },[currentTime]);

  const min_duration = duration / 60;
  const min_current = currentValue / 60;

  return (
    <div className={styles.playing_timeline}>
          <TimeSlider
            axis="x"
            xmax={duration}
            x={currentValue}
            onChange={callback}
            styles={{
              track: {
                backgroundColor: "#e3e3e3",
                height: "2px",
                width: "100%"
              },
              active: {
                backgroundColor: "#4834d4",
                height: "2px"
              },
              thumb: {
                marginTop: -1,
                width: 12,
                height: 12,
                backgroundColor: "#4834d4",
                borderRadius: 12
              }
            }}
          />
          <div className={styles.timeline_status}>
            <span className={styles.timeline_current}>
              {min_current.toFixed(2)}
            </span>{" "}
            <span className={styles.timeline_duration}>
              {min_duration.toFixed(2)}
            </span>
          </div>
        </div>
  )
}

SliderTime.propTypes = {
  callback: PropTypes.func,
  currentTime: PropTypes.number,
  duration: PropTypes.number
}

export default React.memo(SliderTime);