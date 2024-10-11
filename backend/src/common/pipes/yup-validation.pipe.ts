import { ObjectSchema } from 'yup';
import { BadRequestException, PipeTransform } from '@nestjs/common';

import { formatError } from '@/common/helpers/format-error.helper';

export class YupValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema<any>) {}

  async transform(data: any) {
    try {
      const sanitizedData = await this.schema.validate(data, {
        abortEarly: false,
        stripUnknown: true,
      });

      return sanitizedData;
    } catch (error) {
      throw new BadRequestException(formatError(error));
    }
  }
}
