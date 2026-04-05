import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RevokeInstitutionCertificateDto {
  @ApiProperty({
    description: 'Reason for revocation — required for legal audit trail',
  })
  @IsString()
  @MinLength(10)
  reason: string;
}
