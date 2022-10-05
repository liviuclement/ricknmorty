import React, { ForwardedRef, forwardRef, useCallback, useRef } from 'react';
import styles from './CharacterList.module.scss';
import CharacterCard from "../CharacterCard/CharacterCard";
import { Character } from "../../utils/types";

const CharacterList = forwardRef((props: { characters: Character[] }, ref: ForwardedRef<any>) => {
    const { characters, } = props;

    const mapCharacterList = () => characters.map((character: Character, i: number) => {
        if (characters.length === i + 1) {
            return <CharacterCard
                key={character.id}
                id={character.id}
                image={character.image}
                status={character.status}
                name={character.name}
                locationName={character.location.name}
                ref={ref}
            />
        }
        return <CharacterCard
            key={character.id}
            id={character.id}
            image={character.image}
            status={character.status}
            name={character.name}
            locationName={character.location.name}
        />
    });

    return (
        <div className={styles.characterList}>
            {mapCharacterList()}
        </div>
    );
});

export default CharacterList;
