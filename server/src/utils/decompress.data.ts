import LZString from 'lz-string';

// Function to decompress the 'deskripsi' field
export const decompressText = (compressedDeskripsi: string): string => {
    return LZString.decompressFromEncodedURIComponent(compressedDeskripsi) || '';
};
