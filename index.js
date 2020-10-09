const showDataTable = (name, email, address, phone) => {
    const tBody = document.querySelector("#main-tabla_tbody");
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    const tdEmail = document.createElement("td");
    const tdAddress = document.createElement("td");
    const tdPhone = document.createElement("td");
    const tdCheck = document.createElement("td");
    const inputCheck = document.createElement("input");

    inputCheck.className = "checkbox";
    inputCheck.type = "checkbox";
    tdCheck.appendChild(inputCheck);
    tdName.innerText = name;
    tdEmail.innerText = email;
    tdAddress.innerText = address;
    tdPhone.innerText = phone;
    //console.log(td);
    //console.log(name);
    tr.appendChild(tdCheck);
    tr.appendChild(tdName);
    tr.appendChild(tdEmail);
    tr.appendChild(tdAddress);
    tr.appendChild(tdPhone);
    tBody.appendChild(tr);
}

const loadApi = async () => {
    /*    try {
        const inputRaza = document.querySelector("#busq").value;
        const respApiRaza = await axios.get(`https://api.thecatapi.com/v1/breeds/search?q=${inputRaza}`);
        addRowCat_table(respApiRaza.data[0]);
        activateCat_table();

    } catch(err) {
        console.log("ERROR", err)
    }*/
    try {
        const api = await axios.get("https://5f7c70d600bd74001690ac5e.mockapi.io/users")
        console.log("la respuesta es:", api.data);
        console.log("una fila de la respuesta es:", api.data[0]);
        api.data.forEach(item => {
            console.log("El nombre es", item.fullname);
            //showDataTable(item.fullname);  
            showDataTable(item.fullname, item.email, item.address, item.phone);
        })
    } catch(err) {
        console.log("ERROR", err);
    }   
}


const load = () => {
    loadApi();
}