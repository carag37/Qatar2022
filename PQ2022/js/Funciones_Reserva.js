function leerDatos(tipo){
        $.ajax({
            url:"http://localhost:8080/api/"+tipo+"/all",
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
            
            
            $("#res_tabla").empty();
            updateTabla(respuesta, tipo)
            
            }
            });
    };

function updateTabla(items, tipo){
    
    let myTable = '<table class="text-gray-600 border-rounded-lg text-center text-sm border border-gray-300">';
    myTable += "<thead class='border border-gray-300'>";
    myTable += "<tr class='rounded-full'>";

    
    myTable+="<th>Id Reserva</th>";
    myTable+="<th>Cliente</th>"
    myTable+="<th>Calificar</th>"
    myTable+="<th>Eliminar</th>";   
    myTable+="</tr>";
    myTable+="</thead>"
    var score = 0;
    var scoreId = 0;
    console.log(items);
    for(i=0;i<items.length;i++){
        if(items[i].score==null){score = "Sin calificar"; scoreId=0}else{score = items[i].score.score; scoreId=items[i].score.idScore}
            myTable+="<tr>";
            //myTable+="<td>"+items[i].idReservation+"</td>";
            myTable+="<td>"+"<a class='text-sm font-bold text-gray-500 text-center hover:text-[#4164B7] cursor-pointer' href='#'  target='_self' onclick='detalle("+items[i].idReservation+", \""+tipo+"\");'>"+items[i].idReservation+"</td>";
            myTable+="<td>"+items[i].client.idClient+" - "+items[i].client.name+" - "+items[i].client.email+"</td>";
            myTable+='<td ><form class="form-inline"><label>'+score+'</label><a class="text-center" href="#" onclick="detalle('+items[i].idReservation+', \''+"Score"+'\');">'
            myTable+='<svg class="w-6 h-6 mx-auto text-gray-400 hover:text-[#4164B7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">'
            myTable+='<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"></path></svg></a></form></td>'
            myTable+='<td > <a class="text-center" href="#" onclick="eliminarScore('+items[i].idReservation+','+scoreId+', \''+tipo+'\');">'
            myTable+='<svg class="w-6 h-6 mx-auto text-gray-400 hover:text-[#4164B7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">'
            myTable+='<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></a></td>'
            myTable+="</tr>";
    }
    
    listar('Client') 
    listar('Cloud')

    myTable+= "</table>";
    $("#res_tabla").append(myTable);
}

function detalle(id, tipo){
    sessionStorage.setItem('id',id);
    sessionStorage.setItem('tipo',tipo);
    if (tipo=="Score"){location.href="./Califica_R3.html";} else {location.href="./Detalles_R3.html";}
    
}


function verDetalle(){

    let id = sessionStorage.getItem('id');
    let tipo = sessionStorage.getItem('tipo');
    
    let myType;
    let myBack;
    
    let myTable = '<table class="table-auto text-gray-600 text-center text-sm">';
    $.ajax({
        url:"http://localhost:8080/api/"+tipo+"/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
        
        
        $("#res_tabla").empty();
        $("#res_Back").empty();
        $("#res_Type").empty();

     
            myTable+="<thead>";
            myTable+="<tr>";
            myTable+="<th>ID</th>";
            myTable+="<th>Nombre Nube</th>";
            myTable+="<th>ID Usuario</th>";
            myTable+="<th>Nombre Usuario</th>";
            //myTable+="<th>Email Usuario</th>";
            myTable+="<th>Fecha inicio</th>";
            myTable+="<th>Fecha fin</th>";
            myTable+="<th>Calificación</th>"
            myTable+="<th>Estado</th>";         
            myTable+="</tr>";
            myTable+="</thead>";
            console.log(respuesta)
                   
            for(i=0;i<respuesta.length;i++){
                console.log(respuesta[i].score.score)
                if(respuesta[i].idReservation==id){
                
                myTable+="<tr>";
                myTable+="<td>"+'<input type="text" id="idReservation" style="cursor: not-allowed;" value='+respuesta[i].idReservation+' name="idReservation" class="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-center outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out"> </div>' + "</td>";
                myTable+="<td>"+respuesta[i].cloud.name+"</td>";
                myTable+="<td>"+respuesta[i].client.idClient+"</td>";
                myTable+="<td>"+respuesta[i].client.name+"</td>";
                //myTable+="<td>"+respuesta[i].client.email+"</td>";
                myTable+="<td>"+'<input type="text" format="yyyy-mm-dd" id="startDate" value='+respuesta[i].startDate.substr(0,10)+' name="startDate" class="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-center outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out"> </div>' + "</td>";
                myTable+="<td>"+'<input type="text" format="yyyy-mm-dd" id="devolutionDate" value='+respuesta[i].devolutionDate.substr(0,10)+' name="devolutionDate" class="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-center outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out"> </div>' + "</td>";
                myTable+="<td>"+respuesta[i].score.score+"</td>";
                myTable+="<td>"
                myTable+='<select type="text" id="status" name="status" class="w-full bg-white rounded border border-gray-300 text-gray-700 py-1 px-3 dark:placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-20 text-base outline-none leading-8 transition-colors" required>';
                myTable+='<option disabled selected class="text-gray-700">'+respuesta[i].status+'</option>';
                myTable+="<option value='Programado'>Programado</option>";
                myTable+="<option value='Cancelado'>Cancelado</option>";
                myTable+="<option value='Realizado'>Realizado</option>";
                myTable+="</select>"
                myTable+="</td>"
                myTable+="</tr>"; 
                } 
            }
                
        myBack = '<a class="text-sm font-bold text-gray-500 text-center hover:text-gray-900 cursor-pointer" href="Reserva_R3.html" target="_self">';
        myType = '<label class="leading-7 text-ml text-gray-600">Reservas</label>';     
        myTable+= "</table>";
        myBack+='Regresar </a>';
            $("#res_Type").append(myType);
            $("#res_tabla").append(myTable);                       
            $("#res_Back").append(myBack);
    }
});

}

function crearReg(tipo){
    
    let myData={};
    
    switch(tipo){
       
    case 'Reservation': 
    myData={    
        //id:$("#id").val(),
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),   
        cloud:{"id":$("#CloudId").val()},
        client:{"idClient":$("#ClientId").val()},          
        }; //Almaceno info en variables
    break;

    case 'Score': 
        myData={    
            //idScore:id,
            score:$("#score").val(),
            scoreText:$("#scoreText").val(),
            reservation:{"idReservation":$("#ReservationId").val()},           
            }; //Almaceno info en variables
    break;
   
    }
    
    let dataToSend=JSON.stringify(myData);

    $.ajax({ //Llamo al método AJAX
        url:"http://localhost:8080/api/"+tipo+"/save", //Dirección del módulo
        type:"POST", //Tipo post para enviar
        data:dataToSend, //Datos a enviar
        contentType:"application/JSON", //Le indico al servidor en qué formato le envío la info
        datatype:"JSON", //Tipo de datos a enviar
        success:function(respuesta){
            $("#res_tabla").empty();

            switch(tipo){

            case 'Reservation':
                ///$("#id").val("");
                $("#startDate").val("");
                $("#devolutionDate").val("");   
                $("#ClientId").val("");
                $("#CloudId").val("");     
            break;
            case 'Score': 
                //$("#id").val("");
                $("#score").val("");
                $("#scoreText").val("");
                $("#ReservationId").val("");
            break;
                     
        }

       
       if(tipo!='Score'){
        leerDatos(tipo);
        alert("Se han almacenado los datos de Reserva " + id);
        } else{calificar();
        alert("Se han almacenado la calificación");}

        }
    });
}


function ActualizaReg(){
    
    let id = sessionStorage.getItem('id');
    let tipo = sessionStorage.getItem('tipo');
    let myData={};
    
    switch(tipo){

    case 'Reservation': 
        myData={    
            idReservation:$("#idReservation").val(),
            startDate:$("#startDate").val(),
            devolutionDate:$("#devolutionDate").val(),
            //cloud:{"id":$("#CloudId").val()},
            //client:{"idClient":$("#ClientId").val()},  
            status:$("#status").val(),        
            }; //Almaceno info en variables
    break;

    case 'Score': 
        myData={    
            idScore:$("#ScoreId").val(),
            score:$("#score").val(),
            scoreText:$("#scoreText").val(),
            reservation:{"id":$("#ReservationId").val()},           
            }; //Almaceno info en variables
    break;

    }

    let dataToSend=JSON.stringify(myData);
    
    $.ajax({ //Llamo al método AJAX
        url:"http://localhost:8080/api/"+tipo+"/update", //Dirección del módulo
        type:"PUT", //Tipo post para enviar
        data:dataToSend, //Datos a enviar
        contentType:"application/JSON", //Le indico al servidor en qué formato le envío la info
        datatype:"JSON", //Tipo de datos a enviar
        success:function(respuesta){
            $("#res_tabla").empty();
            
            switch(tipo){
            case 'Reservation':
                $("#id").val("");
                $("#startDate").val("");
                $("#devolutionDate").val("");   
                $("#ClientId").val("");
                $("#CloudId").val("");
            break;
            
            case 'Score': 
                calificar();
                $("#id").val("");
                $("#score").val("");
                $("#scoreText").val("");
                $("#ReservationId").val("");
            break;
      
        }

        if(tipo!='Score'){
            verDetalle();
            alert("Se han actualizado los datos de reserva " + id);
        } else{calificar();
                alert("Se han actualizado la calificación ");}
 
        }
    });
}

function eliminarScore(idReservation, idScore, tipo){
    if(idScore!=0){
    console.log(idReservation, idScore, tipo);
    let myData={id:idScore}; //Almaceno id traída desde el pintar
    let dataToSend=JSON.stringify(myData); //Convierto en JSON
        $.ajax({ //Llamo al método AJAX
            url:"http://localhost:8080/api/Score/"+idScore, //Dirección del módulo
            type:"DELETE", //Tipo post para enviar
            data:dataToSend, //Datos a enviar
            contentType:"application/JSON", //Le indico al servidor en qué formato le envío la info
            datatype:"JSON", //Tipo de datos a enviar
            success:function(respuesta){
                $("#resultado").empty();
                leerDatos(tipo);
                alert("Se ha eliminado la calificación")
                eliminar(idReservation, tipo);
            }
            });
        }else{eliminar(idReservation, tipo);}

}

function eliminar(id, tipo){
    
    console.log(id, tipo);
    let myData={id:id}; //Almaceno id traída desde el pintar
    let dataToSend=JSON.stringify(myData); //Convierto en JSON
        $.ajax({ //Llamo al método AJAX
            url:"http://localhost:8080/api/"+tipo+"/"+id, //Dirección del módulo
            type:"DELETE", //Tipo post para enviar
            data:dataToSend, //Datos a enviar
            contentType:"application/JSON", //Le indico al servidor en qué formato le envío la info
            datatype:"JSON", //Tipo de datos a enviar
            success:function(respuesta){
                $("#resultado").empty();
                leerDatos(tipo);
                alert("Se ha eliminado la Reserva")
            }
            }).fail(function() {
                alert("No es posible eliminar pues el dato está asociado a otro elemento")});
   

}

function listar(tipo){

    $.ajax({
        url:"http://localhost:8080/api/"+tipo+"/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
        
        
        $("#res_Select"+tipo).empty();
        
        let mySelect = '<select type="number" id="'+tipo+'Id" name="'+tipo+'Id" class="w-full bg-white rounded border border-gray-300 text-gray-700 py-1 px-3 dark:placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-20 text-base outline-none leading-8 transition-colors" required>'
        mySelect += '<option disabled selected class="text-gray-700">Selecciona una opción</option>'
        for(i=0;i<respuesta.length;i++){
             
            
            if(tipo=="Client"){
                mySelect += '<option value='+respuesta[i].idClient+'>'+respuesta[i].idClient+'</option>'
            }else {
            mySelect += '<option value='+respuesta[i].id+'>'+respuesta[i].name+'</option>'}
        }
        mySelect += '</select>'
      
        $("#res_Select"+tipo).append(mySelect)

        

        }
        });


};

function listarDetalle(idClient, idCloud){
let mySelectClient = ""
let mySelectCloud = ""

    $.ajax({
        url:"http://localhost:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            
        
        for(i=0;i<respuesta.length;i++){
            if(respuesta[i].idClient!=idClient)
            {mySelectClient += '<option value='+respuesta[i].idClient+'>'+respuesta[i].name+'</option>'}
        }
        
             
       sessionStorage.setItem('mySelectClient',mySelectClient);
        }
        });

    $.ajax({
        url:"http://localhost:8080/api/Cloud/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
        
        
            
        for(i=0;i<respuesta.length;i++){
            if(respuesta[i].id!=idCloud)
            mySelectCloud += '<option value='+respuesta[i].id+'>'+respuesta[i].name+'</option>'}
                 
            sessionStorage.setItem('mySelectCloud',mySelectCloud);
        }
            
        });

};

function contar(valor, label){
    let characterCount = valor.value.length,
        current = $('#current'+label);
    current.text(characterCount);
   
 };

function calificar(puntaje){

    let id = sessionStorage.getItem('id');
    let tipo = sessionStorage.getItem('tipo');
    
    let myType;
    let myBack;
    let myButton;
    var contar=0;
    
    let myTable = '<table class="table-auto text-gray-600 text-center text-sm">';
    $.ajax({
        url:"http://localhost:8080/api/"+tipo+"/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
        
        
        $("#res_tabla").empty();
        $("#res_Back").empty();
        $("#res_Type").empty();
        $("#res_Button").empty();
                
            myTable+="<thead>";
            myTable+="<tr>";
            myTable+="<th>ID</th>";
            myTable+="<th>ID Reserva</th>";
            myTable+="<th>Calificación</th>";
            myTable+="<th>Descripción</th>";         
            myTable+="</tr>";
            myTable+="</thead>";
                    
         
            if(respuesta.length==0){
                myTable+="<tr>";
                    myTable+="<td style='cursor: not-allowed'></td>";
                    myTable+="<td>"+'<input readonly style="cursor: not-allowed" type="number" id="ReservationId" name="ReservationId" value='+id+' class="w-1/2 bg-white rounded border border-gray-300 text-base text-center outline-none text-gray-700 leading-8 transition-colors">' + "</td>";
                    myTable+="<td>"+'<input type="number" id="score" min="1" max="5" pattern="\d" placeholder="Ingrese calificación" name="score" class="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base text-center outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out">' + "</td>";
                    myTable+="<td>"+'<textarea type="text" id="scoreText" name="scoreText" placeholder="Describa calificación" class="w-2/3 bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>'+ "</td>";
                    myTable+="</tr>";
                    myButton += "<button onclick='crearReg(\""+tipo+"\")' class='text-white font-bold bg-[#4164B7] border-0 py-2 px-6 focus:outline-none hover:bg-[#EC2468] rounded text-xl'> Crear </button>"
            }

            
            for(i=0;i<respuesta.length;i++){
                 
                if(respuesta[i].reservation.idReservation==id){
                    
                if(!typeof respuesta[i].reservation.score==='undefined'){
                    myTable+="<tr>";
                    myTable+="<td style='cursor: not-allowed'></td>";
                    myTable+="<td>"+'<input readonly style="cursor: not-allowed" type="number" id="ReservationId" name="ReservationId" value='+id+' class="w-1/2 bg-white rounded border border-gray-300 text-base text-center outline-none text-gray-700 leading-8 transition-colors">' + "</td>";
                    myTable+="<td>"+'<input type="number" id="score" min="1" max="5" pattern="\d" placeholder="Ingrese calificación" name="score" class="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base text-center outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out">' + "</td>";
                    myTable+="<td>"+'<textarea type="text" id="scoreText" name="scoreText" placeholder="Describa calificación" class="w-2/3 class="bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>'+ "</td>";
                    myTable+="</tr>";
                    myButton += "<button onclick='crearReg(\""+tipo+"\")' class='text-white font-bold bg-[#4164B7] border-0 py-2 px-6 focus:outline-none hover:bg-[#EC2468] rounded text-xl'> Crear </button>"
                }
                else{
                
                myTable+="<tr>";
                myTable+="<td>"+'<input readonly style="cursor: not-allowed" type="number" id="ScoreId" name="ScoreId" value='+respuesta[i].idScore+' class="w-1/2 bg-white rounded border border-gray-300 text-base text-center outline-none text-gray-700 leading-8 transition-colors">' + "</td>";
                myTable+="<td>"+'<input readonly style="cursor: not-allowed" type="number" id="ReservationId" name="ReservationId" value='+respuesta[i].reservation.idReservation+' class="w-1/2 bg-white rounded border border-gray-300 text-base text-center outline-none text-gray-700 leading-8 transition-colors">' + "</td>";
                myTable+="<td>"+'<input type="number" id="score" min="1" max="5" pattern="\d" value='+respuesta[i].score+' name="score" class="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base text-center outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out">' + "</td>";
                myTable+="<td>"+'<textarea type="text" id="scoreText" name="scoreText" class="w-2/3 bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out">'+respuesta[i].scoreText+'</textarea>'+ "</td>";
                myTable+="</tr>";
                myButton += "<button onclick='ActualizaReg()' class='text-white font-bold bg-[#4164B7] border-0 py-2 px-6 text-center focus:outline-none hover:bg-[#EC2468] rounded text-xl'> Actualizar </button>"
                } 
                }
                else{contar=contar+1}

                if(respuesta.length==contar){
                    myTable+="<tr>";
                    myTable+="<td style='cursor: not-allowed'></td>";
                    myTable+="<td>"+'<input readonly style="cursor: not-allowed" type="number" id="ReservationId" name="ReservationId" value='+id+' class="w-1/2 bg-white rounded border border-gray-300 text-base text-center outline-none text-gray-700 leading-8 transition-colors">' + "</td>";
                    myTable+="<td>"+'<input type="number" id="score" min="1" max="5" pattern="\d" placeholder="Ingrese calificación" name="score" class="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base text-center outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out">' + "</td>";
                    myTable+="<td>"+'<textarea type="text" id="scoreText" name="scoreText" placeholder="Describa calificación" class="w-2/3 class="bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>'+ "</td>";
                    myTable+="</tr>";
                    myButton += "<button onclick='crearReg(\""+tipo+"\")' class='text-white font-bold bg-[#4164B7] border-0 py-2 px-6 focus:outline-none hover:bg-[#EC2468] rounded text-xl'> Crear </button>"
                }

                
                
              
            }

            


        myBack = '<a class="text-sm font-bold text-gray-500 text-center hover:text-gray-900 cursor-pointer" href="Reserva_R3.html" target="_self">'
        myType = '<label class="leading-7 text-ml text-gray-600">Calificación</label>'
        myTable+= "</table>";
        myBack+='Regresar </a>';

        $("#res_Type").append(myType);
        $("#res_tabla").append(myTable);                       
        $("#res_Back").append(myBack);
        $("#res_Button").append(myButton);

        }
    });
    
}

function consultar(URL){
    window.open(URL, 'Consultas', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=1,width=960,height=680,left = 240,top = 50');
    
}

function consultarReportes(tipo){

    let myTable;
    

    myTable += '<table class="table-auto text-gray-600 text-center text-sm">';

    switch(tipo){
        case 'Reporte_Fecha':
            
            startDate = $("#startDate").val(),
            devolutionDate = $("#devolutionDate").val(),
            
            Reporte_Fecha(startDate, devolutionDate)
        break;
        case 'Reporte_Cantidades':
            
            Reporte_Cantidades("report-status")
        break;
        case 'Reporte_TopClient':
            
            Reporte_TopClient("report-clients")
            
        break;

    }
    
       
    myTable+= "</table>";
    
   

    $("#res_Table").append(myTable)
    

}

function close_window(){
    window.close();
}

function Reporte_Fecha(startDate, devolutionDate){
    let myTable={}
   console.log("http://localhost:8080/api/Reservation/report-dates/"+startDate+"/"+devolutionDate)
   var inicio = startDate.substr(0,4)+startDate.substr(5,2)+startDate.substr(8,2)
   console.log(inicio)
    var fin = devolutionDate.substr(0,4)+devolutionDate.substr(5,2)+devolutionDate.substr(8,2)
    console.log(fin)
    if(inicio>fin){alert("ingrese fechas correctamente")}else{


   $.ajax({
        url:"http://localhost:8080/api/Reservation/report-dates/"+startDate+"/"+devolutionDate,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
        
        $("#res_tabla").empty();
        myTable+="<thead>";
        myTable+="<tr>";
        myTable+="<th>Cantidad en el intervalo</th>";       
        myTable+="</tr>";
        myTable+="</thead>";
        myTable+="<tr>";

        myTable+="<td>"+respuesta.completed.length+"</td>"

        $("#res_tabla").append(myTable)

        }
        });
    console.log("OK")
    }
};

function Reporte_Cantidades(tipo){
    let myTable={}
    console.log("http://localhost:8080/api/Reservation/"+tipo)
    $.ajax({
        url:"http://localhost:8080/api/Reservation/"+tipo,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
        
        
        $("#res_tabla").empty();
        myTable+="<thead>";
        myTable+="<tr>";
        myTable+="<th>Tipo</th>";
        myTable+="<th>Total</th>";       
        myTable+="</tr>";
        myTable+="</thead>";
        myTable+="<tr>";
        myTable+="<td>Completada</td>"
        myTable+="<td>"+respuesta.completed+"</td>";
        myTable+="</tr>";
        myTable+="<tr>";
        myTable+="<td>Cancelada</td>"
        myTable+="<td>"+respuesta.cancelled+"</td>";
        myTable+="</tr>";

        $("#res_tabla").append(myTable)
        
        }
        });
};

function Reporte_TopClient(tipo){
    
    console.log("http://localhost:8080/api/Reservation/"+tipo)
    $.ajax({
        url:"http://localhost:8080/api/Reservation/"+tipo,
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
                
        $("#res_tabla").empty();
        
        myTable+="<thead>";
        myTable+="<tr>";
        myTable+="<th>Cliente</th>";
        myTable+="<th>Total</th>";      
        myTable+="</tr>";
        myTable+="</thead>";
        myTable+="<tr>";
        for(i=0;i<respuesta.length;i++){
        myTable+="<td>Cliente</td>"
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>Total</td>"
        myTable+="<td>"+respuesta[i].total+"</td>";
        }
        $("#res_tabla").append(myTable)
        
        }
    
        });
};
