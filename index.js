/*
4. Al hacer click en el botón Nuevo, mostrar en un modal 
un formulario con los siguientes datos y un botón de guardar:

    Nombre (Máximo 50 carácteres)
    Dirección (Máximo 60 carácteres)
    Telefono (Solo números, espacios y/o guiones medios. 
        Validar el formato utilizando expresiones regulares)
    Email (Validar el formato utilizando expresiones regulares)

Al hacer click en el botón guardar, primero se debe validar 
que los campos sean válidos. En caso afirmativo, 
hacer un POST a la ruta /users enviando el objeto con las 4 propiedades 
(fullname, email, address, phone).


6.Cada elemento en la tabla tendrá la acción editar. 
    Al hacer click en editar, mostrar en un modal un formulario 
    con los mismos campos (y validaciones) que el fomulario nuevo, 
    con todos los datos pre-cargados. Al finalizar la edición, 
    debemos validar que todos los datos ingresados sean correctos 
    (al igual que en la creación). Si los datos son correctos, 
    haremos un PUT a la ruta /users/:id.
*/







// / / / / / / / / / / / / / / / / /
const vaciarTabla = () => {
    const trALL = document.querySelectorAll("#main-tabla_tbody > tr");
    console.log("Los hijos de main_tabla son:", trALL);
    trALL.forEach(tr=>tr.remove());
}

const showDataTable = (name, email, address, phone) => {

    const tBody = document.querySelector("#main-tabla_tbody");
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    const tdEmail = document.createElement("td");
    const tdAddress = document.createElement("td");
    const tdPhone = document.createElement("td");
    const tdCheck = document.createElement("td");
    const inputCheck = document.createElement("input");
    const tdDelete = document.createElement("td");
    const tdEditar = document.createElement("td");
    const btnDelete = document.createElement("button");
    const btnEditar = document.createElement("button");


    btnDelete.innerHTML = `<i class="material-icons" title="Delete">&#xE872;</i>`;
    btnEditar.innerHTML = `<i class="material-icons" title="Edit">&#xE254;</i>`;
    btnDelete.className = "btnDelete";
    btnEditar.className = "btnEditar";
    inputCheck.className = "checkbox";
    inputCheck.type = "checkbox";
    tdCheck.appendChild(inputCheck);
    tdName.innerText = name;
    tdEmail.innerText = email;
    tdAddress.innerText = address;
    tdPhone.innerText = phone;

    tdDelete.appendChild(btnDelete);
    tdEditar.appendChild(btnEditar);
    tr.appendChild(tdCheck);
    tr.appendChild(tdName);
    tr.appendChild(tdEmail);
    tr.appendChild(tdAddress);
    tr.appendChild(tdPhone);
    tr.appendChild(tdEditar);
    tr.appendChild(tdDelete);
    tBody.appendChild(tr);
}

const loadApi = async () => {
    try {
        const api = await axios.get("https://5f7c70d600bd74001690ac5e.mockapi.io/users")
        console.log("lo que hay en api.data es", api.data);
        api.data.forEach(item => {
            showDataTable(item.fullname, item.email, item.address, item.phone);
        })
    } catch(err) {
        console.log("ERROR", err);
    }
}


const load = () => {
    const inputSearch = document.querySelector("#search");
    const addNewUserButton = document.querySelector("#add-new-user-button");
    const addNewUserButtonClose = document.querySelector("#new-user-close");
    const addNewUserButtonCancel = document.querySelector("#new-user-cancel");


    console.log("el inputsearch es:", inputSearch);
    inputSearch.addEventListener("keypress",(e) => {
        if (e.key === 'Enter'){
            search();
        }
    });

    addNewUserButton.addEventListener("click", toggleNewUserModal);
    addNewUserButtonClose.addEventListener("click", toggleNewUserModal);
    addNewUserButtonCancel.addEventListener("click", toggleNewUserModal);
    loadApi();
}

// //Filtrar:
const search = async () => {
    console.log("LLamaste al search!");
    const inputSearch = document.querySelector("#search").value;
    console.log(`El valor es: ${inputSearch}`);
    //TODO: validar(inputSearch) 
    vaciarTabla();

    try {
        const api = await axios.get("https://5f7c70d600bd74001690ac5e.mockapi.io/users")
        const resBusqueda = api.data.filter(item => item.fullname == inputSearch || item.email == inputSearch || item.address == inputSearch || item.phone == inputSearch);
        console.log("El resBusqueda es", resBusqueda);
        showDataTable(resBusqueda[0].fullname, resBusqueda[0].email, resBusqueda[0].address, resBusqueda[0].phone)
    } catch(err) {
        console.log("ERROR", err);
    }
}

// //ADD NEW USER MODAL

const toggleNewUserModal = () => {
    const newUserModal = document.querySelector("#new-user-modal");
    newUserModal.classList.toggle("show-modal");
}


// 4-Al hacer click en el botón Nuevo, mostrar en un modal un formulario con los siguientes datos y un botón de guardar:

// Nombre (Máximo 50 carácteres)
// Dirección (Máximo 60 carácteres)
// Telefono (Solo números, espacios y/o guiones medios. Validar el formato utilizando expresiones regulares)
// Email (Validar el formato utilizando expresiones regulares)
// Al hacer click en el botón guardar, primero se debe validar que los campos sean válidos. En caso afirmativo, hacer un POST a la ruta /users enviando el objeto con las 4 propiedades (fullname, email, address, phone).




/*const search = async() => {
    const inputSearch = document.querySelector("#search");

    try {
        const response = await axios.get(`https://api.thecatapi.com/v1/breeds/search?q=${inputSearch.value}`)
        const gatitos = response.data;

        const html = gatitos.reduce((html,gatito)=>{
            return html+`
            <tr>
             <td>${gatito.name}</td>
             <td>${gatito.weight.metric}</td>
             <td>${gatito.origin}</td>
             <td>${gatito.temperament}</td>
             <td>${gatito.description}</td>
            </tr>
            `
        },"")

        document.querySelector("#table-search").innerHTML=`<table>
        <thead>
        <tr>
          <th>Nombre</th>
          <th>Peso</th>
          <th>Origen</th>
          <th>Temperamento</th>
          <th>Descripcion</th>
        </tr>
        </thead>
        <tbody>
        ${html}
        </tbody>
        </table>`;

        console.log({gatitos,html});
    } catch (error) {
        console.log(error)
    }

    let tableHtml = `<table>
    <thead>
    <tr>
      <th>Nombre</th>
      <th>Peso</th>
      <th>Origen</th>
      <th>Temperamento</th>
      <th>Descripcion</th>
    </tr>
    </thead>`
    
    

  
   
}*/