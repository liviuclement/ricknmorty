import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './Location.module.scss';
import CharacterList from "../../components/CharacterList/CharacterList";
import { useAppDispatch } from "../../app/hooks";
import { useSelector } from "react-redux";
import { createArrayOfLength } from "../../utils/utils";
import { getLocation, getLocations } from "../../features/locations/locationsSlice";
import { ReduxState } from "../../utils/types";

const Location = () => {
    const [location, setLocation] = useState(1)
    const dispatch = useAppDispatch();
    const { locations, locationCount } = useSelector((state: ReduxState) => state.locations);

    const mapLocationOptions = () => {
        const locationArray = createArrayOfLength(1, locationCount);

        return locationArray.map((location: number) => <option
            key={`ep-${location}`}
            value={location}
        >
            Location - {location}
        </option>)
    }

    useEffect(() => {
        dispatch(getLocations());
    }, []);

    useEffect(() => {
        dispatch(getLocation({ location }));
    }, [location]);

    const onLocationChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setLocation(parseInt(event.target.value))
    }

    return (
        <div className={styles.location}>
            <h1>Location: <span>{locations.name}</span></h1>
            <p className={styles.dimension}>Dimension: {locations.dimension}</p>
            <p className={styles.type}>Type: {locations.type}</p>
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
                    characters={locations.residents}
                />
            </div>
        </div>
    );
};

export default Location;
