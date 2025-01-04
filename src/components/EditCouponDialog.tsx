"use client";

import { iCoupon } from "@/types/types";
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { AiOutlineUnorderedList } from "react-icons/ai";
import { BsFolderX } from "react-icons/bs";
import { RiCloseLargeFill, RiFolderCheckLine } from "react-icons/ri";

interface EditCouponDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: iCoupon) => void;
  initialData: iCoupon | null;
}

const EditCouponDialog = ({ isOpen, onClose, onSave, initialData }: EditCouponDialogProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isToggleActive, setIsToggleActive] = useState(false);
  const [formData, setFormData] = useState<iCoupon>({
    id: "",
    code: "",
    startDate: "",
    endDate: "",
    customerDiscountType: "0",
    withFreeShipping: "0",
    ExceptionToDiscountedProducts: "0",
    MinimumPurchase: "",
    NumberOfTimesUsedForAll: "",
    NumberOfUsesPerCustomer: "",
    PersonsName: "",
    CommissionTypeForMarketer: "0",
    CommissionRate: "",
    AdditionalInformation: "",
    PaymentMethodsIncludedInTheCoupon: "0",
    ClientEmailDomain: "",
    ExcludedCustomerGroups: "0",
    ExcludedProducts: "",
    status: 1,
  });

  const { t } = useTranslation();

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.code || !formData.startDate || !formData.endDate) {
      alert("All fields are required.");
      return;
    }
    onSave(formData);
    onClose();
  };

  const toggleButton = () => {
    setIsToggleActive((prev) => !prev);
  };

  if (!isOpen) return null;

  const socialIcons = [
    { component: AiOutlineUnorderedList, title: t('CouponData') },
    { component: RiFolderCheckLine, title: t('IncludedInTheCoupon') },
    { component: BsFolderX, title: t('ExcludedFromCoupon') },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center p-10">
      <div className="bg-white rounded-lg  w-full max-w-3xl max-h-[90vh] overflow-auto">
        <div className="flex justify-between bg-primary text-secondary p-4 rounded-tl-lg rounded-tr-lg items-center">
          <h2 className="text-xl font-bold">{t('EditDiscountCoupons')}</h2>
          <button onClick={onClose} className="text-secondary text-lg">
            <RiCloseLargeFill />
          </button>
        </div>
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
                      value={formData.code || ''}
                      onChange={handleChange}
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
                      value={formData.customerDiscountType || 0}
                      onChange={handleChange}
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
                      value={formData.startDate || ''}
                      onChange={handleChange}
                      placeholder={t('couponStartDate')}
                      className="w-full p-2 mt-2 border rounded-md"
                    />
                  </div>
                  <div className='lg:basis-1/2 basis-full'>
                    <label>{t('couponEndDate')}</label>
                    <input
                      name="endDate"
                      type="date"
                      value={formData.endDate || ''}
                      onChange={handleChange}
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
                      value={formData.withFreeShipping || 0}
                      onChange={handleChange}
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
                      value={formData.ExceptionToDiscountedProducts || 0}
                      onChange={handleChange}
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
                      value={formData.MinimumPurchase || ''}
                      onChange={handleChange}
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
                      value={formData.NumberOfTimesUsedForAll || ''}
                      onChange={handleChange}
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
                      value={formData.NumberOfUsesPerCustomer || ''}
                      onChange={handleChange}
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
                          value={formData.PersonsName || ''}
                          onChange={handleChange}
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
                          value={formData.CommissionTypeForMarketer || 0}
                          onChange={handleChange}
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
                          value={formData.CommissionRate || ''}
                          onChange={handleChange}
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
                          value={formData.AdditionalInformation || ''}
                          onChange={handleChange}
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
                      value={formData.PaymentMethodsIncludedInTheCoupon || 0}
                      onChange={handleChange}
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
                      value={formData.ClientEmailDomain || ''}
                      onChange={handleChange}
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
                    value={formData.ExcludedProducts || ''}
                    onChange={handleChange}
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
                    value={formData.ExcludedCustomerGroups || 0}
                    onChange={handleChange}
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
          <div className="mt-4 flex">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 mt-3 bg-primary text-secondary  rounded-md"
            >
              {t('save')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCouponDialog;
