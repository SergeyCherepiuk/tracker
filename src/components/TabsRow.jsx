const TabsRow = ({ className, tabs, selectedTab, setSelectedTab }) => {
  return (
    <div className={`${className} text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700`}>
      <ul className="flex flex-wrap -mb-px">
        {tabs.map(tab => (
          tab === selectedTab ? (
            <li className="mr-2">
              <button className="inline-block p-4 text-green-600 border-b-2 border-green-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" aria-current="page">{tab}</button>
            </li>
          ) : (
            <li className="mr-2">
              <button onClick={() => setSelectedTab(tab)} className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">{tab}</button>
            </li>
          )
        ))}
      </ul>
    </div>
  );
};

export default TabsRow