import { useQuery } from "react-query";
import axios from "axios";

import AnimeCard from "./AnimeCard";
import LoadingComponent from "../LoadingComponent";
import { IAnimeDataType } from "../utilities/types";

const CardList = () => {
  const { data, status } = useQuery(["animes"], () => axios.get(`https://api.jikan.moe/v4/top/anime?limit=20`).then((res) => res.data), {
    staleTime: 30000,
    refetchIntervalInBackground: true,
  });

  return (
    <div className="animeCard-list">
      {status === "success" ? (
        data.data.map((anime: IAnimeDataType, index: number) => <AnimeCard key={index} anime={anime} />)
      ) : status === "loading" ? (
        <LoadingComponent item="Card List" />
      ) : null}
    </div>
  );
};

export default CardList;
