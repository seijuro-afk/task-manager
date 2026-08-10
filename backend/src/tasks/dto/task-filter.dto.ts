import { ApiPropertyOptional } from '@nestjs/swagger';

export class TaskFilterDto {
  @ApiPropertyOptional({ example: 1 })
  userId?: number;

  @ApiPropertyOptional({ example: true })
  isCompleted?: boolean;

  @ApiPropertyOptional({ example: '2026-08-01T00:00:00.000Z' })
  fromDate?: string;

  @ApiPropertyOptional({ example: '2026-08-30T00:00:00.000Z' })
  toDate?: string;
}
