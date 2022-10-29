import { Inject, Injectable } from '@nestjs/common';
import { ZarinpalProvidersKey } from 'src/core';
import { Client } from 'nestjs-soap';
import { ZarinpalRequestOptions } from 'src/interfaces/zarinpal.interface';

@Injectable()
export class SoapClientService {
  constructor(
    @Inject(ZarinpalProvidersKey.SOAP_CLIENT) private readonly _client: Client,
  ) {}

  public get client(): Client {
    return this._client;
  }

  public sendRequest(data: Omit<ZarinpalRequestOptions, 'GateWay'>) {
    this.client.emit();
  }
}
