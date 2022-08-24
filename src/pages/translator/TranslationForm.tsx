import React, { useEffect, useState } from 'react';
import styles from './TranslationForm.module.css';
import { FavouriteTranslation, SelectItem, TranslatedTextInfo } from '../../models';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { LocalStorageKey, SelectType, TranslationFormLabel } from '../../shared/e-num';
import { Skeleton } from 'primereact/skeleton';

type ThisProps = {
  labelTitle: TranslationFormLabel;
  initialList: SelectItem[] | undefined;
  selectValue: string;
  textAreaValue: string;
  onSelectChange: (value: string, type: SelectType) => void;
  onTextAreaChange: (value: string, type: SelectType) => void;
  translatedTextInfo: TranslatedTextInfo | undefined;
  isTextLoading?: boolean;
};

const TranslationForm: React.FC<ThisProps> = ({
  initialList,
  labelTitle,
  selectValue,
  textAreaValue,
  onTextAreaChange,
  onSelectChange,
  isTextLoading,
  translatedTextInfo,
}) => {
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const isTranslateToForm = labelTitle === TranslationFormLabel.TRANSLATE_TO;

  useEffect(() => {
    setIsSaved(false);
  }, [translatedTextInfo]);

  const saveNewTextToStorage = (originTranslation: string, id: string, prevTranslation: FavouriteTranslation | {} = {}) => {
    localStorage.setItem(
      LocalStorageKey.FAVOURITE,
      JSON.stringify({
        ...prevTranslation,
        [id]: {
          originText: textAreaValue,
          translatedText: originTranslation,
          originLanguage: initialList?.find((item) => item.value === translatedTextInfo?.detectedLanguage.language)?.label || '',
          translatedLanguage: initialList?.find((item) => item.value === translatedTextInfo?.translations.to)?.label || '',
        },
      })
    );
  };

  const handleSaveTranslation = () => {
    if (!textAreaValue) {
      return;
    }

    const storedTranslation = localStorage.getItem(LocalStorageKey.FAVOURITE);

    if (storedTranslation && translatedTextInfo) {
      const favouriteTranslation = JSON.parse(storedTranslation);

      if (Object.keys(favouriteTranslation).includes(translatedTextInfo.id)) {
        delete favouriteTranslation[translatedTextInfo.id];
        localStorage.setItem(LocalStorageKey.FAVOURITE, JSON.stringify(favouriteTranslation));
        setIsSaved(false);
      } else {
        saveNewTextToStorage(translatedTextInfo.translations.text, translatedTextInfo.id, favouriteTranslation);
        setIsSaved(true);
      }
    } else {
      translatedTextInfo && saveNewTextToStorage(translatedTextInfo.translations.text, translatedTextInfo.id);
      setIsSaved(true);
    }
  };

  return (
    <div className={styles.wrapper}>
      <span>{labelTitle}</span>
      <Dropdown
        value={selectValue}
        options={initialList}
        placeholder="Choose Language"
        onChange={(v) => onSelectChange(v.value, isTranslateToForm ? SelectType.TO : SelectType.FROM)}
      />
      <div className={styles.inputWrapper}>
        {isTextLoading ? (
          <Skeleton className={styles.skeleton} />
        ) : (
          <>
            <InputTextarea
              disabled={isTranslateToForm}
              value={textAreaValue}
              rows={10}
              className={styles.textArea}
              onChange={(v) => onTextAreaChange(v.target.value, isTranslateToForm ? SelectType.TO : SelectType.FROM)}
            />
            {isTranslateToForm && (
              <i className={`${isSaved ? 'pi pi-star-fill' : 'pi pi-star'} ${styles.favouriteIcon}`} onClick={handleSaveTranslation} />
            )}
          </>
        )}
        {translatedTextInfo && translatedTextInfo.detectedLanguage.language !== selectValue && !isTranslateToForm && (
          <div className={styles.warningMessage}>Please switch keyboard language</div>
        )}
      </div>
    </div>
  );
};

export default TranslationForm;
