import openai
from config.settings import settings
import json

# Configure Async OpenAI 
client = openai.AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

async def process_audio_transcription(file_path: str) -> str:
    """
    Use OpenAI Whisper to perform Speech-to-Text inference.
    """
    if not settings.OPENAI_API_KEY:
        # Mock payload if key mapping is inactive during dev
        return "I am excited to use Zenvoco to improve my speaking skills. Honestly, I think it will be great."
    
    try:
        with open(file_path, "rb") as audio_file:
            transcript = await client.audio.transcriptions.create(
                model="whisper-1", 
                file=audio_file
            )
        return transcript.text
    except Exception as e:
        print(f"Whisper inference error: {e}")
        return "Audio transcription failed."

async def process_generative_feedback(transcription: str) -> dict:
    """
    Use OpenAI to return analytical data mapping to specific Communication factors.
    Returns Dictionary payload.
    """
    if not settings.OPENAI_API_KEY:
        # Mock payload mapping for frontend layout testing.
        return {
            "ai_feedback": "Great start! Try to reduce filler words and speak slightly slower.",
            "speech_clarity": 82,
            "filler_words": 3,
            "pace": 78,
            "grammar_score": 90,
            "confidence_score": 85
        }
        
    prompt = f"""
    Analyze the following transcribed text from a college student practicing their communication skills:
    Text: "{transcription}"
    
    You need to score their text for confidence factors. Provide the output strictly as a JSON object containing exactly these fields (respect the types):
    - "ai_feedback": (A string containing 2 brief sentences of coaching advice.)
    - "speech_clarity": (Integer 0-100 score)
    - "filler_words": (Integer count of filler words found like um, ah, basically, like)
    - "pace": (Integer 0-100 score of estimated pace based on structure)
    - "grammar_score": (Integer 0-100 score of standard grammatical structure)
    - "confidence_score": (Integer 0-100 overall score)
    """
    
    try:
        response = await client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a professional AI speech analysis and communication coach."},
                {"role": "user", "content": prompt}
            ],
            response_format={ "type": "json_object" }
        )
        data = json.loads(response.choices[0].message.content)
        return data
    except Exception as e:
        print("ChatGPT Inference logic error...", e)
        return {
            "ai_feedback": "Could not analyze text.",
            "speech_clarity": 0, "filler_words": 0, "pace": 0, 
            "grammar_score": 0, "confidence_score": 0
        }
