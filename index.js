let users = [];

const vaciarTabla = () => {
    const trALL = document.querySelectorAll("#main-tabla_tbody > tr");
    trALL.forEach(tr=>tr.remove());
};

const showDataTable = (id, name, email, address, phone) => {

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

    tr.id = 'tr-' + id;
    btnDelete.innerHTML = `<i class="material-icons" title="Delete">&#xE872;</i>`;
    btnEditar.innerHTML = `<i class="material-icons" title="Edit">&#xE254;</i>`;
    btnDelete.className = "btnDelete";
    btnEditar.className = "btnEditar";
    btnDelete.addEventListener('click', () => {btnDeleteUser(id)});
    btnEditar.addEventListener('click', () => {toggleEditUserModal(id)});
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
};

const btnDeleteUser = id => {
    document.querySelector(`#tr-${id}`).remove();
    deleteUserApi(id);
};

const deleteUserApi = async (id) => {
    try {
        const res = await axios.delete(`https://5f7c70d600bd74001690ac5e.mockapi.io/users/${id}`);
    }catch(err) {
        console.log(err)
    }
};

const loadApi = async () => {

    try {
        const api = await axios.get("https://5f7c70d600bd74001690ac5e.mockapi.io/users")
        api.data.forEach(item => {
            showDataTable(item.id, item.fullname, item.email, item.address, item.phone);
        });
        users = api.data;
    } catch(err) {
        console.log("ERROR", err);
    }
};

const load = () => {
    const inputSearch = document.querySelector("#search");
    const addNewUserButton = document.querySelector("#add-new-user-button");
    const addNewUserButtonClose = document.querySelector("#new-user-close");
    const addNewUserButtonCancel = document.querySelector("#new-user-cancel");

    
    const editUserButtonClose = document.querySelector("#edit-user-close");
    const editUserButtonCancel = document.querySelector("#edit-user-cancel");

    inputSearch.addEventListener("keydown",(e) => {
        if (e.keyCode == 13 || e.keyCode ==  8){
            search();
        }
    });

    addNewUserButton.addEventListener("click", toggleNewUserModal);
    addNewUserButtonClose.addEventListener("click", toggleNewUserModal);
    addNewUserButtonCancel.addEventListener("click", toggleNewUserModal);

    
    editUserButtonClose.addEventListener("click", toggleEditUserModal);
    editUserButtonCancel.addEventListener("click", toggleEditUserModal);
    loadApi(); 

    const add = document.querySelector('#new-user-form');
    add.addEventListener("submit", addNewUserToApi); 
};

const editUserToApi = async (id) => {
    try {
        let editUser = {
            fullname: document.querySelector('#input-name-edit').value,
            address: document.querySelector('#input-address-edit').value,
            phone: document.querySelector('#input-phone-edit').value,
            email: document.querySelector('#input-email-edit').value
        }
        const res = await axios.put(`https://5f7c70d600bd74001690ac5e.mockapi.io/users/${id}`, editUser)
        window.location.reload();
    }catch(err) {
        console.log(err)
    }
};

const addNewUserToApi = async (event) => {   

    const fullname = document.querySelector('#input-name').value;
    const address = document.querySelector('#input-address').value;
    const phone = document.querySelector('#input-phone').value;
    const email = document.querySelector('#input-email').value;

    event.preventDefault();
    try{
        let newUser = {
            fullname,
            address,
            phone, 
            email 
        }
    
        const res = await axios.post("https://5f7c70d600bd74001690ac5e.mockapi.io/users/", newUser)
        toggleNewUserModal();
        window.location.reload();

    }catch (err) {
        console.log(err)
    }
};


const search = async () => {
    const inputSearch = document.querySelector("#search").value.toLowerCase();
    vaciarTabla();

    try {
        const api = await axios.get("https://5f7c70d600bd74001690ac5e.mockapi.io/users")
        const resBusqueda = api.data.filter(item =>
            item.fullname.toLowerCase().indexOf(inputSearch) > -1 || String(item.nivel).indexOf(inputSearch) > -1 == inputSearch || 
            item.email.toLowerCase().indexOf(inputSearch) > -1 || String(item.nivel).indexOf(inputSearch) > -1 == inputSearch || 
            item.address.toLowerCase().indexOf(inputSearch) > -1 || String(item.nivel).indexOf(inputSearch) > -1 == inputSearch || 
            item.phone.toLowerCase().indexOf(inputSearch) > -1 || String(item.nivel).indexOf(inputSearch) > -1 == inputSearch );
        
            resBusqueda.forEach(item => {
                showDataTable(item.id, item.fullname, item.email, item.address, item.phone)
            });
                
    } catch(err) {
        console.log("ERROR", err);
    }

};

const toggleNewUserModal = () => {
    const newUserModal = document.querySelector("#new-user-modal");
    newUserModal.classList.toggle("show-modal");
};

const toggleEditUserModal = (id) => {

    const editUserModal = document.querySelector("#edit-user-modal");
    editUserModal.classList.toggle("show-modal");

    const user = users.find(data => data.id === id);
    if (user) {
        document.querySelector('#input-name-edit').value = user.fullname;
        document.querySelector('#input-address-edit').value = user.address;
        document.querySelector('#input-phone-edit').value = user.phone;
        document.querySelector('#input-email-edit').value = user.email;

        const edit = document.querySelector('#edit-user-form');
        edit.addEventListener("submit", (event) => {
            event.preventDefault();
            editUserToApi(id)
        });
    }
};
