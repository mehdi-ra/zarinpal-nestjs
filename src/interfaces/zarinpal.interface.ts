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
  Authorities?: string;

  /**
   * Url when you want to redirect user for payment process.
   */
  url?: string;
}

/**
 * Request option when you are sending pay request
 * to Zarinpal.
 */
export interface ZarinpalRequestOptions {
  MerchantID: number;
  Amount: number;
  Email: string;
  Phone: string;
  Mobile: string;

  // Url for GateWay or regular ?
  GateWay?: boolean;
  CallbackURL?: string;
}

/**
 * Useful when you want to help user to chose
 * urls and avoid unwanted mistakes.
 */
export type ZarinPalURL = typeof ZarinPal.urls[number];
