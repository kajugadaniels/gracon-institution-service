import { IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GenerateInstitutionKeyDto {
  @ApiProperty({
    enum: ['RSA_2048', 'ED25519'],
    description:
      'RSA_2048 for maximum external compatibility, ED25519 for modern systems.',
  })
  @IsIn(['RSA_2048', 'ED25519'])
  algorithm: 'RSA_2048' | 'ED25519';
}
