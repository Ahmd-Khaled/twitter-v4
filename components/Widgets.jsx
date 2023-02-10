import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";


const Widgets = () => {
  return (
    <div className="widgets xl:w-[600px] hidden lg:inline ml-8 space-y-5">
      <div className="WidSearch w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50">
        <form className="WidSearchForm flex items-center p-3 bg-gray-300 rounded-full relative">
          <MagnifyingGlassIcon className="h-5 z-50 text-gray-500" />
          <input className="absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100" type='text' placeholder="Search Twitter" />
        </form>
      </div>
    </div>
  )
}

export default Widgets;
