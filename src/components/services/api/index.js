// /services/api/index.js
export const getPersonas = async (filters) => {
    const res = await fetch(`/api/personas?...`);
    return await res.json();
  };
  