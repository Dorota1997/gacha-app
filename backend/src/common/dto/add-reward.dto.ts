import { ApiProperty } from '@nestjs/swagger';

export class AppendRewardDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  chance: number;
}
