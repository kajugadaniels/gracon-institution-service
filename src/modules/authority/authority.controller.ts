import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { AuthorityService } from './authority.service';
import {
  CreateResolutionDto,
  RevokeResolutionDto,
} from './dto/create-resolution.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequestUser } from '../auth/interfaces/jwt-payload.interface';

@ApiTags('Authority Resolutions')
@ApiBearerAuth()
@Controller('institutions/:institutionId/resolutions')
export class AuthorityController {
  constructor(private readonly service: AuthorityService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiParam({ name: 'institutionId', type: String })
  @ApiOperation({
    summary: 'Create a board resolution — institution admin only',
  })
  @ApiResponse({ status: 201, description: 'Resolution created' })
  create(
    @CurrentUser() user: RequestUser,
    @Param('institutionId') institutionId: string,
    @Body() dto: CreateResolutionDto,
  ) {
    return this.service.create(institutionId, dto, user.userId);
  }

  @Get()
  @ApiParam({ name: 'institutionId', type: String })
  @ApiQuery({ name: 'activeOnly', required: false, type: Boolean })
  @ApiOperation({ summary: 'List resolutions for an institution' })
  findAll(
    @Param('institutionId') institutionId: string,
    @Query('activeOnly') activeOnly = 'true',
  ) {
    return this.service.findByInstitution(
      institutionId,
      activeOnly !== 'false',
    );
  }

  @Post(':resolutionId/revoke')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'institutionId', type: String })
  @ApiParam({ name: 'resolutionId', type: String })
  @ApiOperation({
    summary:
      'Revoke a resolution — removes stamp authority from all affected members',
  })
  revoke(
    @CurrentUser() user: RequestUser,
    @Param('institutionId') institutionId: string,
    @Param('resolutionId') resolutionId: string,
    @Body() dto: RevokeResolutionDto,
  ) {
    return this.service.revoke(institutionId, resolutionId, dto, user.userId);
  }
}
