import { ApiProperty } from '@nestjs/swagger';

export class AddRewardDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  chance: number;
}
