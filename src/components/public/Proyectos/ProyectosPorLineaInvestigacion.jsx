import { useEffect, useState } from "react"
import { dataService } from "../../../services/dataService"
import Loader from "../Loader/Loader"

export default function ProyectosPorLineaInvestigacion({ researchLineId }) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await dataService.getProjects({ researchLineId })
        setProjects(res.data)
      } catch (err) {
        setError("Error al cargar los proyectos")
      } finally {
        setLoading(false)
      }
    }
    if (researchLineId) fetchProjects()
  }, [researchLineId])

  if (loading) return <Loader />
  if (error) return <div>{error}</div>
  if (!projects.length) return <div>No hay proyectos asociados a esta línea.</div>

  return (
    <div>
      <h3>Proyectos asociados</h3>
      <ul>
        {projects.map((proyecto) => (
          <li key={proyecto.id}>
            <strong>{proyecto.nombre}</strong>
            <p>{proyecto.descripcion}</p>
          </li>
        ))}
      </ul>
    </div>
  )
} 