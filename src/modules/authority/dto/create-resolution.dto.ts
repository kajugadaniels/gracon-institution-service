import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateResolutionDto {
  @ApiProperty({ description: 'e.g. "Board Resolution 2026-Q1-001"' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  title: string;

  @ApiProperty({
    description: 'What actions this resolution formally authorises',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  scope: string;

  @ApiProperty({
    description: 'Full name and title of the authority who granted this',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  grantedBy: string;

  @ApiProperty({ description: 'ISO date — when this resolution takes effect' })
  @IsDateString()
  validFrom: string;

  @ApiPropertyOptional({
    description: 'ISO date — expiry date. Omit for no expiry.',
  })
  @IsOptional()
  @IsDateString()
  validUntil?: string;
}

export class RevokeResolutionDto {
  @ApiProperty({
    description: 'Reason for revoking — required for audit trail',
  })
  @IsString()
  @MinLength(10)
  reason: string;
}
