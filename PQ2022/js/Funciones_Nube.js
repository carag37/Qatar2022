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

    listar('Category')

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
            myTable+="<th>Proveedor</th>";
            myTable+="<th>Modelo</th>";
            myTable+="<th>Categoría</th>";
            myTable+="<th>Descripción</th>";            
            myTable+="</tr>";
            myTable+="</thead>";
                
            for(i=0;i<respuesta.length;i++){
                if(respuesta[i].id==id){
                listarDetalle(respuesta[i].category.id);
                myTable+="<tr>";
                myTable+="<td style='cursor: not-allowed;'>"+respuesta[i].id+"</td>";
                myTable+="<td>"+'<input type="text" id="nombre" value='+ respuesta[i].name+' name="nombre" class="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-center outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out"> </div>' + "</td>";
                myTable+="<td>"+'<input type="text" id="proveedor" value='+respuesta[i].brand+' name="proveedor" class="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base text-center outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out"></input>' + "</td>";
                myTable+="<td>"+'<input type="number" max="2050" min="1980" id="modelo" value='+respuesta[i].year+' name="modelo" class="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base text-center outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out invalid:border-red-500 invalid:text-red-600 invalid:ring-2';
                myTable+='invalid:ring-red-200 focus:invalid:border-red-500 focus:invalid:text-red-600 focus:invalid:ring-2 focus:invalid:ring-red-200">' + "</td>"
                
                myTable+="<td>"+'<input readonly style="cursor: not-allowed;" type="text" id="categoryId" value='+respuesta[i].category.name+' name="categoryId" class="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base text-center outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out">' + "</td>";
                //myTable+="<td>";
                //myTable+='<select type="number" id="categoryId" name="categoryId" class="w-full bg-white rounded border border-gray-300 text-gray-700 py-1 px-3 dark:placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-20 text-base outline-none leading-8 transition-colors">'
                //myTable+='<option selected class="text-gray-700" value='+respuesta[i].category.id+'>'+respuesta[i].category.name+'</option>'
                
                //myTable+=sessionStorage.getItem('mySelectCat');
                //myTable+="</td>";
                myTable+="<td>";
                myTable+='<textarea type="text" id="description" name="description" class="w-2/3 bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out">'+respuesta[i].description+'</textarea>'
                myTable+="</td>";
                myTable+="</tr>"; 
                
                } 
            }

        myBack = '<a class="text-sm font-bold text-gray-500 text-center hover:text-gray-900 cursor-pointer" href="Nubes_R3.html" target="_self">';
        myType = '<label class="leading-7 text-ml text-gray-600">Nubes</label>';        
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
            brand:$("#proveedor").val(),
            year:$("#modelo").val(),
            category:{"id":$("#CategoryId").val()},
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
                $("#proveedor").val("");
                $("#modelo").val("");
                $("#CategoryId").val("");
                $("#description").val("");

       if(tipo!='Score'){leerDatos(tipo);} else{calificar();}
        alert("Se han almacenado los datos");

        }
    });
}


function ActualizaReg(){
    
    let id = sessionStorage.getItem('id');
    let tipo = sessionStorage.getItem('tipo');
    let myData={  
            id:id,
            brand:$("#proveedor").val(),
            year:$("#modelo").val(),
            //category:{"id":$("#categoryId").val()},
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

                listarDetalle(myData.category.id);
                $("#id").val("");
                $("#nombre").val("");
                $("#proveedor").val("");
                $("#CategoryId").val("");
                $("#modelo").val("");
                $("#description").val("");

        verDetalle();
        
        alert("Se han actualizado los datos de Nube" + id);

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
                alert("Se ha eliminado el dato")
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
    
            mySelect += '<option value='+respuesta[i].id+'>'+respuesta[i].name+'</option>'
        }
        
        mySelect += '</select>'
      
        $("#res_Select"+tipo).append(mySelect)

        }
        });


};

function listarDetalle(idCat){

let mySelectCat = ""
   
    $.ajax({
        url:"http://localhost:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
      
        for(i=0;i<respuesta.length;i++){
 
            if(respuesta[i].id!=idCat){mySelectCat += '<option value='+respuesta[i].id+'>'+respuesta[i].name+'</option>';}
        
        }
               
        sessionStorage.setItem('mySelectCat',mySelectCat);
            
        }
                
        });
            
};

function contar(valor, label){
    let characterCount = valor.value.length,
        current = $('#current'+label);
    current.text(characterCount);
   
 };
 