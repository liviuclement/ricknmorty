import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react';
import styles from './Episode.module.scss';
import CharacterList from "../../components/CharacterList/CharacterList";
import { useAppDispatch } from "../../app/hooks";
import { getEpisode, getEpisodes } from "../../features/episodes/episodesSlice";
import { useSelector } from "react-redux";
import { createArrayOfLength } from "../../utils/utils";
import { ReduxState } from "../../utils/types";

const Episode = () => {
    const [episode, setEpisode] = useState(1)
    const dispatch = useAppDispatch();
    const { episodes, episodeCount } = useSelector((state: ReduxState) => state.episodes);

    const mapEpisodeOptions = () => {
        const episodeArray = createArrayOfLength(1, episodeCount);

        return episodeArray.map((episode: number) => <option
            key={`ep-${episode}`}
            value={episode}
        >
            Episode - {episode}
        </option>)
    }

    useEffect(() => {
        dispatch(getEpisodes());
    }, []);

    useEffect(() => {
        dispatch(getEpisode({ episode }));
    }, [episode]);

    const onEpisodeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setEpisode(parseInt(event.target.value))
    }

    return (
        <div className={styles.episode}>
            <h1>Episode name: <span>{episodes.name}</span></h1>
            <p className={styles.airDate}>Air Date: {episodes.air_date}</p>
            <div className={styles.content}>
                <div className={styles.filter}>
                    <h3>Pick Episode</h3>
                    <select
                        onChange={onEpisodeChange}
                    >
                        {mapEpisodeOptions()}
                    </select>
                </div>
                <CharacterList
                    characters={episodes.characters}
                />
            </div>
        </div>
    );
};

export default Episode;
