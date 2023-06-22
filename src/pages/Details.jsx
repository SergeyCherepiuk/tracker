import { useEffect, useState } from 'react';
import ElementsDetails from '../components/ElementsDetails';
import { useParams } from 'react-router-dom';
import { fetchElement, addElement, updateElement, deleteElement } from "../hooks/fetchElement"

const Details = () => {
  const params = useParams()
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const [element, setElement] = useState({
    title: "",
    category: "",
    amount: 0.00,
    isExpense: true,
    date: today
  })

  useEffect(() => {
    if (params["id"] !== undefined) {
      fetchElement(params["id"])
        .then(element => setElement({
          ...element,
          "date": new Date(element["date"])
        }))
    }
  }, [])

  const setTitle = (title) => setElement({ ...element, "title": title })
  const setCategory = (category) => setElement({ ...element, "category": category })
  const setAmount = (amount) => setElement({ ...element, "amount": Number(amount) })
  const setIsExpense = (isExpense) => setElement({ ...element, "isExpense": isExpense })
  const setDate = (date) => setElement({ ...element, "date": date })

  return (
    <div>
      <ElementsDetails
        actions={{
          "add": () => { addElement(element) },
          "update": () => { updateElement(element) },
          "delete": () => { deleteElement(element) }
        }}
        element={element}
        setters={{
          "title": setTitle,
          "category": setCategory,
          "amount": setAmount,
          "isExpense": setIsExpense,
          "date": setDate
        }}/>
    </div>
  );
}

export default Details;