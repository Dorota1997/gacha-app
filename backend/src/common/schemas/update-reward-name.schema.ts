import { object, ObjectSchema, string } from 'yup';

import { UpdateRewardNameDto } from '@/common/dto/update-reward-name.dto';

export const useUpdateRewardNameSchema: () => ObjectSchema<UpdateRewardNameDto> =
  () =>
    object({
      name: string().required().min(5),
    });
