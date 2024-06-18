import moviepy.editor as mp
import speech_recognition as sr
import os
from easygoogletranslate import EasyGoogleTranslate
import cairo
import dotenv

dotenv.load_dotenv()
# Function to split video into 3-second segments
def split_video(video_path):
    video = mp.VideoFileClip(video_path)
    duration = video.duration
    start_times = [i for i in range(0, int(duration), 2)]
    segments = [video.subclip(start_time, min(start_time + 2, duration)) for start_time in start_times]
    return segments

# Function to extract text from audio using Google Speech Recognition
def extract_text(audio_path):
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_path) as source:
        audio = recognizer.record(source)
    try:
        text = recognizer.recognize_google(audio)
        return text
    except sr.UnknownValueError:
        return "Could not understand audio"
    except sr.RequestError as e:
        return f"Error: {e}"

# Function to translate text to a specified language using Google Translate
def translate_text(text, target_language):
    translator = EasyGoogleTranslate(
        source_language='en',
        target_language=target_language,
        timeout=10
    )
    translated_text = translator.translate(text)
    return translated_text

# Function to create a text image using Cairo
def create_text_image_with_cairo(text, width, height, font_size):
    # Create a transparent surface
    surface = cairo.ImageSurface(cairo.FORMAT_ARGB32, width, height)
    context = cairo.Context(surface)
    
    # Set transparent background
    context.set_source_rgba(0, 0, 0, 0)
    context.paint()
    
    # Draw text
    context.set_source_rgb(1, 1, 1)  # White text
    context.select_font_face("gargi", cairo.FONT_SLANT_NORMAL, cairo.FONT_WEIGHT_NORMAL)
    context.set_font_size(font_size)
    
    # Calculate text position
    text_extents = context.text_extents(text)
    x = (width - text_extents.width) / 2
    y = height - text_extents.height
    
    context.move_to(x, y)
    context.show_text(text)
    
    # Save to PNG file
    text_image_path = "text_image.png"
    surface.write_to_png(text_image_path)
    
    return text_image_path

# Function to overlay translated text onto video with a background
def overlay_translated_text(video_clip, translated_text):
    # Calculate font size based on video dimensions
    width, height = video_clip.size
    font_size = int(min(width, height) * 0.05)  # Adjust font size based on video size
    
    # Create text image with Cairo
    text_image_path = create_text_image_with_cairo(translated_text, width, int(height * 0.1), font_size)
    
    # Create an ImageClip from the text image
    txt_clip = mp.ImageClip(text_image_path).set_duration(video_clip.duration).set_position(('center', 'bottom'))
    
    # Composite video with text image
    video_with_translated_text = mp.CompositeVideoClip([video_clip, txt_clip])
    
    return video_with_translated_text

# Main function
def main(video_path, target_language):
    # Split video into 3-second segments
    segments = split_video(video_path)

    # Process each segment
    processed_segments = []
    for i, segment in enumerate(segments):
        # Export audio of the segment
        audio_path = f"segment_{i}.wav"
        segment.audio.write_audiofile(audio_path)

        # Extract text from audio
        text = extract_text(audio_path)

        # Translate extracted text to the specified target language
        translated_text = translate_text(text, target_language)

        # Print the translated text to the console
        print(f"Segment {i+1} Translated Text: {translated_text}")

        # Overlay translated text onto the segment with background
        segment_with_translated_text = overlay_translated_text(segment, translated_text)
        processed_segments.append(segment_with_translated_text)

    # Concatenate processed segments into one video
    final_video = mp.concatenate_videoclips(processed_segments)
    save_path= r"C:\\Users\\Rutij\\Desktop\\Project\\RTTT\\Captioning\\content\\translated_vid.mp4"
    # Export the final video with overlaid translated text
    
    final_video.write_videofile(save_path, codec='libx264')

    # Clean up temporary audio and text image files
    for i in range(len(segments)):
        audio_path = f"segment_{i}.wav"
        if os.path.exists(audio_path):
            os.remove(audio_path)
    
    if os.path.exists("text_image.png"):
        os.remove("text_image.png")

# Example usage
if __name__ == "__main__":
    video_path = r"C:\\Users\\Rutij\\Desktop\\Project\\RTTT\\Captioning\\test_vid.mp4"
    target_language = "gom"  # Change to the desired target language ISO 639-1 code (e.g., "hi" for Hindi)
    main(video_path, target_language)