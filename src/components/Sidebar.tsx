"use client";

import { ReactElement, useEffect, useState } from 'react';
import Link from 'next/link';
import { AiOutlineHome, AiOutlineShop, AiOutlineOrderedList } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { HiMiniBars3CenterLeft } from 'react-icons/hi2';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 992) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className={`bg-secondary text-white min-h-screen h-auto transition-all ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className='flex items-center justify-between p-3'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none "
        >
          <span className="material-icons"><HiMiniBars3CenterLeft className='text-3xl' /></span>
        </button>
        <div className="flex items-center justify-center">
          <div
            className={`transition-all ${
              isOpen ? 'block' : 'hidden'
            }`}
          >
            <Image src="https://cdn.salla.network/images/logo/logo-light-wide.svg" alt="Logo" width={90} height={45} />
          </div>
        </div>
      </div>
      <nav className="mt-4 space-y-4">
        <SidebarItem icon={<AiOutlineHome className='text-2xl' />} title={t('home')} link="/" isOpen={isOpen} />
        <SidebarItem icon={<AiOutlineShop className='text-2xl' />} title={t('products')} link="/products" isOpen={isOpen} />
        <SidebarItem icon={<AiOutlineOrderedList className='text-2xl' />} title={t('orders')} link="/orders" isOpen={isOpen} />
      </nav>
    </div>
  );
};


const SidebarItem = ({ icon, title, link, isOpen }: { icon: ReactElement, title: string, link: string, isOpen: boolean }) => (
  <Link href={link}>
    <div className="flex items-center p-4 hover:bg-darkSecondary hover:text-primary transition-all duration-500 cursor-pointer">
      <div className="text-lg">{icon}</div>
      {isOpen && <span className="mx-4">{title}</span>}
    </div>
  </Link>
);

export default Sidebar;
