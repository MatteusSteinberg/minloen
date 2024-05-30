import Compressor from 'compressorjs'

/**
 *
 * @param file The file to compress
 * @param format Default is image/webp, can be image/jpeg, image/png, etc
 * @param quality Default is 0.8, range 0 - 1
 */

interface ICompressImage {
  file: File
  format?: string
  quality?: number
  maxHeight?: number
  maxWidth?: number
}

export const compressImage = async ({file, format, quality, maxHeight, maxWidth}: ICompressImage) => {
  return new Promise<File>((resolve, reject) => {
    new Compressor(file, {
      quality: quality || 0.8,
      mimeType: format || "image/webp",
      maxHeight: maxHeight || 0,
      maxWidth: maxWidth || 0,
      success(result) {
        resolve(result as File);
      },
      error(err) {
        reject(err);
      },
    });
  });
};