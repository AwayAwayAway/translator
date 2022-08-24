import React, { useEffect, useState } from 'react';
import styles from './TranslatorPage.module.css';
import { useSendTextToTranslateMutation } from '../../features/api/translatorApi';
import TranslationForm from './TranslationForm';
import { SelectType, TranslationFormLabel } from '../../shared/e-num';
import { Sidebar } from 'primereact/sidebar';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import SavedTranslationCard from '../../shared/components/SavedTranslationCard';
import { clearHistory, setHistory } from '../../features/slice/historySlice';

const TranslatorPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [handleTranslate, { data: translatedTextInfo, isLoading: isTextLoading }] = useSendTextToTranslateMutation();
  const history = useAppSelector((state) => state.history.history);
  const isLightMode = useAppSelector((state) => state.style.isLightMode);
  const [isHistoryOpened, setIsHistoryOpened] = useState<boolean>(false);
  const [selectedLangFrom, setSelectedLangFrom] = useState<string>('ru');
  const [selectedLangTo, setSelectedLangTo] = useState<string>('en');
  const [translateTextFrom, setTranslateTextFrom] = useState<string>('');
  const [translateTextTo, setTranslateTextTo] = useState<string>('');

  useEffect(() => {
    if (translatedTextInfo) {
      setTranslateTextTo(translatedTextInfo.translations.text);
      dispatch(
        setHistory({
          id: translatedTextInfo.id,
          translatedText: translatedTextInfo.translations.text,
          originText: translateTextFrom,
          translatedLanguage: translatedTextInfo.translations.to,
          originLanguage: selectedLangFrom,
        })
      );
    }
    //eslint-disable-next-line
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

  const handleSwitch = () => {
    setTranslateTextTo(translateTextFrom);
    setTranslateTextFrom(translateTextTo);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <TranslationForm
          labelTitle={TranslationFormLabel.TRANSLATE_FROM}
          selectValue={selectedLangFrom}
          textAreaValue={translateTextFrom}
          onSelectChange={handleSelectChange}
          onTextAreaChange={handleTextAreaChange}
          translatedTextInfo={translatedTextInfo}
        />
        <i className={`pi pi-sync ${styles.switchIcon}`} onClick={handleSwitch} />
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
      <div className={styles.history} onClick={() => setIsHistoryOpened(true)}>
        <i className="pi pi-clock" />
        <div>History</div>
      </div>
      <Sidebar
        visible={isHistoryOpened}
        onHide={() => setIsHistoryOpened(false)}
        className={styles.historySideBar}
        id={isLightMode ? '' : 'dark-item'}
      >
        <h1>History</h1>
        <span onClick={() => dispatch(clearHistory())}>Clear history</span>
        {history.map((item) => (
          <SavedTranslationCard
            key={item.id}
            id={item.id}
            originLanguage={item.originLanguage}
            translatedLanguage={item.translatedLanguage}
            originText={item.originText}
            translatedText={item.translatedText}
          />
        ))}
      </Sidebar>
    </>
  );
};

export default TranslatorPage;
