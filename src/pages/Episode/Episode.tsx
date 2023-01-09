import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './Episode.module.scss';
import CharacterList from "../../components/CharacterList/CharacterList";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getEpisodeById, getEpisodeCount } from "../../store/features/episodes/episodesSlice";
import { getSelectOptionsByAttribute } from "../../utils/utils";
import CustomSelect from "../../components/Filters/CustomSelect";

const Episode = () => {
    const [selectedEpisode, setSelectedEpisode] = useState(1)
    const dispatch = useAppDispatch();
    const { episode, episodeCount, status } = useAppSelector((state) => state.episodes);
    const episodeOptions = getSelectOptionsByAttribute('Episode', episodeCount);

    useEffect(() => {
        dispatch(getEpisodeCount());
    }, []);

    useEffect(() => {
        dispatch(getEpisodeById({ selectedEpisode }));
    }, [selectedEpisode]);

    const episodeChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedEpisode(parseInt(event.target.value))
    }

    return (
        <div className={styles.episode}>
            <h1>Episode name: <span>{episode.name}</span></h1>
            <p className={styles.airDate}>Air Date: {episode.airDate}</p>
            <div className={styles.content}>
                <div className={styles.filter}>
                    <h3>Pick Episode</h3>
                    <CustomSelect options={episodeOptions} onChange={episodeChangeHandler}/>
                </div>
                <CharacterList
                    characters={episode.characters}
                    status={status}
                />
            </div>
        </div>
    );
};

export default Episode;
