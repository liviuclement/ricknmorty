import React from 'react';
import styles from "./CharacterCard.module.scss";

interface Props {
    onClick: () => void
    image: string,
    status: string,
    name: string,
    locationName: string
}

const CharacterCard = (props: Props) => {
    const { image, status, name, locationName, onClick } = props;

    return <div
        className={styles.card}
        onClick={onClick}
    >
        <img
            alt={'img'}
            src={image}
        />
        <div
            className={`${styles.status} ${styles[status.toLowerCase()]}`}
        >
            {status}
        </div>
        <div className={styles.info}>
            <h3>{name}</h3>
            <p>Last Location</p>
            <p className={styles.location}>
                {locationName}
            </p>
        </div>
    </div>
};

CharacterCard.displayName = 'CharacterCard';

export default CharacterCard;
