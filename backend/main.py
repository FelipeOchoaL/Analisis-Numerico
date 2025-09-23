from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import os

from routers import (
    ecuaciones_no_lineales,
    errores,
    series_taylor,
    sistemas_ecuaciones
)

# Crear la aplicación FastAPI
app = FastAPI(
    title="API de Análisis Numérico",
    description="API para métodos de análisis numérico",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configurar CORS para permitir conexiones desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Importar funcionalidades adicionales solo si están disponibles
try:
    from fastapi.staticfiles import StaticFiles
    from fastapi.templating import Jinja2Templates
    from fastapi import Request
    from fastapi.responses import HTMLResponse
    from pathlib import Path
    
    # Servir archivos estáticos del frontend (solo si existe)
    # Obtener paths absolutos que funcionen en Render
    current_file = Path(__file__).resolve()  # /opt/render/project/src/backend/main.py
    project_root = current_file.parent.parent  # /opt/render/project/src/
    frontend_static_path = project_root / "frontend" / "static"
    frontend_templates_path = project_root / "frontend" / "templates"

    # Debug logs para Render
    print(f"🔍 Current file: {current_file}")
    print(f"🔍 Project root: {project_root}")
    print(f"🔍 Static path: {frontend_static_path}")
    print(f"🔍 Templates path: {frontend_templates_path}")
    print(f"🔍 Static exists: {frontend_static_path.exists()}")
    print(f"🔍 Templates exists: {frontend_templates_path.exists()}")
    
    if frontend_static_path.exists():
        app.mount("/static", StaticFiles(directory=str(frontend_static_path)), name="static")
    
    if frontend_templates_path.exists():
        templates = Jinja2Templates(directory=str(frontend_templates_path))
        
        # Rutas del frontend con manejo de errores
        @app.get("/frontend", response_class=HTMLResponse)
        async def serve_frontend(request: Request):
            try:
                return templates.TemplateResponse("index.html", {"request": request})
            except Exception as e:
                print(f"❌ Error serving frontend index: {e}")
                return HTMLResponse(f"<h1>Error cargando frontend</h1><p>Error: {str(e)}</p><p><a href='/docs'>Ir a documentación de la API</a></p>", status_code=500)
        
        @app.get("/frontend/ecuaciones-no-lineales", response_class=HTMLResponse)
        async def ecuaciones_page(request: Request):
            try:
                return templates.TemplateResponse("ecuaciones_no_lineales.html", {"request": request})
            except Exception as e:
                print(f"❌ Error serving ecuaciones page: {e}")
                return HTMLResponse(f"<h1>Error cargando página</h1><p>Error: {str(e)}</p><p><a href='/docs'>Ir a documentación de la API</a></p>", status_code=500)
        
        @app.get("/frontend/errores", response_class=HTMLResponse)
        async def errores_page(request: Request):
            try:
                return templates.TemplateResponse("errores.html", {"request": request})
            except Exception as e:
                print(f"❌ Error serving errores page: {e}")
                return HTMLResponse(f"<h1>Error cargando página</h1><p>Error: {str(e)}</p><p><a href='/docs'>Ir a documentación de la API</a></p>", status_code=500)
        
        @app.get("/frontend/series-taylor", response_class=HTMLResponse)
        async def taylor_page(request: Request):
            try:
                return templates.TemplateResponse("series_taylor.html", {"request": request})
            except Exception as e:
                print(f"❌ Error serving taylor page: {e}")
                return HTMLResponse(f"<h1>Error cargando página</h1><p>Error: {str(e)}</p><p><a href='/docs'>Ir a documentación de la API</a></p>", status_code=500)
        
        @app.get("/frontend/sistemas-ecuaciones", response_class=HTMLResponse)
        async def sistemas_page(request: Request):
            try:
                return templates.TemplateResponse("sistemas_ecuaciones.html", {"request": request})
            except Exception as e:
                print(f"❌ Error serving sistemas page: {e}")
                return HTMLResponse(f"<h1>Error cargando página</h1><p>Error: {str(e)}</p><p><a href='/docs'>Ir a documentación de la API</a></p>", status_code=500)

except ImportError:
    # Si no están disponibles las dependencias del frontend, solo usar API
    pass

# Incluir routers
app.include_router(
    ecuaciones_no_lineales.router,
    prefix="/api/ecuaciones-no-lineales",
    tags=["Ecuaciones No Lineales"]
)

app.include_router(
    errores.router,
    prefix="/api/errores",
    tags=["Cálculo de Errores"]
)

app.include_router(
    series_taylor.router,
    prefix="/api/series-taylor",
    tags=["Series de Taylor"]
)

app.include_router(
    sistemas_ecuaciones.router,
    prefix="/api/sistemas-ecuaciones",
    tags=["Sistemas de Ecuaciones"]
)

@app.get("/")
async def root():
    return {
        "message": "API de Análisis Numérico",
        "version": "1.0.0",
        "docs": "/docs",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Ruta de debug para diagnosticar el problema
@app.get("/debug/structure")
async def debug_structure():
    """Ruta para debug - ver la estructura de archivos del proyecto"""
    try:
        from pathlib import Path
        import traceback
        
        current_file = Path(__file__).resolve()
        project_root = current_file.parent.parent
        
        # Verificar qué archivos existen
        structure_info = {
            "current_file": str(current_file),
            "project_root": str(project_root),
            "project_root_exists": project_root.exists(),
            "frontend_dir_exists": (project_root / "frontend").exists(),
            "static_dir_exists": (project_root / "frontend" / "static").exists(),
            "templates_dir_exists": (project_root / "frontend" / "templates").exists(),
        }
        
        # Listar archivos en project_root
        if project_root.exists():
            try:
                structure_info["project_files"] = [item.name for item in project_root.iterdir() if item.is_dir() or item.suffix in ['.py', '.txt', '.md', '.yaml']]
                
                frontend_dir = project_root / "frontend"
                if frontend_dir.exists():
                    structure_info["frontend_files"] = [item.name for item in frontend_dir.iterdir()]
                    
                    templates_dir = frontend_dir / "templates"
                    if templates_dir.exists():
                        structure_info["template_files"] = [item.name for item in templates_dir.iterdir() if item.suffix == '.html']
            except Exception as e:
                structure_info["listing_error"] = str(e)
        
        return structure_info
        
    except Exception as e:
        return {
            "error": str(e),
            "traceback": traceback.format_exc()
        }

if __name__ == "__main__":
    # Configuración para desarrollo local y Render
    port = int(os.environ.get("PORT", 8000))
    host = os.environ.get("HOST", "127.0.0.1")
    
    # En Render usar 0.0.0.0, en desarrollo 127.0.0.1
    if os.environ.get("RENDER_ENV"):
        host = "0.0.0.0"
        reload = False
    else:
        reload = True
    
    uvicorn.run("main:app", host=host, port=port, reload=reload)
