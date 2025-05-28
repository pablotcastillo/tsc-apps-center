import { useAuth } from "@/context/AuthContext"; // Ajusta si mueves AuthContext

const WithAuthData = ({ children }) => {
  const { rol, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

  return children(rol);
};

export default WithAuthData;
