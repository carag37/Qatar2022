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
            myTable+="<th>Nombre</th>";
            myTable+="<th>Eliminar</th>";   
            myTable+="</tr>";
            myTable+="</thead>"
        
    for(i=0;i<items.length;i++){
            myTable+="<tr>";
            //myTable+="<td>"+items[i].id+"</td>";
            myTable+="<td>"+"<a class='text-sm font-bold text-gray-500 text-center hover:text-[#4164B7] cursor-pointer' href='#'  target='_self' onclick='detalle("+items[i].id+", \""+tipo+"\");'>"
            +items[i].name+"</a>"+"</td>";
            myTable+='<td> <a class="text-center" href="#" onclick="eliminar('+items[i].id+', \''+tipo+'\');">'
            myTable+='<svg class="w-6 h-6 mx-auto text-gray-400 hover:text-[#4164B7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">'
            myTable+='<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></a></td>'
            myTable+="</tr>";   
        }
 
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
            myTable+="<th>Nombre</th>";
            myTable+="<th>Descripción</th>";
            myTable+="<th>Nubes</th>";   
            myTable+="</tr>";
            myTable+="</thead>";
                    
            for(i=0;i<respuesta.length;i++){
                if(respuesta[i].id==id){
                myTable+="<tr>";
                myTable+="<td style='cursor: not-allowed;'>"+respuesta[i].id+"</td>";
                myTable+="<td style='white-space:pre'>"+'<input type="text" id="nombre" value='+respuesta[i].name+' name="nombre" class="whitespace-pre w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-4 outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out">' + "</td>";
                myTable+="<td>";
                myTable+='<textarea type="text" id="description" name="description" class="w-2/3 bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out">'+respuesta[i].description+'</textarea>'
                myTable+="</td>";
                myTable+="<td>";
                myTable+='<textarea readonly type="text" id="nubes" name="nubes" style="cursor: not-allowed" class="w-2/3 bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out">'
                
                for(j=0;j<respuesta[i].clouds.length;j++){myTable+=respuesta[i].clouds[j].name+" "}
                myTable+="</textarea>"
                myTable+="</td>";
                myTable+="</tr>"; 
                } 
            }
                
        myBack = '<a class="text-sm font-bold text-gray-500 text-center hover:text-gray-900 cursor-pointer" href="Category_R3.html" target="_self">';
        myType = '<label class="leading-7 text-ml text-gray-600">Categorías</label>';         
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
    
        myData={    
            //id:$("#id").val(),
            name:$("#nombre").val(),
            description:$("#description").val(),              
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
                $("#nombre").val("");
                $("#description").val("");
         
        verDetalle();
        alert("Se han almacenado los datos de Categoría");

        }
    });
}


function ActualizaReg(){
    
    let id = sessionStorage.getItem('id');
    let tipo = sessionStorage.getItem('tipo');
    let myData={    
            id:id,
            name:$("#nombre").val(),
            description:$("#description").val(),              
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
 
                $("#id").val("");
                $("#nombre").val("");
                $("#description").val("");
 
       verDetalle();
        
       alert("Se han actualizado los datos de Categoría" + id);

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
                alert("Se ha eliminado el dato de Categoria" + id)
            }
            }).fail(function() {
                alert("No es posible eliminar pues el dato está asociado a otro elemento")});
 
}

function contar(valor, label){
    let characterCount = valor.value.length,
        current = $('#current'+label);
    current.text(characterCount);
   
 };
 