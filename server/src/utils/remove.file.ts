import { unlink } from "fs";
import { promisify } from "util";

const unlinkAsync = promisify(unlink);

async function removeFile(fileName: string): Promise<void> {
  try {
    await unlinkAsync(`storage/uploads/${fileName}`);
    // console.log(`File at ${filePath} was deleted successfully.`);
  } catch (error) {
    console.error(`Error deleting file at ${fileName}:`, error);
  }
}

export default removeFile;
// Example usage
// removeFile("path/to/your/file.txt");
