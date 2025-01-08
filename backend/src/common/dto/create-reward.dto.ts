import { ApiProperty } from '@nestjs/swagger';

export class CreateRewardDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  chance: number;
}
