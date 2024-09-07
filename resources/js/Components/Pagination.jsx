import { Link } from '@inertiajs/react'


const Pagination = ({ meta }) => {
  return (
    <nav className='text-center mt-4'>
      {meta.links.map((link) => (
        <Link
          preserveScroll
          href={link.url || ""}
          className={"inline-block py-2 mx-2 px-3 rounded-lg text-sm text-gray-200 "
            + (link.active ? "bg-gray-950 " : " ")
            + (meta.current_page == link.label ? "!text-gray-400 cursor-not-allowed " : " ")
            + (!link.url ? "!text-gray-500 cursor-not-allowed " : " hover:bg-gray-950")
          }
          key={link.label} dangerouslySetInnerHTML={{ __html: link.label }}>

        </Link>
      ))
      }
    </nav >
  )
}

export default Pagination
