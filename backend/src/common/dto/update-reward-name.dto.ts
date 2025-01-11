import { ApiProperty } from '@nestjs/swagger';

export class UpdateRewardNameDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}
