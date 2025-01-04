"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from 'react-i18next';
import { AiOutlineUnorderedList } from "react-icons/ai";
import { RiFolderCheckLine } from "react-icons/ri";
import { BsFolderX } from "react-icons/bs";
import { iCoupon } from "@/types/types";

const ViewCoupon = () => {
  const router = useRouter();
  const { code } = useParams();
  const [coupon, setCoupon] = useState<iCoupon | null>(null);
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  const [isToggleActive, setIsToggleActive] = useState(false);

  useEffect(() => {
    if (!code) return;

    const storedCoupons: iCoupon[] = JSON.parse(localStorage.getItem("coupons") || "[]");
    const foundCoupon = storedCoupons.find((c) => c.code === code);
    if (foundCoupon) {
      setCoupon(foundCoupon);
    }
  }, [code]);

  const toggleButton = () => {
    setIsToggleActive((prev) => !prev);
  };

  if (!coupon) return <div>Loading...</div>;

  const socialIcons = [
    { component: AiOutlineUnorderedList, title: t('CouponData') },
    { component: RiFolderCheckLine, title: t('IncludedInTheCoupon') },
    { component: BsFolderX, title: t('ExcludedFromCoupon') },
  ];

  return (
    <div>
      <div className='p-6'>
        <div className="flex border border-primary rounded-md mt-4">
          {socialIcons.map((item, index) => {
            const IconComponent = item.component || AiOutlineUnorderedList;
            return (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex-1 py-2 transition-all duration-500 ${
                activeTab === index ? 'text-secondary bg-primary border-b-2 border-primary hover:bg-primary' : 'text-gray-500 hover:bg-lightPrimary'
              }`}
            >
              <span className="flex items-center justify-center gap-1">
                <IconComponent className="text-2xl text-secondary mx-2 lg:block hidden" /> {item.title}
              </span>
            </button>
            );
          })}
        </div>
        <div className="mt-4">
          {activeTab === 0 && (
            <div>
              {/* Coupon Title */}
              <div className='flex basis-full mt-5'>
                <div className='basis-full'>
                  <label>{t('couponTitle')}</label>
                  <input
                    name="code"
                    value={coupon.code || ''}
                    readOnly
                    placeholder={t('couponTitle')}
                    className="w-full p-2 mt-2 border rounded-md"
                  />
                </div>
              </div>
              {/* Customer Discount */}
              <div className='flex basis-full mt-5'>
                <div className='basis-full'>
                  <label>{t('customerDiscountType')}</label>
                  <select
                    name="customerDiscountType"
                    value={coupon.customerDiscountType || 0}
                    disabled
                    className="w-full p-2 mt-2 border rounded-md"
                  >
                    <option value="0">{t('customerDiscountType')}</option>
                    <option value="1">{t('PercentageOfTotalCustomerPurchases')}</option>
                    <option value="2">{t('AFixedAmountOfTheCustomersTotalPurchases')}</option>
                  </select>
                </div>
              </div>
              {/* Start Date and End Date */}
              <div className='flex flex-wrap lg:flex-nowrap gap-4 mt-5'>
                <div className='lg:basis-1/2 basis-full'>
                  <label>{t('couponStartDate')}</label>
                  <input
                    type="date"
                    name='startDate'
                    value={coupon.startDate || ''}
                    readOnly
                    placeholder={t('couponStartDate')}
                    className="w-full p-2 mt-2 border rounded-md"
                  />
                </div>
                <div className='lg:basis-1/2 basis-full'>
                  <label>{t('couponEndDate')}</label>
                  <input
                    name="endDate"
                    type="date"
                    value={coupon.endDate || ''}
                    readOnly
                    placeholder={t('couponEndDate')}
                    className="w-full p-2 mt-2 border rounded-md"
                  />
                </div>
              </div>
              {/* Free Shipping */}
              <div className='flex basis-full mt-5'>
                <div className='basis-full'>
                  <label>{t('withFreeShipping')}</label>
                  <select
                    name="withFreeShipping"
                    value={coupon.withFreeShipping || 0}
                    disabled
                    className="w-full p-2 mt-2 border rounded-md"
                  >
                    <option value="0">{t('withFreeShipping')}</option>
                    <option value="1">{t('yes')}</option>
                    <option value="2">{t('no')}</option>
                  </select>
                </div>
              </div>
              {/* Exception To Discounted Products */}
              <div className='flex basis-full mt-5'>
                <div className='basis-full'>
                  <label>{t('ExceptionToDiscountedProducts')}</label>
                  <select
                    name="ExceptionToDiscountedProducts"
                    value={coupon.ExceptionToDiscountedProducts || 0}
                    disabled
                    className="w-full p-2 mt-2 border rounded-md"
                  >
                    <option value="0">{t('ExceptionToDiscountedProducts')}</option>
                    <option value="1">{t('yes')}</option>
                    <option value="2">{t('no')}</option>
                  </select>
                </div>
              </div>
              {/* Minimum Purchase */}
              <div className='flex basis-full mt-5'>
                <div className='basis-full'>
                  <label>{t('MinimumPurchase')}</label>
                  <input
                    name="MinimumPurchase"
                    value={coupon.MinimumPurchase || ''}
                    readOnly
                    placeholder={t('MinimumPurchase')}
                    className="w-full p-2 mt-2 border rounded-md"
                  />
                </div>
              </div>
              {/* Number Of Times Used For All */}
              <div className='flex basis-full mt-5'>
                <div className='basis-full'>
                  <label>{t('NumberOfTimesUsedForAll')}</label>
                  <input
                    name="NumberOfTimesUsedForAll"
                    value={coupon.NumberOfTimesUsedForAll || ''}
                    readOnly
                    placeholder={t('NumberOfTimesUsedForAll')}
                    className="w-full p-2 mt-2 border rounded-md"
                  />
                </div>
              </div>
              {/* Number Of Uses Per Customer */}
              <div className='flex basis-full mt-5'>
                <div className='basis-full'>
                  <label>{t('NumberOfUsesPerCustomer')}</label>
                  <input
                    name="NumberOfUsesPerCustomer"
                    value={coupon.NumberOfUsesPerCustomer || ''}
                    readOnly
                    placeholder={t('NumberOfUsesPerCustomer')}
                    className="w-full p-2 mt-2 border rounded-md"
                  />
                </div>
              </div>
              <hr />
              <div className='flex items-center justify-between mt-5'>
                <div>
                  <h2>{t('MarketingCoupon')}</h2>
                  <p>{t('MarketerAndAffiliateData')}</p>
                </div>
                <div className=''>
                  {/* Switch Button */}
                  <label className="flex items-center cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={isToggleActive}
                        onChange={toggleButton}
                        className="sr-only"
                      />
                      <div
                        className={`block w-12 h-6 rounded-full ${
                          isToggleActive ? 'bg-primary' : 'bg-gray-300'
                        }`}
                      ></div>
                      <div
                        className={`dot absolute left-1 top-1 w-4 h-4 rounded-full transition ${
                          isToggleActive ? 'translate-x-6 bg-white' : 'bg-gray-500'
                        }`}
                      ></div>
                    </div>
                  </label>
                </div>
              </div>
              {isToggleActive && (
                <div>
                  {/* Persons Name */}
                  <div className='flex basis-full mt-5'>
                    <div className='basis-full'>
                      <label>{t('PersonsName')}</label>
                      <input
                        name="PersonsName"
                        value={coupon.PersonsName || ''}
                        readOnly
                        placeholder={t('PersonsName')}
                        className="w-full p-2 mt-2 border rounded-md"
                      />
                    </div>
                  </div>
                  {/* Commission Type For Marketer */}
                  <div className='flex basis-full mt-5'>
                    <div className='basis-full'>
                      <label>{t('CommissionTypeForMarketer')}</label>
                      <select
                        name="CommissionTypeForMarketer"
                        value={coupon.CommissionTypeForMarketer || 0}
                        disabled
                        className="w-full p-2 mt-2 border rounded-md"
                      >
                        <option value="0">{t('CommissionTypeForMarketer')}</option>
                        <option value="1">{t('PercentageOfTotalDemand')}</option>
                        <option value="2">{t('FixedAmountForEachOrder')}</option>
                      </select>
                    </div>
                  </div>
                  {/* Commission Rate */}
                  <div className='flex basis-full mt-5'>
                    <div className='basis-full'>
                      <label>{t('CommissionRate')}</label>
                      <input
                        name="CommissionRate"
                        value={coupon.CommissionRate || ''}
                        readOnly
                        placeholder={t('CommissionRate')}
                        className="w-full p-2 mt-2 border rounded-md"
                      />
                    </div>
                  </div>
                  {/* Additional Information */}
                  <div className='flex basis-full mt-5'>
                    <div className='basis-full'>
                      <label>{t('AdditionalInformation')}</label>
                      <textarea
                        name="AdditionalInformation"
                        value={coupon.AdditionalInformation || ''}
                        readOnly
                        placeholder={t('AdditionalInformation')}
                        className="w-full p-2 mt-2 border rounded-md"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {activeTab === 1 && (
            <div>
              {/* Payment Methods Included In The Coupon */}
              <div className='flex basis-full mt-5'>
                <div className='basis-full'>
                  <label>{t('PaymentMethodsIncludedInTheCoupon')}</label>
                  <select
                    name="PaymentMethodsIncludedInTheCoupon"
                    value={coupon.PaymentMethodsIncludedInTheCoupon || 0}
                    disabled
                    className="w-full p-2 mt-2 border rounded-md"
                  >
                    <option value="0">{t('AllPaymentMethods')}</option>
                    <option value="1">{t('CashOnDelivery')}</option>
                    <option value="2">{t('BankTransfer')}</option>
                  </select>
                </div>
              </div>
              {/* Client Email Domain */}
              <div className='flex basis-full mt-5'>
                <div className='basis-full'>
                  <label>{t('ClientEmailDomain')}</label>
                  <input
                    name="ClientEmailDomain"
                    value={coupon.ClientEmailDomain || ''}
                    readOnly
                    placeholder={t('ClientEmailDomain')}
                    className="w-full p-2 mt-2 border rounded-md"
                  />
                </div>
              </div>
            </div>
          )}
          {activeTab === 2 && (
            <div>
            {/* Excluded Products */}
            <div className='flex basis-full mt-5'>
              <div className='basis-full'>
                <label>{t('ExcludedProducts')}</label>
                <input
                  name="ExcludedProducts"
                  value={coupon.ExcludedProducts || ''}
                  readOnly
                  placeholder={t('SearchForTheProducts')}
                  className="w-full p-2 mt-2 border rounded-md"
                />
              </div>
            </div>
            {/* Excluded Customer Groups */}
            <div className='flex basis-full mt-5'>
              <div className='basis-full'>
                <label>{t('ExcludedCustomerGroups')}</label>
                <select
                  name="ExcludedCustomerGroups"
                  value={coupon.ExcludedCustomerGroups || 0}
                  disabled
                  className="w-full p-2 mt-2 border rounded-md"
                >
                  <option value="0">{t('Select')}</option>
                  <option value="1">{t('FirstOrder')}</option>
                </select>
              </div>
            </div>
          </div>
          )}
        </div>
        <button
          onClick={() => router.push("/")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          {t('home')}
      </button>
      </div>
    </div>
  );
};

export default ViewCoupon;
