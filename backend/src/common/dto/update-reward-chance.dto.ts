import { ApiProperty } from '@nestjs/swagger';

export class UpdateRewardChanceDto {
  @ApiProperty()
  chance: number;
}
