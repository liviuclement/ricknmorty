import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './Location.module.scss';
import CharacterList from "../../components/CharacterList/CharacterList";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getLocationById, getLocationCount } from "../../store/features/locations/locationsSlice";

const Location = () => {
    const [selectedLocation, setSelectedLocation] = useState(1)
    const dispatch = useAppDispatch();
    const { location, locationCount, status } = useAppSelector((state) => state.locations);

    const mapLocationOptions = () => {
        if (!locationCount) return;

        const locationArray = [];

        for (let location = 1; location <= locationCount; location++) {
            locationArray.push(
                <option
                    key={`ep-${location}`}
                    value={location}
                >
                    Location - {location}
                </option>
            )
        }

        return locationArray;
    }

    useEffect(() => {
        dispatch(getLocationCount());
    }, []);

    useEffect(() => {
        dispatch(getLocationById({ selectedLocation }));
    }, [selectedLocation]);

    const onLocationChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedLocation(parseInt(event.target.value))
    }

    return (
        <div className={styles.location}>
            <h1>Location: <span>{location.name}</span></h1>
            <p className={styles.dimension}>Dimension: {location.dimension}</p>
            <p className={styles.type}>Type: {location.type}</p>
            <div className={styles.content}>
                <div className={styles.filter}>
                    <h3>Pick Location</h3>
                    <select
                        onChange={onLocationChange}
                    >
                        {mapLocationOptions()}
                    </select>
                </div>
                <CharacterList
                    characters={location.residents}
                    status={status}
                />
            </div>
        </div>
    );
};

export default Location;
