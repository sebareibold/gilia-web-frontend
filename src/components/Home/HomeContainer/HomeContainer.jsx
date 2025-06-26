import "./HomeContainer.css"
import CodeMatrixEffect from "../Animation/CodeMatrixEffect"

import AINetworkEffect from "../Animation/AINetworkEffect"
import ParticleEffect from "../Animation/ParticleEffect"
import HomePresentation from "../HomePresentation/HomePresentation"
import HomeExploration from "../HomeExploration/HomeExploration"

export default function HomeContainer() {
  return (
    <div>
      <ParticleEffect>
        <HomePresentation />
      </ParticleEffect>
      <HomeExploration />
    </div>
  )
}
AINetworkEffect