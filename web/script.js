// Definir la función sumLastThreePrices fuera del evento DOMContentLoaded
function sumLastThreePrices(prices) {
    console.log('Iniciando la suma de los últimos tres precios:', prices);

    const lastThreePrices = prices.slice(-3); // Obtener las últimas tres transacciones
    console.log('Últimas tres transacciones:', lastThreePrices);
    const sum = lastThreePrices.reduce((acc, transaction) => acc + parseFloat(transaction.price), 0);

    console.log('Suma de los últimos tres precios:', sum);

    // Mostrar la suma en el elemento con id 'sumDisplay'
    const sumDisplay = document.getElementById('sumDisplay');

    if (sumDisplay) {
        sumDisplay.textContent = `Suma de los últimos tres precios: ${sum}`;
        // Puedes hacer algo más con la suma si es necesario
        console.log('Finalizando la operación.');
    } else {
        console.error('Elemento con ID "sumDisplay" no encontrado.');
    }
    return sum;
}


document.addEventListener('DOMContentLoaded', () => {
    const formElement = document.getElementById("saveTransaction");

    if (formElement) {
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

                // Llamar a la función de suma con los datos actualizados
                fetch('http://localhost:3000/transactions')
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(`Error en la solicitud: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Transacciones obtenidas:', data);
                        sumLastThreePrices(data);
                    })
                    .catch(error => console.error('Error:', error));
            })
            .catch(error => console.error('Error:', error));
        });
    } else {
        console.error('Elemento con ID "saveTransaction" no encontrado.');
    }

    // Al cargar la página, obtener las transacciones existentes
    fetch('http://localhost:3000/transactions')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Llamar a la función de suma con los datos iniciales
            sumLastThreePrices(data);
        })
        .catch(error => console.error('Error:', error));
});

// Exportar la función para que esté disponible en las pruebas
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = { sumLastThreePrices };
}
