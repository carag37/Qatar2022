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

    myTable+="<th>ID</th>";
    myTable+="<th>Nombre</th>";  
    myTable+="<th>Eliminar</th>"; 
    myTable+="</tr>";
    myTable+="</thead>"

        for(i=0;i<items.length;i++){
            myTable+="<tr>";
            myTable+="<td>"+items[i].idAdmin+"</td>";
            myTable+="<td>"+"<a class='text-sm font-bold text-gray-500 text-center hover:text-[#4164B7] cursor-pointer' href='#'  target='_self' onclick='detalle("+items[i].idAdmin+", \""+tipo+"\");'>"
            +items[i].name+"</td>";
            myTable+='<td> <a class="text-center" href="#" onclick="eliminar('+items[i].idAdmin+', \''+tipo+'\');">'
            myTable+='<svg class="w-6 h-6 mx-auto hover:text-[#4164B7]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">'
            myTable+='<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></a></td>'
            myTable+="</tr>";   
        }
         
  

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
            myTable+="<th>Nombre</th>";
            myTable+="<th>Email</th>"; 
            myTable+="<th>Password</th>"; 
            myTable+="</tr>";
            myTable+="</thead>";

            for(i=0;i<respuesta.length;i++){
                if(respuesta[i].idAdmin==id){
                myTable+="<tr>";
                myTable+="<td style='cursor: not-allowed;'>"+respuesta[i].idAdmin+"</td>";
                myTable+="<td>"+'<input type="text" id="nombre" value='+ respuesta[i].name+' name="nombre" class="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-center outline-none text-gray-700 leading-8 transition-colors duration-200 ease-in-out"> </div>' + "</td>";
                myTable+="<td style='cursor: not-allowed;'>"+respuesta[i].email + "</td>";
                myTable+="<td>"+'<input type="password" id="password" placeholder="???????????????????????????" name="password" minlength="6" maxlength="45" value='+respuesta[i].password + ' name="password" class="peer w-full bg-white border border-gray-300 text-center text-gray-700 text-sm rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 invalid:border-red-500 invalid:text-red-600 invalid:ring-2 invalid:ring-red-200 focus:invalid:border-red-500 focus:invalid:text-red-600 focus:invalid:ring-2 focus:invalid:ring-red-200" required>';
                myTable+='<p class="invisible peer-invalid:visible text-red-600 text-xs">Ingrese m??nimo 6 caracteres" </p>'+ "</td>";
                myTable+="</tr>"; 
                }  
            }
            myBack = '<a class="text-sm font-bold text-gray-500 text-center hover:text-gray-900 cursor-pointer" href="Admins_R3.html" target="_self">';
            myType = '<label class="leading-7 text-ml text-gray-600">Clientes</label>';
            console.log(respuesta)
       
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
            email:$("#email").val(),
            password:$("#password").val(),         
            }; //Almaceno info en variables
                 
    let dataToSend=JSON.stringify(myData);

    $.ajax({ //Llamo al m??todo AJAX
        url:"http://localhost:8080/api/"+tipo+"/save", //Direcci??n del m??dulo
        type:"POST", //Tipo post para enviar
        data:dataToSend, //Datos a enviar
        contentType:"application/JSON", //Le indico al servidor en qu?? formato le env??o la info
        datatype:"JSON", //Tipo de datos a enviar
        success:function(respuesta){
            $("#res_tabla").empty();

           
                //$("#id").val("");
                $("#nombre").val("");
                $("#email").val("");
                $("#password").val("");
           
       
        leerDatos(tipo);
        alert("Se han almacenado los datos");

        }
    });
}


function ActualizaReg(){
    
    let id = sessionStorage.getItem('id');
    let tipo = sessionStorage.getItem('tipo');

    let myData={   
            idAdmin:id,
            name:$("#nombre").val(),
            email:$("#email").val(),
            password:$("#password").val(),
                          
            }; //Almaceno info en variables 
   
    let dataToSend=JSON.stringify(myData);
    
    $.ajax({ //Llamo al m??todo AJAX
        url:"http://localhost:8080/api/"+tipo+"/update", //Direcci??n del m??dulo
        type:"PUT", //Tipo post para enviar
        data:dataToSend, //Datos a enviar
        contentType:"application/JSON", //Le indico al servidor en qu?? formato le env??o la info
        datatype:"JSON", //Tipo de datos a enviar
        success:function(respuesta){
            $("#res_tabla").empty();
            
                $("#id").val("");
                $("#nombre").val("");
                $("#email").val("");               
                $("#password").val("");   
        

        verDetalle(); 
        alert("Se han actualizado los datos del Usuario Admin" + id);

        }
    });
}

function eliminar(id, tipo){
    
    console.log(id, tipo);
    let myData={id:id}; //Almaceno id tra??da desde el pintar
    let dataToSend=JSON.stringify(myData); //Convierto en JSON
        $.ajax({ //Llamo al m??todo AJAX
            url:"http://localhost:8080/api/"+tipo+"/"+id, //Direcci??n del m??dulo
            type:"DELETE", //Tipo post para enviar
            data:dataToSend, //Datos a enviar
            contentType:"application/JSON", //Le indico al servidor en qu?? formato le env??o la info
            datatype:"JSON", //Tipo de datos a enviar
            success:function(respuesta){
                $("#resultado").empty();
                leerDatos(tipo);
                alert("Se ha eliminado el dato de Usuario " + id)
            }
            }).fail(function() {
                alert("No es posible eliminar pues el dato est?? asociado a otro elemento")});

}

function contar(valor, label){
    let characterCount = valor.value.length,
        current = $('#current'+label);
    current.text(characterCount);
   
 };