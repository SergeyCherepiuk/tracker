import React from 'react'
import { HiTrendingUp } from '@react-icons/all-files/hi/HiTrendingUp';
import { HiTrendingDown } from '@react-icons/all-files/hi/HiTrendingDown';

const Panel = ({ isExpense, amount, percent, className }) => {
  const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  const label = isExpense ? "Monthly expenses" : "Monthly incomes"
  var color
  if (isExpense) {
    color = (percent > 0.0) ? "text-red-400" : "text-green-400"
  } else {
    color = (percent > 0.0) ? "text-green-400" : "text-red-400"
  }
  const icon = (percent > 0.0) ? <HiTrendingUp className={color}/> : <HiTrendingDown className={color}/>

  return (
    <div className={`${className} flex flex-col items-start bg-white rounded-2xl shadow-sm p-4 gap-2`}>
      <span className='text-lg'>{label}</span>
      <span className='text-3xl font-semibold'>{currencyFormatter.format(amount)}</span>
      <div className='flex flex-row items-center'>
        {icon}
        <span className={`${color} text-lg`}>{((percent > 0.0) ? "+" : "-") + Math.abs(percent)}%</span>
        <span className='text-lg '>&nbsp;vs last 30 days</span>
      </div>
    </div>
  )
}

export default Panel