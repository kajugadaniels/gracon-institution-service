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
import { InstitutionCertificatesService } from './institution-certificates.service';
import { IssueInstitutionCertificateDto } from './dto/issue-institution-certificate.dto';
import { RevokeInstitutionCertificateDto } from './dto/revoke-institution-certificate.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequestUser } from '../auth/interfaces/jwt-payload.interface';

@ApiTags('Institution Certificates')
@ApiBearerAuth()
@Controller('institutions/:institutionId/certificates')
export class InstitutionCertificatesController {
  constructor(private readonly service: InstitutionCertificatesService) {}

  @Post('issue')
  @HttpCode(HttpStatus.CREATED)
  @ApiParam({ name: 'institutionId', type: String })
  @ApiOperation({ summary: 'Issue institution X.509 certificate — admin only' })
  @ApiResponse({ status: 201, description: 'Certificate issued and stored' })
  @ApiResponse({ status: 400, description: 'No active key pair' })
  @ApiResponse({
    status: 409,
    description: 'Active certificate already exists',
  })
  issue(
    @CurrentUser() user: RequestUser,
    @Param('institutionId') institutionId: string,
    @Body() dto: IssueInstitutionCertificateDto,
  ) {
    return this.service.issue(institutionId, user.userId, dto);
  }

  @Get('current')
  @ApiParam({ name: 'institutionId', type: String })
  @ApiOperation({
    summary: 'Get current active institution certificate in PEM format',
  })
  @ApiResponse({
    status: 200,
    description: 'Certificate returned with validity info',
  })
  @ApiResponse({ status: 404, description: 'No active certificate' })
  getCurrent(@Param('institutionId') institutionId: string) {
    return this.service.getCurrent(institutionId);
  }

  @Post('revoke')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'institutionId', type: String })
  @ApiOperation({
    summary: 'Revoke institution certificate — permanent, admin only',
  })
  @ApiResponse({ status: 200, description: 'Certificate revoked' })
  revoke(
    @CurrentUser() user: RequestUser,
    @Param('institutionId') institutionId: string,
    @Body() dto: RevokeInstitutionCertificateDto,
  ) {
    return this.service.revoke(institutionId, user.userId, dto);
  }
}
