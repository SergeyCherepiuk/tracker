import React from 'react';
import ListElement from './ListElement';
import ElementsListDate from './ElementsListDate';
import TabsRow from './TabsRow';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchElementsBy } from "../hooks/fetchElement"

function groupBy(items, key) {
  const map = new Map()
  items.forEach((item) => {
    const keyValue = item[key]
    const arr = map.has(keyValue) ? map.get(keyValue) : []
    arr.push(item)
    map.set(keyValue, arr)
  });
  return map
}

const ElementsList = ({ className }) => {
  const navigate = useNavigate()
  const tabs = ["Day", "Week", "Month", "3-Months", "Year", "All"]
  const [elements, setElements] = useState([])
  const [selectedTab, setSelectedTab] = useState("Month")
  const [elementsByDate, setElementsByDate] = useState(new Map())
  const [dates, setDates] = useState([])
  
  useEffect(() => {
    fetchElementsBy(selectedTab.toLowerCase()).then(elements => setElements(elements))
  }, [selectedTab])

  useEffect(() => {
    const groupedByDate = groupBy(elements, "date")
    setElementsByDate(groupedByDate)
    setDates(Array.from(new Set(groupedByDate.keys())))
  }, [elements])

  return (
    <div className={`${className} flex flex-col`}>
      <TabsRow
        tabs={tabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab} />
      <ul role="list" className={`overflow-y-scroll scrollbar py-4 px-8`}>
        {dates.map(date => (
          <div>
            <li key={date}><ElementsListDate date={date}/></li>
            {elementsByDate.get(date).map((element) => (
              <ListElement action={() => navigate(`/details/${element._id}`)} element={element}/>
            ))}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ElementsList;