import { ZarinPal } from 'src/core';
import { ZarinpalURLS } from 'src/core/schema/interfaces';

export function generateUrl(
  urlName: keyof ZarinpalURLS,
  sandbox?: boolean,
): string {
  switch (!!sandbox) {
    case true:
      return ZarinPal.urls[urlName].sandbox;

    case false:
      return ZarinPal.urls[urlName].default;
  }
}
