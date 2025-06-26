export const fetchAboutUsData = async (API_BASE_URL) => {
  try {
    console.log(API_BASE_URL);
    const response = await fetch(`${API_BASE_URL}/api/about/`);
    if (!response.ok) {
      throw new Error('Error fetching About Us data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching About Us data:', error);
    return null; // O puedes devolver un objeto vacío para manejar mejor el fallo
  }
};
