import { number, object, ObjectSchema, string } from 'yup';
import { AddRewardDto } from '@/common/dto/add-reward.dto';

export const useAddRewardSchema: () => ObjectSchema<AddRewardDto> = () =>
  object({
    name: string().required(),
    quantity: number().required(),
    chance: number().required(),
  });
