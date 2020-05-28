$(document).ready(function() {
    const idfeini = $("select option:selected").val();

    $("#fecha_inicio").click(function() {
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
        var idini = document.getElementById("fecha_inicio").value;
        var idfin = document.getElementById("fecha_final").value;
        if (idfin != 'nulo') {
            $.post("ids", {
                    idinicial: idini,
                    idfinal: idfin
                },
                function(datosrecibidos, status) {
                    const datrecstring = JSON.stringify(datosrecibidos); // paso a string 
                    morris1.setData(datosrecibidos);
                });
        }
    });
});

(function(datact) {
    $.get("datosactuales", function(datosrecibidos, status) {
        const datrecstring = JSON.parse(JSON.stringify(datosrecibidos)); // paso a string 
        $("#idtemp").html("Temperatura: " + datrecstring.temperatura + " °C");
        $("#idhume").html("Humedad: " + datrecstring.humedad + " %");
    });
})();

setInterval(datact(), 5000);

var morris1 = new Morris.Line({
    element: 'grafica',
    data: [],
    xkey: 'fecha',
    ykeys: ['temperatura', 'humedad'],
    labels: ['temperatura', 'humedad']
});