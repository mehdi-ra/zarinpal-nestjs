import { IsIn, IsString } from '@nestjs/class-validator';

export class ZPVerifyQueryParams {
  @IsString()
  Authority!: string;

  @IsString()
  @IsIn(['OK', 'NOK'])
  Status!: 'Ok' | 'NOK';
}
