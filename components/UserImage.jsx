import Image from "next/image"

const UserImage = ({ classes, srcImg }) => {
  return (
    <Image
      src={srcImg} alt='user-img'
      width={40} height={40}
      // fill
      className={`${classes}`}
    />
  )
}

export default UserImage;
