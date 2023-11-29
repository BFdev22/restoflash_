document.getElementById('submitRegistre').addEventListener('click', function(){

    const qte = document.getElementById('qte').value;
    const date = document.getElementById('date').value;

    const dataRegistre = {
        quantite: qte,
        date: date
    }
    
    fetch('http://localhost:3000/registres', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataRegistre)
    })
    .then(response => {
        alert('Registre crée avec succés')
    })
    .catch(error => {
        console.log(error);
    })
});