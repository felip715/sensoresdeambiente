'use strict'
const Database = use('Database');
const FechaService = use('App/Services/FechaService');

class InicioController {
    // cambio para subir a la web de git
    async numeros2({ view }) { // obtengo todos los datos como JSON
        const datos = await Database.table('datos').select('*');
        const datosstring = JSON.parse(JSON.stringify(datos));
        var z = datos.length;

        var fec1 = [];
        var fec2 = [];
        var fec3 = [];
        var fec4 = [];
        var id1 = [];
        // tengo el VALUE de cada fecha posible de elegir
        for (var i = 0; i < z; i++) {
            fec1[i] = datosstring[i].fecha;
            fec2[i] = fec1[i].replace('T', " ");
            fec3[i] = fec2[i].split('.');
            fec4[i] = fec3[i][0];
            datosstring[i].fechaaver = fec4[i];
            id1[i] = datosstring[i].Id;
        };
        const ultimoid = id1[z - 1];
        const data = [];

        return view.render('layout/numeros2', { z, datosstring, fec4, id1, ultimoid });
    };

    async fechafin({ request }) {
        const { fechini } = request.all(); // obtengo la id de la fecha de inicio
        var idfeini = parseInt(fechini); // paso de string a number
        const datos = await Database.table('datos').select('*'); // consulto toda la informacion de base de datos
        const datosstring = JSON.parse(JSON.stringify(datos)); // paso a string 
        var idinicial = datosstring[0].Id;
        var ff = idfeini - idinicial; // Elemento a seleccionar
        var cantdatos = datos.length;
        var z = idinicial + cantdatos;
        var fec1 = [];
        var fec2 = [];
        var fec3 = [];
        var fec4 = [];
        var id1 = [];
        var fechasal = [];
        var idsal = [];
        var dataenviar = new Array;
        var obje = new Object;
        var x = cantdatos - ff;

        for (var i = 0; i < x; i++) {
            fec1[i] = datosstring[ff].fecha;
            fec2[i] = fec1[i].replace('T', " ");
            fec3[i] = fec2[i].split('.');
            fec4[i] = fec3[i][0];
            datosstring[i].fechaaver = fec4[i];
            id1[i] = datosstring[ff].Id;
            ff++;
            datosstring[i].fechasalida = fec4[i];
            datosstring[i].idsalida = id1[i];
            obje = { fechadesalida: fec4[i], iddesalida: id1[i] };
            dataenviar[i] = obje;
        };
        var dat1 = Object.keys(dataenviar).length;
        //sacando lo siguiente obtengo la cantidad
        dataenviar = JSON.stringify(dataenviar);

        return { dataenviar, dat1 };
    };

    async temperatura({ request }) {
        const ids = request.all();
        console.log(ids);
        const temperatura = await Database.table('datos').select('fecha', 'temperatura', 'humedad').where('Id', '>=', ids.idinicial).where('Id', '<=', ids.idfinal);
        var datos = FechaService.fechaamostrar(temperatura);
        return datos;
    };

    async datosactuales() {
        var ultimo = await Database.table('datos').select('fecha', 'temperatura', 'humedad').last();
        var ultimodato = FechaService.ultimafecha(ultimo);
        return ultimodato;
    };
}
module.exports = InicioController