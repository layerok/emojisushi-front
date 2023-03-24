export type IPaymentMethod = {
  id: number;
  name: string;
  code: string;
  description: null | string;
  instructions: null | string;
  payment_provider: string;
  sort_order: number;
  fee_label: null | string;
  fee_percentage: null | number;
  pdf_partial: null | string;
};
