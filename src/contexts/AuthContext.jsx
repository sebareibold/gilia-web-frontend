import { createContext, useContext, useState, useEffect } from "react";
import { accessToTheBackoffice } from "../services";
// Creamos el contexto de react
const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Este es el proovedor de contexto,  es un componente que debe de envolver a las parte de una aplicacion, que necesiten acceder a la informacion de autentificacion
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar si hay una sesion guardada al cargar la aplicación
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const savedUser = localStorage.getItem("gilia_user");
        const savedToken = localStorage.getItem("gilia_token");

        if (savedUser && savedToken) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setIsAuthenticated(true);
          console.log("AuthContext - Session restored:", userData.email);
        }
      } catch (error) {
        console.error("AuthContext - Error restoring session:", error);
        // Limpiar datos corruptos
        localStorage.removeItem("gilia_user");
        localStorage.removeItem("gilia_token");
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Funcion de Login
  const login = async (credentials) => {
    try {
      const result = await accessToTheBackoffice(credentials);

      if (result.success) {
        // Actualizamos el estado
        setUser(result.user);
        setIsAuthenticated(true);

        // Guardamos el token, y el objeto de usuario (serializado)
        localStorage.setItem("gilia_token", result.token);
        localStorage.setItem("gilia_user", JSON.stringify(result.user));
      }
      
      return result;
    } catch (error) {
      console.error("Error al intentar iniciar sesión:", error);
      // Devolvemos un error de conexión
      return { success: false, message: "Error de conexión con el servicio." };
    }
  };

  // Funcion de logout
  // no le ponemos el async ya que todavia no llamamos a API
  const logout = () => {
    try {

      // Limpiar estado local
      setUser(null)
      setIsAuthenticated(false)
      
      // Limpiar localStorage
      localStorage.removeItem("gilia_user");
      localStorage.removeItem("gilia_token");

      // Cuando tengamos la API deberiamos llamar al ENDPOINT /logout
      // esta igualmente deberia se llamada a un metodo que tengamos los
      // services como "logout", Puntalmente sire para evitar ataques XSS (entre otros) 
    } catch (error) {
      console.error("AuthContext - Logout error:", error);
    }
  };

  const updateUser = (userData) => {
    try {
      setUser(userData);
      localStorage.setItem("gilia_user", JSON.stringify(userData));
      console.log("AuthContext - User updated");
    } catch (error) {
      console.error("AuthContext - Error updating user:", error);
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/* 
  TAREAS FUTURAS !!!!!!!!!!!!! 

    1) Implementar lo de las cookies en el backend, investigar como se deberia implementar para poder 
    atajarse contra los ataques como el XSS.

   =============== Conceptos Aprendidos/Respasados ===============
    - LocalStorage: es una tool del navegador que permite a las apps webs almacenar datos de forma persistente
    en el dispositivo del usuario. Esto esta disponble cuando cierra el navegador y lo vuelve abrir.
    Algunos metodos imporante son :  
      - setItem(key, value): Almacena un valor con una clave especifica. Ej: localStorage.setItem('gilia_token', token)
      - getItem(key): Recupera el valor asociado a un clave espeficica. Ej: const token = localStorage.getItem('gilia_token') 
      - removeItem(key): Elimina un par clave-valor específico. Ej: localStorage.removeItem('gilia_token')
      - clear(): Elimina todo lo almacenado en localStorage para ese dominio. localStorage.clear()
    Algunas limietaciones imporantes son que solo almacena cadenas de texto, por eso debemos de guardarlo 
    con JSON.stringify() si tenemos un objeto que queremos convertir a string.A diferencia de las cookies de sesión o
    sessionStorage, los datos de localStorage no tienen una fecha de caducidad.Permanecen hasta que el código los 
    elimina explícitamente (removeItem o clear). El límite suele estar entre 5MB y 10MB por dominio. 
    Es más que suficiente para guardar tokens y datos de usuario.

    - JSON Web Token (JWT): es una forma compacta y segura de transmitir información entre dos partes 
    (el cliente y el servidor) como un objeto JSON.Un token JWT es una cadena larga dividida en tres
    partes separadas por puntos: 
      - Header (Encabezado): Indica el tipo de token (JWT) y el algoritmo de cifrado usado para la firma.
      - Payload (Carga Útil): Es donde reside la información de la sesión. incluyendo el ID del
      usuario, su rol y, crucialmente, la fecha de expiración (exp).
      - Signature (Firma): Se genera combinando el Header, el Payload y una clave secreta que solo
      conoce el servidor. Esta firma es lo que garantiza que el token no ha sido alterado.
    Cuando el backend recibe el token el servidor no tiene que buscar en la BD si esta activa,
    simplemente mira el token analiza la firma para ver si es un token legitimo emitido por el o no.
    y ademas la fecha de expiracion (si la fecha ya paso entonces el back returna 401 Unauthorized)

    - Cross-Site Scripting (XSS) es un tipo de ataque de inyección. Ocurre cuando un atacante logra 
    inyectar código JavaScript malicioso en un sitio web legítimo y de confianza (por ejemplo, a 
    través de un comentario no validado o un campo de formulario). 
    Ahi entra otra alternativa; el método más seguro para almacenar tokens (especialmente tokens de sesión/acceso)
    es usar Cookies de tipo HTTP-only .Una Cookie HTTP-only tiene una propiedad especial que indica al navegador 
    que ningún script de cliente (JavaScript) puede acceder, leer o modificarla. Con es metodo 
    lo que podemos hacer es marcar una cookie con la flag "HttpOnly"y ahi se aisla el contenido
    de cualquer Script que se ejecute en la pagina.
    */
