import Image from "next/image"

const UserImage = ({ classes, srcImg, onClick }) => {
  return (
    <Image
      onClick={onClick}
      src={srcImg} alt='user-img'
      width={40} height={40}
      // fill
      className={`${classes}`}
    />
  )
}

export default UserImage;
