# Gestor de Tareas - API

## 📋 Descripción
API REST para gestión de tareas desarrollada con TypeScript, Express y MySQL como parte de la prueba técnica para Blue Medical. La aplicación permite crear, leer, actualizar y eliminar tareas, con autenticación JWT y validación de datos.

## 🚀 Tecnologías Utilizadas
- **Node.js** v20
- **TypeScript** v5.9
- **Express** v5.2
- **MySQL** v8.0
- **Sequelize** ORM v6.37
- **JWT** para autenticación
- **Express-validator** para validación de datos
- **Bcrypt** para encriptación de contraseñas
- **Docker & Docker Compose** para containerización

## 📁 Estructura del Proyecto
```
focusly-backend/
├── src/
│   ├── controllers/       # Controladores de negocio
│   ├── middlewares/       # Middlewares (auth, validación)
│   ├── routes/           # Definición de rutas
│   ├── utils/            # Utilidades (JWT, manejo de errores)
│   ├── validators/       # Validadores de express-validator
│   └── index.ts          # Punto de entrada
├── database/
│   ├── config/           # Configuración de base de datos
│   ├── models/           # Modelos de Sequelize
│   ├── migrations/       # Migraciones de BD
│   └── seeders/          # Datos de prueba
├── docker-compose.yml    # Configuración de Docker
├── Dockerfile
└── package.json
```

## ⚙️ Requisitos Previos
- Docker Desktop instalado
- Docker Compose instalado
- Puerto 3000 y 3306 disponibles

## 🐳 Instalación y Ejecución con Docker

### 1. Clonar el repositorio
```bash
git clone <https://github.com/PerryEx64/gestor-tareas-backend.git>
cd focusly-backend
```

### 2. Levantar los contenedores
```bash
docker-compose up --build
```

Este comando:
- Creará un contenedor MySQL con la base de datos
- Creará un contenedor para la API
- Ejecutará las migraciones automáticamente
- Ejecutará los seeders con datos de prueba
- La API estará disponible en `http://localhost:3000`

### 3. Verificar que todo funcione
```bash
curl http://localhost:3000/api/
```

Deberías recibir:
```json
{
  "message": "Welcome to the Task Manager API"
}
```

## 🔄 Comandos Útiles

### Detener los contenedores
```bash
docker-compose down
```

### Ver logs de la API
```bash
docker-compose logs -f api
```

### Ver logs de MySQL
```bash
docker-compose logs -f mysql
```

### Reconstruir contenedores
```bash
docker-compose up --build --force-recreate
```

### Ejecutar migraciones manualmente
```bash
docker-compose exec api npm run migration:migrate
```

### Ejecutar seeders manualmente
```bash
docker-compose exec api npm run seed:migrate
```

## 🔐 Autenticación

La API utiliza JWT (JSON Web Tokens) para autenticación. Debes incluir el token en el header de tus peticiones:

```
Authorization: Bearer <tu-token-jwt>
```

## 📡 Endpoints de la API

### Base URL
```
http://localhost:3000/api
```

### Autenticación

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Respuesta exitosa:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

#### Registro
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Tareas (Requieren autenticación)

#### Obtener todas las tareas del usuario autenticado
```http
GET /api/tasks/:userId
Authorization: Bearer <token>
```

**Respuesta:**
```json
[
  {
    "id": "uuid",
    "title": "Completar proyecto",
    "description": "Finalizar la API de tareas",
    "status": "in_progress",
    "user_id": "uuid",
    "createdAt": "2026-02-06T00:00:00.000Z",
    "updatedAt": "2026-02-06T00:00:00.000Z"
  }
]
```

#### Crear una nueva tarea
```http
POST /api/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Nueva tarea",
  "description": "Descripción de la tarea",
  "user_id": "uuid",
  "status": "pending"
}
```

#### Actualizar una tarea
```http
PUT /api/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Tarea actualizada",
  "description": "Nueva descripción",
  "status": "completed"
}
```

#### Eliminar una tarea
```http
DELETE /api/tasks/:id
Authorization: Bearer <token>
```

## 📊 Estados de Tareas

Las tareas pueden tener los siguientes estados:
- `pending` - Pendiente
- `in_progress` - En progreso
- `completed` - Completada

## 🧪 Datos de Prueba

El proyecto incluye seeders con datos de prueba:

**Usuario de prueba:**
```
Email: john@example.com
Password: password123
```

**Tareas de ejemplo:**
- Tarea 1: "Completar proyecto" (in_progress)
- Tarea 2: "Revisar código" (pending)

## 🛡️ Validaciones

La API incluye validaciones robustas:

### Campos requeridos
- **Usuario**: name, email, password
- **Tarea**: title, user_id

### Validaciones específicas
- Email debe ser válido
- Password mínimo 6 caracteres
- Title entre 3-100 caracteres
- Description máximo 500 caracteres
- user_id debe ser UUID válido
- Status debe ser: pending, in_progress o completed

### Formato de errores
```json
{
  "errors": [
    {
      "field": "title",
      "message": "is_required"
    },
    {
      "field": "email",
      "message": "email_invalid"
    }
  ]
}
```

## 🔧 Variables de Entorno

Las variables están configuradas en `docker-compose.yml`:

```yaml
DB_HOST=mysql
DB_PORT=3306
DB_NAME=tasks_db
DB_USER=tasks_user
DB_PASSWORD=tasks_password
NODE_ENV=development
JWT_SECRET=MiBlueMediaSecretKey
```

## 🐛 Manejo de Errores

La API retorna códigos HTTP apropiados:

- `200` - OK
- `201` - Created
- `400` - Bad Request (validación fallida)
- `401` - Unauthorized (sin token o token inválido)
- `404` - Not Found
- `409` - Conflict (email duplicado)
- `500` - Internal Server Error

## 📝 Notas Importantes

1. **Hot Reload**: Los cambios en el código se reflejan automáticamente gracias a nodemon
2. **Persistencia**: Los datos de MySQL se guardan en un volumen de Docker
3. **Health Check**: MySQL tiene un health check para asegurar que la API solo inicie cuando la BD esté lista
4. **Seguridad**: Las contraseñas se encriptan con bcrypt antes de guardarse

## 🏗️ Desarrollo

Si necesitas trabajar sin Docker:

1. Instala MySQL localmente
2. Crea un archivo `.env` basado en las variables del docker-compose
3. Ejecuta:
```bash
npm install
npm run migration:migrate
npm run seed:migrate
npm run dev
```
---

**Para iniciar la evaluación, simplemente ejecuta:**
```bash
docker-compose up --build
```

**Y la API estará lista en:**
```
http://localhost:3000/api
```
## 👤 Autor
**Nombre**: Israel Aguilar  
**Fecha**: Febrero 2026

---

**Versión:** 1.0.0  
**Última actualización:** Febrero 2026