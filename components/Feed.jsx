import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { MoonIcon, SparklesIcon, SunIcon } from "@heroicons/react/24/outline";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { Input, Post } from ".";
import { AnimatePresence, motion } from "framer-motion";
// import { posts } from "./assets/posts";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(
    () => 
      onSnapshot(
        query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
        (snapshot) => { setPosts(snapshot.docs); }
      ),
    []
  );

  return (
    <div className="xl:ml-[370px] border-l border-r border-gray-200 xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
      <div className="flex items-center justify-between py-2 px-3 sticky top-0 z-50 bg-white border-b border-gray-300">
        <h2 className="text-lg sm:text-xl font-bold cursor-pointer">Home</h2>
        <div className="hoverEffect flex items-center justify-center px-0 ml-auto w-9 h-9">
          <SunIcon className="h-5" />
          {/* <MoonIcon className="h-5" /> */}
        </div>
      </div>
      <Input />
      <div>
        <AnimatePresence>
          {posts?.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1}}
            >
              <Post key={post.id} post={post} 
            />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Feed;
