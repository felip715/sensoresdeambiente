$(document).ready(function() {

    //const z = $("#fecha_final").val();
    const idfeini = $("select option:selected").val();
    console.log("El val() del elemento seleccionado al principio es: " + $("select option:selected").val());

    // PODRIA HACER UNA SECCION CON @ PARA LA FECHA FINAL Y CREAR UN CONTROLADOR QUE LE PASE LAS 
    // FECHAS SEGUN LA SELECCIONADA EN EL INICIO

    $("#fecha_inicio").click(function() { // PROBAR CON UN USUARIO AUTENTICADO
        const idfeini = $("select option:selected").val();
        if (idfeini != 'muestra') {
            $.post("fechafin", {
                    fechini: idfeini
                },
                function(datosrecibidos, status) {
                    //recibo dos variables dentro del objeto
                    $("[name='fefin']").remove();
                    var datastring = JSON.parse(datosrecibidos.dataenviar);
                    y = datosrecibidos.dat1;
                    var fechasfin = [];
                    var idfin = [];
                    for (var i = 0; i < y; i++) {
                        //hasta aca llega
                        fechasfin[i] = datastring[i].fechadesalida;
                        idfin[i] = datastring[i].iddesalida;
                        $("#fecha_final").append("<option class=dropdown-item name=fefin value=" + idfin[i] + " >" + fechasfin[i] + "</option>");
                    };
                    return datosrecibidos;
                });
        };
    });

    $("#fecha_final").click(function() {
        // PROBAR CON UN USUARIO AUTENTICADO
        var idini = document.getElementById("fecha_inicio").value;
        var idfin = document.getElementById("fecha_final").value;
        if (idfin != 'nulo') {
            console.log("id fecha inicio: " + idini + " id fecha final: " + idfin);
            // HICE QUE VAYA HASTA EL FINAL

            $.post("ids", {
                    idinicial: idini,
                    idfinal: idfin
                },
                function(datosrecibidos, status) {
                    console.log('status: ' + status);
                    //console.log("datosrecibidos: " + datosrecibidos);
                    const datrecstring = JSON.stringify(datosrecibidos); // paso a string 
                    //console.log("datrecstring: " + datrecstring);
                    morris1.setData(datosrecibidos);
                });
        }
    });
});

(function() {
    $.get("datosactuales", function(datosrecibidos, status) {
        const datrecstring = JSON.parse(JSON.stringify(datosrecibidos)); // paso a string 
        $("#idtemp").html("Temperatura: " + datrecstring.temperatura + " °C");
        $("#idhume").html("Humedad: " + datrecstring.humedad + " %");
    });

})();

var morris1 = new Morris.Line({
    // ID of the element in which to draw the chart.
    element: 'grafica',
    // Chart data records -- each entry in this array corresponds to a point on
    // the chart.
    data: [
        /*{ year: '2008', value: 20 },
        { year: '2009', value: 10 },
        { year: '2010', value: 5 },
        { year: '2011', value: 5 },
        { year: '2012', value: 20 }*/

    ],
    // The name of the data record attribute that contains x-values.
    xkey: 'fecha',
    // A list of names of data record attributes that contain y-values.
    ykeys: ['temperatura', 'humedad'],
    // Labels for the ykeys -- will be displayed when you hover over the
    // chart.
    labels: ['temperatura', 'humedad']
});