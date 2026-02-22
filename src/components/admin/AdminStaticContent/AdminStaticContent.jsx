"use client";

import { useState, useEffect } from "react";
import { 
  getStaticContent, 
  saveStaticContent, 
  getHistory, 
  saveHistory, 
  getObjectives, 
  saveObjective, 
  deleteObjective 
} from "../../../services";
import { notification, Modal, Tabs, Card, Button, Input, Form, Space, Divider } from "antd";
import {
  FileTextOutlined,
  HomeOutlined,
  BookOutlined,
  TeamOutlined,
  HistoryOutlined,
  BulbOutlined,
  SaveOutlined,
  ReloadOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "./AdminStaticContent.css";

const { TextArea } = Input;

const AdminStaticContent = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState(null);
  const [history, setHistory] = useState([]);
  const [objectives, setObjectives] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [contentRes, historyRes, objectivesRes] = await Promise.all([
        getStaticContent(),
        getHistory(),
        getObjectives()
      ]);
      setContent(contentRes.data);
      // El servicio devuelve { data: [...] }
      setHistory(historyRes.data || []);
      setObjectives(objectivesRes.data || []);
    } catch (error) {
      console.error("Error al cargar contenido estático:", error);
      notification.error({ message: "Error de Carga", description: "No se pudo cargar el contenido del sitio." });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      await Promise.all([
        saveStaticContent(content),
        saveHistory(history)
      ]);
      notification.success({ message: "Contenido guardado", description: "Los cambios se aplicaron correctamente." });
    } catch (error) {
      notification.error({ message: "Error al guardar" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-unified-page">
        <div className="admin-unified-loading">
          <div className="admin-unified-spinner"></div>
          <p>Cargando contenidos...</p>
        </div>
      </div>
    );
  }

  const tabItems = [
    {
      key: 'home',
      label: <span><HomeOutlined /> Home</span>,
      children: (
        <>
          <HomeEditor content={content?.home} setContent={(data) => setContent({...content, home: data})} />
          <HistoryEditor history={history} setHistory={setHistory} />
        </>
      ),
    },
    {
      key: 'publications',
      label: <span><BookOutlined /> Publicaciones</span>,
      children: (
        <SimpleSectionEditor 
          title="Sección de Publicaciones"
          data={content?.publications} 
          setData={(data) => setContent({...content, publications: data})} 
        />
      ),
    },
    {
      key: 'institutional',
      label: <span><FileTextOutlined /> Institucional</span>,
      children: (
        <SimpleSectionEditor 
          title="Descripción Institucional"
          data={content?.institutional} 
          setData={(data) => setContent({...content, institutional: data})} 
        />
      ),
    },
    {
      key: 'team',
      label: <span><TeamOutlined /> Equipo</span>,
      children: (
        <>
          <SimpleSectionEditor 
            title="Sección de Equipo"
            data={content?.team} 
            setData={(data) => setContent({...content, team: data})} 
          />
          <ObjectivesEditor objectives={objectives} refresh={fetchData} />
        </>
      ),
    },
  ];

  return (
    <div className="admin-unified-page">
      <div className="admin-unified-decorations">
        <div className="admin-floating-element admin-floating-element-1"></div>
        <div className="admin-floating-element admin-floating-element-2"></div>
        <div className="admin-floating-element admin-floating-element-3"></div>
      </div>

      <div className="admin-unified-header">
        <h1 className="admin-unified-title"><FileTextOutlined /> Gestión de Contenido Estático</h1>
        <p className="admin-unified-subtitle">
          Modificá los textos institucionales, lemas y secciones fijas del sitio web.
        </p>
        <button className="admin-unified-primary-btn" onClick={handleSaveAll} disabled={saving}>
          {saving ? <ReloadOutlined spin /> : <SaveOutlined />} {saving ? "Guardando..." : "Guardar Todo"}
        </button>
      </div>

      <div className="admin-tabs-container card-shadow">
        <Tabs defaultActiveKey="home" className="modern-admin-tabs" items={tabItems} />
      </div>
    </div>
  );
};

/* ======================================================
   Sub-componente: Editor de Home
   ====================================================== */
const HomeEditor = ({ content, setContent }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent({ ...content, [name]: value });
  };

  return (
    <div className="admin-editor-section">
      <h3 className="section-subtitle"><HomeOutlined /> Banner Principal y General</h3>
      <div className="admin-editor-grid">
        <div className="editor-form-group">
          <label className="editor-label">Lema Principal (Title)</label>
          <input type="text" name="title" className="editor-input" value={content?.title} onChange={handleChange} />
        </div>
        <div className="editor-form-group">
          <label className="editor-label">Descripción del Banner</label>
          <TextArea name="description" rows={3} value={content?.description} onChange={(e) => handleChange(e)} />
        </div>
        <div className="editor-form-group">
          <label className="editor-label">Texto Destacado ("Texto Mágico")</label>
          <input type="text" name="magicText" className="editor-input" value={content?.magicText} onChange={handleChange} />
        </div>
      </div>
      
      <Divider />
      
      <h3 className="section-subtitle"><FileTextOutlined /> Sección de Novedades (en Home)</h3>
      <div className="admin-editor-grid">
        <div className="editor-form-group">
          <label className="editor-label">Título de Novedades</label>
          <input type="text" name="newsTitle" className="editor-input" value={content?.newsTitle} onChange={handleChange} />
        </div>
        <div className="editor-form-group">
          <label className="editor-label">Descripción de Novedades</label>
          <input type="text" name="newsDescription" className="editor-input" value={content?.newsDescription} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
};

/* ======================================================
   Sub-componente: Editor de Historia (Hitos)
   ====================================================== */
const HistoryEditor = ({ history, setHistory }) => {
  const addMilestone = () => {
    setHistory([...history, { year: new Date().getFullYear(), event: "" }]);
  };

  const removeMilestone = (index) => {
    const newHistory = history.filter((_, i) => i !== index);
    setHistory(newHistory);
  };

  const updateMilestone = (index, field, value) => {
    const newHistory = [...history];
    newHistory[index][field] = value;
    setHistory(newHistory);
  };

  return (
    <div className="admin-editor-section" style={{ marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 className="section-subtitle" style={{ margin: 0 }}><HistoryOutlined /> Hitos de la Historia</h3>
        <Button icon={<PlusOutlined />} onClick={addMilestone}>Agregar Hito</Button>
      </div>
      
      <div className="history-milestones-list">
        {(history || []).map((item, index) => (
          <div key={index} className="milestone-item-row" style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
            <Input 
              style={{ width: '100px' }} 
              placeholder="Año" 
              value={item.year} 
              onChange={(e) => updateMilestone(index, 'year', e.target.value)} 
            />
            <Input 
              style={{ flex: 1 }} 
              placeholder="Evento / Hito histórico" 
              value={item.event} 
              onChange={(e) => updateMilestone(index, 'event', e.target.value)} 
            />
            <Button danger icon={<DeleteOutlined />} onClick={() => removeMilestone(index)} />
          </div>
        ))}
      </div>
    </div>
  );
};

/* ======================================================
   Sub-componente: Editor de Sección Simple (Título/Desc)
   ====================================================== */
const SimpleSectionEditor = ({ title, data, setData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div className="admin-editor-section">
      <h3 className="section-subtitle">{title}</h3>
      <div className="editor-form-group">
        <label className="editor-label">Título de la Sección</label>
        <input type="text" name="title" className="editor-input" value={data?.title} onChange={handleChange} />
      </div>
      <div className="editor-form-group">
        <label className="editor-label">Descripción</label>
        <TextArea name="description" rows={4} value={data?.description} onChange={(e) => handleChange(e)} />
      </div>
    </div>
  );
};

/* ======================================================
   Sub-componente: Editor de Objetivos (del Equipo)
   ====================================================== */
const ObjectivesEditor = ({ objectives, refresh }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentObj, setCurrentObj] = useState(null);

  const handleOpen = (obj = null) => {
    setCurrentObj(obj || { title: "", summary: "", icon: "BulbOutlined" });
    setModalOpen(true);
  };

  const handleSave = async () => {
    try {
      await saveObjective(currentObj);
      notification.success({ message: "Objetivo guardado" });
      setModalOpen(false);
      refresh();
    } catch (e) {
      notification.error({ message: "Error al guardar objetivo" });
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "¿Eliminar este objetivo?",
      content: "Esta acción no se puede deshacer.",
      onOk: async () => {
        try {
          await deleteObjective(id);
          notification.success({ message: "Objetivo eliminado" });
          refresh();
        } catch (e) {
          notification.error({ message: "Error al eliminar" });
        }
      }
    });
  };

  return (
    <div className="admin-editor-section" style={{ marginTop: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 className="section-subtitle" style={{ margin: 0 }}><BulbOutlined /> Cards de Objetivos</h3>
        <Button icon={<PlusOutlined />} onClick={() => handleOpen()}>Nuevo Objetivo</Button>
      </div>

      <div className="objectives-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
        {(objectives || []).map((obj) => (
          <Card 
            key={obj.id} 
            size="small" 
            title={obj.title}
            extra={
              <Space>
                <Button size="small" icon={<EditOutlined />} onClick={() => handleOpen(obj)} />
                <Button size="small" danger icon={<DeleteOutlined />} onClick={() => handleDelete(obj.id)} />
              </Space>
            }
          >
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>{obj.description || obj.summary}</p>
            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Icono: {obj.icon}</span>
          </Card>
        ))}
      </div>

      <Modal
        title={currentObj?.id ? "Editar Objetivo" : "Nuevo Objetivo"}
        open={modalOpen}
        onOk={handleSave}
        onCancel={() => setModalOpen(false)}
        okText="Guardar"
        cancelText="Cancelar"
      >
        <Form layout="vertical" style={{ marginTop: '1rem' }}>
          <Form.Item label="Título del Objetivo">
            <Input value={currentObj?.title} onChange={(e) => setCurrentObj({...currentObj, title: e.target.value})} />
          </Form.Item>
          <Form.Item label="Summary (Descripción breve)">
            <TextArea rows={3} value={currentObj?.description || currentObj?.summary} onChange={(e) => setCurrentObj({...currentObj, description: e.target.value, summary: e.target.value})} />
          </Form.Item>
          <Form.Item label="Icono (Nombre de Ant Design Icon)">
            <Input value={currentObj?.icon} placeholder="Ej: BulbOutlined, TeamOutlined..." onChange={(e) => setCurrentObj({...currentObj, icon: e.target.value})} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminStaticContent;
