import math
import numpy as np
from typing import Dict, List, Any
from models.schemas import IteracionData, MetodoResponse

class EcuacionesService:
    
    def _evaluar_funcion(self, funcion: str, x: float) -> float:
        """Evalúa una función string de manera segura"""
        try:
            # Preparar el namespace para eval
            namespace = {
                'x': x,
                'sin': math.sin,
                'cos': math.cos,
                'tan': math.tan,
                'exp': math.exp,
                'log10': math.log10,
                'ln': math.log,
                'sqrt': math.sqrt,
                'pi': math.pi,
                'e': math.e,
                'abs': abs,
                'pow': pow,
                'math': math,
                'np': np
            }
            
            # Reemplazar ^ por **
            funcion = funcion.replace('^', '**')
            
            return eval(funcion, {"__builtins__": {}}, namespace)
        except Exception as e:
            raise ValueError(f"Error evaluando función '{funcion}' en x={x}: {str(e)}")
    
    def biseccion(self, xi: float, xs: float, tolerancia: float, niter: int, funcion: str) -> Dict[str, Any]:
        """Implementa el método de bisección basado en el código original"""
        iteraciones = []
        
        # Evaluación inicial
        fi = self._evaluar_funcion(funcion, xi)
        fs = self._evaluar_funcion(funcion, xs)
        
        # Verificaciones iniciales - siguiendo la lógica original
        if fi == 0:
            return MetodoResponse(
                exito=True,
                resultado=xi,
                iteraciones=[IteracionData(
                    iteracion=0,
                    valores={"xi": xi, "xs": xs, "xm": xi, "fi": fi, "fs": fs},
                    observacion=f"{xi} es raíz de f(x)"
                )],
                mensaje=f"{xi} es raíz de f(x)"
            ).dict()
            
        if fs == 0:
            return MetodoResponse(
                exito=True,
                resultado=xs,
                iteraciones=[IteracionData(
                    iteracion=0,
                    valores={"xi": xi, "xs": xs, "xm": xs, "fi": fi, "fs": fs},
                    observacion=f"{xs} es raíz de f(x)"
                )],
                mensaje=f"{xs} es raíz de f(x)"
            ).dict()
            
        if fs * fi >= 0:
            return MetodoResponse(
                exito=False,
                resultado=None,
                iteraciones=[],
                mensaje="El intervalo es inadecuado"
            ).dict()
        
        # Algoritmo de bisección - siguiendo la estructura original
        c = 0
        fm = []
        E = [100]  # Error inicial
        
        # Primera iteración
        xm = (xi + xs) / 2
        fe = self._evaluar_funcion(funcion, xm)
        fm.append(fe)
        
        iteraciones.append(IteracionData(
            iteracion=c + 1,
            valores={
                "xi": xi,
                "xs": xs,
                "xm": xm,
                "fi": fi,
                "fs": fs,
                "fm": fe
            },
            error=E[c],
            observacion="Primera iteración"
        ))
        
        while E[c] > tolerancia and fe != 0 and c < niter:
            if fi * fe < 0:
                xs = xm
                fs = self._evaluar_funcion(funcion, xs)
            else:
                xi = xm
                fi = self._evaluar_funcion(funcion, xi)
            
            xa = xm
            xm = (xi + xs) / 2
            fe = self._evaluar_funcion(funcion, xm)
            fm.append(fe)
            error = abs(xm - xa)
            E.append(error)
            c = c + 1
            
            iteraciones.append(IteracionData(
                iteracion=c + 1,
                valores={
                    "xi": xi,
                    "xs": xs,
                    "xm": xm,
                    "fi": fi,
                    "fs": fs,
                    "fm": fe
                },
                error=error,
                observacion="Bisección"
            ))
        
        # Determinar resultado final
        if fe == 0:
            mensaje = f"{xm} es raíz de f(x)"
            exito = True
        elif E[c] < tolerancia:
            mensaje = f"{xm} es una aproximación de una raíz de f(x) con tolerancia {tolerancia}"
            exito = True
        else:
            mensaje = f"Fracaso en {niter} iteraciones"
            exito = False
            
        return MetodoResponse(
            exito=exito,
            resultado=xm,
            iteraciones=iteraciones,
            mensaje=mensaje
        ).dict()
    
    def punto_fijo(self, x0: float, tolerancia: float, niter: int, 
                   funcion_f: str, funcion_g: str) -> Dict[str, Any]:
        """Implementa el método de punto fijo basado en el código original"""
        iteraciones = []
        
        x_actual = x0
        error = float('inf')
        i = 0
        
        # Primera evaluación
        f_actual = self._evaluar_funcion(funcion_f, x_actual)
        
        iteraciones.append(IteracionData(
            iteracion=i,
            valores={
                "xi": x_actual,
                "f_xi": f_actual
            },
            error=None,
            observacion="Valor inicial"
        ))
        
        # Algoritmo de punto fijo
        while error > tolerancia and abs(f_actual) > tolerancia and i < niter:
            x_anterior = x_actual
            x_actual = self._evaluar_funcion(funcion_g, x_anterior)
            f_actual = self._evaluar_funcion(funcion_f, x_actual)
            i += 1
            
            error = abs(x_actual - x_anterior)
            
            iteraciones.append(IteracionData(
                iteracion=i,
                valores={
                    "xi": x_actual,
                    "f_xi": f_actual,
                    "g_xi_anterior": self._evaluar_funcion(funcion_g, x_anterior)
                },
                error=error,
                observacion="Iteración punto fijo"
            ))
        
        if abs(f_actual) <= tolerancia:
            mensaje = f"Raíz encontrada: x = {x_actual:.6f}"
            exito = True
        elif error <= tolerancia:
            mensaje = f"Punto fijo encontrado: x = {x_actual:.6f}"
            exito = True
        else:
            mensaje = f"Método falló después de {niter} iteraciones"
            exito = False
            
        return MetodoResponse(
            exito=exito,
            resultado=x_actual,
            iteraciones=iteraciones,
            mensaje=mensaje
        ).dict()
    
    def regla_falsa(self, x0: float, x1: float, tolerancia: float, 
                    niter: int, funcion: str) -> Dict[str, Any]:
        """Implementa el método de regla falsa basado en el código original"""
        iteraciones = []
        
        # Evaluación inicial
        f0 = self._evaluar_funcion(funcion, x0)
        f1 = self._evaluar_funcion(funcion, x1)
        
        print(f"Evaluación inicial:")
        print(f"f({x0}) = {f0}")
        print(f"f({x1}) = {f1}")
        print(f"f(X0) * f(X1) = {f0 * f1}")
        
        # Verificaciones iniciales según el algoritmo original
        if f0 == 0:
            return MetodoResponse(
                exito=True,
                resultado=x0,
                iteraciones=[IteracionData(
                    iteracion=0,
                    valores={"x0": x0, "x1": x1, "x2": x0, "f0": f0, "f1": f1, "f2": f0},
                    error=0,
                    observacion="Raíz exacta en X0"
                )],
                mensaje=f"{x0} es raíz exacta de f(x)"
            ).dict()
            
        if f1 == 0:
            return MetodoResponse(
                exito=True,
                resultado=x1,
                iteraciones=[IteracionData(
                    iteracion=0,
                    valores={"x0": x0, "x1": x1, "x2": x1, "f0": f0, "f1": f1, "f2": f1},
                    error=0,
                    observacion="Raíz exacta en X1"
                )],
                mensaje=f"{x1} es raíz exacta de f(x)"
            ).dict()
            
        if f0 * f1 >= 0:
            return MetodoResponse(
                exito=False,
                resultado=None,
                iteraciones=[IteracionData(
                    iteracion=0,
                    valores={"x0": x0, "x1": x1, "f0": f0, "f1": f1},
                    observacion="Intervalo inadecuado"
                )],
                mensaje="Error: No hay cambio de signo en el intervalo"
            ).dict()
        
        # Variables para el método
        x0_actual = x0
        x1_actual = x1
        f0_actual = f0
        f1_actual = f1
        error = float('inf')
        c = 0
        
        while error > tolerancia and c < niter:
            # Calcular X2 usando la fórmula de interpolación lineal
            if abs(f1_actual - f0_actual) < 1e-12:
                break
                
            x2 = x0_actual - f0_actual * (x1_actual - x0_actual) / (f1_actual - f0_actual)
            f2 = self._evaluar_funcion(funcion, x2)
            
            # Calcular error
            if c > 0:
                error = abs(x2 - x2_anterior)
            else:
                error = abs(x2 - x0_actual)
            
            # Determinar observación
            observacion = ""
            if f2 == 0:
                observacion = "Raíz exacta encontrada"
            elif f0_actual * f2 < 0:
                observacion = "Raíz en [X0, X2] → X1 = X2"
            elif f2 * f1_actual < 0:
                observacion = "Raíz en [X2, X1] → X0 = X2"
            
            iteraciones.append(IteracionData(
                iteracion=c + 1,
                valores={
                    "x0": x0_actual,
                    "x1": x1_actual,
                    "x2": x2,
                    "f0": f0_actual,
                    "f1": f1_actual,
                    "f2": f2
                },
                error=error,
                observacion=observacion
            ))
            
            if f2 == 0:
                return MetodoResponse(
                    exito=True,
                    resultado=x2,
                    iteraciones=iteraciones,
                    mensaje=f"¡Raíz exacta encontrada! X2 = {x2}"
                ).dict()
                
            # Actualizar intervalo
            if f0_actual * f2 < 0:
                x1_actual = x2
                f1_actual = f2
            elif f2 * f1_actual < 0:
                x0_actual = x2
                f0_actual = f2
            else:
                break
                
            x2_anterior = x2
            c += 1
        
        if c >= niter:
            mensaje = f"Método terminó por límite de iteraciones ({niter})"
            exito = False
        elif error <= tolerancia:
            mensaje = f"Convergencia alcanzada! Raíz aproximada: X = {x2}"
            exito = True
        else:
            mensaje = "Error: Pérdida de cambio de signo"
            exito = False
            
        return MetodoResponse(
            exito=exito,
            resultado=x2 if 'x2' in locals() else None,
            iteraciones=iteraciones,
            mensaje=mensaje
        ).dict()
    
    def busqueda_incremental(self, x0: float, delta: float, niter: int, 
                           funcion: str) -> Dict[str, Any]:
        """Implementa la búsqueda incremental basada en el código original"""
        iteraciones = []
        
        x = x0
        f0 = self._evaluar_funcion(funcion, x)
        
        if f0 == 0:
            return MetodoResponse(
                exito=True,
                resultado=x0,
                iteraciones=[IteracionData(
                    iteracion=0,
                    valores={"x0": x0, "f0": f0},
                    observacion="Raíz exacta encontrada"
                )],
                mensaje=f"{x0} es raíz de f(x)"
            ).dict()
        
        x1 = x0 + delta
        c = 1
        f1 = self._evaluar_funcion(funcion, x1)
        
        # Registrar la primera iteración
        iteraciones.append(IteracionData(
            iteracion=c,
            valores={
                "x0": x0,
                "x1": x1,
                "f0": f0,
                "f1": f1,
                "producto": f0 * f1
            },
            observacion="Mismo signo" if f0 * f1 > 0 else "Cambio de signo"
        ))
        
        while f0 * f1 > 0 and c < niter:
            x0 = x1
            f0 = f1
            x1 = x0 + delta
            f1 = self._evaluar_funcion(funcion, x1)
            c = c + 1
            
            iteraciones.append(IteracionData(
                iteracion=c,
                valores={
                    "x0": x0,
                    "x1": x1,
                    "f0": f0,
                    "f1": f1,
                    "producto": f0 * f1
                },
                observacion="Mismo signo" if f0 * f1 > 0 else "Cambio de signo"
            ))
        
        if f1 == 0:
            mensaje = f"{x1} es raíz de f(x)"
            exito = True
            resultado = x1
        elif f0 * f1 < 0:
            mensaje = f"Existe una raíz de f(x) entre {x0} y {x1}"
            exito = True
            resultado = (x0 + x1) / 2  # Punto medio como aproximación
        else:
            mensaje = f"Fracaso en {niter} iteraciones"
            exito = False
            resultado = None
            
        return MetodoResponse(
            exito=exito,
            resultado=resultado,
            iteraciones=iteraciones,
            mensaje=mensaje
        ).dict()
