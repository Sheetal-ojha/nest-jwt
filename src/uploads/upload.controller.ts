import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Public } from '../auth/decorators/public.decorator';
@Controller('upload')
export class UploadController {

  @Public()  
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'uploads',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + file.originalname;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: any, @Req() req: any) {
  const baseUrl = `${req.protocol}://${req.get('host')}`;

  return {
    imageUrl: `${baseUrl}/uploads/${file.filename}`,
  };
}
}