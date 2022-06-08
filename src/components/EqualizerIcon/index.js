import React from 'react'

function EqualizerIcon() {
  return (
    <>
    <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            color="#4834d4"
            viewBox="0 0 24 24"
          >
            <rect
              className="eq-bar eq-bar--1"
              x="4"
              y="4"
              width="3.7"
              height="8"
            />
            <rect
              className="eq-bar eq-bar--2"
              x="10.2"
              y="4"
              width="3.7"
              height="16"
            />
            <rect
              className="eq-bar eq-bar--3"
              x="16.3"
              y="4"
              width="3.7"
              height="11"
            />
          </svg>
    </>
  )
}

export default EqualizerIcon