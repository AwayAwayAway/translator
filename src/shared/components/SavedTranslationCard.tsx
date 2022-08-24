import React from 'react';
import styles from '../../pages/favourites/FavouriteTranslationPage.module.css';
import { Card } from 'primereact/card';
import { useAppSelector } from '../../app/hooks';

type ThisProps = {
  id: string;
  originLanguage: string;
  translatedLanguage: string;
  originText: string;
  translatedText: string;
  onDelete?: (id: string) => void;
};

const SavedTranslationCard: React.FC<ThisProps> = ({ id, originLanguage, translatedLanguage, originText, translatedText, onDelete }) => {
  const isLightMode = useAppSelector((state) => state.style.isLightMode);

  return (
    <Card id={isLightMode ? '' : 'dark-item'} className={styles.card} key={id} title={`${originLanguage} > ${translatedLanguage}`}>
      <div>{originText}</div>
      <div>{translatedText}</div>
      {onDelete && <i onClick={() => onDelete(id)} className={`pi pi-times-circle ${styles.icon}`}></i>}
    </Card>
  );
};

export default SavedTranslationCard;
