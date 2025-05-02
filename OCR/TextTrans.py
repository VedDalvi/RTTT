import sys
from easygoogletranslate import EasyGoogleTranslate

def split_text(text, max_length=4000):
    chunks = []
    while len(text) > max_length:
        split_at = text.rfind(' ', 0, max_length)   # Split at the last space
        if split_at == -1:
            split_at = max_length                   # If no space, split at max_length
        chunks.append(text[:split_at])              # Add chunk
        text = text[split_at:].strip()              # Takes the remaining part of the text after the part you just added to the chunk. Removes any leading or trailing whitespace
    chunks.append(text)                             # Add final piece
    return chunks

def translate_text(text, source_language='en', target_language='gom'):
    translator = EasyGoogleTranslate(
        source_language=source_language,
        target_language=target_language,
        timeout=30
    )
    chunks = split_text(text)
    return ' '.join(translator.translate(chunk) for chunk in chunks)

if len(sys.argv) != 4:
    print("Usage: python TextTrans.py <text> <source_language> <target_language>")
    sys.exit(1)

input_text = sys.argv[1]
source_lang = sys.argv[2]
target_lang = sys.argv[3]

translated_text = translate_text(input_text, source_language=source_lang, target_language=target_lang)

# Output the translated text
print(translated_text)