import { db, storage } from "@/firebase";
import { FaceSmileIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useSession, signOut } from "next-auth/react";
import { useRef, useState } from "react";
import { UserImage } from ".";

const Input = () => {
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const filePickerRef = useRef(null);
  // console.log(session);
  // console.log(session?.user.image);
  // console.log(input);

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    }
  };

  console.log(selectedFile);

  const sendPostHandler = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, 'posts'), {
      id: session.user.uid,
      text: input,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
      name: session.user.name,
      username: session.user.username,
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`)
    
    if (selectedFile) {
      await uploadString(imageRef, selectedFile, 'data_url')
        .then(async () => {
          const downloadURL = await getDownloadURL(imageRef);
          await updateDoc(doc(db, 'posts', docRef.id), {
            image: downloadURL,
          })
        });
    }

    setInput('');
    setSelectedFile(null);
    setLoading(false);
  };

  return (
    <>
      {session &&
        <div className="flex border-b border-gray-200 p-3 space-x-3">
          <div >
            {/* <UserImage srcImg={session?.user.image} classes="hoverEffect h-16 w-16 rounded-full object-cover xl:mr-2" /> */}
            <img onClick={signOut} src={session?.user.image} alt='' className="hoverEffect h-16 w-16 rounded-full object-cover xl:mr-2" />
          </div>
          <div className="w-full divide-y divide-gray-200">
            <div className="">
              <textarea
                className="w-full border-none focus:ring-0 text-lg placeholder-gray-700 tracking-wide min-h-[50px] text-gray-700"
                rows={2} placeholder="What's happening?" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            {selectedFile && (
              <div className="relative">
                <XMarkIcon
                  onClick={() => setSelectedFile(null)}
                  className="absolute right-0 h-8 text-white bg-gray-500 cursor-pointer hover:text-red-600 hover:bg-slate-300 shadow-sm shadow-white" 
                />
                <img className={`${loading && 'animate-pulse'}`} src={selectedFile} alt="" />
              </div>
            )}
            <div className="flex justify-between items-center pt-2.5">
              {!loading && (
                <>
                  <div className="flex">
                    <div className="" onClick={() => filePickerRef.current.click()}>
                      <PhotoIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                      <input onChange={addImageToPost} type='file' ref={filePickerRef} hidden />
                    </div>
                    <FaceSmileIcon className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                  </div>
                  <button onClick={sendPostHandler} disabled={!input.trim()} className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50">Tweet</button>
                </>
              )}
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default Input;
