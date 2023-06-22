import { ArrowUpCircleIcon, ArrowDownCircleIcon } from '@heroicons/react/24/solid'

const ListElement = ({ element, action, className }) => {
  const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  
  return (
    <li key={element.id} className={`${className} flex justify-between gap-x-6 py-3`}>
      <button onClick={() => action()} className="flex grow gap-x-4 items-center bg-white shadow-sm p-4 rounded-xl">
        {element.isExpense ? (
          <ArrowDownCircleIcon className="h-8 w-8 text-orange-600" />
        ) : (
          <ArrowUpCircleIcon className="h-8 w-8 text-green-500" />
        )}
        <div className="min-w-0 flex-auto">
          <p className="text-lg font-medium leading-6 text-gray-900 text-start">{element.title}</p>
          <p className="mt-1 truncate font-normal text-md leading-5 text-gray-500 text-start">{element.category}</p>
        </div>
        {element.isExpense ? (
          <p className="text-lg font-semibold leading-6 text-orange-600">-{currencyFormatter.format(element.amount)}</p>
        ) : (
          <p className="text-lg font-semibold leading-6 text-green-500">+{currencyFormatter.format(element.amount)}</p>
        )}
      </button>
    </li>
  );
};

export default ListElement;