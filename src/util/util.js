export function calcularEdad(fechaNacimiento) {

    const fechaNac = new Date(fechaNacimiento);
    

    const fechaActual = new Date();


    let edad = fechaActual.getFullYear() - fechaNac.getFullYear();

    const mes = fechaActual.getMonth() - fechaNac.getMonth();
    if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNac.getDate())) {
        edad--;
    }

    return edad;
}