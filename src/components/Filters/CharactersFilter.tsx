import React  from 'react';
import styles from './CharactersFilter.module.scss'
import FiltersAccordion from "./FiltersAccordion";

interface Props {
    filters: { [key: string]: string },
    onFilterChange: (type: string, filter: string) => void,
}

const accordionSlices = [
    {
        name: 'status',
        filters: ['Alive', 'Dead', 'Unknown'],
    },
    {
        name: 'species',
        filters: ['Human', 'Alien', 'Humanoid', 'Poopybutthole', 'Mythological', 'Unknown', 'Animal', 'Disease', 'Robot', 'Cronenberg', 'Planet'],
    },
    {
        name: 'gender',
        filters: ['female', 'male', 'genderless', 'unknown'],
    }
]

const CharactersFilter = (props: Props) => {
    const { filters, onFilterChange } = props;

    return (
        <div className={styles.filters}>
            <h2>Filters</h2>
            <p className={styles.clearFilterButton} onClick={() => onFilterChange('all', '')}>Clear Filters</p>
            <FiltersAccordion
                onFilterChange={onFilterChange}
                filters={filters}
                accordionSlices={accordionSlices}
            />
        </div>
    );
};

export default CharactersFilter;
