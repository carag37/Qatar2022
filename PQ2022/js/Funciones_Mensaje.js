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
    //myTable+="<th>ID</th>";
    myTable+="<th>Mensaje</th>";
    myTable+="<th>Eliminar</th>";   
    myTable+="</tr>";
    myTable+="</thead>"
    
        for(i=0;i<items.length;i++){
            myTable+="<tr>";
            //myTable+="<td>"+items[i].idMessage+"</td>";
            myTable+="<td>"+"<a class='text-sm font-bold text-gray-500 text-center hover:text-[#4164B7] cursor-pointer' href='#'  target='_self' onclick='detalle("+items[i].idMessage+", \""+tipo+"\");'>"
            +items[i].messageText+"</td>";
            myTable+='<td> <a class="text-center" href="#" onclick="eliminar('+items[i].idMessage+', \''+tipo+'\');">'
            myTable+='<svg class="w-6 h-6 mx-auto hover:text-[#4164B7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">'
            myTable+='<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></a></td>'
            myTable+="</tr>";   
        }
    listar('Cloud')
    listar('Client')      
    
    myTable+= "</table>";
    $("#res_tabla").append(myTable);
}

function detalle(id, tipo){
    sessionStorage.setItem('id',id);
    sessionStorage.setItem('tipo',tipo);
    location.href="./Detalles_R3.html";
    
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
            myTable+="<th>Mensaje</th>";
            myTable+="<th>Cliente</th>";
            myTable+="<th>Nube</th>";       
            myTable+="</tr>";
            myTable+="</thead>";

            for(i=0;i<respuesta.length;i++){
                if(respuesta[i].idMessage==id){   
                myTable+="<tr>";
                myTable+="<td style='cursor: not-allowed;'>"+respuesta[i].idMessage+"</td>";
                myTable+="<td>";
                myTable+='<textarea type="text" id="Message" name="Message" class="w-2/3 bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out">'+respuesta[i].messageText+'</textarea>'
                myTable+="</td>";
                myTable+="<td>";
                myTable+='<select type="number" id="ClientId" name="ClientId" class="w-full bg-white rounded border border-gray-300 text-gray-700 py-1 px-3 dark:placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-20 text-base outline-none leading-8 transition-colors">'
                myTable+='<option selected class="text-gray-700" value='+respuesta[i].client.idClient+'>'+respuesta[i].client.name+'</option>'
                //listarDetalle(respuesta[i].client.idClient, respuesta[i].cloud.id);
                //myTable+=sessionStorage.getItem('mySelectClient');
                myTable+="</td>";
                
                myTable+="<td>"; 
                myTable+='<select type="number" id="CloudId" name="CloudId" class="w-full bg-white rounded border border-gray-300 text-gray-700 py-1 px-3 dark:placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-20 text-base outline-none leading-8 transition-colors">'
                myTable+='<option selected class="text-gray-700" value='+respuesta[i].cloud.id+'>'+respuesta[i].cloud.name+'</option>'
                //myTable+=sessionStorage.getItem('mySelectCloud');
                myTable+='</select>'
                myTable+="</td>";
                

                myTable+="</tr>";  
                }
                        
            }

        myBack = '<a class="text-sm font-bold text-gray-500 text-center hover:text-gray-900 cursor-pointer" href="Mensaje_R3.html" target="_self">';
        myType = '<label class="leading-7 text-ml text-gray-600">Mensajes</label>';
        myTable+= "</table>";
        myBack+='Regresar </a>';
            $("#res_Type").append(myType);
            $("#res_tabla").append(myTable);                       
            $("#res_Back").append(myBack);
    }
});

}

function crearReg(tipo){
    
    let myData={    
            //id:$("#id").val(),
            messageText:$("#Message").val(),
            cloud:{"id":$("#CloudId").val()},
            client:{"idClient":$("#ClientId").val()},            
            }; //Almaceno info en variables
 
    let dataToSend=JSON.stringify(myData);

    $.ajax({ //Llamo al método AJAX
        url:"http://localhost:8080/api/"+tipo+"/save", //Dirección del módulo
        type:"POST", //Tipo post para enviar
        data:dataToSend, //Datos a enviar
        contentType:"application/JSON", //Le indico al servidor en qué formato le envío la info
        datatype:"JSON", //Tipo de datos a enviar
        success:function(respuesta){
            $("#res_tabla").empty();

                //$("#id").val("");
                $("#message").val("");
                $("#ClientId").val(""),
                $("#CloudId").val("");  

        leerDatos(tipo);
        alert("Se han almacenado los datos");

        }
    });
}


function ActualizaReg(){
    
    let id = sessionStorage.getItem('id');
    let tipo = sessionStorage.getItem('tipo');
    let myData={   
            idMessage:id,
            messageText:$("#Message").val(), 
            cloud:{"id":$("#CloudId").val()},
            client:{"idClient":$("#ClientId").val()},          
            }; //Almaceno info en variables
  
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
            
            case 'Message':
                
                listarDetalle(myData.client.idClient, myData.cloud.id);
                $("#id").val("");
                $("#mensaje").val("");
                $("#ClientId").val("");
                $("#CloudId").val("");

        }

        verDetalle();
        
        alert("Se han actualizado los datos de Mensaje " + id );

        }
    });
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
                alert("Se ha eliminado el dato" + id)
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
let mySelectCat = ""

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