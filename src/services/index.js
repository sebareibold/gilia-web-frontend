// Importar servicios de mock (usamos solo mock para evitar errores de export faltantes en ./api)
import { 
  getTeamMembers as mockGetTeamMembers, 
  getTeamMemberById as mockGetTeamMemberById, 
  getProjects as mockGetProjects, 
  getProjectById as mockGetProjectById, 
  getResearchLines as mockGetResearchLines, 
  getResearchLineById as mockGetResearchLineById, 
  getPublications as mockGetPublications, 
  getPublication as mockGetPublication, 
  getGalleryItems as mockGetGalleryItems, 
  getGalleryItem as mockGetGalleryItem, 
  getExtensionLines as mockGetExtensionLines, 
  getExtensionLine as mockGetExtensionLine, 
  getNews as mockGetNews, 
  getNewsItem as mockGetNewsItem,
  getTools as mockGetTools,
  accessToTheBackoffice as mockAccessToTheBackoffice,
  getUsers as mockGetUsers,
  saveUser as mockSaveUser,
  deleteUser as mockDeleteUser,
  getStaticContent as mockGetStaticContent,
  saveStaticContent as mockSaveStaticContent,
  getHistory as mockGetHistory,
  saveHistory as mockSaveHistory,
  saveObjective as mockSaveObjective,
  deleteObjective as mockDeleteObjective
} from "./mock";

// Exportamos SIEMPRE desde mock para que la app funcione ahora sin errores de export faltantes
// Algunos métodos del mock devuelven arrays/objetos en crudo; los normalizamos a { data: ... }
export const getTeamMembers = async (...args) => ({ data: await mockGetTeamMembers(...args) });
export const getTeamMemberById = async (...args) => ({ data: await mockGetTeamMemberById(...args) });
export const getProjects = async (...args) => await mockGetProjects(...args);
export const getProjectById = async (...args) => {
  const res = await mockGetProjectById(...args)
  return { data: res }
};
export const getResearchLines = async (...args) => ({ data: await mockGetResearchLines(...args) });
export const getResearchLineById = async (...args) => {
  const res = await mockGetResearchLineById(...args)
  return { data: res }
};

// Reatrasnformamos, esto puede estar medio mal implementado pero bueno dps vemos como mejorarlo :)
export const getPublications = mockGetPublications;
export const getPublicationById = mockGetPublication;
export const getGalleryItems = mockGetGalleryItems;
export const getGalleryItemById = mockGetGalleryItem;
export const getExtensionLines = mockGetExtensionLines;
export const getExtensionLineById = mockGetExtensionLine;
export const getNews = mockGetNews;
export const getNewsItem = mockGetNewsItem;
export const getTools = mockGetTools;
export const accessToTheBackoffice = mockAccessToTheBackoffice;
export const getUsers = async () => ({ data: await mockGetUsers() });
export const saveUser = mockSaveUser;
export const deleteUser = mockDeleteUser;
export const getStaticContent = async () => ({ data: await mockGetStaticContent() });
export const saveStaticContent = mockSaveStaticContent;
export const getHistory = async () => ({ data: await mockGetHistory() });
export const saveHistory = mockSaveHistory;
export const saveObjective = mockSaveObjective;
export const deleteObjective = mockDeleteObjective;


// Adicionales usados en componentes públicos
export { getAboutInfo as getAboutInfo } from "./mock";
export { getObjectives as getObjectives } from "./mock";

// Adicionales potencialmente usados en admin/config
export { getSystemConfig as getSystemConfig } from "./mock";
export { getStatistics as getStatistics } from "./mock";

/* 
   Con este archivo podemos importar los servicios de la API o los servicios de mock
   dependiendo de la variable de entorno VITE_USE_MOCK_DATA.
   
   Si VITE_USE_MOCK_DATA es true, importamos los servicios de mock.
   Si VITE_USE_MOCK_DATA es false, importamos los servicios de la API.

   Con servicios nos referimos a los metodos implementados en cada de los Index de su 
   directorio correspondiente. Esto es gracias al "*" 
*/
