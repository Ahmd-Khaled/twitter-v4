import Image from "next/image"

const UserImage = () => {
  return (
    <Image
      src='/imgs/ahmed-khaled.jpg' alt='user-img'
      width={40} height={40}
      className='h-10 w-10 rounded-full object-cover xl:mr-2'
    />
  )
}

export default UserImage;
