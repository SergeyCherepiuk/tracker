import React, { useEffect } from 'react'
import colors from 'tailwindcss/colors'
import Datepicker from 'flowbite-datepicker/Datepicker';

const DatePicker = ({ value, onValueChange, type, label, placeholder }) => {
  const dateFormatterOptions = { month: 'short', day: 'numeric', year: 'numeric' }

  useEffect(() => {
    const datepickerEl = document.getElementById('datepickerId');
    new Datepicker(datepickerEl, {}); 
  }, [])

  return (
    <div>
      <label for="datepickerId" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <div className="relative">
        <input
          datepicker
          datepicker-autohide
          id="datepickerId"
          type={type}
          color={colors.green["500"]}
          value={value.toLocaleDateString(dateFormatterOptions)}
          onSelect={e => {
            const newDate = new Date(e.target.value)
            newDate.setHours(0, 0, 0, 0)
            onValueChange(newDate)
          }}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-xl focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
          placeholder={placeholder}
          required />
      </div>
    </div>
  )
}

export default DatePicker