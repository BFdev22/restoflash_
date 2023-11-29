// import createRegistre from "../server/controller/registre.controller";

document.getElementById('submitRegistre').addEventListener('click', function(){

    const qte = document.getElementById('qte').value;
    const date = document.getElementById('date').value;

    const dataRegistre = {
        quantite: qte,
        date: date
    }

    // createRegistre(dataRegistre);
    
    fetch('/registres', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataRegistre)
    })
    .then(response => {
        console.log(response);
    })
    .catch(error => {
        console.log(error);
    })
});