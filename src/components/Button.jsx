import React from 'react'

const Button = ({ action, label, color, className }) => {
  return (
    <button
      type="button"
      onClick={() => action()}
      className={`${className} focus:outline-none text-white ${color} hover:${color} focus:ring-0 my-4 font-medium rounded-lg text-lg px-5 py-2.5`}
    >
      {label}
    </button>
  )
}

export default Button