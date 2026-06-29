import { useState, useEffect, useCallback } from 'react';
import api from '../api/axiosConfig';

/**
 * Hook personalizado para manejar el CRUD genérico contra el backend.
 * @param {string} endpoint - La ruta del recurso (ej. '/clientes')
 */
function useApiCrud(endpoint) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Leer todos los registros
  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(endpoint);
      setData(response.data);
      setError(null);
    } catch (err) {
      console.error(`Error fetching ${endpoint}:`, err);
      setError('Error al cargar los datos.');
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Crear registro
  const create = async (payload) => {
    try {
      const response = await api.post(endpoint, payload);
      setData((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      console.error(`Error creating in ${endpoint}:`, err);
      throw err;
    }
  };

  // Actualizar registro
  const update = async (id, payload) => {
    try {
      const response = await api.put(`${endpoint}/${id}`, payload);
      setData((prev) => prev.map((item) => (item.id === id ? response.data : item)));
      return response.data;
    } catch (err) {
      console.error(`Error updating in ${endpoint}:`, err);
      throw err;
    }
  };

  // Eliminar registro
  const remove = async (id) => {
    try {
      await api.delete(`${endpoint}/${id}`);
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(`Error deleting in ${endpoint}:`, err);
      throw err;
    }
  };

  return { data, loading, error, fetchAll, create, update, remove };
}

export default useApiCrud;
