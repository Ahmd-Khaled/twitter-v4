import { ChartBarIcon, ChatBubbleOvalLeftEllipsisIcon, HeartIcon, ShareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { UserImage } from ".";


const Post = ({post}) => {
  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
      {/* <img src={post.userImage} className='hoverEffect h-11 w-11 p-1 rounded-full object-cover mr-4' /> */}
      {/* <div className="userImage mr-4">
        <UserImage srcImg={post.userImage} classes='h-11 w-11 rounded-full object-cover' />
      </div> */}
        <UserImage srcImg={post.userImage} classes='h-11 w-11 rounded-full object-cover mr-4' />
      <div className="postContent">
        <div className="postHead flex items-center justify-between">
          <div className="postHeadLeft flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{post.name}</h4>
            <span className="text-sm sm:text-[15px]">@{post.username} - </span>
            <span className="text-sm sm:text-[15px] hover:underline">{post.timestamp}</span>
          </div>
          <EllipsisHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-200 hover:text-sky-500 p-2" />
        </div>
        <div className="postText">
          <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">{post.text}</p>
        </div>
        <div className="postImage">
          <Image className="rounded-2xl" src={post.img} alt={post.img} width={520} height={400} />
        </div>
        <div className="postIcons flex justify-between items-center text-gray-500 p-2">
          <ChatBubbleOvalLeftEllipsisIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <TrashIcon className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
          <HeartIcon className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
          <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          <ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  )
}

export default Post;
