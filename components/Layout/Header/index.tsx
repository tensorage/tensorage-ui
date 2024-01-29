import Link from 'next/link';
import cn from 'classnames';
import HeaderStatistics from '../../Statistics';

export default function Header({ banner }) {
  return (
    <div
      className={cn(
        'flex flex-col px-[4rem] bg-black text-white relative',
        banner && 'h-[90vh] bg-[url(/images/banner.png)] bg-cover'
      )}
    >
      <div className='flex w-full justify-between h-[7.5rem] items-center'>
        <div className='flex items-center'>
          <Link href={'/'}>
            <img
              src='/images/logo.ico'
              alt='logo'
              className='h-[5.5rem] w-min'
            />
          </Link>
        </div>
        <div className='flex items-center'>
          <HeaderStatistics />
        </div>
      </div>
    </div>
  );
}
