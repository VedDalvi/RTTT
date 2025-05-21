import moviepy.editor as mp
import os
import whisper
from moviepy.editor import CompositeVideoClip, ImageClip
from wand.image import Image
from wand.drawing import Drawing
from wand.color import Color
import sys
from dotenv import load_dotenv
from easygoogletranslate import EasyGoogleTranslate
import zipfile
from tqdm import tqdm
from PIL import Image as PILImage

load_dotenv()
model = whisper.load_model("small", device="cuda")

# Render text as image using Cairo (with background)
def render_text_image(text, width, height, font_size, output_path):
    with Image(width=width, height=height, background=Color("transparent")) as img:
        with Drawing() as draw:
            draw.font = r"C:\Users\Rutij\Desktop\Project\RTTT\Captioning\NotoSansDevanagari-Regular.ttf"
            draw.font_size = font_size
            draw.fill_color = Color("white")

            # Draw semi-transparent background rectangle
            bg_height = font_size + 20
            draw.fill_color = Color("rgba(0,0,0,0.6)")
            draw.rectangle(left=0, top=height - bg_height, width=width, height=bg_height)

            # Draw text centered
            draw.fill_color = Color("white")
            metrics = draw.get_font_metrics(img, text, multiline=False)
            text_width = metrics.text_width
            x = max(0, int((width - text_width) / 2))
            y = int(height - (bg_height - font_size) / 2) - 10

            draw.text(x, y, text)
            draw(img)

        img.save(filename=output_path)

    # Convert the image to RGB using PIL
    with PILImage.open(output_path) as im:
        rgb_im = im.convert('RGB')
        rgb_im.save(output_path)

# Translate text using EasyGoogleTranslate
def translate_text(text, target_language="gom"):
    translator = EasyGoogleTranslate(source_language="en", target_language=target_language, timeout=10) #API Call with timeout=10s if it takes too long to respond
    
    # Split the text into chunks of 5000 characters or less, splitting at spaces
    chunks = []
    max_length = 5000
    while len(text) > max_length:
        split_at = text.rfind(' ', 0, max_length)   # Split at the last space
        if split_at == -1: 
            split_at = max_length                   # If no space, split at max_length
        chunks.append(text[:split_at].strip())      # Add chunk
        text = text[split_at:].strip()              # Takes the remaining part of the text after the part you just added to the chunk. Removes any leading or trailing whitespace
    chunks.append(text.strip())                     # Add final piece

    translated_text = ""
    for chunk in chunks:
        if chunk: 
            translated_text += translator.translate(chunk) 
    return translated_text

# Save transcripts to ZIP
def save_final_transcripts(english_transcripts, konkani_transcripts, video_name):
    base_path = r"C:\Users\Rutij\Desktop\Project\RTTT\Captioning\content"
    eng_path = os.path.join(base_path, f"{video_name}_english.txt")
    kon_path = os.path.join(base_path, f"{video_name}_konkani.txt")

    with open(eng_path, "w", encoding="utf-8") as f:
        f.write("\n".join(english_transcripts))
    print(f"English Transcript saved: {eng_path}")

    with open(kon_path, "w", encoding="utf-8") as f:
        f.write("\n".join(konkani_transcripts))
    print(f"Konkani Transcript saved: {kon_path}")

    zip_path = os.path.join(base_path, "transcripts.zip")
    with zipfile.ZipFile(zip_path, "w") as zp:
        zp.write(eng_path, arcname=os.path.basename(eng_path))
        zp.write(kon_path, arcname=os.path.basename(kon_path))

# Main video processing
def process_video(video_path):
    video = mp.VideoFileClip(video_path)
    video_name = os.path.splitext(os.path.basename(video_path))[0]

    print("Transcribing with Whisper...")
    result = model.transcribe(video_path, word_timestamps=True)  #Using whisper to extract the audio from video

    english_transcripts = []
    konkani_transcripts = []
    previous_text = ""  # Prevent duplicates
    subtitles = []

    for segment in result["segments"]:
        start, end = segment["start"], segment["end"]
        text = segment["text"].strip()
        print("Text : {text}")
        if text == previous_text:   # This is to prevent overlapping of subtitles
            continue  # Skip if same as the previous subtitle
        previous_text = text

        english_transcripts.append(text)        # Save english subtitles in array
        translated = translate_text(text)
        print(f"Text: {text}")
        print(f"Translated to: {translated}")
        konkani_transcripts.append(translated)          # Save konkani subtitles in array
        subtitles.append(((start, end), translated))    # Save subtitles to array to implement into the video

    print("Rendering subtitles with ImageMagick")
    image_clips = []
    image_paths = []
    try:
        for i, ((start, end), text) in tqdm(enumerate(subtitles), desc="Rendering Subtitle Images", total=len(subtitles)):
            # Only render the subtitle if the text is not empty
            if text:
                img_path = f"text_img_{i}.png"
                render_text_image(text, int(video.w), int(video.h * 0.12), int(min(video.w, video.h) * 0.04), img_path)
                img_clip = ImageClip(img_path).set_start(start).set_end(end).set_duration(end - start).set_position(("center", "bottom"))
                image_clips.append(img_clip)
                image_paths.append(img_path) 

        print("Compositing final video...")
        final = CompositeVideoClip([video] + image_clips)
        output_path = r"C:\Users\Rutij\Desktop\Project\RTTT\Captioning\content\translated_video.mp4"
        final.write_videofile(output_path, codec="libx264", fps=video.fps)
        print("Saved video:", output_path)

        save_final_transcripts(english_transcripts, konkani_transcripts, video_name)
    finally:
        for img_path in image_paths:
            if os.path.exists(img_path):
                os.remove(img_path)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python script.py <path_to_video>")
    else:
        process_video(sys.argv[1])