import { ZarinPal } from 'src/core';

/**
 * Request option when you are sending request
 * to Zarinpal in first time or when you want to
 * open unfinished or not payed transaction on Zarinpal
 * servers.
 */
export interface ZarinpalOpenTransactionOptions {
  merchant_id: string;
  amount: number;
  description?: string;
  callback_url?: string;
  metadata?: ZarinpalOpenRequestMetadata;
}

export interface ZarinpalRequestResult {
  data: {
    code: number;
    message: string;
    authority: string;
    fee_type: 'Merchant';
    fee: number;
    errors?: unknown[];
  };
}

export interface ZarinpalVerifyResult {
  code: number;
  message: string;

  // SHA256 hash
  card_hash: string;

  // Masked card number like: '502229******5995'
  card_pan: string;

  ref_id: number;
  fee_type: string;
  fee: number;
}

export interface ZarinpalOpenRequestMetadata {
  mobile?: string;
  email?: string;
  card_pan?: string;
}

export interface ZarinpalVerifyTransactionOptions {
  MerchantID: string;
  Authority: string;
  Amount: number;
}

/**
 * Useful when you want to help user to chose
 * urls and avoid unwanted mistakes.
 */
export interface ZarinpalURL {
  sandbox: string;
  default: string;
}

export interface ZarinpalURLS {
  openTransaction: ZarinpalURL;
  verifyTransaction: ZarinpalURL;
  startPay: ZarinpalURL;
}
