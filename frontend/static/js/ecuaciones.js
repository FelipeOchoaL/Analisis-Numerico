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
        
        const response = await fetch(window.location.origin + '/api/biseccion', {
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
        
        const response = await fetch(window.location.origin + '/api/punto-fijo', {
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
        
        const response = await fetch(window.location.origin + '/api/regla-falsa', {
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
        
        const response = await fetch(window.location.origin + '/api/busqueda-incremental', {
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

// Método de Newton-Raphson
document.getElementById('newtonRaphsonForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const data = {
        x0: parseFloat(document.getElementById('nr_x0').value),
        tolerancia: parseFloat(document.getElementById('nr_tol').value),
        niter: parseInt(document.getElementById('nr_niter').value),
        funcion_f: document.getElementById('nr_funcion_f').value,
        funcion_df: document.getElementById('nr_funcion_df').value,
        incluir_error: document.getElementById('nr_incluir_error').checked,
        tipo_precision: document.getElementById('nr_tipo_precision').value,
        precision: parseInt(document.getElementById('nr_precision').value)
    };
    
    try {
        showLoading('newtonRaphsonResultados', 'newtonRaphsonOutput');
        
        const response = await fetch(window.location.origin + '/api/newton-raphson', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const resultado = await response.json();
        
        if (response.ok) {
            mostrarResultadoNewtonRaphson(resultado);
        } else {
            mostrarError('newtonRaphsonOutput', resultado.detail || 'Error en el cálculo');
        }
    } catch (error) {
        mostrarError('newtonRaphsonOutput', 'Error de conexión: ' + error.message);
    }
});

// Método de la Secante
document.getElementById('secanteForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const data = {
        x0: parseFloat(document.getElementById('sec_x0').value),
        x1: parseFloat(document.getElementById('sec_x1').value),
        tolerancia: parseFloat(document.getElementById('sec_tol').value),
        niter: parseInt(document.getElementById('sec_niter').value),
        funcion: document.getElementById('sec_funcion').value,
        incluir_error: document.getElementById('sec_incluir_error').checked,
        tipo_precision: document.getElementById('sec_tipo_precision').value,
        precision: parseInt(document.getElementById('sec_precision').value)
    };
    
    try {
        showLoading('secanteResultados', 'secanteOutput');
        
        const response = await fetch(window.location.origin + '/api/secante', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const resultado = await response.json();
        
        if (response.ok) {
            mostrarResultadoSecante(resultado);
        } else {
            mostrarError('secanteOutput', resultado.detail || 'Error en el cálculo');
        }
    } catch (error) {
        mostrarError('secanteOutput', 'Error de conexión: ' + error.message);
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

function mostrarResultadoNewtonRaphson(resultado) {
    const outputDiv = document.getElementById('newtonRaphsonOutput');
    
    let html = `
        <div class="alert ${resultado.exito ? 'alert-success' : 'alert-warning'} resultado-aparicion" role="alert">
            <h6><i class="fas fa-info-circle"></i> Resultado:</h6>
            <p><strong>${resultado.mensaje}</strong></p>
            ${resultado.resultado ? `<p>Raíz aproximada: <span class="numero-destacado">${resultado.resultado.toFixed(10)}</span></p>` : ''}
            ${resultado.tiempo_ejecucion ? `<p>Tiempo de ejecución: ${resultado.tiempo_ejecucion.toFixed(4)} segundos</p>` : ''}
        </div>
    `;
    
    if (resultado.iteraciones && resultado.iteraciones.length > 0) {
        // Verificar si incluir error basado en la primera iteración
        const incluirError = resultado.iteraciones[0].valores.hasOwnProperty('error');
        
        html += `
            <h6><i class="fas fa-table"></i> Tabla de Iteraciones - Método de Newton-Raphson:</h6>
            <div class="alert alert-info" role="alert">
                <small><strong>Procedimiento:</strong> PASO 1: f(xi), f'(xi) → PASO 2: xi+1 = xi - f(xi)/f'(xi) → PASO 3: Error = |xi+1 - xi| / |xi+1|</small>
            </div>
            <div class="table-responsive resultado-tabla">
                <table class="table table-striped table-sm">
                    <thead class="table-dark">
                        <tr>
                            <th>i</th>
                            <th>xi</th>
                            <th>f(xi)</th>
                            <th>f'(xi)</th>
                            ${incluirError ? '<th>E</th>' : ''}
                            <th>Observación</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        resultado.iteraciones.forEach(iter => {
            const valores = iter.valores;
            const isConvergencia = iter.observacion && iter.observacion.includes('Convergencia');
            
            html += `
                <tr ${isConvergencia ? 'class="table-success"' : ''}>
                    <td><strong>${valores.i}</strong></td>
                    <td>${valores.xi ? valores.xi.toFixed(10) : '-'}</td>
                    <td>${valores.fxi !== undefined ? valores.fxi.toExponential(4) : '-'}</td>
                    <td>${valores.dfxi !== undefined ? valores.dfxi.toFixed(6) : '-'}</td>
                    ${incluirError ? `<td>${valores.error !== undefined && valores.error !== null ? (typeof valores.error === 'number' ? valores.error.toExponential(4) : 'N/A') : 'N/A'}</td>` : ''}
                    <td><small>${iter.observacion || 'Newton-Raphson'}</small></td>
                </tr>
            `;
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
        
        // Agregar información adicional
        if (resultado.exito && resultado.resultado) {
            const ultimaIteracion = resultado.iteraciones[resultado.iteraciones.length - 1];
            html += `
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h6 class="card-title"><i class="fas fa-bullseye"></i> Convergencia</h6>
                                <p class="card-text">
                                    <strong>Iteraciones:</strong> ${resultado.iteraciones.length}<br>
                                    <strong>Valor final:</strong> ${resultado.resultado.toFixed(10)}<br>
                                    <strong>f(raíz):</strong> ${ultimaIteracion.valores.fxi ? ultimaIteracion.valores.fxi.toExponential(6) : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h6 class="card-title"><i class="fas fa-chart-line"></i> Método</h6>
                                <p class="card-text">
                                    <strong>Fórmula:</strong> x<sub>i+1</sub> = x<sub>i</sub> - f(x<sub>i</sub>)/f'(x<sub>i</sub>)<br>
                                    <strong>Convergencia:</strong> ${ultimaIteracion.observacion || 'Alcanzada'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    
    outputDiv.innerHTML = html;
    document.getElementById('newtonRaphsonResultados').style.display = 'block';
}

function mostrarResultadoSecante(resultado) {
    const outputDiv = document.getElementById('secanteOutput');
    
    let html = `
        <div class="alert ${resultado.exito ? 'alert-success' : 'alert-warning'} resultado-aparicion" role="alert">
            <h6><i class="fas fa-info-circle"></i> Resultado:</h6>
            <p><strong>${resultado.mensaje}</strong></p>
            ${resultado.resultado ? `<p>Raíz aproximada: <span class="numero-destacado">${resultado.resultado.toFixed(10)}</span></p>` : ''}
            ${resultado.tiempo_ejecucion ? `<p>Tiempo de ejecución: ${resultado.tiempo_ejecucion.toFixed(4)} segundos</p>` : ''}
        </div>
    `;
    
    if (resultado.iteraciones && resultado.iteraciones.length > 0) {
        // Verificar si incluir error basado en la primera iteración
        const incluirError = resultado.iteraciones[0].valores.hasOwnProperty('error');
        
        html += `
            <h6><i class="fas fa-table"></i> Tabla de Iteraciones - Método de la Secante:</h6>
            <div class="alert alert-info" role="alert">
                <small><strong>Procedimiento:</strong> PASO 1: f(x_{i-1}), f(x_i) → PASO 2: x_{i+1} = x_i - f(x_i) * (x_i - x_{i-1}) / (f(x_i) - f(x_{i-1})) → PASO 3: Error = |x_{i+1} - x_i| / |x_{i+1}|</small>
            </div>
            <div class="table-responsive resultado-tabla">
                <table class="table table-striped table-sm">
                    <thead class="table-dark">
                        <tr>
                            <th>i</th>
                            <th>x<sub>i-1</sub></th>
                            <th>x<sub>i</sub></th>
                            <th>f(x<sub>i-1</sub>)</th>
                            <th>f(x<sub>i</sub>)</th>
                            ${incluirError ? '<th>E</th>' : ''}
                            <th>Observación</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        resultado.iteraciones.forEach(iter => {
            const valores = iter.valores;
            const isConvergencia = iter.observacion && iter.observacion.includes('Convergencia');
            
            html += `
                <tr ${isConvergencia ? 'class="table-success"' : ''}>
                    <td><strong>${valores.i}</strong></td>
                    <td>${valores.xi_anterior ? valores.xi_anterior.toFixed(10) : '-'}</td>
                    <td>${valores.xi ? valores.xi.toFixed(10) : '-'}</td>
                    <td>${valores.fxi_anterior !== undefined ? valores.fxi_anterior.toExponential(4) : '-'}</td>
                    <td>${valores.fxi !== undefined ? valores.fxi.toExponential(4) : '-'}</td>
                    ${incluirError ? `<td>${valores.error !== undefined && valores.error !== null ? (typeof valores.error === 'number' ? valores.error.toExponential(4) : 'N/A') : 'N/A'}</td>` : ''}
                    <td><small>${iter.observacion || 'Secante'}</small></td>
                </tr>
            `;
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
        
        // Agregar información adicional
        if (resultado.exito && resultado.resultado) {
            const ultimaIteracion = resultado.iteraciones[resultado.iteraciones.length - 1];
            html += `
                <div class="row mt-3">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h6 class="card-title"><i class="fas fa-bullseye"></i> Convergencia</h6>
                                <p class="card-text">
                                    <strong>Iteraciones:</strong> ${resultado.iteraciones.length}<br>
                                    <strong>Valor final:</strong> ${resultado.resultado.toFixed(10)}<br>
                                    <strong>f(raíz):</strong> ${ultimaIteracion.valores.fxi ? ultimaIteracion.valores.fxi.toExponential(6) : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-body">
                                <h6 class="card-title"><i class="fas fa-chart-line"></i> Método</h6>
                                <p class="card-text">
                                    <strong>Fórmula:</strong> x<sub>i+1</sub> = x<sub>i</sub> - f(x<sub>i</sub>) * (x<sub>i</sub> - x<sub>i-1</sub>) / (f(x<sub>i</sub>) - f(x<sub>i-1</sub>))<br>
                                    <strong>Convergencia:</strong> ${ultimaIteracion.observacion || 'Alcanzada'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }
    
    outputDiv.innerHTML = html;
    document.getElementById('secanteResultados').style.display = 'block';
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
