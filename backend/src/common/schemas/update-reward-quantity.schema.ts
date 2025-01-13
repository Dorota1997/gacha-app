import { number, object, ObjectSchema } from 'yup';

import { UpdateRewardQuantityDto } from '../dto/update-reward-quantity.dto';

export const useUpdateRewardQuantitySchema: () => ObjectSchema<UpdateRewardQuantityDto> =
  () =>
    object({
      quantity: number().required().max(99999),
    });
