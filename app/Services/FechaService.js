class FechaService {
    fechaamostrar(objeto) {
        const objetostring = JSON.parse(JSON.stringify(objeto)); // paso a string 
        const z = objeto.length; // Obtiene el tamaño del objeto

        var fec1 = [];
        var fec2 = [];
        var fec3 = [];
        var fec4 = [];

        for (var i = 0; i < z; i++) {
            fec1[i] = objetostring[i].fecha;
            fec2[i] = fec1[i].replace('T', " ");
            fec3[i] = fec2[i].split('.');
            fec4[i] = fec3[i][0];
            objetostring[i].fecha = fec4[i];
        };
        return objetostring;
    };

    ultimafecha(objeto) {
        const objetostring = JSON.parse(JSON.stringify(objeto));

        var fec1 = [];
        var fec2 = [];
        var fec3 = [];
        var fec4 = [];

        fec1 = objetostring.fecha;
        fec2 = fec1.replace('T', " ");
        fec3 = fec2.split('.');
        fec4 = fec3[0];
        objetostring.fecha = fec4;
        console.log("objetostring en service con ultimafecha: " + objetostring.fecha);
        return objetostring;
    };
}

module.exports = new FechaService();