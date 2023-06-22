import React from 'react'

const Switch = ({ value, onValueChange, label }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" checked={value} onClick={(e) => onValueChange(e.target.checked)} className="sr-only peer"/>
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
      <span className="ml-3 text-lg font-medium text-gray-900 dark:text-gray-300">{label}</span>
    </label>
  )
}

export default Switch