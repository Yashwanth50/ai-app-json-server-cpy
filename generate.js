const { createWorker } = require("tesseract.js");
const fs = require("fs");

async function getTextFromImage(imagePath) {
  console.log("Creating worker...");
  const worker = await createWorker(); // Await the worker creation
  console.log("Worker created:", worker);

  try {
    const buffer = fs.readFileSync(imagePath); // Synchronously read the image file
    const {
      data: { text },
    } = await worker.recognize(buffer);
    await worker.terminate();
    return text;
  } catch (error) {
    console.error("Error during OCR:", error);
    await worker.terminate();
    return null;
  }
}

const imagePath = "C:/Users/yashw/Downloads/sample-2.jpg";
getTextFromImage(imagePath)
  .then((text) => {
    if (text) {
      console.log("Extracted text:", text);
    } else {
      console.log("No text extracted.");
    }
  })
  .catch((err) => console.error("Error:", err));
