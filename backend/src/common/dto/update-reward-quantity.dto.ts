import { ApiProperty } from '@nestjs/swagger';

export class UpdateRewardQuantityDto {
  @ApiProperty()
  quantity: number;
}
