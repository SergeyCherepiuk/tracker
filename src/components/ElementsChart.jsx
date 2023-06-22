import ReactApexChart from "react-apexcharts";
import React, { useEffect } from "react";
import colors from 'tailwindcss/colors'
import { useState } from 'react'
import { fetchElementsBy } from "../hooks/fetchElement";

function arrayRotate(arr, times) {
  for (var i = 0; i < times; i++) {
    arr.push(arr.shift());
  }
  return arr;
}

function getMonths() {
  return arrayRotate(
    ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    new Date().getMonth() + 1
  )
}

function createMap(keys, items, predicate) {
  const map = new Map()
  keys.forEach((key) => {
    map.set(key, [])
  })
  items.forEach((item) => {
    const key = predicate(item)
    const arr = map.get(key)
    arr.push(item)
    map.set(key, arr)
  })
  keys.forEach((key) => {
    const arr = map.get(key)
    const sum = arr.reduce((accumulator, currentValue) => {
      return accumulator + currentValue["amount"]
    }, 0);
    map.set(key, sum)
  })
  return map
}

function getElementMonth(element) {
  const dateObj = new Date(element.date)
  const result = dateObj.toLocaleString('default', { month: 'short' })
  return result
}

function transformElements(elements) {
  const months = getMonths()
  const expenses = elements.filter((el) => el.isExpense)
  const incomes = elements.filter((el) => !el.isExpense)
  const expensesSummedUpByMonth = createMap(months, expenses, (expense) => getElementMonth(expense))
  const incomesSummedUpByMonth = createMap(months, incomes, (income) => getElementMonth(income))

  return {
    "months": months,
    "expenses": expensesSummedUpByMonth,
    "incomes": incomesSummedUpByMonth
  } 
}

const ElementsChart = ({ user, className }) => {
  const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  const [elements, setElements] = useState([])
  const [chartData, setChartData] = useState({ expenses: new Map(), incomes: new Map() })
  const [labelsState, setLabelsState] = useState(false)

  useEffect(() => {
    fetchElementsBy(user._id, "year").then(elements => setElements(elements))
  }, [])

  useEffect(() => {
    setChartData(transformElements(elements))
  }, [elements])

  const toggleLabels = () => {
    setLabelsState(!labelsState);
  };

  const state = {
    series: [
      {
        name: "Incomes",
        data: Array.from(chartData["incomes"].values()),
        color: colors.green["600"]
      },
      {
        name: "Expenses",
        data: Array.from(chartData["expenses"].values()),
        color: colors.orange["600"]
      }
    ],
    options: {
      dataLabels: {
        enabled: labelsState,
        formatter: currencyFormatter.format
      },
      "stroke.curve": 'smooth',
      xaxis: {
        type: 'date',
        categories: chartData["months"]
      },
      yaxis: {
        "title.text": "Amount ($, USD)",
        labels: { formatter: currencyFormatter.format }
      },
      tooltip: {
        "x.format": 'MMM',
        "y.formatter": currencyFormatter.format
      }
    }
  }

  return (
    <div id="chart" className={`${className}`}>
      <label>
        <input
          type="checkbox"
          checked={labelsState}
          onChange={toggleLabels}
          className="mr-2"
        />
        Show labels
      </label>
      <ReactApexChart options={state.options} series={state.series} type="area" height="100%"/>
    </div>
  );
};

export default ElementsChart;