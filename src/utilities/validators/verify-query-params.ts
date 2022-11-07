import { IsIn, IsString } from '@nestjs/class-validator';
import { IsRightAuthority } from '../decorators';

export class ZarinpalVerifyQueryParams {
  @IsString()
  @IsRightAuthority()
  Authority!: string;

  @IsString()
  @IsIn(['OK', 'NOK'])
  Status!: 'OK' | 'NOK';
}
