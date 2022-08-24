export type Dictionary = {
  [key: string]: {
    dir: string;
    name: string;
    nativeName: string;
  };
};

export type SelectItem = {
  label: string;
  value: string;
};

export type TranslationResponse = {
  detectedLanguage: { language: string; score: number };
  translations: { text: string; to: string }[];
};

export type TranslatedTextInfo = {
  id: string;
  detectedLanguage: { language: string; score: number };
  translations: { text: string; to: string };
};

export type FavouriteTranslation = {
  id: string;
  originText: string;
  translatedText: string;
  originLanguage: string;
  translatedLanguage: string;
};
