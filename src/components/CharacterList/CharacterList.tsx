import React from 'react';
import styles from './CharacterList.module.scss';
import CharacterCard from "../CharacterCard/CharacterCard";
import { Character } from "../../utils/types";

const CharacterList = (props: { characters: Character[] }) => {
    const { characters, } = props;

    const mapCharacterList = () => characters.map((character: Character) => {
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
        <div
            className={styles.characterList}
        >
            {mapCharacterList()}
        </div>
    );
};

CharacterList.displayName = 'CharacterList'

export default CharacterList;
