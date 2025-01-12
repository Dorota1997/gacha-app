import { ApiProperty } from '@nestjs/swagger';

export class UpdateRewardNameDto {
  @ApiProperty()
  name: string;
}
