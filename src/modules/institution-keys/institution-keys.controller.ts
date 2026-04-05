import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { InstitutionKeysService } from './institution-keys.service';
import { GenerateInstitutionKeyDto } from './dto/generate-institution-key.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequestUser } from '../auth/interfaces/jwt-payload.interface';

@ApiTags('Institution Keys')
@ApiBearerAuth()
@Controller('institutions/:institutionId/keys')
export class InstitutionKeysController {
  constructor(private readonly service: InstitutionKeysService) {}

  @Post('generate')
  @HttpCode(HttpStatus.CREATED)
  @Throttle({ strict: { limit: 3, ttl: 600_000 } })
  @ApiParam({ name: 'institutionId', type: String })
  @ApiOperation({
    summary:
      'Generate institution key pair — institution admin only, public key returned only',
  })
  @ApiResponse({
    status: 201,
    description:
      'Key pair generated — private key encrypted and stored, never returned',
  })
  @ApiResponse({
    status: 409,
    description: 'Active key pair already exists — use /rotate',
  })
  generate(
    @CurrentUser() user: RequestUser,
    @Param('institutionId') institutionId: string,
    @Body() dto: GenerateInstitutionKeyDto,
  ) {
    return this.service.generate(institutionId, user.userId, dto);
  }

  @Get('public')
  @ApiParam({ name: 'institutionId', type: String })
  @ApiOperation({ summary: 'Get institution public key in PEM format' })
  @ApiResponse({ status: 200, description: 'Public key returned' })
  @ApiResponse({ status: 404, description: 'No active key pair' })
  getPublicKey(@Param('institutionId') institutionId: string) {
    return this.service.getPublicKey(institutionId);
  }

  @Post('rotate')
  @HttpCode(HttpStatus.CREATED)
  @Throttle({ strict: { limit: 2, ttl: 600_000 } })
  @ApiParam({ name: 'institutionId', type: String })
  @ApiOperation({
    summary:
      'Rotate institution key pair — revokes existing certificate, generates new pair',
  })
  rotate(
    @CurrentUser() user: RequestUser,
    @Param('institutionId') institutionId: string,
    @Body() dto: GenerateInstitutionKeyDto,
  ) {
    return this.service.rotate(institutionId, user.userId, dto);
  }
}
