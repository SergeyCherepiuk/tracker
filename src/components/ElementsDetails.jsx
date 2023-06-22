import TextField from './TextField';
import TextFieldWithPrefix from './TextFieldWithPrefix';
import DatePicker from './DatePicker';
import { useNavigate } from 'react-router-dom';
import Switch from './Switch';
import Button from './Button';

const ElementsDetails = ({ actions, element, setters, className }) => {
  const navigate = useNavigate()
  const isNewElement = element["_id"] == undefined
  var titlePlaceholder, amountPlaceholder
  if (element["isExpense"] == true) {
    titlePlaceholder = "Name your expense"
    amountPlaceholder = "How many have you spent?"
  } else {
    titlePlaceholder = "Name your income"
    amountPlaceholder = "How many have you received?"
  }

  return (
    <div className={`flex flex-col justify-center text-start m-auto h-screen gap-4 xl:w-1/3 lg:w-1/2 md:w-1/2 ${className}`}>
      <TextField
        value={element["title"]}
        onValueChange={newTitle => setters["title"](newTitle)}
        type="text"
        label="Title"
        placeholder={titlePlaceholder} />
      <TextField
        value={element["category"]}
        onValueChange={newCategory => setters["category"](newCategory)}
        type="text"
        label="Category"
        placeholder="Name your category" />
      <TextFieldWithPrefix
        value={element["amount"]}
        onValueChange={newAmount => setters["amount"](newAmount)}
        type="number"
        label="Amount"
        prefix="$"
        placeholder={amountPlaceholder} />
      <DatePicker
        value={element["date"]}
        onValueChange={newDate => setters["date"](newDate)}
        type="text"
        label="Date"
        placeholder="Select date" />
      <Switch 
        value={element["isExpense"]}
        onValueChange={newIsExpense => setters["isExpense"](newIsExpense)}
        label="Is expense?" />
      {isNewElement == true ? (
        <Button
          action={() => {
            actions["add"]()
            navigate("/")
          }}
          label="Add"
          color="bg-green-500" />
      ) : (
        <div className='flex flex-row gap-4'>
          <Button
            action={() => {
              actions["delete"]()
              navigate("/")
            }}
            label="Delete"
            color="bg-red-600"
            className="flex-grow" />
          <Button
            action={() => {
              actions["update"]()
              navigate("/")
            }}
            label="Save"
            color="bg-green-500"
            className="flex-grow" />
        </div>
      )}
    </div>
  )
}

export default ElementsDetails