import React, { useEffect } from 'react';
import styles from './Character.module.scss'
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getCharacter } from "../../store/features/characters/charactersSlice";
import classNames from "classnames";

const Character = () => {
    const dispatch = useAppDispatch();
    const { character, status } = useAppSelector((state) => state.characters);
    const params = useParams();

    useEffect(() => {
        const { id } = params;

        dispatch(getCharacter({ character: id }))
    }, []);

    return (
        <div className={styles.character}>
            {status === 'succeeded' &&
				<div className={styles.characterContainer}>
					<h1>{character?.name}</h1>
					<img
						alt='character-image'
						src={character?.image}
					/>
					<div
						className={classNames(styles.status, { [styles[character?.status.toLowerCase() || '']]: !!character?.status })}
					>
                        {character?.status}
					</div>
					<p>Gender: <span>{character?.gender}</span></p>
					<p>Location: <span>{character?.location.name}</span></p>
					<p>Origin: <span>{character?.origin.name}</span></p>
					<p>Species: <span>{character?.species}</span></p>
				</div>
            }
            {status !== 'succeeded' &&
				<p>
					Loading...
				</p>
            }
        </div>
    );
};

export default Character;
