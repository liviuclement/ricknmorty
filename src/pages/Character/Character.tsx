import React, { useEffect, useState } from 'react';
import styles from './Character.module.scss'
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { getCharacter } from "../../features/characters/charactersSlice";
import { ReduxState } from "../../utils/types";

const Character = () => {
    const dispatch = useAppDispatch();
    const { character, status } = useSelector((state: ReduxState) => state.characters);
    const params = useParams();

    useEffect(() => {
        const { id } = params;

        dispatch(getCharacter({ character: id }))
    }, []);

    return (
        <div className={styles.character}>
            {status === 'idle' ?
                <div className={styles.characterContainer}>
                    <h1>{character?.name}</h1>
                    <img
                        src={character?.image}
                    />
                    <div className={styles.info}>
                        <div
                            className={`${styles.status} ${character?.status.toLowerCase() ? styles[character?.status.toLowerCase()] : ''}`}
                        >
                            {character?.status}
                        </div>
                        <p>Gender: <span>{character?.gender}</span></p>
                        <p>Location: <span>{character?.location.name}</span></p>
                        <p>Origin: <span>{character?.origin.name}</span></p>
                        <p>Species: <span>{character?.species}</span></p>
                    </div>
                </div> : <p>
                    Loading...
                </p>
            }

        </div>
    );
};

export default Character;
