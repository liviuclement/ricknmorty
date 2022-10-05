import React, { useCallback, useEffect, useRef, useState } from 'react';
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
    const intersectionObserver = useRef<IntersectionObserver>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const filters = { statusFilter, speciesFilter, genderFilter, page };

        dispatch(getCharacters(filters));
    }, [statusFilter, speciesFilter, genderFilter, page])

    const lastCardRef = useCallback((post: HTMLElement) => {
        if (status === 'loading') return;

        if (intersectionObserver.current) {

            intersectionObserver.current.disconnect();
        }

        intersectionObserver.current = new IntersectionObserver(posts => {
            if (posts[0].isIntersecting && next) {
                setPage(prevPage => prevPage + 1);
            }
        })

        if (post) intersectionObserver.current.observe(post);
    }, [status, next]);

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
                    ref={lastCardRef}
                />
            </div>
        </div>
    );
};

export default Characters;
