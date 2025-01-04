"use client";
import { useState, useEffect } from 'react';
import { IoIosSearch } from "react-icons/io";
import Link from 'next/link';
import { IoChevronDownOutline } from 'react-icons/io5';
import i18next from '../i18n';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [language, setLanguage] = useState('en');
  const [showDropdown, setShowDropdown] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    i18next.changeLanguage(lang);
    setShowDropdown(false);
  };

  return (
    <header className="bg-grayColor px-6 py-4 flex justify-between items-center shadow-sm">
      <div className="lg:flex grow hidden">
        <div className="w-3/4">
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-bgInput text-graySubText border border-borderGray ltr:rounded-tl-lg ltr:rounded-bl-lg rtl:rounded-tr-lg rtl:rounded-br-lg p-3 focus:outline-none "
          />
        </div>
        <div className='bg-white text-graySubText px-3 border border-borderGray cursor-pointer flex justify-between items-center'>
          <span className="mx-2 text-grayPath">{t('orders')}</span>
          <IoChevronDownOutline />
        </div>
        <div className="rounded-tr-lg rounded-br-lg">
          <Link href={"search_result"} className="h-full">
            <button className="text-white bg-primary border border-primary ltr:rounded-tr-lg ltr:rounded-br-lg rtl:rounded-tl-lg rtl:rounded-bl-lg p-3 ">
              <IoIosSearch className="text-2xl text-secondary" />
            </button>
          </Link>
        </div>
        </div>
        <div className="flex items-center space-x-6">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="p-2 bg-gray-200 rounded-md focus:outline-none flex items-center space-x-2"
          >
            <span>{language === 'en' ? 'English' : 'العربية'}</span>
            <IoChevronDownOutline />
          </button>
          {showDropdown && (
            <ul className="absolute top-10 left-0 w-40 bg-white border rounded-md shadow-lg">
              <li
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => changeLanguage('en')}
              >
                English
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => changeLanguage('ar')}
              >
                العربية
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
