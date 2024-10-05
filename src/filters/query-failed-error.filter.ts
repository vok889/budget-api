import { ArgumentsHost, BadRequestException, Catch, ConflictException, ExceptionFilter } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError) // for create nest to catch "QueryFailedError" when user sent bad request to database, and then execute something...
export class QueryFailedErrorFilter extends BaseExceptionFilter {

  catch(exception: QueryFailedError, host: ArgumentsHost) {

    const message: string = exception.message;
    console.log(exception)

    // if database return error "duplicate key value"
    if (this.isDuplicateKeyValue(message)) { // 'this' for call function in itself class, isDuplicateKeyValue is function in this class
      // we want to replace return message to 409 Conflict 
      const detail = (exception.driverError as any).detail
      //super.catch(new ConflictException(detail.replace('already exists', 'มีข้อมูลแล้ว')), host)
      super.catch(new ConflictException('มีข้อมูลแล้ว'), host)
      return;
    }

    if (this.isNotExists(message)) {
      // return 400 BadRequest
      super.catch(new BadRequestException(message.replace('does not exist', 'ไม่พบ')), host)
      return;
    }

    // return next
    super.catch(exception, host)
  }

  private isDuplicateKeyValue(message?: string): boolean {
    return message && message.includes('duplicate key value')
  }

  private isNotExists(message?: string): boolean {
    return message && message.includes('not exist')
  }
}
