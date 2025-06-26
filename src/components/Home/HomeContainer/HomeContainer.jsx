import "./HomeContainer.css";
import HomePresentation from "../HomePresentation/HomePresentation";
import HomeExploration from "../HomeExploration/HomeExploration";

export default function HomeContainer() {
  return (
    <div>
      <HomePresentation />
      <HomeExploration />
    </div>
  );
}
