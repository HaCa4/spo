import { IAnimeTooltipProps } from "../utilities/types";

const AnimeTooltip = ({ active, payload, label }: IAnimeTooltipProps) => {
  if (active) {
    return (
      <div className="tooltip">
        <h4>{label}</h4>
        {payload &&
          payload[0].payload?.animeList?.map((item: string, index: number) => (
            <p className="tooltip-content" key={index}>
              {item}
            </p>
          ))}
      </div>
    );
  } else {
    return null;
  }
};
export default AnimeTooltip;
