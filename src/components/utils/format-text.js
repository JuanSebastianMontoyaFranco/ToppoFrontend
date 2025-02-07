// Función para traducir los valores de "field"
export const getFieldLabel = (field) => {
    switch (field) {
        case 'inventory_quantity':
            return 'Inventario';
        case 'price':
            return 'Precio';
        case 'status':
            return 'Estado';
        default:
            return field;
    }
};

export const getStatusLabel = (field) => {
    switch (field) {
        case 'update':
            return 'Actualizado';
        case 'create':
            return 'Creado';
        default:
            return field;
    }
};

export const truncateText = (text, maxLength = 35) => {
    if (!text) return ""; // Manejo de valores nulos o indefinidos
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};
