"use client";

import Link from "next/link";
import Image from "next/image";

// adding a comment
const Nav = () => {

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <div className='flex-center flex-auto'>
        <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.webp'
          alt='logo'
          width={120}
          height={40}
          className='object-contain'
        />
      </Link>
      </div>
    </nav>
  );
};

export default Nav;