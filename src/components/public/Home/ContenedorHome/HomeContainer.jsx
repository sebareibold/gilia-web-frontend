
import HomePresentation from "../Presentacion/HomePresentation";
import HomeExploration from "../Novedades/HomeExploration";
import HistoriaGilia from "../HistoriaGilia/HistoriaGilia";

export default function HomeContainer() {
  return (
    <div>
      <HomePresentation />
      <HomeExploration />
      <HistoriaGilia />
    </div>
  );
}
