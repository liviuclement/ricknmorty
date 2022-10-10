import React, { useEffect, useState } from 'react';
import styles from './Characters.module.scss';
import CharactersFilter from "../../components/Filters/CharactersFilter";
import CharacterList from "../../components/CharacterList/CharacterList";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getCharacters } from "../../store/features/characters/charactersSlice";

const Characters = () => {
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState('');
    const [speciesFilter, setSpeciesFilter] = useState('');
    const [genderFilter, setGenderFilter] = useState('');
    const [nameFilter, setNameFilter] = useState('');
    const [nameFilterTimeout, setNameFilterTimeout] = useState<any>();
    const { characters, status } = useAppSelector((state) => state.characters);
    const { results, info, } = characters;
    const { next, } = info;
    const dispatch = useAppDispatch();

    useEffect(() => {
        window.addEventListener('scroll', scrollCallback);

        return () => window.removeEventListener('scroll', scrollCallback)
    }, [])

    const scrollCallback = () => {
        const scrollHeight = window.document.documentElement.scrollHeight
        const scrollTop = window.document.documentElement.scrollTop
        const clientHeight = window.document.documentElement.clientHeight

        if (scrollTop > 0.99 * (scrollHeight - clientHeight)) {
            setPage(prevPage => prevPage + 1);
        }
    }

    useEffect(() => {
        if (page > 1 && !next || status === 'loading') return;

        const filters = { statusFilter, speciesFilter, genderFilter, nameFilter, page };

        dispatch(getCharacters(filters));
    }, [statusFilter, speciesFilter, genderFilter, page])

    const onFilterChange = (type: string, filter: string) => {
        let timeout;

        switch (type) {
            case 'status':
                setStatusFilter(filter);
                break;
            case 'species':
                setSpeciesFilter(filter);
                break;
            case 'gender':
                setGenderFilter(filter);
                break;
            case 'name':
                setNameFilter(filter);

                if(nameFilterTimeout) {
                    clearTimeout(nameFilterTimeout)
                }

                timeout = setTimeout(() => {
                    const filters = { statusFilter, speciesFilter, genderFilter, nameFilter: filter, page, };

                    dispatch(getCharacters(filters));
                }, 250);

                setNameFilterTimeout(timeout);
                break;
            case 'all':
                setStatusFilter(filter);
                setSpeciesFilter(filter);
                setGenderFilter(filter);
        }

        setPage(1);
    }

    const filters = {
        status: statusFilter,
        species: speciesFilter,
        gender: genderFilter,
    }

    return (
        <div className={styles.characters}>
            <h1>Characters</h1>
            <div className={styles.searchBar}>
                <input
                    placeholder={'Search for characters'}
                    onChange={(event) => onFilterChange('name', event.target.value)}
                    value={nameFilter}
                />
                <button>Search</button>
            </div>
            <div className={styles.content}>
                <CharactersFilter
                    onFilterChange={onFilterChange}
                    filters={filters}
                />
                <CharacterList
                    characters={results}
                    status={status}
                />
            </div>
        </div>
    );
};

export default Characters;
