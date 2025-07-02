import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { dataService } from "../services/dataService"
import ProyectosPorLineaInvestigacion from "../components/public/Proyectos/ProyectosPorLineaInvestigacion"
import Loader from "../components/public/Loader/Loader"

export default function ProyectosPorLineaPage() {
  const { id } = useParams()
  const [linea, setLinea] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLinea = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await dataService.getResearchLine(id)
        setLinea(res.data)
      } catch (err) {
        setError("No se pudo cargar la línea de investigación")
      } finally {
        setLoading(false)
      }
    }
    fetchLinea()
  }, [id])

  if (loading) return <Loader />
  if (error) return <div>{error}</div>
  if (!linea) return <div>No se encontró la línea de investigación</div>

  return (
    <section className="proyectos-por-linea-section">
      <div className="proyectos-por-linea-container">
        <h2>Proyectos</h2>
        <h3>Línea de investigación: {linea.nombre}</h3>
        <ProyectosPorLineaInvestigacion researchLineId={linea.id} />
      </div>
    </section>
  )
} 