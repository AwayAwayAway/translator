import React, { useEffect, useState } from 'react';
import styles from './FavouriteTranslationPage.module.css';
import LocalStorageUtils from '../../shared/utils/localStorageUtils';
import { Card } from 'primereact/card';
import { FavouriteTranslation } from '../../models';

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
        <Card className={styles.card} key={item.id} title={`${item.originLanguage} > ${item.translatedLanguage}`}>
          <div>{item.originText}</div>
          <div>{item.translatedText}</div>
          <i onClick={() => handleDeleteTranslation(item.id)} className={`pi pi-times-circle ${styles.icon}`}></i>
        </Card>
      ))}
      {!savedTranslation.length && <div>No saved Translations</div>}
    </div>
  );
};

export default FavouriteTranslationPage;
