#!/usr/bin/env python3
"""
Script optimizado para Render
Ejecuta el backend FastAPI configurado para producción
"""
import os
import sys
import subprocess
from pathlib import Path

def setup_environment():
    """Configura el entorno para Render"""
    # Cambiar al directorio del backend (ahora solo 'backend' ya que estamos en el repo)
    backend_dir = Path("backend")
    if backend_dir.exists():
        os.chdir(backend_dir)
        print(f"✅ Cambiado a directorio: {backend_dir.absolute()}")
    else:
        print(f"❌ No se encontró el directorio: {backend_dir}")
        sys.exit(1)

def start_application():
    """Inicia la aplicación FastAPI"""
    port = int(os.environ.get("PORT", 8000))
    host = "0.0.0.0"  # Render requiere 0.0.0.0
    
    print(f"🚀 Iniciando aplicación en {host}:{port}")
    
    # Ejecutar uvicorn
    try:
        subprocess.run([
            sys.executable, "-m", "uvicorn", "main:app",
            "--host", host,
            "--port", str(port),
            "--workers", "1"
        ], check=True)
    except subprocess.CalledProcessError as e:
        print(f"❌ Error al iniciar la aplicación: {e}")
        sys.exit(1)

if __name__ == "__main__":
    print("🎨 Iniciando aplicación en Render...")
    setup_environment()
    start_application()

