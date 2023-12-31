class Nota {
    constructor(valor, porcentaje) {
        this.valor = valor;
        this.porcentaje = porcentaje;
    }


}

class RegistroDeNotas{
    constructor(minima,maxima,aprobacion, cantidad) {
        this.minima = minima;
        this.maxima = maxima;
        this.aprobacion = aprobacion;
        this.notas = [];
    }
    agregarNota(valor, porcentaje) {
        if (valor < this.minima || valor > this.maxima) {
            return false
        }
        this.notas.push(new Nota(valor, porcentaje));
        return true
    }
    calcularTotalPorcentajes(){
        let totalPorcentajes = 0;
        this.notas.forEach(nota =>{
            totalPorcentajes += nota.porcentaje;
        });
        return totalPorcentajes
    }
    calcularNotaPresentacion(){
        let promedioPonderado = 0;
        let totalPorcentajes = this.calcularTotalPorcentajes()

        this.notas.forEach(nota =>{
            promedioPonderado += nota.valor * nota.porcentaje;
        });
        
        return promedioPonderado / totalPorcentajes
    }

    determinarAprobacion(){
        let notaPresentacion = this.calcularNotaPresentacion()
        let totalPorcentajes = this.calcularTotalPorcentajes()
        let porcentajeExamen = 100 - totalPorcentajes

        let notaMaximaPosible = notaPresentacion + (this.maxima * porcentajeExamen / 100)

        if (notaMaximaPosible >= this.aprobacion){
            return true
        }
        else{
            return false
        }
    }
    calcularNotaExamen(){
        let notaPresentacion = this.calcularNotaPresentacion()
        let totalPorcentajes = this.calcularTotalPorcentajes()
        let porcentajeExamen = 100 - totalPorcentajes

        let faltanteParaAprobacion = this.aprobacion - notaPresentacion * (totalPorcentajes / 100)

        return faltanteParaAprobacion * 100 / porcentajeExamen
    }
    determinarPosibilidad(){
        let notaNecesariaExamen = this.calcularNotaExamen()

        if (notaNecesariaExamen <= this.maxima){
            return true
        }
        else return false
    }
}

function solicitarNumero(mensaje, min = null, max = null) {
    let valor;
    do {
        valor = Number(prompt(mensaje));
        if (isNaN(valor) || (min !== null && valor < min) || (max !== null && valor > max)) {
            alert("Entrada inválida. Por favor, intenta de nuevo.");
        }
    } while (isNaN(valor) || (min !== null && valor < min) || (max !== null && valor > max));
    return valor;
}


function main() {
    let minima = solicitarNumero("Ingresa la nota minima:");
    let maxima = solicitarNumero("Ingresa la nota maxima:", minima);
    let aprobacion = solicitarNumero("Ingresa la nota minima para aprobar:", minima, maxima);
    let cantidad = solicitarNumero("Ingresa la cantidad de notas a calcular:", 1);

    let registro = new RegistroDeNotas(minima, maxima, aprobacion);
    let contador = 0;

    while (contador < cantidad) {
        let valor = solicitarNumero("Ingresa el valor de la nota:", minima, maxima);
        let porcentaje = solicitarNumero("Ingresa el porcentaje de esta nota:", 0, 100);

        registro.agregarNota(valor, porcentaje);
        contador++;
    }

    let notaPresentacion = registro.calcularNotaPresentacion();
    let notaNecesariaExamen = registro.calcularNotaExamen();
    let esPosibleAprobar = registro.determinarPosibilidad();
    let puedeAprobarConMaximaEnExamen = registro.determinarAprobacion();

    let mensaje = "Tu nota de presentación es " + notaPresentacion.toFixed(2) + ". ";
    if (puedeAprobarConMaximaEnExamen) {
        mensaje += "Con un " + notaNecesariaExamen.toFixed(2) + " en el examen, puedes aprobar el curso. ¡Sigue así!";
    } else if (esPosibleAprobar) {
        mensaje += "Necesitas un " + notaNecesariaExamen.toFixed(2) + " en el examen para tener la oportunidad de aprobar. ¡Es posible!";
    } else {
        mensaje += "Incluso con un " + notaNecesariaExamen.toFixed(2) + " en el examen, no es posible aprobar. Suerte para la próxima.";
    }
    alert(mensaje);
}

main();
