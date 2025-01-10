import { number, object, ObjectSchema, string } from 'yup';
import { AddRewardDto } from '@/common/dto/add-reward.dto';

export const useAddRewardSchema: () => ObjectSchema<AddRewardDto> = () =>
  object({
    name: string().required().min(5),
    quantity: number().required().max(99999),
    chance: number().required().min(0.001).max(99),
  });
