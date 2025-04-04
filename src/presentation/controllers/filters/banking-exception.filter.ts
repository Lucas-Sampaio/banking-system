// src/presentation/filters/global-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { BankingSystemError } from 'src/domain/exceptions/banking-exceptions';
import { ErrorCode } from 'src/domain/exceptions/errors-code';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Tratamento para erros customizados do Banking System
    if (exception instanceof BankingSystemError) {
      const status = this.getHttpStatus(exception);
      response.status(status).json({
        statusCode: status,
        errorCode: exception.code,
        message: exception.message,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // Tratamento para erros de validação do NestJS/class-validator
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const responsePayload = exception.getResponse();

      response.status(status).json({
        statusCode: status,
        ...(typeof responsePayload === 'object'
          ? responsePayload
          : { message: responsePayload }),
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // Tratamento genérico para erros não identificados
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    });
  }

  private getHttpStatus(exception: BankingSystemError): HttpStatus {
    switch (exception.code) {
      case ErrorCode.NOT_FOUND:
        return HttpStatus.NOT_FOUND;
      case 'INSUFFICIENT_FUNDS':
        return HttpStatus.BAD_REQUEST;
      case ErrorCode.ALREADY_EXISTS:
        return HttpStatus.CONFLICT;
      case 'INVALID_TRANSACTION':
        return HttpStatus.UNPROCESSABLE_ENTITY;
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
