import "./HomeContainer.css";
import HomePresentation from "../Presentation/HomePresentation";
import HomeExploration from "../News/HomeExploration";
import HistoriaGilia from "../GiliaHistory/GiliaHistory";

export default function HomeContainer() {
  return (
    <div>
      <HomePresentation />
      <HomeExploration />
      <HistoriaGilia />
    </div>
  );
}
