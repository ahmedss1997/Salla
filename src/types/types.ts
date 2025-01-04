
export interface iCoupon {
  id: string;
  code: string;
  startDate: string;
  endDate: string;
  customerDiscountType: string;
  withFreeShipping: string;
  ExceptionToDiscountedProducts: string;
  MinimumPurchase: string;
  NumberOfTimesUsedForAll: string;
  NumberOfUsesPerCustomer: string;
  PersonsName: string;
  CommissionTypeForMarketer: string;
  CommissionRate: string;
  AdditionalInformation: string;
  PaymentMethodsIncludedInTheCoupon: string;
  ClientEmailDomain: string;
  ExcludedCustomerGroups: string;
  ExcludedProducts: string;
  status: number;
}