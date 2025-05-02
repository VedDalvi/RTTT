# Real-Time Translator: English Text, PDF & Images Translation/Video Captioning

This project is a Python-based tool that combines **speech recognition**, **text extraction**, and **language translation** to process and translate **video**, **PDF**, and **image** files into **Konkani (gom)** or any other supported language. It uses a combination of `OpenAI Whisper`, `Tesseract OCR`, and `Google Translate` for a robust multimodal translation pipeline.

---
## 🖥️ System Requirements
- CPU : Intel(R) Core(TM) i5-10300H CPU @ 2.50GHz
- GPU : NVIDIA GeForce GTX 1650 Ti
- RAM : 8 GB
- Designed to work on **Windows 10**.

## 🔧 Features

### ✅ Video Captioning
- Splits videos into 6-second segments.
- Transcribes speech using **Whisper (base)** model.
- Translates transcriptions into target language (default: **Konkani**).
- Renders translated text on video using **Cairo** for smooth Devanagari script rendering.
- Saves transcripts (English + translated) as `.txt` and zipped output.
- Exports final translated video.
- **Please Note**: tiny, medium and large models can be downloaded. However you'll need sufficient computing power to run the medium and large model. This project was tested on base model which provided good enough accuracy for speech recognition but still had issues recognizing words when there were different accents.

### ✅ PDF & Image Translation
- Extracts text from:
  - PDFs via `PyPDF2`
  - Images via `Tesseract OCR`
- Translates long-form text (auto-chunks > 5000 characters to avoid API limits).
- Saves translated output as a `translated_output.docx` document.

### ✅ Utilities
- Uses environment variables via `.env` for file paths and configurations.

  ---

## 🚀 Technologies Used

- 🎙️ `Whisper` (OpenAI) for speech-to-text
- 📄 `Tesseract OCR` for image-based text extraction
- 📚 `PyPDF2` for PDF parsing
- 🌐 `EasyGoogleTranslate` for translations from English to Konkani
- 🎥 `moviepy` for video editing
- 🎨 `cairo` for text rendering on videos
