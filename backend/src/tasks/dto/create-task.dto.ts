import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Finish NestJS task API' })
  title: string;

  @ApiPropertyOptional({ example: 'Add Prisma integration and Docker support' })
  description?: string;

  @ApiPropertyOptional({ example: false })
  isCompleted?: boolean;

  @ApiProperty({ example: 1 })
  userId: number;
}

