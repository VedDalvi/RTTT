import sys
from easygoogletranslate import EasyGoogleTranslate

def translate_text(text, target_language='gom'):
    translator = EasyGoogleTranslate(
        source_language='en',
        target_language='gom',
        timeout=30
    )
    translated_text = translator.translate(text)
    return translated_text

if len(sys.argv) != 2:
    print("Usage: python Tesseract_OCR_test.py <text>")
    sys.exit(1)

# English text input
english_text = sys.argv[1]

# Translate the text to Konkani
konkani_translation = translate_text(english_text)

# Output the translated text
print(konkani_translation)