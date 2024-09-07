
import Pagination from "@/Components/Pagination"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head, Link } from "@inertiajs/react"

const Index = ({ auth, tasks }) => {
  return (
    <AuthenticatedLayout
      user={auth.user}
      header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">All Tasks</h2>}
    >
      <Head title="All Tasks" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 data:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                  <tr className="text-nowrap">
                    <th className="p-3">ID</th>
                    <th className="p-3">Image</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Project Name</th>
                    {/* <th className="p-3">Description</th> */}
                    <th className="p-3">Status</th>
                    <th className="p-3">Created Date</th>
                    <th className="p-3">Due Date</th>
                    <th className="p-3">Created By</th>
                    <th className="p-3">Assigned By</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.data.map((task) => (
                    <tr key={task.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td className="px-3 py-2">{task.id}</td>
                      <td className="px-3 py-2">
                        <img src={task.image_path} style={{ width: 60 }} alt={task.name} />
                      </td>
                      <td className="px-3 py-2">{task.name}</td>
                      <td className="px-3 py-2">{task.project.name}</td>
                      {/* <td className="px-3 py-2">{task.description}</td> */}
                      <td className="px-3 py-2">{task.status}</td>
                      <td className="px-3 py-2 text-nowrap">{task.created_at}</td>
                      <td className="px-3 py-2 text-nowrap">{task.due_date}</td>
                      <td className="px-3 py-2">{task.created_by.name}</td>
                      <td className="px-3 py-2">{task.assigned_user_id.name}</td>
                      <td className="px-3 py-2">
                        <Link href={route('task.edit', task.id)} className="font-medium text-blue-600 dark:text-blue-500 mx-1 hover:underline">Edit
                        </Link>
                        <Link href={route('task.destroy', task.id)} className="font-medium text-red-600 dark:text-red-500 mx-1 hover:underline">Delete
                        </Link>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination meta={tasks.meta} />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>

  )
}

export default Index
