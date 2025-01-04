"use client";

import Breadcrumb from '../components/Breadcrumb';
import AddCouponDialog from "../components/AddCouponDialog";
import EditCouponDialog from "../components/EditCouponDialog";
import { useState, useEffect } from 'react';
import { GoPencil, GoPlus } from 'react-icons/go';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { IoEyeSharp } from 'react-icons/io5';
import { useRouter } from "next/navigation";
import { useTranslation } from 'react-i18next';
import { iCoupon } from "@/types/types";
import { couponsData } from '@/code/db';

export default function Home() {
  const storedData = JSON.parse(localStorage.getItem("coupons") || "[]");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [coupons, setCoupons] = useState<iCoupon[]>(storedData.length > 0 ? storedData : couponsData);
  const [editCouponData, setEditCouponData] = useState<iCoupon | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("coupons", JSON.stringify(coupons));
  }, [coupons]);

  const handleAddCoupon = (newCoupon: iCoupon) => {
    setCoupons([...coupons, { ...newCoupon}]);
  };
  
  const handleEditCoupon = (updatedCoupon: iCoupon) => {
    setCoupons((prevCoupons) =>
      prevCoupons.map((coupon) =>
        coupon.id === updatedCoupon.id ? { ...coupon, ...updatedCoupon } : coupon
      )
    );
  };

  const handleDeleteCoupon = (id: string) => {
    setCoupons(coupons.filter((coupon) => coupon.id !== id));
  };

  const openEditDialog = (coupon: iCoupon) => {
    setEditCouponData(coupon);
    setIsEditDialogOpen(true);
  };

  const toggleDropdown = (couponId: string) => {
    setActiveDropdown((prev) => (prev === couponId ? null : couponId));
  };

  const handleStatusChange = (couponId: string, status: number) => {
    setCoupons((prevCoupons) =>
      prevCoupons.map((coupon) =>
        coupon.id === couponId ? { ...coupon, status } : coupon
      )
    );
    setActiveDropdown(null);
  };

  return (
    <div>
        <Breadcrumb paths={[t('copuons')]} />
        <div className="p-6">
            <button
              onClick={() => setIsAddDialogOpen(true)}
              className="px-4 py-2 bg-primary rounded-md flex items-center text-secondary"
            >
              <span><GoPlus /></span>
              {t('add')}
            </button>
            {/* Add Coupon Dialog */}
            <AddCouponDialog
              isOpen={isAddDialogOpen}
              onClose={() => setIsAddDialogOpen(false)}
              onSave={handleAddCoupon}
              existingCoupons={coupons}
            />

            {/* Edit Coupon Dialog */}
            <EditCouponDialog
              isOpen={isEditDialogOpen}
              onClose={() => setIsEditDialogOpen(false)}
              onSave={handleEditCoupon}
              initialData={editCouponData}
            />
            <div className='border border-grayMark rounded-md mt-5 overflow-auto'>
              <div className='flex items-center p-4'>
                <span className='mx-2'><AiOutlineUnorderedList /></span>
                <h3 className='text-lightBlack text-xl'>{t('copuons')}</h3>
              </div>
              <div className='flex'>
                <div className='flex items-center p-4'>
                  <span className='mx-2 w-5 h-2 rounded-lg bg-primary'></span>
                  <h3 className='text-grayPath'>{t('active')}</h3>
                </div>
                <div className='flex items-center p-4'>
                  <span className='mx-2 w-5 h-2 rounded-lg bg-orange-400'></span>
                  <h3 className='text-grayPath'>{t('expired')}</h3>
                </div>
                <div className='flex items-center p-4'>
                  <span className='mx-2 w-5 h-2 rounded-lg bg-red-500'></span>
                  <h3 className='text-grayPath'>{t('closed')}</h3>
                </div>
              </div>
              <table className="mt-6 w-full bg-white rounded-md shadow-md">
                <thead>
                  <tr className="bg-subGray text-justify">
                    <th className="p-4 text-lightBlack font-normal">{t('couponTitle')}</th>
                    <th className="p-4 text-lightBlack font-normal">{t('couponStartDate')}</th>
                    <th className="p-4 text-lightBlack font-normal">{t('couponEndDate')}</th>
                    <th className="p-4 text-lightBlack font-normal">{t('couponStatus')}</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((coupon) => (
                    <tr key={coupon.id} className="border-b">
                      <td className="p-4">
                        <span
                          className={`mx-2 w-5 h-2 rounded-lg inline-block ${
                            coupon.status === 1
                              ? "bg-primary"
                              : coupon.status === 0
                              ? "bg-orange-400"
                              : "bg-red-500"
                            }`}
                          >
                        </span> 
                        {coupon.code}
                      </td>
                      <td className="p-4">{coupon.startDate}</td>
                      <td className="p-4">{coupon.endDate}</td>
                      <td className="p-4 flex gap-2">
                        <button
                          onClick={() => router.push(`/view/${coupon.code}`)}
                          className="text-blue-500"
                        >
                          <IoEyeSharp className='text-2xl' />
                        </button>
                        <button
                          onClick={() => openEditDialog(coupon)}
                          className="text-blue-500"
                        >
                          <GoPencil className='text-2xl' />
                        </button>
                        <button
                          onClick={() => handleDeleteCoupon(coupon.id)}
                          className="text-red-500"
                        >
                          <MdDelete className='text-2xl' />
                        </button>
                        <div className="relative">
                          <button
                            className={`text-white px-2 py-1 rounded-md ${
                              coupon.status === 1
                                ? "bg-primary"
                                : coupon.status === 0
                                ? "bg-orange-400"
                                : "bg-red-500"
                            }`}
                            onClick={() => toggleDropdown(coupon.id)}
                          >
                          {coupon.status === 1 ? t('active') : coupon.status === 0 ? t('expired') : t('closed')}
                          </button>
                          {activeDropdown === coupon.id && (
                            <ul className="absolute top-8 left-0 z-10 w-40 bg-white border rounded-md shadow-lg">
                              {[t('active'), t('expired'), t('closed')].map((status, i) => (
                                <li
                                  key={status}
                                  onClick={() => handleStatusChange(coupon.id, i == 0 ? 1 : i == 1 ? 0 : 2 )}
                                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                >
                                  {t(status)}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
    </div>
  );
}
