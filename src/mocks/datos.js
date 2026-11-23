// "Base de datos" de la API simulada. Las fechas usan el formato ISO AAAA-MM-DD
// y los precios están en pesos chilenos.

export const destinos = [
  {
    id: 'cusco',
    nombre: 'Cusco',
    pais: 'Perú',
    descripcion: 'Antigua capital del Imperio inca, punto de partida hacia Machu Picchu y el Valle Sagrado.',
    idioma: 'Español y quechua',
    moneda: 'Sol peruano (PEN)',
    actividades: ['Machu Picchu', 'Valle Sagrado', 'Montaña de Siete Colores'],
  },
  {
    id: 'cancun',
    nombre: 'Cancún',
    pais: 'México',
    descripcion: 'Playas de arena blanca en el Caribe mexicano, cerca de cenotes y ruinas mayas.',
    idioma: 'Español',
    moneda: 'Peso mexicano (MXN)',
    actividades: ['Playas del Caribe', 'Chichén Itzá', 'Nado en cenotes'],
  },
  {
    id: 'madrid',
    nombre: 'Madrid',
    pais: 'España',
    descripcion: 'Museos de primer nivel, parques amplios y una vida nocturna que empieza tarde.',
    idioma: 'Español',
    moneda: 'Euro (EUR)',
    actividades: ['Museo del Prado', 'Parque del Retiro', 'Tapas en La Latina'],
  },
  {
    id: 'buenos-aires',
    nombre: 'Buenos Aires',
    pais: 'Argentina',
    descripcion: 'Barrios con identidad propia, tango, librerías y una gastronomía reconocida.',
    idioma: 'Español',
    moneda: 'Peso argentino (ARS)',
    actividades: ['Caminito en La Boca', 'Tango en San Telmo', 'Teatro Colón'],
  },
  {
    id: 'rio-de-janeiro',
    nombre: 'Río de Janeiro',
    pais: 'Brasil',
    descripcion: 'Ciudad entre cerros y playas, con miradores icónicos y ambiente festivo.',
    idioma: 'Portugués',
    moneda: 'Real brasileño (BRL)',
    actividades: ['Cristo Redentor', 'Pan de Azúcar', 'Playa de Copacabana'],
  },
  {
    id: 'tokio',
    nombre: 'Tokio',
    pais: 'Japón',
    descripcion: 'Metrópolis que combina templos tradicionales con tecnología y barrios vibrantes.',
    idioma: 'Japonés',
    moneda: 'Yen (JPY)',
    actividades: ['Templo Senso-ji', 'Cruce de Shibuya', 'Excursión al monte Fuji'],
  },
  {
    id: 'san-pedro-de-atacama',
    nombre: 'San Pedro de Atacama',
    pais: 'Chile',
    descripcion: 'Pueblo en el desierto más árido del mundo, con salares, géiseres y cielos despejados.',
    idioma: 'Español',
    moneda: 'Peso chileno (CLP)',
    actividades: ['Valle de la Luna', 'Géiseres del Tatio', 'Observación astronómica'],
  },
]

// Vuelos de ida y vuelta desde Santiago. precio: por pasajero.
export const vuelos = [
  { id: 'v-cus-1', destinoId: 'cusco', aerolinea: 'Andes Air', codigo: 'AA 412', origen: 'Santiago (SCL)', fechaSalida: '2027-01-15', fechaRegreso: '2027-01-22', precio: 389990, asientosDisponibles: 12 },
  { id: 'v-cus-2', destinoId: 'cusco', aerolinea: 'Cóndor Vuelos', codigo: 'CV 208', origen: 'Santiago (SCL)', fechaSalida: '2027-02-03', fechaRegreso: '2027-02-10', precio: 352500, asientosDisponibles: 3 },
  { id: 'v-can-1', destinoId: 'cancun', aerolinea: 'Pacífico Airlines', codigo: 'PA 901', origen: 'Santiago (SCL)', fechaSalida: '2027-01-20', fechaRegreso: '2027-01-30', precio: 812000, asientosDisponibles: 8 },
  { id: 'v-can-2', destinoId: 'cancun', aerolinea: 'Andes Air', codigo: 'AA 730', origen: 'Santiago (SCL)', fechaSalida: '2027-03-05', fechaRegreso: '2027-03-12', precio: 745900, asientosDisponibles: 0 },
  { id: 'v-mad-1', destinoId: 'madrid', aerolinea: 'Pacífico Airlines', codigo: 'PA 1150', origen: 'Santiago (SCL)', fechaSalida: '2027-04-10', fechaRegreso: '2027-04-24', precio: 1149000, asientosDisponibles: 21 },
  { id: 'v-mad-2', destinoId: 'madrid', aerolinea: 'Cóndor Vuelos', codigo: 'CV 1402', origen: 'Santiago (SCL)', fechaSalida: '2027-05-02', fechaRegreso: '2027-05-12', precio: 1089500, asientosDisponibles: 5 },
  { id: 'v-bue-1', destinoId: 'buenos-aires', aerolinea: 'Cóndor Vuelos', codigo: 'CV 115', origen: 'Santiago (SCL)', fechaSalida: '2027-01-08', fechaRegreso: '2027-01-12', precio: 198990, asientosDisponibles: 30 },
  { id: 'v-bue-2', destinoId: 'buenos-aires', aerolinea: 'Andes Air', codigo: 'AA 120', origen: 'Santiago (SCL)', fechaSalida: '2027-02-14', fechaRegreso: '2027-02-18', precio: 224500, asientosDisponibles: 14 },
  { id: 'v-rio-1', destinoId: 'rio-de-janeiro', aerolinea: 'Pacífico Airlines', codigo: 'PA 560', origen: 'Santiago (SCL)', fechaSalida: '2027-02-06', fechaRegreso: '2027-02-13', precio: 456000, asientosDisponibles: 9 },
  { id: 'v-tyo-1', destinoId: 'tokio', aerolinea: 'Pacífico Airlines', codigo: 'PA 2001', origen: 'Santiago (SCL)', fechaSalida: '2027-03-20', fechaRegreso: '2027-04-03', precio: 1890000, asientosDisponibles: 0 },
  { id: 'v-tyo-2', destinoId: 'tokio', aerolinea: 'Andes Air', codigo: 'AA 2310', origen: 'Santiago (SCL)', fechaSalida: '2027-04-01', fechaRegreso: '2027-04-15', precio: 1745000, asientosDisponibles: 0 },
  { id: 'v-spa-1', destinoId: 'san-pedro-de-atacama', aerolinea: 'Cóndor Vuelos', codigo: 'CV 60', origen: 'Santiago (SCL)', fechaSalida: '2027-01-10', fechaRegreso: '2027-01-14', precio: 159990, asientosDisponibles: 18 },
]

// Hoteles con el rango de fechas en que tienen habitaciones. precioNoche: habitación doble.
export const hoteles = [
  { id: 'h-cus-1', destinoId: 'cusco', nombre: 'Casa del Inca', estrellas: 4, precioNoche: 78000, disponibleDesde: '2027-01-01', disponibleHasta: '2027-02-28', habitacionesDisponibles: 6 },
  { id: 'h-cus-2', destinoId: 'cusco', nombre: 'Hostal San Blas', estrellas: 3, precioNoche: 42000, disponibleDesde: '2027-01-10', disponibleHasta: '2027-01-31', habitacionesDisponibles: 2 },
  { id: 'h-can-1', destinoId: 'cancun', nombre: 'Resort Arena Blanca', estrellas: 5, precioNoche: 185000, disponibleDesde: '2027-01-01', disponibleHasta: '2027-03-31', habitacionesDisponibles: 10 },
  { id: 'h-can-2', destinoId: 'cancun', nombre: 'Hotel Laguna', estrellas: 3, precioNoche: 69000, disponibleDesde: '2027-02-15', disponibleHasta: '2027-04-15', habitacionesDisponibles: 4 },
  { id: 'h-mad-1', destinoId: 'madrid', nombre: 'Hotel Gran Vía', estrellas: 4, precioNoche: 112000, disponibleDesde: '2027-04-01', disponibleHasta: '2027-05-31', habitacionesDisponibles: 7 },
  { id: 'h-mad-2', destinoId: 'madrid', nombre: 'Pensión Lavapiés', estrellas: 2, precioNoche: 48000, disponibleDesde: '2027-05-01', disponibleHasta: '2027-06-30', habitacionesDisponibles: 0 },
  { id: 'h-bue-1', destinoId: 'buenos-aires', nombre: 'Palermo Suites', estrellas: 4, precioNoche: 64000, disponibleDesde: '2027-01-01', disponibleHasta: '2027-03-31', habitacionesDisponibles: 9 },
  { id: 'h-bue-2', destinoId: 'buenos-aires', nombre: 'Hotel San Telmo', estrellas: 3, precioNoche: 39000, disponibleDesde: '2027-02-01', disponibleHasta: '2027-02-28', habitacionesDisponibles: 3 },
  { id: 'h-rio-1', destinoId: 'rio-de-janeiro', nombre: 'Copacabana Mar', estrellas: 4, precioNoche: 95000, disponibleDesde: '2027-01-15', disponibleHasta: '2027-03-15', habitacionesDisponibles: 5 },
  { id: 'h-tyo-1', destinoId: 'tokio', nombre: 'Asakusa Garden Hotel', estrellas: 4, precioNoche: 132000, disponibleDesde: '2027-03-01', disponibleHasta: '2027-04-30', habitacionesDisponibles: 8 },
  // San Pedro de Atacama no tiene hoteles: sirve para probar el estado vacío.
]