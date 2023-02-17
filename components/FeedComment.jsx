import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { ArrowLeftIcon, SunIcon } from "@heroicons/react/24/outline";
import { collection, doc, onSnapshot, orderBy, query } from "firebase/firestore";
import { Post, Comment } from ".";
import { useRouter } from "next/router";


const FeedComment = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);

  // get post data
  useEffect(() => {
    onSnapshot(doc(db, 'posts', id),
    (snapshot) => { setPost(snapshot); }
    )
  }, [db, id]);

  // get post comments
  useEffect(() => {
    onSnapshot(
      query(
        collection(db, 'posts', id, 'comments'),
        orderBy('timestamp', 'desc')
    ), (snapshot) => setComments(snapshot.docs))
  }, [db, id]);

  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex items-center justify-between py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-300">
        <div className="flex items-center space-x-2">
          <div className="hoverEffect p-2" onClick={() => router.push('/')}>
            <ArrowLeftIcon className="h-5" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Tweet</h2>
        </div>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SunIcon className="h-5" />
          {/* <MoonIcon className="h-5" /> */}
        </div>
      </div>
      <Post id={id} post={post} />
      <div>
        {comments.length > 0 && (
          comments?.map((comment) => (
            <Comment key={comment.id} id={comment.id} comment={comment?.data()} />
          ))
        )}
      </div>
    </div>
  )
}

export default FeedComment;
