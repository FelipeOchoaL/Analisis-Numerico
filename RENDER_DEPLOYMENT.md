# 🎨 Despliegue en Render - Análisis Numérico

## 📁 Archivos de configuración creados:

✅ **render.yaml** - Configuración principal de Render
✅ **start_render.py** - Script de inicio optimizado para Render  
✅ **requirements.txt** - Dependencias de Python
✅ **backend/main.py** - Modificado para funcionar en desarrollo y producción

## 🚀 URLs de acceso una vez desplegado:

### API Backend:
- **API Principal**: `https://tu-app.onrender.com/`
- **Documentación**: `https://tu-app.onrender.com/docs`
- **ReDoc**: `https://tu-app.onrender.com/redoc`
- **Health Check**: `https://tu-app.onrender.com/health`

### Frontend (si está disponible):
- **Frontend Principal**: `https://tu-app.onrender.com/frontend`
- **Ecuaciones No Lineales**: `https://tu-app.onrender.com/frontend/ecuaciones-no-lineales`
- **Cálculo de Errores**: `https://tu-app.onrender.com/frontend/errores`
- **Series de Taylor**: `https://tu-app.onrender.com/frontend/series-taylor`
- **Sistemas de Ecuaciones**: `https://tu-app.onrender.com/frontend/sistemas-ecuaciones`

## 📋 Siguiente paso:

**COMMIT Y PUSH A GITHUB** desde dentro del directorio Analisis-Numerico/

### Comandos para GitHub:
```bash
cd Analisis-Numerico/
git add .
git commit -m "Render deployment configuration"
git push origin main
```

## 🔧 Configuración en Render:

1. **New Web Service** 
2. **Connect GitHub Repository** (Analisis-Numerico)
3. **Runtime**: Python 3
4. **Build Command**: `pip install -r requirements.txt`
5. **Start Command**: `python start_render.py`
6. **Plan**: Free (perfecto para proyectos académicos)

## 💡 Notas importantes:

- El frontend estará disponible en `/frontend/*` (no en la raíz)
- Las APIs siguen funcionando en `/api/*`
- El código funciona tanto localmente como en Render
- Plan gratuito de Render: 750 horas/mes (suficiente para proyectos académicos)
- **IMPORTANTE**: Los paths ahora están corregidos para funcionar desde dentro del repo
