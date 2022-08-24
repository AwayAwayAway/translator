import { FavouriteTranslation, SelectItem, TranslatedTextInfo } from '../../models';
import { LocalStorageKey } from '../e-num';

export default class LocalStorageUtils {
  public static getItem(): { [key: string]: FavouriteTranslation } | undefined {
    const storedTranslation = localStorage.getItem(LocalStorageKey.FAVOURITE);
    if (storedTranslation) {
      return JSON.parse(storedTranslation);
    }
  }

  public static setNewItem(
    originText: string | undefined,
    languageList: SelectItem[] | undefined,
    translatedTextInfo: TranslatedTextInfo,
    prevTranslation: FavouriteTranslation | {} = {}
  ) {
    localStorage.setItem(
      LocalStorageKey.FAVOURITE,
      JSON.stringify({
        ...prevTranslation,
        [translatedTextInfo.id]: {
          originText,
          translatedText: translatedTextInfo.translations.text,
          originLanguage: languageList?.find((item) => item.value === translatedTextInfo?.detectedLanguage.language)?.label || '',
          translatedLanguage: languageList?.find((item) => item.value === translatedTextInfo?.translations.to)?.label || '',
        },
      })
    );
  }

  public static deleteItem(id: string) {
    const storedTranslation = this.getItem();
    if (storedTranslation) {
      delete storedTranslation[id];
      localStorage.setItem(LocalStorageKey.FAVOURITE, JSON.stringify(storedTranslation));
    }
  }
}
