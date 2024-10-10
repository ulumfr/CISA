import LZString from "lz-string";

// Function to compress the 'deskripsi' field
export const compressText = (deskripsi: string): string => {
  return LZString.compressToEncodedURIComponent(deskripsi);
};
