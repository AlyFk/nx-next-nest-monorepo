import Image from 'next/image';
import type { IUser } from '@dpg-code-challenge/data';

const imgLoader = ({ src }: { src: string }) => {
  return src;
};

type UserCardProps = Pick<IUser, 'id' | 'avatar_url' | 'login'>;

const UserCard: React.FC<UserCardProps> = ({ id, avatar_url, login }) => {
  return (
    <figure className="group flex transform flex-col items-center rounded-xl p-8 transition-colors duration-200">
      <div className="relative h-32 w-32 overflow-hidden rounded-full ring-4 ring-gray-300">
        <Image
          priority={true}
          src={avatar_url}
          loader={imgLoader}
          alt={`avatar-${login}`}
          layout="fill"
          unoptimized
        />
      </div>

      <figcaption className="mt-4 text-2xl font-semibold capitalize text-gray-700">
        {login}
      </figcaption>

      <p className="mt-2 capitalize text-gray-500">User ID: {id}</p>
    </figure>
  );
};

export default UserCard;
