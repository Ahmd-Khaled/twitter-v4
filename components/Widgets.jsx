import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { News } from ".";


const Widgets = ({ newsResults, randomUsersResults }) => {
  const [articleNum, setArticleNum] = useState(3);
  const [randomUserNum, setRandomUserNum] = useState(3);

  return (
    <div className="widgets xl:w-[600px] hidden lg:inline ml-8 space-y-5">
      <div className="WidSearch w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50">
        <form className="WidSearchForm flex items-center p-3 bg-gray-300 rounded-full relative">
          <MagnifyingGlassIcon className="h-5 z-50 text-gray-500" />
          <input className="absolute inset-0 rounded-full pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white bg-gray-100" type='text' placeholder="Search Twitter" />
        </form>
      </div>
      <div className="text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%]">
        <h4 className="font-bold text-xl px-4">What's happening</h4>
        <div className="">
          {newsResults.slice(0,articleNum).map((article) => (
            <News key={article.title} article={article} />
          ))}
        </div>
        <button onClick={() => setArticleNum(articleNum+3)} className="text-blue-400 pl-4 pb-3 hover:text-blue-600">Show more</button>
      </div>
      <div className="sticky top-16 text-gray-700 space-y-3 bg-gray-100 rounded-xl pt-2 w-[90%] xl:w-[75%]">
        <h4 className="font-bold text-xl px-4">Who to follow</h4>
        <div className="">
          {randomUsersResults.slice(0,randomUserNum).map((randomUser) => (
            <div className='flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200' key={randomUser.login.username}>
              <img className="rounded-full" src={randomUser.picture.thumbnail} alt={randomUser.login.username} width={40} />
              <div className="truncate ml-4 leading-5 mr-4">
                <h4 className="font-bold hover:underline text-[14px] truncate">{randomUser.login.username}</h4>
                <h5 className=" text-[13px] text-gray-500 truncate">{`${randomUser.name.first} ${randomUser.name.last}`}</h5>
              </div>
              <button className="ml-auto bg-sky-500 text-white rounded-full text-sm px-2.5 py-1.5 font-bold">Follow</button>
            </div>
          ))}
        </div>
        <button onClick={() => setRandomUserNum(randomUserNum+3)} className="text-blue-400 pl-4 pb-3 hover:text-blue-600">Show more</button>
      </div>
    </div>
  )
}

export default Widgets;