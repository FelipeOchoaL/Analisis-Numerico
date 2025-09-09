from pydantic import BaseModel, Field
from typing import List, Optional, Union

# Modelos para Ecuaciones No Lineales
class BiseccionRequest(BaseModel):
    xi: float = Field(..., description="Extremo izquierdo del intervalo")
    xs: float = Field(..., description="Extremo derecho del intervalo")
    tolerancia: float = Field(..., gt=0, description="Tolerancia del método")
    niter: int = Field(..., gt=0, description="Número máximo de iteraciones")
    funcion: str = Field(..., description="Función f(x) como string")

class PuntoFijoRequest(BaseModel):
    x0: float = Field(..., description="Valor inicial")
    tolerancia: float = Field(..., gt=0, description="Tolerancia del método")
    niter: int = Field(..., gt=0, description="Número máximo de iteraciones")
    funcion_f: str = Field(..., description="Función f(x) original")
    funcion_g: str = Field(..., description="Función de iteración g(x)")

class ReglaFalsaRequest(BaseModel):
    x0: float = Field(..., description="Extremo izquierdo del intervalo")
    x1: float = Field(..., description="Extremo derecho del intervalo")
    tolerancia: float = Field(..., gt=0, description="Tolerancia del método")
    niter: int = Field(..., gt=0, description="Número máximo de iteraciones")
    funcion: str = Field(..., description="Función f(x) como string")

class BusquedaIncrementalRequest(BaseModel):
    x0: float = Field(..., description="Valor inicial")
    delta: float = Field(..., gt=0, description="Incremento")
    niter: int = Field(..., gt=0, description="Número máximo de iteraciones")
    funcion: str = Field(..., description="Función f(x) como string")

# Modelos para Errores
class ErrorAbsolutoRequest(BaseModel):
    x_aproximado: float = Field(..., description="Valor aproximado")
    x_exacto: float = Field(..., description="Valor exacto")

class ErrorRelativoRequest(BaseModel):
    x_aproximado: float = Field(..., description="Valor aproximado")
    x_exacto: float = Field(..., description="Valor exacto")

class PropagacionErrorRequest(BaseModel):
    x: float = Field(..., description="Valor de X")
    ex: float = Field(..., description="Error en X")
    y: float = Field(..., description="Valor de Y")
    ey: float = Field(..., description="Error en Y")
    operacion: str = Field(..., description="Tipo de operación: suma, resta, producto, division")

# Modelos para Series de Taylor
class TaylorCosRequest(BaseModel):
    theta: float = Field(..., description="Ángulo en radianes")
    tolerancia: float = Field(default=1e-8, gt=0, description="Tolerancia para detener la suma")
    niter: int = Field(default=1000, gt=0, description="Número máximo de términos")
    error_relativo: bool = Field(default=False, description="Usar error relativo en lugar de absoluto")

class TaylorSenRequest(BaseModel):
    theta: float = Field(..., description="Ángulo en radianes")
    tolerancia: float = Field(default=1e-8, gt=0, description="Tolerancia para detener la suma")
    niter: int = Field(default=1000, gt=0, description="Número máximo de términos")
    error_relativo: bool = Field(default=False, description="Usar error relativo en lugar de absoluto")

# Modelos de Respuesta
class IteracionData(BaseModel):
    iteracion: int
    valores: dict
    error: Optional[float] = None
    observacion: Optional[str] = None

class MetodoResponse(BaseModel):
    exito: bool
    resultado: Optional[float] = None
    iteraciones: List[IteracionData]
    mensaje: str
    tiempo_ejecucion: Optional[float] = None

class ErrorResponse(BaseModel):
    error_absoluto: Optional[float] = None
    error_relativo: Optional[float] = None
    error_porcentual: Optional[float] = None

class TaylorResponse(BaseModel):
    aproximacion: float
    valor_exacto: float
    sumas_parciales: List[float]
    errores: List[float]
    terminos_utilizados: int
    convergencia: bool
