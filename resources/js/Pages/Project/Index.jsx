import Pagination from "@/Components/Pagination"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head, Link, router } from "@inertiajs/react"
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/Pages/contants"
import TextInput from "@/Components/TextInput"
import SelectInput from "@/Components/SelectInput"

import TableHeading from "@/Components/TableHeading"


const Index = ({ auth, projects, queryParams = null }) => {
  queryParams = queryParams || {};

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value
    } else {
      delete queryParams[name]
    }

    router.get(route("project.index"), queryParams);
  }

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;
    searchFieldChanged(name, e.target.value);
  }

  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc"
      } else {
        queryParams.sort_direction = "asc"
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }
    router.get(route("project.index"), queryParams);
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">All Projects</h2>}
    >
      <Head title="All Projects" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase  data:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr className="text-nowrap">
                    <TableHeading name="id" sortChanged={sortChanged} sort_direction={queryParams.sort_direction} sort_field={queryParams.sort_field} >
                      ID
                    </TableHeading>
                    <TableHeading name="image" sortChanged={sortChanged} sort_direction={queryParams.sort_direction} sort_field={queryParams.sort_field} sortable={false}>
                      Image
                    </TableHeading>
                    <TableHeading name="name" sortChanged={sortChanged} sort_direction={queryParams.sort_direction} sort_field={queryParams.sort_field} >
                      Name
                    </TableHeading>
                    {/* <th className="p-3">Description</th> */}
                    <TableHeading name="status" sortChanged={sortChanged} sort_direction={queryParams.sort_direction} sort_field={queryParams.sort_field} sortable={false}>
                      Status
                    </TableHeading>
                    <TableHeading name="created_at" sortChanged={sortChanged} sort_direction={queryParams.sort_direction} sort_field={queryParams.sort_field} >
                      Created At
                    </TableHeading>
                    <TableHeading name="due_date" sortChanged={sortChanged} sort_direction={queryParams.sort_direction} sort_field={queryParams.sort_field} >
                      Due Date
                    </TableHeading>
                    <TableHeading name="createdBy" sortChanged={sortChanged} sort_direction={queryParams.sort_direction} sort_field={queryParams.sort_field} sortable={false} >
                      Created By
                    </TableHeading>
                    <TableHeading name="actions" sortChanged={sortChanged} sort_direction={queryParams.sort_direction} sort_field={queryParams.sort_field} sortable={false}  >
                      Actions
                    </TableHeading>
                  </tr>
                </thead>
                <thead className="text-xs text-gray-700 uppercase  data:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr className="text-nowrap">
                    <th className="p-3"></th>
                    <th className="p-3"></th>
                    <th className="p-3"><TextInput defaultValue={queryParams.name} className="w-full" placeholder="Project Name"
                      onBlur={(e) => searchFieldChanged("name", e.target.value)}
                      onKeyPress={(e) => onKeyPress("name", e)} /></th>
                    <th className="p-3">
                      <SelectInput defaultValue={queryParams.status} className="w-full"
                        onChange={(e) => searchFieldChanged("status", e.target.value)}>
                        <option value="">Select Status</option>
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </SelectInput>
                    </th>
                    {/* <th className="p-3"></th> */}
                    <th className="p-3"> </th>
                    <th className="p-3"> </th>
                    <th className="p-3"> </th>
                    <th className="p-3 text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  {projects.data.map((project) => (
                    <tr key={project.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-3 py-2">{project.id}</td>
                      <td className="px-3 py-2">
                        <img src={project.image_path} style={{ width: 60 }} alt={project.name} />
                      </td>
                      <td className="px-3 py-2">{project.name}</td>
                      {/* <td className="px-3 py-2">{project.description}</td> */}
                      <td className="px-3 py-2">
                        <span className={"px-3 py-2 rounded text-white " + `${PROJECT_STATUS_CLASS_MAP[project.status]}`}>
                          {PROJECT_STATUS_TEXT_MAP[project.status]}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-nowrap">{project.created_at}</td>
                      <td className="px-3 py-2 text-nowrap">{project.due_date}</td>
                      <td className="px-3 py-2">{project.created_by.name}</td>
                      <td className="px-3 py-2">
                        <Link href={route('project.edit', project.id)} className="font-medium text-blue-600 dark:text-blue-500 mx-1 hover:underline">Edit
                        </Link>
                        <Link href={route('project.destroy', project.id)} className="font-medium text-red-600 dark:text-red-500 mx-1 hover:underline">Delete
                        </Link>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination meta={projects.meta} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>

  )
}

export default Index
