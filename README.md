# 📱 Gestor de Tareas App

Aplicación móvil de gestión de tareas construida con React Native y Expo.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior): [Descargar aquí](https://nodejs.org/)
- **npm** o **yarn** (viene con Node.js)
- **Android Studio** (para emulador Android) o **Xcode** (para emulador iOS - solo en macOS)

> ⚠️ **Importante:** Esta aplicación NO funciona con Expo Go. Debes usar un emulador.

## 🚀 Instalación

### 1. Clonar el repositorio (si aplica)
```bash
git clone <URL_DEL_REPOSITORIO>
cd gestor-tareas-app
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.development` en la raíz del proyecto con la siguiente variable:

```env
EXPO_PUBLIC_ENPOINT_LOCAL=http://TU_IP_LOCAL:PUERTO
```

**Ejemplo:**
```env
EXPO_PUBLIC_ENPOINT_LOCAL=http://192.168.1.100:3000
```

> 💡 **Nota:** Reemplaza `TU_IP_LOCAL` con la dirección IP de tu computadora donde está corriendo el backend. **NO uses** `localhost` o `127.0.0.1`, ya que el emulador no podrá conectarse.

**Para encontrar tu IP local:**
- **macOS/Linux:** Ejecuta `ifconfig` en la terminal y busca tu IP en la sección de tu conexión de red
- **Windows:** Ejecuta `ipconfig` en cmd y busca "Dirección IPv4"

## ▶️ Ejecutar la Aplicación

### Para Android (Recomendado):
```bash
npm run android
```

> Este comando compilará y ejecutará la aplicación en el emulador de Android. Asegúrate de tener Android Studio instalado y un emulador configurado.

### Para iOS (solo macOS):
```bash
npm run ios
```

> Requiere Xcode instalado.

## 🧪 Ejecutar Tests

```bash
npm test
```

## 📱 Funcionalidades de la Aplicación

### 1. **Autenticación**
- ✅ Registro de nuevos usuarios
- ✅ Inicio de sesión
- ✅ Cerrar sesión
- ✅ Almacenamiento seguro de credenciales

### 2. **Gestión de Tareas**
- ✅ Crear nuevas tareas
- ✅ Ver lista de tareas
- ✅ Editar tareas existentes
- ✅ Eliminar tareas
- ✅ Filtrar tareas por estado (pendiente, en progreso, completada)

### 3. **Perfil de Usuario**
- ✅ Ver información del perfil
- ✅ Configuración de la cuenta

### 4. **Interfaz**
- ✅ Tema claro/oscuro
- ✅ Navegación intuitiva con tabs
- ✅ Animaciones fluidas
- ✅ Diseño responsive

## 🎯 Guía de Uso para Evaluadores

### Primer Uso

1. **Configurar el backend:**
   - Asegúrate de que el backend esté corriendo en tu máquina
   - Configura la variable de entorno `EXPO_PUBLIC_ENPOINT_LOCAL` con la IP correcta

2. **Ejecutar la aplicación:**
   ```bash
   npm run android
   ```

3. **Iniciar sesión con credenciales de prueba:**
   
   Si ya corriste las migraciones y seeders del backend, puedes usar:
   ```
   Email: john@demo.com
   Contraseña: password123
   ```

   O bien, puedes registrar una cuenta nueva desde la pantalla de registro.

### Uso de la Aplicación

#### Gestionar Tareas

1. **Crear una tarea:**
   - Ve a la pestaña "Tareas" o "Tasks"
   - Presiona el botón "+" o "Nueva Tarea"
   - Completa la información:
     - Título de la tarea
     - Descripción
     - Estado (pendiente, en progreso, completada)
   - Guarda la tarea

2. **Ver tareas:**
   - Las tareas se muestran en la pantalla principal de tareas
   - Puedes filtrar por estado usando los chips en la parte superior

3. **Editar una tarea:**
   - Toca sobre una tarea existente
   - Modifica los campos deseados
   - Guarda los cambios

4. **Eliminar una tarea:**
   - Desliza la tarea o presiona el icono de eliminar
   - Confirma la eliminación

#### Configuración

1. **Cambiar tema:**
   - Ve a la pestaña "Perfil" o "Config"
   - Activa/desactiva el toggle de tema oscuro

2. **Cerrar sesión:**
   - Ve a la pestaña "Perfil" o "Config"
   - Presiona el botón "Cerrar Sesión" o "Logout"

## 🔧 Estructura del Proyecto

```
gestor-tareas-app/
├── components/          # Componentes reutilizables
│   ├── forms/          # Formularios (Login, Register, Task)
│   ├── icons/          # Proveedores de iconos
│   └── layouts/        # Layouts de pantallas
├── hooks/              # Custom hooks (useTheme, useTasks, useUser)
├── navigation/         # Configuración de navegación
├── screens/            # Pantallas de la app
│   ├── public/         # Pantallas públicas (Login, Register)
│   └── private/        # Pantallas privadas (Tasks, Profile)
├── services/           # Servicios de API y almacenamiento
├── store/              # Context providers (Auth, Tasks, Theme)
├── types/              # Definiciones de TypeScript
└── utils/              # Utilidades y helpers
```

## 🛠️ Stack Tecnológico

- **Framework:** React Native con Expo
- **Navegación:** React Navigation (Stack & Bottom Tabs)
- **UI Library:** UI Kitten (@ui-kitten/components)
- **Gestión de Estado:** React Context API
- **Formularios:** React Hook Form
- **HTTP Client:** Axios
- **Almacenamiento:** Expo Secure Store
- **Animaciones:** React Native Reanimated
- **Testing:** Jest + React Native Testing Library

## 📝 Notas para Evaluadores

### ⚠️ Requisitos Importantes

1. **Backend requerido:** La aplicación necesita que el backend esté corriendo
2. **No usar Expo Go:** Esta app NO funciona con Expo Go, solo con emuladores
3. **Variable de entorno:** Debes configurar `EXPO_PUBLIC_ENPOINT_LOCAL` con tu IP local

### Credenciales de Prueba

Si ejecutaste las migraciones y seeders del backend:
```
Email: john@demo.com
Contraseña: password123
```

### API Backend

**Configuración del endpoint:**
- El endpoint de la API se configura mediante la variable de entorno `EXPO_PUBLIC_ENPOINT_LOCAL`
- La configuración de Axios está en `services/instanceAxios.ts`

### Problemas Comunes

#### "No se puede conectar a la API"
```bash
# Verifica que:
# 1. El backend esté corriendo
# 2. La variable EXPO_PUBLIC_ENPOINT_LOCAL tenga la IP correcta (NO uses localhost)
# 3. El puerto sea el correcto
```

#### "Metro bundler no inicia"
```bash
# Limpiar cache y reiniciar
npx expo start -c
```

#### "Módulos no encontrados"
```bash
# Reinstalar dependencias
rm -rf node_modules
npm install
```

#### "Error de build en Android"
```bash
# Limpiar y reconstruir
npm run android:prebuild
npm run android
```

#### "Network request failed"
- Asegúrate de usar tu IP local (ej: 192.168.1.100) en lugar de localhost
- Verifica que tu computadora y emulador estén en la misma red
- Revisa que el backend esté escuchando en todas las interfaces (0.0.0.0) y no solo en localhost

## 📄 Licencia

[Especificar licencia]

## 👤 Autor

Brian García

## 📞 Contacto

Para preguntas o problemas durante la evaluación, contactar:
- Email: [tu-email@ejemplo.com]
- GitHub: [tu-usuario]

---

**Versión:** 1.0.0  
**Última actualización:** Febrero 2026
