import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './Episode.module.scss';
import CharacterList from "../../components/CharacterList/CharacterList";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getEpisodeById, getEpisodeCount } from "../../store/features/episodes/episodesSlice";

const Episode = () => {
    const [selectedEpisode, setSelectedEpisode] = useState(1)
    const dispatch = useAppDispatch();
    const { episode, episodeCount, status } = useAppSelector((state) => state.episodes);

    const mapEpisodeOptions = () => {
        if (!episodeCount) return;

        const episodeArray = [];

        for (let episode = 1; episode <= episodeCount; episode++) {
            episodeArray.push(
                <option
                    key={`ep-${episode}`}
                    value={episode}
                >
                    Location - {episode}
                </option>
            )
        }

        return episodeArray;
    }

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
                    <select
                        onChange={episodeChangeHandler}
                    >
                        {mapEpisodeOptions()}
                    </select>
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
