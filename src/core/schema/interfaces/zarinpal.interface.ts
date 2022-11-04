import { ZarinPal } from 'src/core';

export interface ZarinpalRequestResult {
  /**
   * The status code that returned after sending request.
   */
  Status: number;

  /**
   * Json data including Transaction extra information
   * like Payment Gate type and time.
   */
  Authorities: string;

  /**
   * Url when you want to redirect user for payment process.
   */
  url?: string;
}

/**
 * Request option when you are sending request
 * to Zarinpal in first time or when you want to
 * open unfinished or not payed transaction on Zarinpal
 * servers.
 */
export interface ZarinpalOpenTransactionOptions {
  MerchantID: number;
  Amount: number;
  Email: string;
  Phone: string;
  Mobile: string;

  // Url for GateWay or regular ?
  GateWay?: boolean;
  CallbackURL?: string;
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
export type ZarinPalURL = typeof ZarinPal.urls[number];
