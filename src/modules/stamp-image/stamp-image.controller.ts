import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiParam,
} from '@nestjs/swagger';
import { StampImageService } from './stamp-image.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RequestUser } from '../auth/interfaces/jwt-payload.interface';

@ApiTags('Stamp Image')
@ApiBearerAuth()
@Controller('institutions/:institutionId/stamp-image')
export class StampImageController {
  constructor(private readonly service: StampImageService) {}

  @Post('upload')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('file', { storage: undefined }))
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'institutionId', type: String })
  @ApiOperation({
    summary:
      'Upload institution stamp image (PNG/SVG ≤ 2MB) — institution admin only',
  })
  upload(
    @CurrentUser() user: RequestUser,
    @Param('institutionId') institutionId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.upload(institutionId, user.userId, file);
  }

  @Get()
  @ApiParam({ name: 'institutionId', type: String })
  @ApiOperation({
    summary: 'Get current stamp image as 1-hour presigned S3 URL',
  })
  get(@Param('institutionId') institutionId: string) {
    return this.service.get(institutionId);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'institutionId', type: String })
  @ApiOperation({
    summary: 'Soft-delete current stamp image — institution admin only',
  })
  delete(
    @CurrentUser() user: RequestUser,
    @Param('institutionId') institutionId: string,
  ) {
    return this.service.delete(institutionId, user.userId);
  }
}
