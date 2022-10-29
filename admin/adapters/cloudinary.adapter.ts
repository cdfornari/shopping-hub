import axios from 'axios'
import { CloudinaryResponse } from '../interfaces/cloudinary-response.interface';

export class CloudinaryAdapter {
    private cloudinaryUrl?: string;

    constructor() { 
        this.cloudinaryUrl = process.env.CLOUDINARY_URL;
        if(!this.cloudinaryUrl) throw new Error('CLOUDINARY_URL is not defined');
    }

    async upload(file: File): Promise<CloudinaryResponse> {
        try {
            const resp = await axios.postForm<CloudinaryResponse>(this.cloudinaryUrl!, {
                file: file,
                upload_preset: 'shopping-hub'
            })
            return resp.data;
        } catch (error) {
            throw error;
        }
    }

}