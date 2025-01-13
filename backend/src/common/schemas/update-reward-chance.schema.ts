import { number, object, ObjectSchema } from 'yup';

import { UpdateRewardChanceDto } from '@/common/dto/update-reward-chance.dto';

export const useUpdateRewardChanceSchema: () => ObjectSchema<UpdateRewardChanceDto> =
  () =>
    object({
      chance: number().required().min(0.001).max(99),
    });
