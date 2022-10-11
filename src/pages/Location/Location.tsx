import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './Location.module.scss';
import CharacterList from "../../components/CharacterList/CharacterList";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getLocationById, getLocationCount } from "../../store/features/locations/locationsSlice";
import { getSelectOptionsByAttribute } from "../../utils/utils";
import CustomSelect from "../../components/Filters/CustomSelect";

const Location = () => {
    const [selectedLocation, setSelectedLocation] = useState(1)
    const dispatch = useAppDispatch();
    const { location, locationCount, status } = useAppSelector((state) => state.locations);
    const locationOptions = getSelectOptionsByAttribute('Location', locationCount || 0);

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
                    <CustomSelect
                        options={locationOptions}
                        onChange={onLocationChange}
                    />
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
