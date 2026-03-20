import asyncio
import os
import sys
import json
import time

# Ensure we can import from the backend
sys.path.insert(0, os.path.dirname(__file__))

from config.settings import settings
from services.speech_service import process_generative_feedback, process_audio_transcription

async def test_gemini():
    print("\n--- STAGE 1: Testing Google Gemini ---")
    mock_transcription = "Hi everyone. My name is Anil and I am basically learning communication skills. Um, I think it is really important for my career. Like, I want to be a software engineer."
    
    print(f"Sending mock transcript to Gemini: \"{mock_transcription}\"")
    t0 = time.time()
    result = await process_generative_feedback(mock_transcription)
    elapsed = round(time.time() - t0, 2)
    
    print(f"Gemini responded in {elapsed}s")
    print(json.dumps(result, indent=2))
    
    eval_data = result.get("ai_evaluation", {})
    if eval_data.get("feedback_source") == "gemini":
        print("[SUCCESS] STAGE 1: Gemini is working correctly!")
    else:
        print(f"[FAILED] STAGE 1: Gemini returned fallback feedback. Error: {eval_data.get('fallback_reason')}")

async def test_whisper_load():
    print("\n--- STAGE 2: Testing Local Whisper Load ---")
    try:
        import whisper
        print("Loading Whisper 'base' model...")
        t0 = time.time()
        # Non-blocking model load for test
        model = whisper.load_model("base")
        elapsed = round(time.time() - t0, 2)
        print(f"[SUCCESS] STAGE 2: Whisper loaded in {elapsed}s")
        return True
    except Exception as e:
        print(f"[FAILED] STAGE 2: Could not load Whisper. Error: {e}")
        return False

async def main():
    print("=" * 60)
    print(" Zenvoco Hybrid AI Architecture Verification")
    print("=" * 60)
    
    if not settings.GEMINI_API_KEY:
        print("[ERROR]: GEMINI_API_KEY is missing in your .env file!")
        return

    # 1. Test Gemini
    await test_gemini()
    
    # 2. Test Whisper
    await test_whisper_load()
    
    print("\n" + "=" * 60)
    print("Verification Complete!")
    print("=" * 60)

if __name__ == "__main__":
    asyncio.run(main())
