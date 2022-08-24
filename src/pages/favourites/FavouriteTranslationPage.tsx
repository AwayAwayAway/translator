import React, { useEffect, useState } from 'react';
import styles from './FavouriteTranslationPage.module.css';
import LocalStorageUtils from '../../shared/utils/localStorageUtils';
import { FavouriteTranslation } from '../../models';
import SavedTranslationCard from '../../shared/components/SavedTranslationCard';

const FavouriteTranslationPage: React.FC = () => {
  const [savedTranslation, setSavedTranslation] = useState<FavouriteTranslation[]>([]);
  const [savedTranslationId, setTranslationId] = useState<string>('');

  useEffect(() => {
    LocalStorageUtils.deleteItem(savedTranslationId);
    const storedTranslation = LocalStorageUtils.getItem();

    if (storedTranslation) {
      setSavedTranslation(
        Object.keys(storedTranslation).map((item) => ({
          ...storedTranslation[item as string],
          id: item,
        }))
      );
    }
  }, [savedTranslationId]);

  const handleDeleteTranslation = (id: string) => {
    setTranslationId(id);
  };

  return (
    <div className={styles.wrapper}>
      {savedTranslation.map((item) => (
        <SavedTranslationCard
          key={item.id}
          id={item.id}
          originLanguage={item.originLanguage}
          translatedLanguage={item.translatedLanguage}
          originText={item.originText}
          translatedText={item.translatedText}
          onDelete={handleDeleteTranslation}
        />
      ))}
      {!savedTranslation.length && <div>No saved Translations</div>}
    </div>
  );
};

export default FavouriteTranslationPage;
