import "./HomeContainer.css";
import HomePresentation from "../Presentacion/HomePresentation";
import HomeExploration from "../Novedades/HomeExploration";

export default function HomeContainer() {
  return (
    <div>
      <HomePresentation />
      <HomeExploration />
    </div>
  );
}
