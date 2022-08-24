import React, { useEffect, useState } from 'react';
import styles from './TranslationForm.module.css';
import { TranslatedTextInfo } from '../../models';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { SelectType, TranslationFormLabel } from '../../shared/e-num';
import { Skeleton } from 'primereact/skeleton';
import LocalStorageUtils from '../../shared/utils/localStorageUtils';
import { useGetLanguagesListQuery } from '../../features/api/translatorApi';

type ThisProps = {
  labelTitle: TranslationFormLabel;
  selectValue: string;
  textAreaValue: string;
  onSelectChange: (value: string, type: SelectType) => void;
  onTextAreaChange: (value: string, type: SelectType) => void;
  translatedTextInfo: TranslatedTextInfo | undefined;
  isTextLoading?: boolean;
  originText?: string;
};

const TranslationForm: React.FC<ThisProps> = ({
  labelTitle,
  selectValue,
  textAreaValue,
  onTextAreaChange,
  onSelectChange,
  isTextLoading,
  translatedTextInfo,
  originText,
}) => {
  const { data: languageList } = useGetLanguagesListQuery();
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const isTranslateToForm = labelTitle === TranslationFormLabel.TRANSLATE_TO;

  useEffect(() => {
    setIsSaved(false);
  }, [translatedTextInfo]);

  const handleSaveTranslation = () => {
    if (!textAreaValue) {
      return;
    }

    const storedTranslation = LocalStorageUtils.getItem();

    if (storedTranslation && translatedTextInfo) {
      if (Object.keys(storedTranslation).includes(translatedTextInfo.id)) {
        LocalStorageUtils.deleteItem(translatedTextInfo.id);
        setIsSaved(false);
      } else {
        LocalStorageUtils.setNewItem(originText, languageList, translatedTextInfo, storedTranslation);
        setIsSaved(true);
      }
    } else {
      translatedTextInfo && LocalStorageUtils.setNewItem(originText, languageList, translatedTextInfo);
      setIsSaved(true);
    }
  };

  return (
    <div className={styles.wrapper}>
      <span>{labelTitle}</span>
      <Dropdown
        value={selectValue}
        options={languageList}
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
