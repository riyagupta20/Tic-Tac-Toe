import React from 'react';
const Box = ({value, key, onClick}) => {
  return (
    <button 
      key={key}
      className={`box ${value == "X" ? "x":"o"}`} onClick={onClick}>
      {value}
    </button>
  )
}
export default Box;