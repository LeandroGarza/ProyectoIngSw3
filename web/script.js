const formElement = document.getElementById("saveTransaction");

formElement.addEventListener("submit", (event) => {
    event.preventDefault();

    let TransactionDescription = document.getElementById("TransactionDescription").value.trim();
    let TransactionPrice = document.getElementById("TransactionPrice").value.trim();

    // Verificar que los campos no estén vacíos
    if (TransactionDescription === "" || TransactionPrice === "") {
        console.log("Por favor, complete todos los campos.");
        return;
    }

    let transaction = {
        description: TransactionDescription,
        price: TransactionPrice
    };
    
    let transactionJson = JSON.stringify(transaction);

    console.log("Datos a enviar:", transaction);

    fetch('http://localhost:3000/transactions', {
        method: 'POST',
        body: transactionJson,
        headers: {
            'Content-Type': 'application/json' // Asegúrate de establecer el encabezado Content-Type
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // La transacción se ha guardado correctamente, puedes hacer algo con la respuesta si es necesario
        console.log(data);
    })
    .catch(error => console.error('Error:', error));
});

// Al cargar la página, obtener las transacciones existentes
fetch('http://localhost:3000/transactions')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
