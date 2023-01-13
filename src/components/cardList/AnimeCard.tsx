import toDate from "date-fns/toDate";
import { IAnimeCardProps } from "../utilities/types";

const AnimeCard = ({ anime }: IAnimeCardProps) => {
  return (
    <div className="animeCard">
      <img className="animeCard-image" src={anime?.images?.jpg?.image_url} alt="card-name" />
      <div className="animeCard-title">{anime?.title_english ? anime?.title_english : anime?.title}</div>
      <div className="animeCard-info active">
        <div className="animeCard-subInfo">
          <b>Release: </b>
          {toDate(new Date(anime?.aired?.from)).toString().slice(0, 15)}
        </div>
        <div className="animeCard-subInfo">
          <b>Latest: </b>
          {anime?.aired?.to ? toDate(new Date(anime?.aired?.to)).toString().slice(0, 15) : "Now"}
        </div>
        <div className="animeCard-subInfo">
          <b>Rating: </b>
          {anime?.rating}
        </div>
      </div>
      <div className="animeCard-rank">{anime.rank}</div>
    </div>
  );
};

export default AnimeCard;
