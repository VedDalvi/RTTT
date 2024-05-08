!apt-get install fonts-deva-extra
!pip install speechRecognition
!apt install imagemagick
!pip install moviepy
!pip install easygoogletranslate
!pip install ffmpeg-python
!pip install ffprobe
!pip install pydub
!pip install moviepy SpeechRecognition noisereduce pydub
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
import moviepy.editor as mp
import speech_recognition as sr
import os
from easygoogletranslate import EasyGoogleTranslate

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

# Function to overlay translated text onto video with a background
def overlay_translated_text(video_clip, translated_text):
    # Calculate font size based on video dimensions
    width, height = video_clip.size
    font_size = int(min(width, height) * 0.05)  # Adjust font size based on video size

    # Create TextClip with translated text and calculated font size
    txt_clip = mp.TextClip(translated_text, fontsize=font_size, color='white', font='gargi')

    # Calculate text clip duration to match video duration
    txt_clip = txt_clip.set_duration(video_clip.duration)

    # Create a RectangleClip as the background for the text
    rect_width = txt_clip.w + 20  # Add padding around the text
    rect_height = txt_clip.h + 10
    rect_color = (0, 0, 0)  # Black background color
    rect_clip = mp.ColorClip(size=(rect_width, rect_height), color=rect_color)

    # Position the text clip at the center bottom of the background rectangle
    txt_clip = txt_clip.set_position(('center', 'bottom'))

    # Composite video with text and background rectangle
    video_with_translated_text = mp.CompositeVideoClip([video_clip, rect_clip.set_position(('center', 'bottom')), txt_clip])

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

    # Export the final video with overlaid translated text
    final_video_path = "./videocaptions.mp4"
    final_video.write_videofile(final_video_path, codec='libx264')

    # Clean up temporary audio files
    for i in range(len(segments)):
        audio_path = f"segment_{i}.wav"
        if os.path.exists(audio_path):
            os.remove(audio_path)

# Example usage
if __name__ == "__main__":
    video_path = "./what.mp4"
    target_language = "gom"  # Change to the desired target language ISO 639-1 code (e.g., "hi" for Hindi)
    main(video_path, target_language)
