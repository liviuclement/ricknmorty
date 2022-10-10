import React, { useEffect, useState } from 'react';
import styles from './Characters.module.scss';
import CharactersFilter from "../../components/Filters/CharactersFilter";
import CharacterList from "../../components/CharacterList/CharacterList";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { getCharacters } from "../../features/characters/charactersSlice";
import { ReduxState } from "../../utils/types";

const Characters = () => {
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('');
    const [speciesFilter, setSpeciesFilter] = useState('');
    const [genderFilter, setGenderFilter] = useState('');
    const { characters, status } = useSelector((state: ReduxState) => state.characters);
    const { results, info, } = characters;
    const { next, } = info;
    const dispatch = useAppDispatch();

    useEffect(() => {
        window.addEventListener('scroll', scrollCallback);

        return () => window.removeEventListener('scroll', scrollCallback)
    }, [next])

    const scrollCallback = () => {
        if (status === 'loading') return;

        const scrollHeight = window.document.documentElement.scrollHeight
        const scrollTop = window.document.documentElement.scrollTop
        const clientHeight = window.document.documentElement.clientHeight

        if (scrollTop > 0.99 * (scrollHeight - clientHeight) && next) {
            setPage(prevPage => prevPage + 1);
        }
    }

    useEffect(() => {
        const filters = { statusFilter, speciesFilter, genderFilter, page };

        dispatch(getCharacters(filters));
    }, [statusFilter, speciesFilter, genderFilter, page])


    const onStatusFilterChange = (filter: string) => () => {
        setStatusFilter(filter);
        setPage(1);
    }

    const onSpeciesFilterChange = (filter: string) => () => {
        setSpeciesFilter(filter);
        setPage(1);
    }

    const onGenderFilterChange = (filter: string) => () => {
        setGenderFilter(filter);
        setPage(1);
    }

    return (
        <div className={styles.characters}>
            <h1>Characters</h1>
            <div className={styles.searchBar}>
                <input
                    placeholder={'Search for characters'}
                />
                <button>Search</button>
            </div>
            <div className={styles.content}>
                <CharactersFilter
                    setStatusFilter={onStatusFilterChange}
                    setSpeciesFilter={onSpeciesFilterChange}
                    setGenderFilter={onGenderFilterChange}
                    statusFilter={statusFilter}
                    speciesFilter={speciesFilter}
                    genderFilter={genderFilter}
                />
                <CharacterList
                    characters={results}
                />
            </div>
        </div>
    );
};

export default Characters;
