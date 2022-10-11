import React, { useState } from 'react';
import styles from './FiltersAccordion.module.scss';
import classNames from "classnames";
import arrow from "../../assets/icons/arrow.png";

interface AccordionSlice {
    name: string,
    filters: string[],
}

interface Props {
    accordionSlices: AccordionSlice[],
    filters: { [key: string]: string },
    onFilterChange: (type: string, filter: string) => void,
}

const FiltersAccordion = (props: Props) => {
    const { accordionSlices, filters, onFilterChange } = props;
    const [openedAccordionSlice, setOpenedAccordionSlice] = useState('');

    const toggleAccordionSlice = (slice: string) => {
        setOpenedAccordionSlice(prevOpenedSlice => prevOpenedSlice === slice ? '' : slice)
    }

    return (
        <div className={styles.accordionBox}>
            {
                accordionSlices.map((slice: AccordionSlice) => (
                    <div
                        key={`slice-${slice.name}`}
                        className={styles.slice}>
                        <div
                            className={classNames(styles.header, { [styles.opened]: openedAccordionSlice === slice.name })}
                            onClick={() => toggleAccordionSlice(slice.name)}
                        >
                            <p>{slice.name}</p>
                            <img
                                alt='arrow'
                                src={arrow}
                            />
                        </div>
                        {
                            openedAccordionSlice === slice.name &&
							<div className={styles.content}>
                                {
                                    slice.filters.map((filter) => (
                                        <button
                                            key={`filter-${filter}`}
                                            className={classNames({ [styles.selected]: filters[slice.name] === filter })}
                                            onClick={() => onFilterChange(slice.name, filter)}>{filter}
                                        </button>
                                    ))
                                }
							</div>
                        }
                    </div>
                ))
            }
        </div>
    );
};

export default FiltersAccordion;
