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


const Comment = ({ comment, commentId, originalPostId }) => {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'posts', originalPostId, 'comments', commentId, 'likes'),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [db, originalPostId, commentId]);

  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === session?.user.uid) !== -1);
  }, [likes]);

  const likeComment = async () => {
    if (session) {
      if (hasLiked) {
        await deleteDoc(doc(db, 'posts',  originalPostId, 'comments', commentId, 'likes', session?.user.uid));
      } else {
        await setDoc(doc(db, 'posts', originalPostId, 'comments', commentId, 'likes', session?.user.uid), {
          username: session.user.username,
        })
      }
    } else {
      signIn();
    };
  };

  const deleteComment = async () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      deleteDoc(doc(db, 'posts', originalPostId, 'comments', commentId));
    }
  };

  const commentToPost = () => {
    if (!session) {
      signIn();
    } else {
      setPostId(originalPostId);
      setOpen(!open);
    }
  };
  
  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-200 pl-20">
      <UserImage srcImg={comment?.userImg} classes='h-11 w-11 rounded-full object-cover mr-4' />
      <div className="postContent flex-1">
        <div className="postHead flex items-center justify-between">
          <div className="postHeadLeft flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{comment?.name}</h4>
            <span className="text-sm sm:text-[15px]">@{comment?.username} - </span>
            <span className="text-sm sm:text-[15px] hover:underline">
              <Moment fromNow>{comment?.timestamp?.toDate()}</Moment>
            </span>
          </div>
          <EllipsisHorizontalIcon className="h-10 hoverEffect w-10 hover:bg-sky-200 hover:text-sky-500 p-2" />
        </div>
        <div className="postText">
          <p className="text-gray-800 text-[15px] sm:text-[16px] mb-2">{comment?.comment}</p>
        </div>
        <div className="postIcons flex justify-between items-center text-gray-500 p-2">
          <div className="flex items-center w-11">
            <ChatBubbleOvalLeftEllipsisIcon onClick={commentToPost} className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          </div>

          {session?.user.uid === comment?.userId && 
            <TrashIcon onClick={deleteComment} className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
          }

          <div className="flex items-center w-11">
            {hasLiked
              ?<HeartIconFilled onClick={likeComment} className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100" />
              :<HeartIcon onClick={likeComment} className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100" />
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

export default Comment;
