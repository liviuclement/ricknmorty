import React from 'react';
import styles from './CharacterList.module.scss';
import CharacterCard from "../CharacterCard/CharacterCard";
import { Character } from "../../utils/types";
import { useNavigate } from "react-router-dom";

const CharacterList = (props: { characters: Character[], status: string }) => {
    const { characters, status } = props;
    const navigate = useNavigate();

    const mapCharacterList = () => characters.map((character: Character) => {
        return <CharacterCard
            key={character.id}
            image={character.image}
            status={character.status}
            name={character.name}
            locationName={character.location.name}
            onClick={() => navigate(`/character/${character.id}`)}
        />
    });

    return (
        <div
            className={styles.characterList}
        >
            {!characters.length && status !== 'loading' && <div>No results found.</div>}
            {!!characters.length && mapCharacterList()}
        </div>
    );
};

CharacterList.displayName = 'CharacterList'

export default CharacterList;
