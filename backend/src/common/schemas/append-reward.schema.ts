import { number, object, ObjectSchema, string } from 'yup';
import { AppendRewardDto } from '../dto/append-reward.dto';

export const useAppendRewardSchema: () => ObjectSchema<AppendRewardDto> = () =>
  object({
    name: string().required(),
    quantity: number().required(),
    chance: number().required(),
  });
