import React, { ForwardedRef, forwardRef } from 'react';
import styles from "./CharacterCard.module.scss";
import { Link } from "react-router-dom";

interface Props {
    id: number,
    image: string,
    status: string,
    name: string,
    locationName: string
}

const CharacterCard = forwardRef((props: Props, ref: ForwardedRef<any>) => {
    const { id, image, status, name, locationName } = props;

    const cardContent = <>
        <img
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
    </>

    return ref ? <Link
        ref={ref}
        className={styles.card}
        to={`/character/${id}`}
    >
        {cardContent}
    </Link> : <Link
        className={styles.card}
        to={`/character/${id}`}
    >
        {cardContent}
    </Link>

});

export default CharacterCard;
