// Método de Bisección
document.getElementById('biseccionForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const data = {
        xi: parseFloat(document.getElementById('biseccion_xi').value),
        xs: parseFloat(document.getElementById('biseccion_xs').value),
        tolerancia: parseFloat(document.getElementById('biseccion_tol').value),
        niter: parseInt(document.getElementById('biseccion_niter').value),
        funcion: document.getElementById('biseccion_funcion').value
    };
    
    try {
        showLoading('biseccionResultados', 'biseccionOutput');
        
        const response = await fetch('/api/biseccion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const resultado = await response.json();
        
        if (response.ok) {
            mostrarResultadoBiseccion(resultado);
        } else {
            mostrarError('biseccionOutput', resultado.detail || 'Error en el cálculo');
        }
    } catch (error) {
        mostrarError('biseccionOutput', 'Error de conexión: ' + error.message);
    }
});

// Método de Punto Fijo
document.getElementById('puntoFijoForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const data = {
        x0: parseFloat(document.getElementById('pf_x0').value),
        tolerancia: parseFloat(document.getElementById('pf_tol').value),
        niter: parseInt(document.getElementById('pf_niter').value),
        funcion_f: document.getElementById('pf_funcion_f').value,
        funcion_g: document.getElementById('pf_funcion_g').value
    };
    
    try {
        showLoading('puntoFijoResultados', 'puntoFijoOutput');
        
        const response = await fetch('/api/punto-fijo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const resultado = await response.json();
        
        if (response.ok) {
            mostrarResultadoPuntoFijo(resultado);
        } else {
            mostrarError('puntoFijoOutput', resultado.detail || 'Error en el cálculo');
        }
    } catch (error) {
        mostrarError('puntoFijoOutput', 'Error de conexión: ' + error.message);
    }
});

// Método de Regla Falsa
document.getElementById('reglaFalsaForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const data = {
        x0: parseFloat(document.getElementById('rf_x0').value),
        x1: parseFloat(document.getElementById('rf_x1').value),
        tolerancia: parseFloat(document.getElementById('rf_tol').value),
        niter: parseInt(document.getElementById('rf_niter').value),
        funcion: document.getElementById('rf_funcion').value
    };
    
    try {
        showLoading('reglaFalsaResultados', 'reglaFalsaOutput');
        
        const response = await fetch('/api/regla-falsa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const resultado = await response.json();
        
        if (response.ok) {
            mostrarResultadoReglaFalsa(resultado);
        } else {
            mostrarError('reglaFalsaOutput', resultado.detail || 'Error en el cálculo');
        }
    } catch (error) {
        mostrarError('reglaFalsaOutput', 'Error de conexión: ' + error.message);
    }
});

// Búsqueda Incremental
document.getElementById('busquedaForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const data = {
        x0: parseFloat(document.getElementById('bi_x0').value),
        delta: parseFloat(document.getElementById('bi_delta').value),
        niter: parseInt(document.getElementById('bi_niter').value),
        funcion: document.getElementById('bi_funcion').value
    };
    
    try {
        showLoading('busquedaResultados', 'busquedaOutput');
        
        const response = await fetch('/api/busqueda-incremental', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const resultado = await response.json();
        
        if (response.ok) {
            mostrarResultadoBusqueda(resultado);
        } else {
            mostrarError('busquedaOutput', resultado.detail || 'Error en el cálculo');
        }
    } catch (error) {
        mostrarError('busquedaOutput', 'Error de conexión: ' + error.message);
    }
});

function mostrarResultadoBiseccion(resultado) {
    const outputDiv = document.getElementById('biseccionOutput');
    
    let html = `
        <div class="alert ${resultado.exito ? 'alert-success' : 'alert-warning'} resultado-aparicion" role="alert">
            <h6><i class="fas fa-info-circle"></i> Resultado:</h6>
            <p><strong>${resultado.mensaje}</strong></p>
            ${resultado.resultado ? `<p>Valor aproximado: <span class="numero-destacado">${resultado.resultado.toFixed(8)}</span></p>` : ''}
            ${resultado.tiempo_ejecucion ? `<p>Tiempo de ejecución: ${resultado.tiempo_ejecucion.toFixed(4)} segundos</p>` : ''}
        </div>
    `;
    
    if (resultado.iteraciones && resultado.iteraciones.length > 0) {
        html += `
            <h6><i class="fas fa-table"></i> Tabla de Iteraciones:</h6>
            <div class="table-responsive resultado-tabla">
                <table class="table table-striped table-sm">
                    <thead class="table-dark">
                        <tr>
                            <th>Iteración</th>
                            <th>Xi</th>
                            <th>Xs</th>
                            <th>Xm</th>
                            <th>f(Xi)</th>
                            <th>f(Xs)</th>
                            <th>f(Xm)</th>
                            <th>Error</th>
                            <th>Observación</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        resultado.iteraciones.forEach(iter => {
            const valores = iter.valores;
            html += `
                <tr>
                    <td>${iter.iteracion}</td>
                    <td>${valores.xi ? valores.xi.toFixed(8) : '-'}</td>
                    <td>${valores.xs ? valores.xs.toFixed(8) : '-'}</td>
                    <td>${valores.xm ? valores.xm.toFixed(8) : '-'}</td>
                    <td>${valores.fi !== undefined ? valores.fi.toExponential(4) : '-'}</td>
                    <td>${valores.fs !== undefined ? valores.fs.toExponential(4) : '-'}</td>
                    <td>${valores.fm !== undefined ? valores.fm.toExponential(4) : '-'}</td>
                    <td>${iter.error ? iter.error.toExponential(4) : '-'}</td>
                    <td>${iter.observacion || '-'}</td>
                </tr>
            `;
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
    }
    
    outputDiv.innerHTML = html;
    document.getElementById('biseccionResultados').style.display = 'block';
}

function mostrarResultadoPuntoFijo(resultado) {
    const outputDiv = document.getElementById('puntoFijoOutput');
    
    let html = `
        <div class="alert ${resultado.exito ? 'alert-success' : 'alert-warning'} resultado-aparicion" role="alert">
            <h6><i class="fas fa-info-circle"></i> Resultado:</h6>
            <p><strong>${resultado.mensaje}</strong></p>
            ${resultado.resultado ? `<p>Valor aproximado: <span class="numero-destacado">${resultado.resultado.toFixed(8)}</span></p>` : ''}
            ${resultado.tiempo_ejecucion ? `<p>Tiempo de ejecución: ${resultado.tiempo_ejecucion.toFixed(4)} segundos</p>` : ''}
        </div>
    `;
    
    if (resultado.iteraciones && resultado.iteraciones.length > 0) {
        html += `
            <h6><i class="fas fa-table"></i> Tabla de Iteraciones:</h6>
            <div class="table-responsive resultado-tabla">
                <table class="table table-striped table-sm">
                    <thead class="table-dark">
                        <tr>
                            <th>Iteración</th>
                            <th>Xi</th>
                            <th>f(Xi)</th>
                            <th>g(Xi-1)</th>
                            <th>Error</th>
                            <th>Observación</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        resultado.iteraciones.forEach(iter => {
            const valores = iter.valores;
            html += `
                <tr>
                    <td>${iter.iteracion}</td>
                    <td>${valores.xi ? valores.xi.toFixed(8) : '-'}</td>
                    <td>${valores.f_xi !== undefined ? valores.f_xi.toExponential(4) : '-'}</td>
                    <td>${valores.g_xi_anterior !== undefined ? valores.g_xi_anterior.toFixed(8) : '-'}</td>
                    <td>${iter.error ? iter.error.toExponential(4) : '-'}</td>
                    <td>${iter.observacion || '-'}</td>
                </tr>
            `;
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
    }
    
    outputDiv.innerHTML = html;
    document.getElementById('puntoFijoResultados').style.display = 'block';
}

function mostrarResultadoReglaFalsa(resultado) {
    const outputDiv = document.getElementById('reglaFalsaOutput');
    
    let html = `
        <div class="alert ${resultado.exito ? 'alert-success' : 'alert-warning'} resultado-aparicion" role="alert">
            <h6><i class="fas fa-info-circle"></i> Resultado:</h6>
            <p><strong>${resultado.mensaje}</strong></p>
            ${resultado.resultado ? `<p>Valor aproximado: <span class="numero-destacado">${resultado.resultado.toFixed(8)}</span></p>` : ''}
            ${resultado.tiempo_ejecucion ? `<p>Tiempo de ejecución: ${resultado.tiempo_ejecucion.toFixed(4)} segundos</p>` : ''}
        </div>
    `;
    
    if (resultado.iteraciones && resultado.iteraciones.length > 0) {
        html += `
            <h6><i class="fas fa-table"></i> Tabla de Iteraciones:</h6>
            <div class="table-responsive resultado-tabla">
                <table class="table table-striped table-sm">
                    <thead class="table-dark">
                        <tr>
                            <th>Iteración</th>
                            <th>X0</th>
                            <th>X1</th>
                            <th>X2</th>
                            <th>f(X0)</th>
                            <th>f(X1)</th>
                            <th>f(X2)</th>
                            <th>Error</th>
                            <th>Observación</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        resultado.iteraciones.forEach(iter => {
            const valores = iter.valores;
            html += `
                <tr>
                    <td>${iter.iteracion}</td>
                    <td>${valores.x0 ? valores.x0.toFixed(8) : '-'}</td>
                    <td>${valores.x1 ? valores.x1.toFixed(8) : '-'}</td>
                    <td>${valores.x2 ? valores.x2.toFixed(8) : '-'}</td>
                    <td>${valores.f0 !== undefined ? valores.f0.toExponential(4) : '-'}</td>
                    <td>${valores.f1 !== undefined ? valores.f1.toExponential(4) : '-'}</td>
                    <td>${valores.f2 !== undefined ? valores.f2.toExponential(4) : '-'}</td>
                    <td>${iter.error ? iter.error.toExponential(4) : '-'}</td>
                    <td><small>${iter.observacion || '-'}</small></td>
                </tr>
            `;
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
    }
    
    outputDiv.innerHTML = html;
    document.getElementById('reglaFalsaResultados').style.display = 'block';
}

function mostrarResultadoBusqueda(resultado) {
    const outputDiv = document.getElementById('busquedaOutput');
    
    let html = `
        <div class="alert ${resultado.exito ? 'alert-success' : 'alert-warning'} resultado-aparicion" role="alert">
            <h6><i class="fas fa-info-circle"></i> Resultado:</h6>
            <p><strong>${resultado.mensaje}</strong></p>
            ${resultado.resultado ? `<p>Aproximación: <span class="numero-destacado">${resultado.resultado.toFixed(8)}</span></p>` : ''}
            ${resultado.tiempo_ejecucion ? `<p>Tiempo de ejecución: ${resultado.tiempo_ejecucion.toFixed(4)} segundos</p>` : ''}
        </div>
    `;
    
    if (resultado.iteraciones && resultado.iteraciones.length > 0) {
        html += `
            <h6><i class="fas fa-table"></i> Tabla de Iteraciones:</h6>
            <div class="table-responsive resultado-tabla">
                <table class="table table-striped table-sm">
                    <thead class="table-dark">
                        <tr>
                            <th>Iteración</th>
                            <th>X0</th>
                            <th>X1</th>
                            <th>f(X0)</th>
                            <th>f(X1)</th>
                            <th>f(X0)*f(X1)</th>
                            <th>Observación</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        resultado.iteraciones.forEach(iter => {
            const valores = iter.valores;
            html += `
                <tr class="${valores.producto < 0 ? 'table-success' : ''}">
                    <td>${iter.iteracion}</td>
                    <td>${valores.x0 ? valores.x0.toFixed(8) : '-'}</td>
                    <td>${valores.x1 ? valores.x1.toFixed(8) : '-'}</td>
                    <td>${valores.f0 !== undefined ? valores.f0.toExponential(4) : '-'}</td>
                    <td>${valores.f1 !== undefined ? valores.f1.toExponential(4) : '-'}</td>
                    <td>${valores.producto !== undefined ? valores.producto.toExponential(4) : '-'}</td>
                    <td><small>${iter.observacion || '-'}</small></td>
                </tr>
            `;
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
    }
    
    outputDiv.innerHTML = html;
    document.getElementById('busquedaResultados').style.display = 'block';
}

function mostrarError(elementId, mensaje) {
    document.getElementById(elementId).innerHTML = `
        <div class="alert alert-danger resultado-aparicion" role="alert">
            <h6><i class="fas fa-exclamation-triangle"></i> Error:</h6>
            <p>${mensaje}</p>
        </div>
    `;
}

function showLoading(resultadosId, outputId) {
    document.getElementById(resultadosId).style.display = 'block';
    document.getElementById(outputId).innerHTML = `
        <div class="text-center">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Calculando...</span>
            </div>
            <p class="mt-2">Calculando...</p>
        </div>
    `;
}
