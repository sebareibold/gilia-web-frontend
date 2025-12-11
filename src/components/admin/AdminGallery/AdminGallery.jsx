"use client"

import { useState, useEffect } from "react"
import { dataService } from "../../../services/dataService"
import { notification, Modal } from "antd"
import {
  AppstoreOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SearchOutlined,
  UploadOutlined,
  DownloadOutlined,
  CalendarOutlined,
  FileImageOutlined,
  UserOutlined,
} from "@ant-design/icons"
import "./AdminGallery.css"

const AdminGaleria = () => {
  const [imagenes, setImagenes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImagen, setCurrentImagen] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)

  const API_URL = 'http://localhost:3000';

  useEffect(() => {
    fetchImagenes();
  }, []);

  const fetchImagenes = async () => {
    setLoading(true);
    try {
      const response = await dataService.getGaleria();
      setImagenes(response.data);
    } catch (error) {
      console.error("Error al obtener las imágenes:", error);
      notification.error({
        message: 'Error de Carga',
        description: 'No se pudieron cargar las imágenes. Por favor, intente de nuevo más tarde.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (imagen = null) => {
    setCurrentImagen(imagen ? { ...imagen } : { titulo: '', descripcion: '', categoria: 'General' });
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
    setCurrentImagen(null);
    setSelectedFile(null);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSave = async () => {
    if (!currentImagen.titulo || !currentImagen.categoria) {
      notification.error({ message: 'Campos requeridos', description: 'El título y la categoría son obligatorios.' });
      return;
    }

    try {
      if (currentImagen.id) {
        const response = await dataService.updateImagen(currentImagen.id, {
          titulo: currentImagen.titulo,
          descripcion: currentImagen.descripcion,
          categoria: currentImagen.categoria,
        });
        setImagenes((prev) => prev.map((img) => (img.id === currentImagen.id ? response.data : img)));
        notification.success({ message: 'Imagen Actualizada' });
      } else {
        if (!selectedFile) {
          notification.error({ message: 'Archivo requerido', description: 'Por favor, selecciona un archivo de imagen.' });
          return;
        }
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('titulo', currentImagen.titulo);
        formData.append('descripcion', currentImagen.descripcion);
        formData.append('categoria', currentImagen.categoria);

        const response = await dataService.uploadImagen(formData);
        setImagenes((prev) => [...prev, response.data]);
        notification.success({ message: 'Imagen Subida' });
      }
      handleCancelModal();
      fetchImagenes();
    } catch (error) {
      console.error("Error al guardar la imagen:", error);
      notification.error({ message: 'Error al Guardar' });
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: '¿Estás seguro de que deseas eliminar esta imagen?',
      content: 'Esta acción no se puede deshacer.',
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          await dataService.deleteImagen(id);
          setImagenes((prev) => prev.filter((img) => img.id !== id));
          notification.success({
            message: 'Imagen Eliminada',
            description: 'La imagen ha sido eliminada correctamente.',
          });
        } catch (error) {
          console.error("Error al eliminar la imagen:", error);
          notification.error({
            message: 'Error al Eliminar',
            description: 'No se pudo eliminar la imagen.',
          });
        }
      },
    });
  };

  const filteredImagenes = imagenes.filter((imagen) => {
    const matchesSearch =
      (imagen.titulo?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (imagen.descripcion?.toLowerCase() || '').includes(searchTerm.toLowerCase())

    const matchesFilter = filterCategory === "all" || imagen.categoria === filterCategory

    return matchesSearch && matchesFilter
  })

  const getCategoriaColor = (categoria) => {
    switch (categoria) {
      case "Laboratorio":
        return "admin-unified-badge-active"
      case "Eventos":
        return "admin-unified-badge-active"
      case "Equipo":
        return "admin-unified-badge-active"
      case "Proyectos":
        return "admin-unified-badge-pending"
      case "Publicaciones":
        return "admin-unified-badge-inactive"
      default:
        return "admin-unified-badge-pending"
    }
  }

  if (loading) {
    return (
      <div className="admin-unified-page">
        <div className="admin-unified-loading">
          <div className="admin-unified-spinner"></div>
          <p>Cargando galería...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-unified-page">
      <div className="admin-unified-decorations">
        <div className="admin-floating-element admin-floating-element-1"></div>
        <div className="admin-floating-element admin-floating-element-2"></div>
        <div className="admin-floating-element admin-floating-element-3"></div>
      </div>

      <div className="admin-unified-header">
        <h1 className="admin-unified-title">
          <AppstoreOutlined />
          Galería de Imágenes
        </h1>
        <p className="admin-unified-subtitle">
          Gestiona las imágenes y recursos multimedia del sitio web GILIA. Organiza fotos de eventos, proyectos y
          equipo.
        </p>

        <button className="admin-unified-primary-btn" onClick={() => handleOpenModal()}>
          <UploadOutlined />
          Subir Imágenes
        </button>
      </div>

      <div className="admin-unified-filters">
        <div className="admin-unified-search">
          <SearchOutlined className="admin-unified-search-icon" />
          <input
            type="text"
            placeholder="Buscar por título, descripción o tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="admin-unified-filter-select"
        >
          <option value="all">Todas las categorías</option>
          <option value="Laboratorio">Laboratorio</option>
          <option value="Eventos">Eventos</option>
          <option value="Equipo">Equipo</option>
          <option value="Proyectos">Proyectos</option>
          <option value="Publicaciones">Publicaciones</option>
        </select>
      </div>

      {filteredImagenes.length === 0 ? (
        <div className="admin-unified-empty">
          <AppstoreOutlined className="admin-unified-empty-icon" />
          <h3 className="admin-unified-empty-title">No hay imágenes</h3>
          <p className="admin-unified-empty-description">
            {searchTerm || filterCategory !== "all"
              ? "No se encontraron resultados para los filtros aplicados."
              : "Comienza subiendo tu primera imagen a la galería."}
          </p>
          {!searchTerm && filterCategory === "all" && (
            <button className="admin-unified-primary-btn" onClick={() => handleOpenModal()}>
              <UploadOutlined />
              Subir Primera Imagen
            </button>
          )}
        </div>
      ) : (
        <div className="admin-unified-table-container">
          <table className="admin-unified-table">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Información</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredImagenes.map((imagen) => (
                <tr key={imagen.id}>
                  <td>
                    <img
                      src={`${API_URL}${imagen.url}`}
                      alt={imagen.titulo}
                      style={{
                        width: "80px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "1px solid rgba(102, 126, 234, 0.1)",
                      }}
                    />
                  </td>
                  <td>
                    <strong>{imagen.titulo}</strong>
                    <br />
                    <small style={{ color: "#64748b", lineHeight: "1.4" }}>
                      {imagen.descripcion?.substring(0, 80)}...
                    </small>
                  </td>
                  <td>
                    <span className={`admin-unified-badge ${getCategoriaColor(imagen.categoria)}`}>
                      {imagen.categoria}
                    </span>
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      <button className="admin-table-btn admin-table-btn-view" title="Ver">
                        <EyeOutlined />
                      </button>
                      <button className="admin-table-btn admin-table-btn-view" title="Descargar">
                        <DownloadOutlined />
                      </button>
                      <button className="admin-table-btn admin-table-btn-edit" title="Editar" onClick={() => handleOpenModal(imagen)}>
                        <EditOutlined />
                      </button>
                      <button
                        className="admin-table-btn admin-table-btn-delete"
                        title="Eliminar"
                        onClick={() => handleDelete(imagen.id)}
                      >
                        <DeleteOutlined />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        title={currentImagen?.id ? "Editar Imagen" : "Subir Nueva Imagen"}
        open={isModalOpen}
        onOk={handleSave}
        onCancel={handleCancelModal}
        okText="Guardar"
        cancelText="Cancelar"
      >
        <form className="admin-unified-form">
          <div className="admin-unified-form-group">
            <label>Título</label>
            <input
              type="text"
              value={currentImagen?.titulo || ''}
              onChange={(e) => setCurrentImagen({ ...currentImagen, titulo: e.target.value })}
            />
          </div>
          <div className="admin-unified-form-group">
            <label>Descripción</label>
            <textarea
              rows="3"
              value={currentImagen?.descripcion || ''}
              onChange={(e) => setCurrentImagen({ ...currentImagen, descripcion: e.target.value })}
            />
          </div>
          <div className="admin-unified-form-group">
            <label>Categoría</label>
            <select
              value={currentImagen?.categoria || 'General'}
              onChange={(e) => setCurrentImagen({ ...currentImagen, categoria: e.target.value })}
            >
              <option value="General">General</option>
              <option value="Laboratorio">Laboratorio</option>
              <option value="Eventos">Eventos</option>
              <option value="Equipo">Equipo</option>
              <option value="Proyectos">Proyectos</option>
              <option value="Publicaciones">Publicaciones</option>
            </select>
          </div>
          {!currentImagen?.id && (
            <div className="admin-unified-form-group">
              <label>Archivo de Imagen</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          )}
        </form>
      </Modal>
    </div>
  )
}

export default AdminGaleria
