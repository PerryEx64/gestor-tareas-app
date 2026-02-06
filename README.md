# 📱 Gestor de Tareas App

Aplicación móvil de gestión de tareas con backend REST API.

## 📁 Estructura del Proyecto

```
gestor-tareas-app/
├── backend/          # API REST con Node.js, Express y MySQL (funciona con Docker)
└── mobile-app/       # Aplicación móvil con React Native y Expo (sin Docker)
```

Cada carpeta contiene su propio README con instrucciones detalladas.

## 🚀 Inicio Rápido

### Backend (con Docker)

```bash
cd backend
# Configura el archivo .env
docker-compose up -d
```

El backend estará disponible en `http://localhost:3000`

### Mobile App (con Expo)

```bash
cd mobile-app
npm install
# Configura el archivo .env.development con tu IP local
npx expo start
```

## ⚙️ Configuración

### Backend (.env)
```env
JWT_SECRET=tu_secret_key
DB_HOST=mysql
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=focusly_db
```

### Mobile App (.env.development)
```env
EXPO_PUBLIC_ENPOINT_LOCAL=http://TU_IP_LOCAL:3000/api
```

> **Nota:** La app móvil necesita tu IP local (no `localhost`) para conectarse al backend. 
> Obtén tu IP con: `ifconfig | grep "inet " | grep -v 127.0.0.1` (macOS/Linux) o `ipconfig` (Windows)

## 🐛 Solución de Problemas

- **Backend no conecta a DB:** Verifica que Docker esté corriendo con `docker ps`
- **App no conecta al backend:** Usa tu IP local (no localhost) y verifica que estén en la misma red WiFi
- **Expo no inicia:** Limpia la caché con `npx expo start --clear`

## 👤 Autor

**perryex64**
