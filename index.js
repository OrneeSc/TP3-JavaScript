const showDataTable = ({name}) => {
    const tBody = document.querySelector("#main-tabla_tbody");
    const td = document.createElement(td);

    td.innerText = name;
    console.log(td);
    tBody.appendChild(td);

}



const load = () => {
    const nombre = ["Stefania"];
    showDataTable(nombre);
    console.log(`hola nueva web! @mirinnes`);


}