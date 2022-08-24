import React, { useEffect, useState } from 'react';
import styles from './TranslatorPage.module.css';
import { useSendTextToTranslateMutation } from '../../features/api/translatorApi';
import TranslationForm from './TranslationForm';
import { SelectType, TranslationFormLabel } from '../../shared/e-num';

const TranslatorPage: React.FC = () => {
  const [handleTranslate, { data: translatedTextInfo, isLoading: isTextLoading }] = useSendTextToTranslateMutation();
  const [selectedLangFrom, setSelectedLangFrom] = useState<string>('ru');
  const [selectedLangTo, setSelectedLangTo] = useState<string>('en');
  const [translateTextFrom, setTranslateTextFrom] = useState<string>('');
  const [translateTextTo, setTranslateTextTo] = useState<string>('');

  useEffect(() => {
    if (translatedTextInfo) {
      setTranslateTextTo(translatedTextInfo.translations.text);
    }
  }, [translatedTextInfo]);

  useEffect(() => {
    if (!translateTextFrom) {
      return;
    }

    const searchDelay = setTimeout(() => {
      handleTranslate({ to: selectedLangTo, text: translateTextFrom });
    }, 500);

    return () => clearTimeout(searchDelay);
  }, [translateTextFrom, selectedLangTo, handleTranslate]);

  const handleSelectChange = (value: string, type: SelectType) => {
    switch (type) {
      case SelectType.FROM:
        return setSelectedLangFrom(value);
      case SelectType.TO:
        return setSelectedLangTo(value);
      default:
        return '';
    }
  };

  const handleTextAreaChange = (value: string, type: SelectType) => {
    switch (type) {
      case SelectType.FROM:
        return setTranslateTextFrom(value);
      case SelectType.TO:
        return setTranslateTextTo(value);
      default:
        return '';
    }
  };

  return (
    <div className={styles.wrapper}>
      <TranslationForm
        labelTitle={TranslationFormLabel.TRANSLATE_FROM}
        selectValue={selectedLangFrom}
        textAreaValue={translateTextFrom}
        onSelectChange={handleSelectChange}
        onTextAreaChange={handleTextAreaChange}
        translatedTextInfo={translatedTextInfo}
      />
      <TranslationForm
        labelTitle={TranslationFormLabel.TRANSLATE_TO}
        selectValue={selectedLangTo}
        textAreaValue={translateTextTo}
        onSelectChange={handleSelectChange}
        onTextAreaChange={handleTextAreaChange}
        translatedTextInfo={translatedTextInfo}
        isTextLoading={isTextLoading}
        originText={translateTextFrom}
      />
    </div>
  );
};

export default TranslatorPage;
