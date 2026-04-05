import { IsUUID, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GrantStampAuthorityDto {
  @ApiProperty({
    description: 'userId of the member receiving stamp authority',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({ description: 'resolutionId that backs this authority grant' })
  @IsUUID()
  resolutionId: string;
}

export class RevokeStampAuthorityDto {
  @ApiProperty({ description: 'userId of the member losing stamp authority' })
  @IsUUID()
  userId: string;

  @ApiProperty({ description: 'Reason for revoking stamp authority' })
  @IsString()
  @MinLength(10)
  reason: string;
}
