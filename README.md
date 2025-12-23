# MusicLearn - Aplicación de Aprendizaje de Inglés con Música

Una aplicación web moderna construida con Next.js que te permite aprender inglés a través de canciones. Analiza letras con IA, genera quizzes interactivos y mejora tu vocabulario mientras disfrutas de la música.

## 🎵 Características

- **Búsqueda de Canciones**: Busca entre una colección de canciones populares
- **Análisis de Letras con IA**: Análisis automático de letras usando Groq AI para identificar:
  - Nivel de dificultad (Principiante, Intermedio, Avanzado)
  - Tiempos verbales utilizados
  - Vocabulario clave con definiciones
  - Puntos gramaticales importantes
  - Nivel de lectura (1-10)
- **Quizzes Interactivos**: Genera automáticamente quizzes educativos basados en las letras:
  - Completar espacios en blanco
  - Preguntas de vocabulario
  - Preguntas de gramática y tiempos verbales
  - Comprensión lectora
- **Seguimiento de Progreso**: Visualiza tu progreso de aprendizaje
- **Interfaz Moderna**: Diseño responsive con modo oscuro/claro

## 🛠️ Tecnologías Utilizadas

- **Next.js 14** - Framework de React
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **Groq AI** - Análisis de letras y generación de quizzes
- **Radix UI** - Componentes de UI accesibles


## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18 o superior)
- **npm** (viene incluido con Node.js)

## 🚀 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <url-del-repositorio>
cd music-app-with-quizzes
```

### 2. Instalar Dependencias

```bash
npm install
```

**Nota:** Si encuentras errores de conflictos de dependencias (peer dependencies), puedes usar:

```bash
npm install --legacy-peer-deps
```

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```bash
GROQ_API_KEY=tu_api_key_de_groq_aqui
```

**Cómo obtener tu API Key de Groq:**

1. Visita [https://console.groq.com/](https://console.groq.com/)
2. Crea una cuenta o inicia sesión
3. Ve a la sección de API Keys
4. Genera una nueva API Key
5. Copia la clave y pégala en tu archivo `.env.local`

### 4. Ejecutar el Proyecto en Modo Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 📜 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia el servidor de producción (después de `build`)
- `npm run lint` - Ejecuta el linter para verificar el código

## 🎯 Uso de la Aplicación

1. **Buscar Canciones**: Usa la barra de búsqueda en la página principal para encontrar canciones por título, artista o álbum
2. **Ver Letras**: Haz clic en "Ver Letras & Análisis" para ver la canción completa
3. **Analizar Letras**: El análisis con IA se genera automáticamente cuando abres una canción
4. **Generar Quiz**: Haz clic en "Generar Quiz" para crear un quiz interactivo basado en la canción


## 📁 Estructura del Proyecto

```
music-app-with-quizzes/
├── app/                    # Rutas y páginas de Next.js
│   ├── api/               # API routes
│   │   ├── analyze-lyrics/  # Endpoint para análisis de letras
│   │   └── generate-quiz/   # Endpoint para generar quizzes
│   ├── page.tsx           # Página principal
│   ├── song/[id]/         # Página de detalle de canción
│   ├── quiz/[id]/         # Página de quiz
│   └── progress/          # Página de progreso
├── components/            # Componentes reutilizables
│   ├── ui/               # Componentes de UI (Radix UI)
│   └── interactive-lyrics.tsx
├── lib/                  # Utilidades y funciones
│   ├── lyrics-api.ts     # API de canciones (datos locales)
│   └── utils.ts          # Funciones auxiliares
├── public/               # Archivos estáticos
└── styles/               # Estilos globales
```

## 🎵 Canciones Incluidas

La aplicación incluye 10 canciones de muestra con letras completas:

1. One - Metallica
2. Yesterday - The Beatles
3. Bohemian Rhapsody - Queen
4. Imagine - John Lennon
5. Hotel California - Eagles
6. Let It Be - The Beatles
7. Billie Jean - Michael Jackson
8. Smells Like Teen Spirit - Nirvana
9. Don't Stop Believin' - Journey
10. Sweet Child O' Mine - Guns N' Roses

## 🔧 Solución de Problemas

### Error: "GROQ_API_KEY is not defined"

Asegúrate de haber creado el archivo `.env.local` en la raíz del proyecto con tu API key de Groq.

### Error al instalar dependencias

Si tienes problemas con conflictos de peer dependencies, intenta:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

O si estás en Windows:
```bash
npm cache clean --force
rmdir /s /q node_modules
del package-lock.json
npm install --legacy-peer-deps
```

### El servidor no inicia

Verifica que el puerto 3000 no esté en uso. Puedes cambiar el puerto con:
```bash
npm run dev -- -p 3001
```

## 📝 Notas Importantes

- La aplicación usa el modelo `llama-3.3-70b-versatile` de Groq para el análisis de letras y generación de quizzes
- Las canciones están almacenadas localmente en `lib/lyrics-api.ts`

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🙏 Agradecimientos

- Groq AI por proporcionar la API de análisis de texto
- Radix UI por los componentes accesibles
- Next.js por el excelente framework

---

¡Disfruta aprendiendo inglés con música! 🎵📚

