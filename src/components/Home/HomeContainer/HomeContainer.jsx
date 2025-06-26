import "./HomeContainer.css"
import CodeMatrixEffect from "../Animation/CodeMatrixEffect"
import HomePresentation from "../HomePresentation/HomePresentation"
import HomeExploration from "../HomeExploration/HomeExploration"

export default function HomeContainer() {
  return (
    <div>
      <CodeMatrixEffect>
        <HomePresentation />
      </CodeMatrixEffect>
      <HomeExploration />
    </div>
  )
}
