interface Props {
  filterON: string
  handleFilter: (e: any, filterON: string) => void
  filterOption: any
}

const Filter: React.FC<Props> = ({ filterON, handleFilter, filterOption }) => {
  return (
    <>
      <select
        onChange={(e) => {
          handleFilter(e, filterON)
        }}
        //  / id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-25 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {filterOption.map((filter: any) => (
          <option value={filter.value}>{filter.name}</option>
        ))}
      </select>
    </>
  )
}

export default Filter
