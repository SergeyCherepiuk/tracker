import React, { useEffect, useState } from 'react'
import Panel from './Panel'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import { fetchElementsBy, fetchElementsFromPreviousMonth } from "../hooks/fetchElement"
import { deleteUser, fetchUserById } from '../hooks/fetchUser'

function sum(array) {
  return array.reduce((acc, x) => acc + x, 0);
}

function logOut() {
  localStorage.removeItem("token")
  window.location.reload()
}

function transformElements(elementsThisMonth, elementsMonthAgo) {
  const totalExpensesThisMonth = sum(elementsThisMonth
    .filter(element => element.isExpense)
    .map(element => element.amount))
  const totalIncomesThisMonth = sum(elementsThisMonth
    .filter(element => !element.isExpense)
    .map(element => element.amount))
  const totalExpensesMonthAgo = sum(elementsMonthAgo
    .filter(element => element.isExpense)
    .map(element => element.amount))
  const totalIncomesMonthAgo = sum(elementsMonthAgo
    .filter(element => !element.isExpense)
    .map(element => element.amount))
  return {
    totalExpensesThisMonth: totalExpensesThisMonth,
    totalIncomesThisMonth: totalIncomesThisMonth,
    totalExpensesMonthAgo: totalExpensesMonthAgo,
    totalIncomesMonthAgo: totalIncomesMonthAgo,
    expensesPercent: getPercent(totalExpensesThisMonth, totalExpensesMonthAgo),
    incomesPercent: getPercent(totalIncomesThisMonth, totalIncomesMonthAgo)
  }
}

function getPercent(totalOfElementsThisMonth, totalOfElementsMonthAgo) {
  if (totalOfElementsMonthAgo == 0) {
    return 0
  }
  return ((totalOfElementsThisMonth - totalOfElementsMonthAgo) / totalOfElementsMonthAgo * 100).toFixed(2)
}

const SideBar = ({ userId, className }) => {
  const navigate = useNavigate()
  const [panelsData, setPanelsData] = useState({
    totalExpensesThisMonth: 0.0,
    totalIncomesThisMonth: 0.0,
    totalExpensesMonthAgo: 0.0,
    totalIncomesMonthAgo: 0.0,
    expensesPercent: 0.0,
    incomesPercent: 0.0
  })
  const [user, setUser] = useState(null)

  useEffect(() => {
    Promise.all([
      fetchElementsBy(userId, "month"),
      fetchElementsFromPreviousMonth(userId)
    ]).then(elements => {
      const data = transformElements(elements[0], elements[1])
      setPanelsData(data)
    })
    fetchUserById(userId).then(response => {
      if (response.isOk) {
        setUser(response.data)
      }
    })
  }, [])

  return (
    <div className={`${className} h-screen grid grid-rows-5 items-center justify-center`}>
      <Panel
        isExpense={true}
        amount={panelsData.totalExpensesThisMonth}
        percent={panelsData.expensesPercent} />
      <Panel
        isExpense={false}
        amount={panelsData.totalIncomesThisMonth}
        percent={panelsData.incomesPercent} />
      <div className='flex flex-col gap-2 row-span-2'>
        <p className='text-xl'>Logged in as {user ? user.firstName : "*User's first name*"}</p>
        <p className='text-lg'>{user ? user.email : "*User's email*"}</p>
        <Button
          label="Add"
          action={() => navigate("/details")}
          color="bg-green-500" />
        <Button
          label="Log out"
          action={() => logOut()}
          color="bg-gray-500" />
          <Button
          label="Delete account"
          action={() => {
            logOut()
            deleteUser(userId)
          }}
          color="bg-red-500" />
      </div>
    </div>
  )
}

export default SideBar