import { Injectable } from '@nestjs/common';

@Injectable()
export class ErrorHandlerService {
  public handle(error: unknown) {}
}
