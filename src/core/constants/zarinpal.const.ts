import { ZarinpalErrorCode } from 'src/interfaces';

export namespace ZarinPal {
  export const zarinpalSoapServer =
    'https://zarinpal.com/pg/services/WebGate/wsdl';

  export const statusCodes: ZarinpalErrorCode[] = [
    { status: -1, message: 'اطلاعات ارسال شده ناقص است.' },
    { status: -2, message: 'آیپی یا مرچنت کد پذیرنده صحیح نیست.' },
    {
      status: -3,
      message:
        'با توجه به محدودیت‌ها، امکان پرداخت با رقم درخواست شده میسر نیست..',
    },
    { status: -4, message: 'سطح تایید پذیرنده کم تر از سطح نقره ای است.' },
    { status: -11, message: 'درخواست مورد نظر یافت نشد.' },
    { status: -12, message: 'امکان ویرایش درخواست میسر نمی‌باشد.' },
    { status: -21, message: 'هیچ نوع عملیات مالی برای این تراکنش یافت.' },
    { status: -22, message: 'تراکنش ناموفق میباشد.' },
    { status: -33, message: 'رقم تراکنش با رقم پرداخت شده مطابقت ندارد.' },
    {
      status: -34,
      message: 'سقف تقسیم تراکنش از لحاظ تعداد یا رقم عبور نموده است.',
    },
    { status: -40, message: 'اجازه دسترسی به متد مربوطه وجود ندارد.' },
    {
      status: -41,
      message: 'اطلاعات ارسال شده مربوط به AdditionalData غیر معتبراست.',
    },
    {
      status: -42,
      message: 'مدت زمان معتبر طول عمر پرداخت باید بین 30 تا 45 روز میباشد.',
    },
    { status: -54, message: 'درخواست مورد نظر آرشیو شده است.' },
    { status: 100, message: 'عملیات با موفقیت انجام شد.' },
    { status: 101, message: 'عملیات موفق بوده و قبلا Verify شده است.' },
  ];
}
