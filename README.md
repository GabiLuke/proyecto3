Proyecto Final: API REST de Usuarios y Items (Node.js/Express)

Descripción General

Este proyecto es el trabajo final del módulo de Backend con Node.js y Express. Es una API REST simple que gestiona Usuarios y Elementos genéricos (Items), implementando autenticación (JWT), diferentes roles de usuario, y subida de imágenes a servicios en la nube (Cloudinary).

Se han volcado los conocimientos de Express, Mongoose, middlewares y buenas prácticas de seguridad.

Tecnologías Utilizadas
Backend: Node.js
Framework: Express
Base de Datos: MongoDB (a través de MongoAtlas)
ORM/ODM: Mongoose
Autenticación: JSON Web Tokens (JWT) y bcrypt
Archivos/Imágenes: Multer y Cloudinary

Configuración e Instalación
1. Clona el repositorio: git clone https://github.com/GabiLuke/proyecto3.git
cd proyecto3
2. Instala dependencias: npm install
3. Variables de Entorno
Crea un archivo llamado .env en la raíz del proyecto y añade las siguientes variables con tus credenciales:
# Configuración para MongoDB Atlas
MONGO_URI=mongodb+srv://gabiluke99_db_user:eCuHus6KnQOWXyqw@cluster0.mtko43p.mongodb.net/?

# Configuración de Cloudinary (¡Ojo con no pisar credenciales!)
CLOUDINARY_URL=cloudinary://866724858699745:cQ8iFCxuepmfngj6qdscLtaGqiw@dlou1td9

# Clave para firmar los tokens JWT
JWT_SECRET=9e6d7a4b8f3c1e0d2a7f5c8b4e1d6a0f3c1e0d2a7f5c8b4e1d6a0f3c1e0d2a7f

# Puerto de escucha del servidor
PORT=3000
4. Inicializa la Base de Datos (Seed)
Para tener datos de prueba en la colección de Items, ejecuta el seeder antes de arrancar el servidor:
npm run seed
Cómo Ejecutar el Servidor
Simplemente ejecuta el comando start: npm start
El servidor estará corriendo en http://localhost:3000 (o el puerto que hayas definido en .env).
Endpoints Principales
/users/register   POST    Crea un nuevo usuario. Requiere username, email, password y image.
/users/login      POST    Autentica y devuelve el JWT.
/users            GET     Obtiene la lista de todos los usuarios.
/users/:id/role   PATCH   Cambia el rol de un usuario.
/items            POST    Crea un nuevo item.
/items/:id        DELETE  Elimina un item.

El primer usuario administrador debe crearse manualmente en MongoAtlas.