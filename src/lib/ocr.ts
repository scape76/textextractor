import { createWorker } from "tesseract.js";
import { languages } from "./languages";

let worker: Awaited<ReturnType<typeof createWorker>>;
let isReady = false;

export async function initializeWorker() {
  if (!worker) worker = await createWorker();
  await worker.load();
  await worker.loadLanguage("eng");
  await worker.initialize("eng");
  isReady = true;
  console.log("WORKER INITIALIZED");
}

export async function initializeLanguage(language: string) {
  if (!Object.values(languages).includes(language)) return;
  isReady = false;
  const abbreviation = Object.keys(languages).find(
    (key) => languages[key] === language
  );
  await worker.loadLanguage(abbreviation);
  await worker.initialize(abbreviation);
  isReady = true;
}

export async function performOCR(file: File, language: string) {
  try {
    if (isReady) {
      await initializeLanguage(language);
      const {
        data: { text },
      } = await worker.recognize(file);
      return text;
    }
  } catch (error) {
    console.log(error);
  }
}
