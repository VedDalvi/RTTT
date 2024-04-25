import moviepy.editor as mp
import speech_recognition as sr
import os

# Function to split video into 5-second segments
def split_video(video_path):
    video = mp.VideoFileClip(video_path)
    duration = video.duration
    start_times = [i for i in range(0, int(duration), 1)]
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

# Function to overlay text onto video
def overlay_text(video_clip, text):
    # Calculate font size based on video dimensions
    width, height = video_clip.size
    font_size = int(min(width, height) * 0.05)  # Adjust font size based on video size

    # Create text clip with calculated font size
    txt_clip = mp.TextClip(text, fontsize=font_size, color='white', font='Arial-Bold')

    # Position text clip at the center bottom of the video
    txt_clip = txt_clip.set_position(('center', 'bottom'))

    # Set duration of text clip to match video duration
    txt_clip = txt_clip.set_duration(video_clip.duration)

    # Composite video with text
    video_with_text = mp.CompositeVideoClip([video_clip, txt_clip])
    return video_with_text

# Main function
def main(video_path):
    # Split video into 5-second segments
    segments = split_video(video_path)
    
    # Process each segment
    processed_segments = []
    for i, segment in enumerate(segments):
        # Export audio of the segment
        audio_path = f"segment_{i}.wav"
        segment.audio.write_audiofile(audio_path)

        # Extract text from audio
        text = extract_text(audio_path)

        # Overlay text onto the segment
        segment_with_text = overlay_text(segment, text)
        processed_segments.append(segment_with_text)

    # Concatenate processed segments into one video
    final_video = mp.concatenate_videoclips(processed_segments)

    # Export the final video with overlaid text
    final_video_path = "C:\\Users\\VENOM\\Desktop\\vidcap\\whatscaptions.mp4"
    final_video.write_videofile(final_video_path, codec='libx264')

    # Clean up temporary audio files
    for i in range(len(segments)):
        audio_path = f"segment_{i}.wav"
        if os.path.exists(audio_path):
            os.remove(audio_path)

# Example usage
if _name_ == "_main_":
    video_path = "C:\\Users\\VENOM\\Desktop\\vidcap\\whats.mp4"
    main(video_path)