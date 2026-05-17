type SpeechRecognitionResultItemLike = {
  transcript: string;
};

type SpeechRecognitionResultLike = {
  0: SpeechRecognitionResultItemLike;
};

type SpeechRecognitionEventLike = {
  results: {
    0: SpeechRecognitionResultLike;
  };
};

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  start: () => void;
};

declare global {
  interface Window {
    webkitSpeechRecognition?: {
      new (): SpeechRecognitionLike;
    };
    SpeechRecognition?: {
      new (): SpeechRecognitionLike;
    };
  }
}

export {};
