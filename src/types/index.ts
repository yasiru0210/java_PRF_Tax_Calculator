export interface TaxResult {
  amount: number;
  message?: string;
}

export interface LeasingResult {
  monthlyInstallment?: number;
  leasingAmount?: number;
  categories?: Array<{
    years: number;
    monthlyPayment: number;
  }>;
}

export interface FormData {
  [key: string]: number | string;
}