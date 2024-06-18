import ctranslate2
from sentencepiece import SentencePieceProcessor
from huggingface_hub import snapshot_download

model_name = "santhosh/madlad400-3b-ct2"
model_path = snapshot_download(model_name)

tokenizer = SentencePieceProcessor()
tokenizer.load(f"{model_path}/sentencepiece.model")
translator = ctranslate2.Translator(model_path)

input_text = "This sentence should be shown in konkani" #replace hardcoded value with text from user
input_tokens = tokenizer.encode(f"<2gom> {input_text}", out_type=str)
results = translator.translate_batch(
    [input_tokens],
    batch_type="tokens",
    max_batch_size=5076,
    beam_size=1,
    no_repeat_ngram_size=3,
    repetition_penalty=5,
)
translated_sentence = tokenizer.decode(results[0].hypotheses[0])
print(translated_sentence)

