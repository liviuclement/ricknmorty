import React, { MouseEventHandler, useState } from 'react';
import styles from './CharactersFilter.module.scss'
import arrow from '../../assets/icons/arrow.png';

interface CharactersFilter {
    statusFilter: string,
    speciesFilter: string,
    genderFilter: string,
    setStatusFilter: (filter: string) => () => void,
    setSpeciesFilter: (filter: string) => () => void,
    setGenderFilter: (filter: string) => () => void
}

const CharactersFilter = (props: CharactersFilter) => {
    const { statusFilter, speciesFilter, genderFilter, setStatusFilter, setSpeciesFilter, setGenderFilter } = props
    const [openedSlice, setOpenedSlice] = useState('');

    const toggleSlice = (slice: string) => () => {
        setOpenedSlice(prevOpenedSlice => prevOpenedSlice === slice ? '' : slice)
    }

    const onClearFilters = () => {
        setSpeciesFilter('')();
        setGenderFilter('')();
        setStatusFilter('')();
    }

    return (
        <div className={styles.filters}>
            <h2>Filters</h2>
            <p className={styles.clearFilterButton} onClick={onClearFilters}>Clear Filters</p>
            <div className={styles.accordionBox}>
                <div className={styles.slice}>
                    <div className={`${styles.header} ${openedSlice === 'status' ? styles.opened : ''}`}
                         onClick={toggleSlice('status')}
                    >
                        <p>Status</p>
                        <img
                            alt='arrow'
                            src={arrow}
                        />
                    </div>
                    {
                        openedSlice === 'status' &&
						<div className={styles.content}>
							<button className={statusFilter === 'Alive' ? styles.selected : ''}
							        onClick={setStatusFilter('Alive')}>Alive
							</button>
							<button className={statusFilter === 'Dead' ? styles.selected : ''}
							        onClick={setStatusFilter('Dead')}>Dead
							</button>
							<button className={statusFilter === 'Unknown' ? styles.selected : ''}
							        onClick={setStatusFilter('Unknown')}>Unknown
							</button>
						</div>
                    }
                </div>
                <div className={styles.slice}>
                    <div className={`${styles.header} ${openedSlice === 'species' ? styles.opened : ''}`}
                         onClick={toggleSlice('species')}
                    >
                        <p>Species</p>
                        <img
                            alt='arrow'
                            src={arrow}
                        />
                    </div>
                    {
                        openedSlice === 'species' &&
						<div className={styles.content}>
							<button onClick={setSpeciesFilter('Human')}
							        className={speciesFilter === 'Human' ? styles.selected : ''}>Human
							</button>
							<button onClick={setSpeciesFilter('Alien')}
							        className={speciesFilter === 'Alien' ? styles.selected : ''}>Alien
							</button>
							<button onClick={setSpeciesFilter('Humanoid')}
							        className={speciesFilter === 'Humanoid' ? styles.selected : ''}>Humanoid
							</button>
							<button onClick={setSpeciesFilter('Poopybutthole')}
							        className={speciesFilter === 'Poopybutthole' ? styles.selected : ''}>Poopybutthole
							</button>
							<button onClick={setSpeciesFilter('Mythological')}
							        className={speciesFilter === 'Mythological' ? styles.selected : ''}>Mythological
							</button>
							<button onClick={setSpeciesFilter('Unknown')}
							        className={speciesFilter === 'Unknown' ? styles.selected : ''}>Unknown
							</button>
							<button onClick={setSpeciesFilter('Animal')}
							        className={speciesFilter === 'Animal' ? styles.selected : ''}>Animal
							</button>
							<button onClick={setSpeciesFilter('Disease')}
							        className={speciesFilter === 'Disease' ? styles.selected : ''}>Disease
							</button>
							<button onClick={setSpeciesFilter('Robot')}
							        className={speciesFilter === 'Robot' ? styles.selected : ''}>Robot
							</button>
							<button onClick={setSpeciesFilter('Cronenberg')}
							        className={speciesFilter === 'Cronenberg' ? styles.selected : ''}>Cronenberg
							</button>
							<button onClick={setSpeciesFilter('Planet')}
							        className={speciesFilter === 'Planet' ? styles.selected : ''}>Planet
							</button>
						</div>
                    }
                </div>
                <div className={styles.slice}>
                    <div className={`${styles.header} ${openedSlice === 'gender' ? styles.opened : ''}`}
                         onClick={toggleSlice('gender')}
                    >
                        <p>Gender</p>
                        <img
                            alt='arrow'
                            src={arrow}
                        />
                    </div>
                    {
                        openedSlice === 'gender' &&
						<div className={styles.content}>
							<button onClick={setGenderFilter('female')}
							        className={genderFilter === 'female' ? styles.selected : ''}>Female
							</button>
							<button onClick={setGenderFilter('male')}
							        className={genderFilter === 'male' ? styles.selected : ''}>Male
							</button>
							<button onClick={setGenderFilter('genderless')}
							        className={genderFilter === 'genderless' ? styles.selected : ''}>Genderless
							</button>
							<button onClick={setGenderFilter('unknown')}
							        className={genderFilter === 'unknown' ? styles.selected : ''}>Unknown
							</button>
						</div>
                    }
                </div>
            </div>
        </div>
    );
};

export default CharactersFilter;
