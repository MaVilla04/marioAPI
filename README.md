# MarioAPI

MarioAPI es una API RESTful diseñada para gestionar las transformaciones del personaje Mario Bros. Soporta operaciones CRUD (Crear, Leer, Actualizar, Eliminar) y notificaciones en tiempo real mediante WebSocket. El proyecto es dinámico, escalable y está diseñado para manejar datos de transformaciones de manera eficiente.

## Características
- **Operaciones CRUD:** Administra las transformaciones de Mario Bros de forma sencilla.
- **Autenticación:** Asegura las operaciones mediante JSON Web Tokens (JWT).
- **Actualizaciones en Tiempo Real:** Notifica a los usuarios sobre cambios en las transformaciones mediante WebSocket (Socket.IO).

## Tecnologías Utilizadas
### Backend
- **Node.js y ExpressJS:** Servidor y gestión de rutas.
- **MongoDB:** Base de datos NoSQL para almacenar transformaciones.
- **Mongoose:** ODM para MongoDB.
- **Socket.IO:** Comunicación en tiempo real.
- **JWT:** Autenticación y autorización.
- **Dotenv y Bcryptjs:** Configuración y hash de contraseñas de forma segura.

### Frontend
- **ReactJS:** Interfaz para gestionar transformaciones.
- **CSS:** Estilo para un diseño atractivo y responsivo.

## Instalación y Configuración
### Requisitos Previos
- **Node.js** y **npm** instalados.
- **MongoDB** configurado y en ejecución.

### Pasos
1. Clona el repositorio:
   ```bash
   git clone git@github.com:MaVilla04/marioAPI.git
   ```
2. Navega al directorio del proyecto:
   ```bash
   cd marioAPI
   ```
3. Instala las dependencias:
   ```bash
   npm install
   ```
4. Configura las variables de entorno creando un archivo `.env`:
   ```env
   MONGODB=mongodb+srv:<ruta_base_datos>
   PORT=3000
   JWT_SECRET=<clave_secreta>
   ```
5. Inicia el servidor:
   - Entorno de producción:
     ```bash
     npm start
     ```
   - Entorno de desarrollo:
     ```bash
     npm run dev
     ```

## Endpoints de la API
| Método | Endpoint                           | Descripción                                 |
|--------|------------------------------------|---------------------------------------------|
| GET    | `/marioTransformations`            | Lista todas las transformaciones.           |
| POST   | `/marioTransformations/new`        | Crea una nueva transformación.              |
| POST   | `/marioTransformations/newUser`    | Registra un nuevo usuario.                  |
| POST   | `/marioTransformations/login`      | Inicia sesión y genera un token.            |
| PUT    | `/marioTransformations/update/:id` | Actualiza una transformación existente.     |
| DELETE | `/marioTransformations/delete/:id` | Elimina una transformación existente.       |

### Autenticación
Las rutas protegidas requieren un JSON Web Token (JWT) válido. Incluye el token en el encabezado `Authorization` como:
```
Bearer <token>
```

## Notificaciones en Tiempo Real
La API utiliza WebSocket para notificar a los clientes en tiempo real sobre cualquier cambio en las transformaciones (crear, actualizar, eliminar), sin necesidad de solicitudes HTTP adicionales.

## Despliegue
- GitHub: [Repositorio de MarioAPI](https://github.com/MaVilla04/marioAPI/)
- Despliegue en vivo: [MarioAPI en Render](https://marioapi.onrender.com/)

## Autores
- **Andriw Rollo Castro** (arollo@cuc.edu.co)
- **Melissa Villa Vanegas** (mvillazo2@cuc.edu.co)

## Licencia
Este proyecto es de código abierto y está disponible bajo la [Licencia MIT](LICENSE).
