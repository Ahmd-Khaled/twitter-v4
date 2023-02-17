import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import Modal from 'react-modal';
import Moment from 'react-moment';
import { modalState, postIdState } from '../atom/modalAtom';
import { db } from '@/firebase';
import { addDoc, collection, doc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { FaceSmileIcon, PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { UserImage } from '.';
import { useRouter } from 'next/router';

const CommentModal = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const [postId] = useRecoilState(postIdState);
  const [post, setPost] = useState({});
  const [input, setInput] = useState('');
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    onSnapshot(
      doc(db, 'posts', postId),
      (snapshot) => { setPost(snapshot) }
    )
  }, [postId, db]);

  const sendComment = async () => {
    await addDoc(collection(db, 'posts', postId, 'comments'), {
      comment: input,
      name: session.user.name,
      username: session.user.username,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    setOpen(false);
    setInput('');
    router.push(`/posts/${postId}`);
  };

  return (
    <div>
      {open && (
        <Modal
          isOpen={open}
          onRequestClose={() => setOpen(false)}
          className='max-w-lg w-[90%] absolute top-24 left-[51%] translate-x-[-51%] bg-white border-2 border-gray-200 rounded-xl shadow-md outline-none'
        >
          <div className='p-1'>
            <div className='border-b border-gray-200 p-1'>
              <div onClick={() => setOpen(false)} className='hoverEffect w-9 h-9 flex items-center justify-center xl:p-1'>
                <XMarkIcon className='h-[22px] text-gray-700' />
              </div>
            </div>
            <div className='p-2 flex relative'>
              <span className='bg-gray-300 w-0.5 h-full z-[-1] absolute left-8 top-11' />
              <UserImage srcImg={post?.data()?.userImg} classes='h-11 w-11 rounded-full object-cover mr-4' />
              <div>
                <div className="flex items-center space-x-1 whitespace-nowrap">
                  <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">{post?.data()?.name}</h4>
                  <span className="text-sm sm:text-[15px]">@{post?.data()?.username} - </span>
                  <span className="text-sm sm:text-[15px] hover:underline">
                    <Moment fromNow>{post?.data()?.timestamp?.toDate()}</Moment>
                  </span>
                </div>
                <p className='text-gray-500 text-[15px] sm:text-[16px]'>{post?.data()?.text}</p>
              </div>
            </div>
            
            <div className="flex p-3 space-x-3">
              <div>
                <UserImage srcImg={session?.user.image} classes='h-11 w-11 rounded-full object-cover mr-4' />
                {/* <img src={session?.user.image} alt='' className="hoverEffect h-16 w-16 rounded-full object-cover xl:mr-2" /> */}
              </div>
              <div className="w-full divide-y divide-gray-200">
                <div className="">
                  <textarea
                    className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
                    rows={2} placeholder="Tweet your reply" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>
                <div className="flex justify-between items-center pt-2.5">
                  <div className="flex">
                    <div className="">
                      <PhotoIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                      {/* <input onChange={addImageToPost} type='file' ref={filePickerRef} hidden /> */}
                    </div>
                    <FaceSmileIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                  </div>
                  <button onClick={sendComment} disabled={!input.trim()} className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">Reply</button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default CommentModal;
