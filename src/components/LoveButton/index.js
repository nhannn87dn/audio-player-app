import React, {useState}  from 'react'
import {IoMdHeart} from 'react-icons/io';

function LoveButton() {
    const [like, setLike] = useState(false);
    const handleLike = () => {
      setLike(!like);
    };
    
    let activeLike = like ? "#ff867e" : "#888";

  return (
    <>
    <IoMdHeart onClick={handleLike} color={activeLike} />
    </>
  )
}

export default LoveButton