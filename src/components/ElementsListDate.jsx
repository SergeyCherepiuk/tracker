const ElementsListDate = ({ date, className }) => {
  const dateObj = new Date(date)
  const today = new Date()
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  dateObj.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)
  yesterday.setHours(0, 0, 0, 0)

  var dateFormatted
  if (dateObj >= today && dateObj <= today) {
    dateFormatted = "Today"
  } else if (dateObj >= yesterday && dateObj <= yesterday) {
    dateFormatted = "Yesterday"
  } else {
    dateFormatted = dateObj.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' })
  }
  
  return (
    <div className={`text-center ${className}`}>
      <p className="text-gray-500">{dateFormatted}</p>
    </div>
  );
};

export default ElementsListDate