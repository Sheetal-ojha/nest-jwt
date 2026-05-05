import { Resolver, Mutation, Args } from '@nestjs/graphql';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs'; 
import type { FileUpload } from 'graphql-upload/processRequest.mjs';
import { createWriteStream, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

@Resolver()
export class UploadsResolver {
  @Mutation(() => String)
  async uploadImage(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload,
  ): Promise<string> {
    const { createReadStream, filename } = await file;

    
    const uploadDir = join(process.cwd(), 'uploads');
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }


    const uniqueName = `${Date.now()}-${filename}`;
    const filePath = join(uploadDir, uniqueName);

    return new Promise((resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(filePath))
        .on('finish', () =>
          resolve(`http://localhost:4000/uploads/${uniqueName}`),
        )
        .on('error', (err) => reject(err)),
    );
  }
}