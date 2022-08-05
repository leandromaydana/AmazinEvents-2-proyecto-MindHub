let divGeneralStats = document.getElementById("generalStats");
let divUpcomingStats = document.getElementById("upcomingStats");
let divPastStats = document.getElementById("pastStats");
let eventos = [];
let eventosPasadosArray = [];
let eventosFuturosArray = [];
let fechaActual = "";
var data = localStorage.getItem('data')
data = JSON.parse(data)

    eventos = data.events;
    fechaActual = data.currentDate;

    eventosPasadosArray = eventosPasados(eventos);
    eventosFuturosArray = eventosFuturos(eventos);

    let eventoConMayorAudiencia = audienciasCapacidad(eventosPasadosArray)[0];   

    let eventoConMenorAudiencia = audienciasCapacidad(eventosPasadosArray)[1];    

    let eventoConMayorCapacidad = audienciasCapacidad(eventos)[2];                 

    let categoriasFuturas = [];
    categoriasFuturas = filterCategories(eventosFuturosArray);
    
    let categoriasPasadas = [];
    categoriasPasadas = filterCategories(eventosPasadosArray);
    
    let upcomingStats = calculateStats(categoriasFuturas, eventosFuturosArray);

    let pastStats = calculateStats(categoriasPasadas, eventosPasadosArray);

    function audienciasCapacidad(array) {
        let mayorAudiencia = 0;
        let menorAudiencia = 100000000;
        let mayorCapacidad = 0;
        let audienciaEvento = 0;
        let eventoRetornar = [mayorAudiencia, menorAudiencia, mayorCapacidad];
        for (elemento of array) {
            audienciaEvento = Number(elemento.assistance) / Number(elemento.capacity)
            if (audienciaEvento > mayorAudiencia) {
                mayorAudiencia = audienciaEvento;
                eventoRetornar[0] = elemento.name;
            } else if (audienciaEvento < menorAudiencia) {
                menorAudiencia = audienciaEvento;
                eventoRetornar[1] = elemento.name;
            }
            if (Number(elemento.capacity) > mayorCapacidad) {
                mayorCapacidad = Number(elemento.capacity);
                eventoRetornar[2] = elemento.name;
            }
        }
        return eventoRetornar;  
    }

    function filterCategories(array) {
        let categoriasFiltradas = array.map(elemento => elemento.category);
        return [...new Set(categoriasFiltradas)];
    }

    function calculateStats(arrayCategorias, arrayEventos) {
        let categoriesStats = [];
        let revenueCategoria = 0;
        let attendanceCategoria = 0;
        let elementosEnCategoria = 0;  

        for (categoria of arrayCategorias) {
            revenueCategoria = 0;           
            attendanceCategoria = 0;
            elementosEnCategoria = 0;
            for (elemento of arrayEventos) {
                if (elemento.category == categoria) {
                    if (elemento.date > fechaActual) {
                        revenueCategoria += Number(elemento.price) * Number(elemento.estimate);
                        attendanceCategoria += Number(elemento.estimate) / Number(elemento.capacity) * 100;
                        elementosEnCategoria++;
                    } else {
                        revenueCategoria += Number(elemento.price) * Number(elemento.assistance);
                        attendanceCategoria += Number(elemento.assistance) / Number(elemento.capacity) * 100;
                        elementosEnCategoria++;
                    }
                }
            }
            categoriesStats.push(         
                {
                    category: categoria,
                    revenue: revenueCategoria / elementosEnCategoria,
                    attendance: attendanceCategoria / elementosEnCategoria
                }
            )
        }
        return categoriesStats;  
    }
    function eventosFuturos(array) {
        let arrayFuturo = [];
        for (elemento of array) {
            if (elemento.date > fechaActual) {
                arrayFuturo.push(elemento);
            }
        }
        return arrayFuturo;
    }
    function eventosPasados(array) {
        let arrayPasado = [];
        for (elemento of array) {
            if (elemento.date < fechaActual) {
                arrayPasado.push(elemento);
            }
        }
        return arrayPasado;
    }

    imprimirTablaGeneral()
    function imprimirTablaGeneral() {
        let fila = document.createElement('tr')
        fila.innerHTML = `    
                <td class="text-center">${eventoConMayorAudiencia} </td>
                <td class="text-center">${eventoConMenorAudiencia} </td>
                <td class="text-center">${eventoConMayorCapacidad} </td>
                `
        divGeneralStats.appendChild(fila);
    }

    imprimirTabla2y3(upcomingStats, pastStats)
    function imprimirTabla2y3(arrayFuturo, arrayPasado) {     
        for (elemento of arrayFuturo) {
            divUpcomingStats.appendChild(crearFila(elemento));
        }
        for (elemento of arrayPasado) {
            divPastStats.appendChild(crearFila(elemento));
        }
    }
    function crearFila(elemento){
        let fila = document.createElement('tr')
        fila.innerHTML = `    
                <td>${elemento.category} </td>
                <td class="text-center">$${elemento.revenue.toFixed(2)} </td>
                <td class="text-center">%${elemento.attendance.toFixed(2)} </td>
                `
        return fila;
    }
