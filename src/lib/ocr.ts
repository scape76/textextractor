import Tesseract from "tesseract.js";

export async function performOCR(file: File) {
  try {
    const result = await Tesseract.recognize(file, "eng", {
      logger: (m) => console.log(m),
    });
    console.log(result.data.text);
    return result.data.text;
  } catch (error) {
    console.log(error);
  }
}
