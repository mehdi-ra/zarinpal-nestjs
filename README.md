# Zarinpal Adaptor for `NestJs`.

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

# Features:

[circleci-url]: https://circleci.com/gh/nestjs/nest

[![Documents](https://badgen.net/badge/Documents/v1/blue?icon=wiki)](https://github.com/me-dira/zarinpal-nestjs/wiki)
[![Version](https://badgen.net/badge/Version/v1.0.0/orange?icon=github)](https://github.com/me-dira/zarinpal-nestjs)
[![status](https://badgen.net/badge/Status/Released/green?icon=now)](https://github.com/me-dira/zarinpal-nestjs)

- Easy to use.
- Light and fast.
- Any dependency to other zarinpal packages.
- Specific error type (ZarinpalError).

## How to use:

The process is very simple and includes:

- Open transaction on Zarinpal.
- Generate url using result and redirect user to startPay page.
- User will be redirected after payment is done to verify url you specified.

---

### installation

Installation is very simple and can be done using below commands:

```
yarn add zarinpal-nestjs
npm install --save zarinpal-nestjs
```

### Register the module

After successful installation you need to register `zarinpal-nestjs` module in your NestJs application:

```
@Module({
  imports: [
    ZarinpalModule.register({
      // Required options:
      callBackUrl: 'https://google.com',
      merchantId: '32 character long merchant_id',
    }),
  ],
})
export class AppModule {}

```

### Inject inside the class

You can check one simple example of injecting the `service`:

```
import { ZarinpalService } from 'zarinpal-nestjs';
@Controller('transaction')
export class AppController {
  constructor(
    private readonly zarinpalService: ZarinpalService,
  ) {}

```

## Open transaction & Generate Start Pay URL

As you know you need to redirect the user to the payment gate, then the user can pay the bill. After you open a transaction and get the authorization code, you can generate the URL using `transactionOpen` result like:

```
  async openTransaction(): Promise<string> {
      const transactionResult = await this.zarinpalService.openTransaction({
        amount: 1000,
        description: 'Buying a car (example)',
      });

      // https://www.zarinpal.com/pg/StartPay/A00000000000000000000000000387664294
      return this.zarinpalService.generateUrl(transactionResult);
  }
```

## Verify transaction

After user completes the payment process, will return to url you pass through Module registration and you can verify them like this:

```
@Get('verify')
async verifyTransaction(@Query() query: ZarinpalVerifyQueryParams) {
    const transaction = await this.appService.findTransactionByAuthority(
      query.Authority,
    );

    await this.zarinpalService.verifyTransaction({
      authority: query.Authority,
      amount: transaction.amount,
    });
}
```

## Encode & Decode Authority code

As you know authority code of transactions are pretty long and it's very bad practice to store them raw. You can encode and decode theme using two predefined functions as example:

```
import {
  zarinpalAuthorityEncode,
  zarinpalAuthorityDecode
} from 'zarinpal-nestjs';

const longAuthorityCode = 'A00000000000000000000000000387664294';
const encodedAuthorityCode = zarinpalAuthorityEncode(longAuthorityCode);
const decodedEncodedAuthorityCode =
  zarinpalAuthorityDecode(encodedAuthorityCode);

console.log({
  encoded: encodedAuthorityCode, // 26x387664294
  decoded: decodedEncodedAuthorityCode, // A00000000000000000000000000387664294
});
```

pull Request template test

for more information please read [Documentation](https://github.com/me-dira/zarinpal-nestjs/wiki).
