import Image from 'next/image'

type Props = {
  name: string
  picture: string
}

const Profile = ({ name, picture }: Props) => {
  return (
    <div className="flex flex-col my-6 items-center">
      <Image src={picture} width={96} height={96} layout="fixed" className="rounded-full" />
      <div className="text-xl font-bold underline"><a href="https://twitter.com/cs_nagu" target="_blank">{name}</a></div>
    </div>
  )
}

export default Profile
