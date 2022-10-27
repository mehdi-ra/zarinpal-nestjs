import { ZarinPalErrorCode } from 'src/interfaces';

export namespace ZarinPal {
  export const zarinpalSoapServer =
    'https://zarinpal.com/pg/services/WebGate/wsdl';

  export const statusCodes: ZarinPalErrorCode[] = [
    { code: -1, message: 'اطلاعات ارسال شده ناقص است.' },
    { code: -2, message: 'آیپی یا مرچنت کد پذیرنده صحیح نیست.' },
    {
      code: -3,
      message:
        'با توجه به محدودیت‌ها، امکان پرداخت با رقم درخواست شده میسر نیست..',
    },
    { code: -4, message: 'سطح تایید پذیرنده کم تر از سطح نقره ای است.' },
    { code: -11, message: 'درخواست مورد نظر یافت نشد.' },
    { code: -12, message: 'امکان ویرایش درخواست میسر نمی‌باشد.' },
    { code: -21, message: 'هیچ نوع عملیات مالی برای این تراکنش یافت.' },
    { code: -22, message: 'تراکنش ناموفق میباشد.' },
    { code: -33, message: 'رقم تراکنش با رقم پرداخت شده مطابقت ندارد.' },
    {
      code: -34,
      message: 'سقف تقسیم تراکنش از لحاظ تعداد یا رقم عبور نموده است.',
    },
    { code: -40, message: 'اجازه دسترسی به متد مربوطه وجود ندارد.' },
    {
      code: -41,
      message: 'اطلاعات ارسال شده مربوط به AdditionalData غیر معتبراست.',
    },
    {
      code: -42,
      message: 'مدت زمان معتبر طول عمر پرداخت باید بین 30 تا 45 روز میباشد.',
    },
    { code: -54, message: 'درخواست مورد نظر آرشیو شده است.' },
    { code: 100, message: 'عملیات با موفقیت انجام شد.' },
    { code: 101, message: 'عملیات موفق بوده و قبلا Verify شده است.' },
  ];
}
