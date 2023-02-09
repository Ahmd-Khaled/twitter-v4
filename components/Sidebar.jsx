import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import Image from "next/image"
import { SidebarMenuItem, UserImage } from "./";
import { IconsList } from './assets/IconsList';


const Sidebar = () => {
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full">
      <div className="hoverEffect p-0 hover:bg-blue-100 xl:px-1">
        <Image
          // src='/../components/assets/imgs/twitter-logo.png'
          src="/imgs/twitter-logo.png"
          alt='Twitter logo'
          width={50} height={50} 
        />
      </div>
      <div className="mt-4 mb-2.5 xl:items-start">
        {IconsList.map((item) => (
          <SidebarMenuItem
            key={item.id}
            text={item.text}
            Icon={item.icon}
            active={item?.active} 
          />
        ))}
      </div>
      <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline">Tweet</button>
      <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
        <UserImage srcImg='/imgs/ahmed-khaled.jpg' classes="hoverEffect h-16 w-16 rounded-full object-cover xl:mr-1" />
        <div className="leading-5 hidden xl:inline">
          <h4 className="font-bold">Ahmed Khaled</h4>
          <p className="text-gray-500">@ahmd.khaldd</p>
        </div>
        <EllipsisHorizontalIcon className="h-6 xl:ml-8 hidden xl:inline" />
      </div>
    </div>
  )
}

export default Sidebar;