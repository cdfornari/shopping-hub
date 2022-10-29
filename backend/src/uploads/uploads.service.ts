import { Injectable, InternalServerErrorException } from '@nestjs/common';
import {v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UploadsService {

    async uploadImage(filePath: string) {
        try {
            const {secure_url} = await cloudinary.uploader.upload(filePath,{
                folder: 'shopping-hub'
            })
            return secure_url;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(error);
        }
    }
    
}