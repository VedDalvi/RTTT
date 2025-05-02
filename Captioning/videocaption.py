import moviepy.editor as mp
import os
from easygoogletranslate import EasyGoogleTranslate
import cairo
from dotenv import load_dotenv
import sys
import whisper
import zipfile

# Load environment variables from .env
load_dotenv()

# Load the Whisper model
whisper_model = whisper.load_model("base", device="cuda")

# Function to split video into 6-second segments
def split_video(video_path):                        #Load the video, get total duration of the video in seconds, at ever 6 seconds create a 6 second segment and return
    video = mp.VideoFileClip(video_path)
    duration = video.duration
    start_times = [i for i in range(0, int(duration), 6)]
    segments = [video.subclip(start_time, min(start_time + 6, duration)) for start_time in start_times]
    return segments

# Function to extract text from audio using Whisper
def extract_text(audio_path):
    result = whisper_model.transcribe(audio_path)
    text = result['text']
    return text

# Function to split character to avoid hitting the 5000 chars limit on the API
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

# Function to translate text to a specified language using Google Translate
def translate_text(text, target_language):
    translator = EasyGoogleTranslate(
        source_language='en',
        target_language=target_language,
        timeout=10                                  # Incase of slow internet, API not responding, the script will stop waiting and raise a timeout error.
    )
    chunks = split_text(text)
    return ' '.join(translator.translate(chunk) for chunk in chunks)

# Function to create a text image using Cairo (Renders translated text as an image using Cairo for better visual quality on video.)
def create_text_image_with_cairo(text, width, height, font_size):
    surface = cairo.ImageSurface(cairo.FORMAT_ARGB32, width, height)        # Create a transparent surface
    context = cairo.Context(surface)
    context.set_source_rgba(0, 0, 0, 0)                                     # Set transparent background
    context.paint()
 
    context.set_source_rgb(1, 1, 1)  # Draw white text
    context.select_font_face("gargi", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
    context.set_font_size(font_size)
    
    # Calculate text position
    text_extents = context.text_extents(text)
    x = (width - text_extents.width) / 2
    y = height - text_extents.height
    
    context.move_to(x, y)
    context.show_text(text)
    
    text_image_path = "text_image.png"
    surface.write_to_png(text_image_path)
    return text_image_path

# Function to overlay translated text onto video with a background
def overlay_translated_text(video_clip, translated_text):
    width, height = video_clip.size                                                                                     # Calculate font size based on video dimensions
    font_size = int(min(width, height) * 0.040)                                                                         # Adjust font size based on video size
    text_image_path = create_text_image_with_cairo(translated_text, width, int(height * 0.1), font_size)                # Create text image with Cairo
    txt_clip = mp.ImageClip(text_image_path).set_duration(video_clip.duration).set_position(('center', 'bottom'))       # Create an ImageClip from the text image
    txt_bg = mp.ColorClip(size=(txt_clip.w + 20, txt_clip.h + 20), color=(0, 0, 0)).set_duration(video_clip.duration)   # Create a background box for the text
    txt_bg = txt_bg.set_position(('center', height - txt_bg.h - 10))
    video_with_translated_text = mp.CompositeVideoClip([video_clip, txt_bg, txt_clip])                                  # Composite video with text image and background box
    return video_with_translated_text

# Function to save the final transcript to a text file  (Saves the complete transcription in both languages as .txt files.)
def save_final_transcripts(english_transcripts, konkani_transcripts, video_name):
    with open(rf"C:\Users\Rutij\Desktop\Project\RTTT\Captioning\content\{video_name}_english.txt", "w", encoding="utf-8") as f:     # Save English transcript
        f.write("\n".join(english_transcripts))
    print(f"English Transcript saved as {video_name}_english.txt")

    with open(rf"C:\Users\Rutij\Desktop\Project\RTTT\Captioning\content\{video_name}_konkani.txt", "w", encoding="utf-8") as f:     # Save Konkani transcript
        f.write("\n".join(konkani_transcripts))
    print(f"Konkani Transcript saved as {video_name}_konkani.txt")

    zip_path = rf"C:\Users\Rutij\Desktop\Project\RTTT\Captioning\content\transcripts.zip"                             #Save the transcripts into a zip file for Sharing.
    eng_ts_path = rf"C:\Users\Rutij\Desktop\Project\RTTT\Captioning\content\{video_name}_english.txt"
    kon_ts_path = rf"C:\Users\Rutij\Desktop\Project\RTTT\Captioning\content\{video_name}_konkani.txt"

    with zipfile.ZipFile(zip_path,"w") as zp:
        zp.write(eng_ts_path, arcname=os.path.basename(eng_ts_path))
        zp.write(kon_ts_path, arcname=os.path.basename(kon_ts_path))

# Main
def main(video_path, target_language):
    video_name = os.path.splitext(os.path.basename(video_path))[0]          # Extract video name without extension
    segments = split_video(video_path)                                      # Split video into 6-second segments

    # Process each segment
    processed_segments = []
    english_transcripts = []
    konkani_transcripts = []

    try:
        for i, segment in enumerate(segments):
            audio_path = f"segment_{i}.wav"                                     # Export audio of the segment
            segment.audio.write_audiofile(audio_path)
            text = extract_text(audio_path)

            # Append the English text to english transcript
            english_transcripts.append(text)

            # Translate extracted text to the specified target language (Konkani) and append the Konkani transcript
            translated_text = translate_text(text, target_language)
            konkani_transcripts.append(translated_text)

            # Print the translated text to the console
            print(f"Segment {i+1} Translated Text: {translated_text}")

            # Overlay translated text onto the segment with background
            segment_with_translated_text = overlay_translated_text(segment, translated_text)
            processed_segments.append(segment_with_translated_text)
        
        final_video = mp.concatenate_videoclips(processed_segments,method='chain') # Concatenate processed segments into one video
        save_path= r"C:\\Users\\Rutij\\Desktop\\Project\\RTTT\\Captioning\\content\\translated_video.mp4"
        final_video.write_videofile(save_path, codec='libx264') # Export the final video

        save_final_transcripts(english_transcripts, konkani_transcripts, video_name) # Save the final transcripts
    
    finally:
        # Delete temporary audio files
        for i in range(len(segments)):
            audio_path = f"segment_{i}.wav"
            if os.path.exists(audio_path):
                os.remove(audio_path)
        
        if os.path.exists("text_image.png"):
            os.remove("text_image.png")

if __name__ == "__main__":
    video_path = sys.argv[1]
    target_language = "gom"  # Konkani language code
    main(video_path, target_language)