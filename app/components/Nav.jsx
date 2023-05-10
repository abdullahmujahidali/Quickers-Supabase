"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const Nav = () => {

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.webp'
          alt='logo'
          width={120}
          height={30}
          className='object-contain'
        />
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>

          <div className='flex gap-3 md:gap-5'>
            <Link href='/config' className='black_btn'>
              Update Config
            </Link>
          </div>

      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
          <div className='flex gap-3 md:gap-5'>
            <Link href='/config' className='black_btn'>
              Update Config
            </Link>
          </div>
      </div>
    </nav>
  );
};

export default Nav;