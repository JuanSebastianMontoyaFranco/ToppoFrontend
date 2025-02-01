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