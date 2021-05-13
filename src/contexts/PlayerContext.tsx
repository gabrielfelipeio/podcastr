import { createContext, ReactNode, useContext, useState } from 'react';

type Episode = {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string
};

type PlayerContextData = {
    episodeList: Episode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    isLooping: boolean;
    isShuffleling: boolean;
    play: (episode: Episode) => void;
    playList: (list: Episode[], index: number) => void;
    setIsPlayingState: (isPlayingState: boolean) => void;
    clearPlayingState: () => void;
    togglePlay: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    playNext: () => void;
    playPrevious: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
};

export const PlayerContext = createContext({} as PlayerContextData);

// ----------------------------------------------------------------------------------

type PLayerContextProviderProps = {
    children: ReactNode
};

export function PlayerContextProvider({ children }: PLayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState([]);
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffleling, setIsShuffleling] = useState(false);

    function play(episode: Episode) {
        setEpisodeList([episode]);
        setCurrentEpisodeIndex(0);
        setIsPlaying(true);
    };

    function playList(list: Episode[], index: number) {
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    };

    function togglePlay() {
        setIsPlaying(!isPlaying);
    };

    function toggleLoop() {
        setIsLooping(!isLooping);
    };

    function toggleShuffle() {
        setIsShuffleling(!isShuffleling);
    };

    function setIsPlayingState(isPlayingState: boolean) {
        setIsPlaying(isPlayingState);
    };

    function clearPlayingState() {
        setEpisodeList([]);
        setCurrentEpisodeIndex(0);
    };

    const hasNext = isShuffleling || (currentEpisodeIndex + 1) < episodeList.length;
    const hasPrevious = currentEpisodeIndex > 0;

    function playNext() {
        if (isShuffleling) {
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
            setCurrentEpisodeIndex(nextRandomEpisodeIndex);
        } else if (hasNext) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1);
        };
    };

    function playPrevious() {
        if (hasPrevious) {
            setCurrentEpisodeIndex(currentEpisodeIndex - 1);
        };
    };

    return (
        <PlayerContext.Provider value={{
            episodeList,
            currentEpisodeIndex,
            play,
            playList,
            isPlaying,
            isLooping,
            isShuffleling,
            togglePlay,
            toggleLoop,
            toggleShuffle,
            setIsPlayingState,
            clearPlayingState,
            playNext,
            playPrevious,
            hasNext,
            hasPrevious
        }}>
            {children}
        </PlayerContext.Provider>
    )
}

export const usePlayer = () => {
    return useContext(PlayerContext);
}