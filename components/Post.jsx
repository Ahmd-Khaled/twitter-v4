import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import Moment from 'react-moment';
import Image from "next/image";
import { collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db, storage } from "@/firebase";
import { deleteObject, ref } from "firebase/storage";
import { ChartBarIcon, ChatBubbleOvalLeftEllipsisIcon, HeartIcon, ShareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/24/solid";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { UserImage } from ".";

import { useRecoilState } from 'recoil';
import { modalState, postIdState } from '../atom/modalAtom';


const Post = ({ post, id }) => {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'posts', id, 'likes'),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'posts', id, 'comments'),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db]);

  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === session?.user.uid) !== -1);
  }, [likes]);

  const likePost = async () => {
    if (session) {
      if (hasLiked) {
        await deleteDoc(doc(db, 'posts', id, 'likes', session?.user.uid));
      } else {
        await setDoc(doc(db, 'posts', id, 'likes', session?.user.uid), {
          username: session.user.username,
        })
      }
    } else {
      signIn();
    };
  };

  const deletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deleteDoc(doc(db, 'posts', id));
      if (post?.data()?.image) {
        deleteObject(ref(storage, `posts/${id}/image`));
      }
      router.push('/')
    }
  };

  const commentToPost = () => {
    if (!session) {
      signIn();
    } else {
      setPostId(id);
      setOpen(!open);
    }
  };
  
  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200">
      {/* <img src={post.userImage} className='hoverEffect h-11 w-11 p-1 rounded-full object-cover mr-4' /> */}
      {/* <div className="userImage mr-4">
        <UserImage srcImg={post.userImage} classes='h-11 w-11 rounded-full object-cover' />
      </div> */}
      {/* <img src={post?.data()?.userImg} alt='' classes='h-11 w-11 rounded-full mr-4' /> */}
      <UserImage srcImg={post?.data()?.userImg} classes='h-11 w-11 rounded-full object-cover mr-4' />
      <div className="postContent flex-1">
        <div className="postHead flex items-center justify-between">
          <div className="postHeadLeft flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{post?.data()?.name}</h4>
            <span className="text-sm sm:text-[15px]">@{post?.data()?.username} - </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
            </span>
          </div>
          <EllipsisHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-200 hover:text-sky-500 p-2" />
        </div>
        <div className="postText">
          <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">{post?.data()?.text}</p>
        </div>
        <div className="postImage">
          {/* <Image className="rounded-2xl" src={post?.data()?.image} alt='' width={520} height={400} /> */}
          <img className="rounded-2xl" src={post?.data()?.image} alt='' width='100%' />
        </div>
        <div className="postIcons flex justify-between items-center text-gray-500 p-2">
          <div className="flex items-center w-11">
            <ChatBubbleOvalLeftEllipsisIcon onClick={commentToPost} className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
            {comments.length > 0 && <span className='text-sm select-none'>{comments.length}</span>}
          </div>

          {session?.user.uid === post?.data()?.id && 
            <TrashIcon onClick={deletePost} className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
          }

          <div className="flex items-center w-11">
            {hasLiked
              ?<HeartIconFilled onClick={likePost} className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100" />
              :<HeartIcon onClick={likePost} className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
            }
            {likes.length > 0 && <span className={`${hasLiked && 'text-red-600'} text-sm select-none`}>{likes.length}</span>}
          </div>

          <ShareIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />

          <ChartBarIcon className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  )
}

export default Post;
