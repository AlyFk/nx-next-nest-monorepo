import Image from 'next/image';
import type { IUser } from '@dpg-code-challenge/data';

const imgLoader = ({ src }: { src: string }) => {
  return src;
};

type UserCardProps = Pick<IUser, 'id' | 'avatar_url' | 'login'>

const UserCard: React.FC<UserCardProps> = ({
  id,
  avatar_url,
  login,
}) => {
  return (
    <figure className="flex flex-col items-center p-8 transition-colors duration-200 transform group rounded-xl">
      <div className="w-32 h-32 rounded-full ring-4 ring-gray-300 relative overflow-hidden">
        <Image
          src={avatar_url}
          loader={imgLoader}
          alt={`avatar-${login}`}
          layout="fill"
          unoptimized
        />
      </div>

      <figcaption className="mt-4 text-2xl font-semibold text-gray-700 capitalize">
        {login}
      </figcaption>

      <p className="mt-2 text-gray-500 capitalize">User ID: {id}</p>
    </figure>
  );
};

export default UserCard;
