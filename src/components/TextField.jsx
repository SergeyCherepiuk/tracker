import React from 'react'

const TextField = ({ value, onValueChange, type, label, placeholder }) => {
  return (
    <div>
      <label for="textfield" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">{label}</label>
      <input
        id="textfield"
        type={type}
        value={value}
        onChange={e => onValueChange(e.target.value)}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-xl focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
        placeholder={placeholder}
        required />
    </div>
  )
}

export default TextField