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
    frontend_static_path = Path("../frontend/static")
    frontend_templates_path = Path("../frontend/templates")
    
    if frontend_static_path.exists():
        app.mount("/static", StaticFiles(directory=str(frontend_static_path)), name="static")
    
    if frontend_templates_path.exists():
        templates = Jinja2Templates(directory=str(frontend_templates_path))
        
        # Rutas del frontend
        @app.get("/frontend", response_class=HTMLResponse)
        async def serve_frontend(request: Request):
            return templates.TemplateResponse("index.html", {"request": request})
        
        @app.get("/frontend/ecuaciones-no-lineales", response_class=HTMLResponse)
        async def ecuaciones_page(request: Request):
            return templates.TemplateResponse("ecuaciones_no_lineales.html", {"request": request})
        
        @app.get("/frontend/errores", response_class=HTMLResponse)
        async def errores_page(request: Request):
            return templates.TemplateResponse("errores.html", {"request": request})
        
        @app.get("/frontend/series-taylor", response_class=HTMLResponse)
        async def taylor_page(request: Request):
            return templates.TemplateResponse("series_taylor.html", {"request": request})
        
        @app.get("/frontend/sistemas-ecuaciones", response_class=HTMLResponse)
        async def sistemas_page(request: Request):
            return templates.TemplateResponse("sistemas_ecuaciones.html", {"request": request})

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
