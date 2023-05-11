'use client'
import Link from "next/link";


const Home = () => (
  <section className='mt-20 w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
      Update your Quickers App
      <br className='max-md:hidden' />
      <span className='mt-2 orange_gradient text-center'> Without republishing</span>
    </h1>
    <p className='mt-20 desc text-center'>
      Q-Config is a free service that allows you to update your Quickers app without republishing.
    </p>
    <div className='mt-8 sm:flex hidden'>
      <div className='flex gap-3 md:gap-5'>
        <Link href='/config' className='black_btn'>
          Update Config
        </Link>
      </div>
    </div>
  </section>
);

export default Home;