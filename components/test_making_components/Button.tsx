import React from 'react'

interface ButtonProps{
    text: string,
    onClick: () => void,
    additionalStyles?: string,
}

function Button({text, onClick, additionalStyles=""}: ButtonProps) {
  return (
    <button onClick={onClick} className={`border-2 border-gray-400 px-5 py-2 rounded-md ml-5 w-fit ${additionalStyles}`}>{text}</button>
  )
}

export default Button