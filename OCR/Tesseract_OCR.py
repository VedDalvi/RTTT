# !pip install PyPDF2
# !pip install pdf2image
# !apt update
# !apt install tesseract-ocr
# !pip install pytesseract
# !pip install easygoogletranslate

from easygoogletranslate import EasyGoogleTranslate
import os
import PyPDF2
from pdf2image import convert_from_path
import pytesseract
from PIL import Image

# Function to extract text from image using OCR
def extract_text_from_image(image_path):
    # Open the image file
    img = Image.open(image_path)

    # Convert image to grayscale
    gray_img = img.convert('L')

    # Perform OCR to extract text
    text = pytesseract.image_to_string(gray_img)

    translator = EasyGoogleTranslate(
    source_language='en',
    target_language='gom',
    timeout=30
    )

    print("Enter Sample Text in English: ")
    engsample= text

    print("\n\nTranslating Input Text...")
    result = translator.translate(engsample)
    print("\n\nTranslated Text: ")
    print(result)
    return text

# Function to extract text from PDF using PyPDF2
def extract_text_from_pdf(pdf_path):
    # Open the PDF file in read-binary mode
    with open(pdf_path, 'rb') as pdf_file:
        # Create a PDF reader object
        pdf_reader = PyPDF2.PdfReader(pdf_file)

        # Initialize list to store extracted text
        extracted_text = []
        from PyPDF2 import PdfReader

        # reader = PdfReader("example.pdf")
        # number_of_pages = len(reader.pages)
        # text = reader.pages[0].extract_text()
        # Iterate through each page of the PDF
        for page_num in range(len(pdf_reader.pages)):
            # Get the text from the current page
            page_text = pdf_reader.pages[page_num].extract_text()
            extracted_text.append(page_text)

        # Combine all extracted text into a single string
        pdf_text = '\n'.join(extracted_text)
        
        translator = EasyGoogleTranslate(
        source_language='en',
        target_language='gom',
        timeout=30
        )

        print("Enter Sample Text in English: ")
        engsample= pdf_text

        print("\n\nTranslating Input Text...")
        result = translator.translate(engsample)
        print("\n\nTranslated Text: ")
        print(result)
        return pdf_text

# Function to extract text based on file type (image or PDF)
def extract_text(input_path):
    # Get the file extension
    file_ext = os.path.splitext(input_path)[1].lower()
    # Check if input is an image
    if file_ext in ['.jpg', '.jpeg', '.png', '.bmp', '.gif']:
        # Extract text from image using OCR
        text = extract_text_from_image(input_path)
    # Check if input is a PDF
    elif file_ext == '.pdf':
        # Extract text from PDF
        text = extract_text_from_pdf(input_path)
    else:
        text = "Unsupported file format"

# Path to your input file (image or PDF)
input_path = '/content/translateimage.png'  # Change this to your input file path

extract_text(input_path)