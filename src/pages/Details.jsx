import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchElement, addElement, updateElement, deleteElement } from "../hooks/fetchElement"
import Button from '../components/Button';
import TextField from "../components/TextField";
import TextFieldWithPrefix from "../components/TextFieldWithPrefix";
import DatePicker from "../components/DatePicker";
import Switch from "../components/Switch";
import Error from '../components/Error';

function addElementOrError(element, setErrorMessage, navigate) {
  addElement(element).then(response => {
    if (response.isOk) {
      navigate("/")
    } else {
      setErrorMessage(response.data.message)
    }
  })
}

function updateElementOrError(element, setErrorMessage, navigate) {
  updateElement(element).then(response => {
    if (response.isOk) {
      navigate("/")
    } else {
      setErrorMessage(response.data.message)
    }
  })
}

function deleteElementOrError(element, navigate) {
  deleteElement(element).then(response => {
    if (response.isOk) {
      navigate("/")
    }
  })
}

const Details = ({ user }) => {
  const params = useParams()
  const navigate = useNavigate()
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const [element, setElement] = useState({
    title: "",
    category: "",
    amount: 0.00,
    isExpense: true,
    date: today,
    userId: user._id
  })
  const [errorMessage, setErrorMessage] = useState(null)

  const isNewElement = element["_id"] == undefined
  var titlePlaceholder, amountPlaceholder
  if (element["isExpense"] == true) {
    titlePlaceholder = "Name your expense"
    amountPlaceholder = "How many have you spent?"
  } else {
    titlePlaceholder = "Name your income"
    amountPlaceholder = "How many have you received?"
  }

  useEffect(() => {
    if (params["id"] !== undefined) {
      fetchElement(user._id, params["id"])
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
    <div className="flex flex-col justify-center text-start m-auto h-screen gap-4 xl:w-1/3 lg:w-1/2 md:w-1/2">
      {errorMessage ? (
        <Error
          errorMessage={errorMessage}
          dismissError={() => setErrorMessage(null)}/>
      ) : (<></>)}
      <TextField
        value={element["title"]}
        onValueChange={newTitle => setTitle(newTitle)}
        type="text"
        label="Title"
        placeholder={titlePlaceholder} />
      <TextField
        value={element["category"]}
        onValueChange={newCategory => setCategory(newCategory)}
        type="text"
        label="Category"
        placeholder="Name your category" />
      <TextFieldWithPrefix
        value={element["amount"]}
        onValueChange={newAmount => setAmount(newAmount)}
        type="number"
        label="Amount"
        prefix="$"
        placeholder={amountPlaceholder} />
      <DatePicker
        value={element["date"]}
        onValueChange={newDate => setDate(newDate)}
        type="text"
        label="Date"
        placeholder="Select date" />
      <Switch 
        value={element["isExpense"]}
        onValueChange={newIsExpense => setIsExpense(newIsExpense)}
        label="Is expense?" />
      {isNewElement == true ? (
        <Button
          action={() => addElementOrError(element, setErrorMessage, navigate)}
          label="Add"
          color="bg-green-500" />
      ) : (
        <div className='flex flex-row gap-4'>
          <Button
            action={() => deleteElementOrError(element, navigate)}
            label="Delete"
            color="bg-red-600"
            className="flex-grow" />
          <Button
            action={() => updateElementOrError(element, setErrorMessage, navigate)}
            label="Save"
            color="bg-green-500"
            className="flex-grow" />
        </div>
      )}
    </div>
  );
}

export default Details;