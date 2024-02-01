-- Crear una tabla para almacenar transacciones
CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar algunas transacciones de ejemplo
INSERT INTO transactions (description, price) VALUES
('Motul 5100', 3),
('Elf evolution Vpower', 8),
('Total semi-sintetico', 6);
