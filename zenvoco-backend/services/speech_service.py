from openai import AsyncOpenAI
from config.settings import settings
import json

#Initialize OpenAI client
client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)


# AUDIO → TEXT (WHISPER)
async def process_audio_transcription(file_path: str) -> str:
    if not settings.OPENAI_API_KEY:
        return "This is a mock transcription for testing."

    try:
        with open(file_path, "rb") as audio_file:
            transcript = await client.audio.transcriptions.create(
                model="whisper-1",
                file=audio_file
            )

        print("Transcription:", transcript.text)
        return transcript.text

    except Exception as e:
        print(f"Whisper error: {e}")
        return "Audio transcription failed."


# TEXT → AI FEEDBACK
async def process_generative_feedback(transcription: str) -> dict:
    if not settings.OPENAI_API_KEY:
        return {
            "ai_evaluation": {
                "ai_feedback": "Mock feedback for testing.",
                "speech_clarity": 80,
                "filler_words": 2,
                "pace": 75,
                "grammar_score": 85,
                "confidence_score": 82
            }
        }

    prompt = f"""
    Analyze the following speech from a student:

    "{transcription}"

    Return ONLY a JSON object with:
    - ai_feedback (2 short coaching sentences)
    - speech_clarity (0-100)
    - filler_words (count)
    - pace (0-100)
    - grammar_score (0-100)
    - confidence_score (0-100)
    """

    try:
        response = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are an expert communication coach."},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"}
        )

        data = json.loads(response.choices[0].message.content)

        print("AI Evaluation:", data)

        return {
            "ai_evaluation": data
        }

    except Exception as e:
        print("AI error:", e)

        return {
            "ai_evaluation": {
                "ai_feedback": "AI analysis failed.",
                "speech_clarity": 0,
                "filler_words": 0,
                "pace": 0,
                "grammar_score": 0,
                "confidence_score": 0
            }
        }