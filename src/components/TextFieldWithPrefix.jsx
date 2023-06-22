import React from 'react'

const TextFieldWithPrefix = ({ value, onValueChange, type, label, prefix, placeholder }) => {
  return (
    <div>
      <label for="textfieldwithprefix" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">{label}</label>
      <div class="flex">
        <span class="inline-flex items-center px-3 text-lg text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-xl dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
          {prefix}
        </span>
        <input
          id="textfieldwithprefix"
          type={type}
          value={value}
          onChange={e => onValueChange(e.target.value)}
          className="rounded-none rounded-r-xl bg-gray-50 border text-gray-900 focus:ring-green-500 focus:border-green-500 block flex-1 min-w-0 w-full text-lg border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          placeholder={placeholder}
          required />
      </div>
    </div>
  )
}

export default TextFieldWithPrefix