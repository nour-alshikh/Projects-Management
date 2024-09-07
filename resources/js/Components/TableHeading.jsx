

import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { ChevronUpIcon } from '@heroicons/react/24/solid'

const TableHeading = ({ sort_field = null, sort_direction = null, name, sortable = true, children, sortChanged = () => { } }) => {
  return (
    <th onClick={e => sortChanged(name)} className="p-3">
      <div className="flex">
        {children}
        {sortable &&
          <div>
            <ChevronUpIcon className={"w-4 font-bold " + (sort_field == name && sort_direction == "asc" ? "text-white" : "")} />
            <ChevronDownIcon className={"w-4 font-bold " + (sort_field == name && sort_direction == "desc" ? "text-white" : "")} />
          </div>}

      </div>
    </th>
  )
}

export default TableHeading
