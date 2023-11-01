import * as sharp from 'sharp';



export default class SharpService {
  static async resizeImage(imageBuffer: Buffer, width: number, height: number, format: keyof sharp.FormatEnum): Promise<Buffer> {
    return sharp(imageBuffer).resize(width, height).toFormat(format).toBuffer();
  }
}

