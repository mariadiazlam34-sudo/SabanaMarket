import React, { useState } from 'react';
import {
  View, Text, TextInput, FlatList, ScrollView, Pressable,
  StyleSheet, StatusBar, Platform, Image,
} from 'react-native';

/* ============ MARCA (HU01) ============ */
const MARCA = {
  nombre: 'Sabana Market',
  eslogan: 'Lo mejor de la Sabana, en tu bolsillo',
  iniciales: 'SM',
  logo: require('./sabanamarket.png'), // pon null para mostrar solo las iniciales
  color1: '#0F766E', // verde azulado
  color2: '#F59E0B', // ámbar
};
const CATEGORIAS = ['Tecnología', 'Hogar', 'Deporte', 'Mascotas'];

/* ============ ENVÍO Y ESTADOS (HU26, HU27) ============ */
const MUNICIPIOS = ['Mosquera', 'Funza', 'Madrid'];
const TARIFAS = {
  Mosquera: { estandar: 6000, expres: 10000 },
  Funza: { estandar: 8000, expres: 12000 },
  Madrid: { estandar: 10000, expres: 14000 },
};
const PLAZOS = {
  Mosquera: { estandar: '1 a 2 días', expres: '1 día' },
  Funza: { estandar: '2 a 3 días', expres: '1 a 2 días' },
  Madrid: { estandar: '2 a 3 días', expres: '1 a 2 días' },
};
const FLUJO = ['Confirmado', 'Preparando', 'En camino', 'Entregado'];
const REPOSICION = 10; // unidades que agrega la reposición de demostración

/* ============ DATOS INICIALES (HU03, HU21) ============ */
// El stock vive SOLO en cada variante; el del producto se calcula sumándolas.
const unica = (id, precio, stock) => [{ id: id + '-U', etiqueta: 'Única', precio, stock }];
const INICIAL = [
  { id: 'PROD-001', nombre: 'Audífonos Bluetooth', marca: 'Sonora', categoria: 'Tecnología', descripcion: 'Audífonos inalámbricos con 20 horas de batería.', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQBPNTdgTDz4dwl_sZ6pmUP4pyS4Y_jkwpEGbg-ggMKdd2NzDvJDomca8&s=10', variantes: [
      { id: 'PROD-001-N', etiqueta: 'Negro', precio: 89000, stock: 5 },
      { id: 'PROD-001-B', etiqueta: 'Blanco', precio: 89000, stock: 3 },
      { id: 'PROD-001-A', etiqueta: 'Azul', precio: 95000, stock: 0 },
    ] },
  { id: 'PROD-002', nombre: 'Cargador rápido USB-C', marca: 'Voltix', categoria: 'Tecnología', descripcion: 'Cargador de 30W compatible con la mayoría de celulares.', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPFstza8zJP1boAEzVSfuyVdGzSNlxR421-11cocSZoLM5Dha2NYAvkHQK&s=10', variantes: unica('PROD-002', 45000, 15) },
  { id: 'PROD-003', nombre: 'Mouse inalámbrico', marca: 'Clickra', categoria: 'Tecnología', descripcion: 'Mouse ergonómico silencioso con receptor USB.', imagen: 'https://panamericana.vtexassets.com/arquivos/ids/532180/mouse-inalambrico-1-hora-rat001-negro-6974368773033.jpg?v=638442150952330000', variantes: unica('PROD-003', 62000, 0) },
  { id: 'PROD-004', nombre: 'Lámpara LED de escritorio', marca: 'Lumina', categoria: 'Hogar', descripcion: 'Lámpara con tres niveles de brillo y brazo flexible.', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQptVSr_pSVuZ5t-JSiFKI1R3QFR03jNUc3BqlW6IVpyw&s=10', variantes: unica('PROD-004', 54000, 10) },
  { id: 'PROD-005', nombre: 'Set de ollas 3 piezas', marca: 'Cocina Viva', categoria: 'Hogar', descripcion: 'Ollas antiadherentes con tapa de vidrio templado.', imagen: 'https://hogaruniversal.vtexassets.com/arquivos/ids/168503/L72408-OLLA-6-ULTRA-TV-20CM-01.jpg.jpg?v=638824008866670000', variantes: unica('PROD-005', 180000, 4) },
  { id: 'PROD-006', nombre: 'Organizador de cocina', marca: 'Orden Plus', categoria: 'Hogar', descripcion: 'Organizador de dos niveles para especias y utensilios.', imagen: 'https://exitocol.vteximg.com.br/arquivos/ids/18252234/organizador-especias-cocina-especiero-condimenteros-movible.jpg?v=638188337003430000', variantes: unica('PROD-006', 32000, 20) },
  { id: 'PROD-007', nombre: 'Balón de fútbol', marca: 'GolPro', categoria: 'Deporte', descripcion: 'Balón cosido a máquina, ideal para cancha.', imagen: 'https://deportesregol.com/cdn/shop/files/927201_Balon_Futbol_Golty_Latir_No.jpg?v=1742199984', variantes: [
      { id: 'PROD-007-T4', etiqueta: 'Talla 4', precio: 70000, stock: 6 },
      { id: 'PROD-007-T5', etiqueta: 'Talla 5', precio: 75000, stock: 6 },
    ] },
  { id: 'PROD-008', nombre: 'Cuerda para saltar', marca: 'Salto', categoria: 'Deporte', descripcion: 'Cuerda ajustable con mangos antideslizantes.', imagen: 'https://http2.mlstatic.com/D_NQ_NP_663959-MLA99632749117_112025-O.webp', variantes: unica('PROD-008', 18000, 30) },
  { id: 'PROD-009', nombre: 'Botella térmica', marca: 'Termo Sur', categoria: 'Deporte', descripcion: 'Mantiene el agua fría por 24 horas, acero inoxidable.', imagen: 'https://verdepluma.com.co/cdn/shop/files/06_LIGHT-750-02.webp?v=1791406327&width=720', variantes: [
      { id: 'PROD-009-500', etiqueta: '500 ml', precio: 42000, stock: 4 },
      { id: 'PROD-009-750', etiqueta: '750 ml', precio: 48000, stock: 5 },
    ] },
  { id: 'PROD-010', nombre: 'Cama para perro', marca: 'Patitas', categoria: 'Mascotas', descripcion: 'Cama acolchada y lavable para perros.', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrRlPXHkO5Etn08Z4HpQAuv-xxe56RQimmehu8CO8bDA&s', variantes: [
      { id: 'PROD-010-P', etiqueta: 'Pequeña', precio: 95000, stock: 3 },
      { id: 'PROD-010-M', etiqueta: 'Mediana', precio: 120000, stock: 5 },
      { id: 'PROD-010-G', etiqueta: 'Grande', precio: 150000, stock: 0 },
    ] },
  { id: 'PROD-011', nombre: 'Rascador para gatos', marca: 'Gatuno', categoria: 'Mascotas', descripcion: 'Torre rascadora con plataforma y juguete colgante.', imagen: 'https://http2.mlstatic.com/D_NQ_NP_816118-MCO112925589672_072026-O.webp', variantes: unica('PROD-011', 95000, 6) },
  { id: 'PROD-012', nombre: 'Juguete masticable', marca: 'Mordi', categoria: 'Mascotas', descripcion: 'Hueso de caucho resistente para perros activos.', imagen: 'https://http2.mlstatic.com/D_NQ_NP_628827-MCO96981303393_112025-O.webp', variantes: unica('PROD-012', 15000, 25) },
];

/* ============ UTILIDADES ============ */
const cop = (n) => '$' + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const iniciales = (n) => n.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');
const ahora = () => new Date().toLocaleString();
const stockTotal = (p) => p.variantes.reduce((a, v) => a + v.stock, 0);
const precioDesde = (p) => Math.min(...p.variantes.map((v) => v.precio));
const precioHasta = (p) => Math.max(...p.variantes.map((v) => v.precio));
const textoPrecio = (p) => (precioDesde(p) === precioHasta(p) ? cop(precioDesde(p)) : 'Desde ' + cop(precioDesde(p)));
const nombreVar = (nombre, etiqueta) => (etiqueta === 'Única' ? nombre : `${nombre} · ${etiqueta}`);
const nomMod = (m) => (m === 'expres' ? 'Exprés' : 'Estándar');
const disponibilidad = (p) => (stockTotal(p) > 0 ? `Disponible (${stockTotal(p)})` : 'Agotado');

// Un pedido guarda una COPIA de precios, nombres y dirección (HU15, "pedidos inmutables")
const armarPedido = ({ codigo, items, hasta, comprador, direccion, modalidad, fecha }) => {
  const subtotal = items.reduce((a, i) => a + i.cantidad * i.precio, 0);
  const envio = TARIFAS[direccion.municipio][modalidad];
  return {
    codigo, fecha, items, subtotal, envio,
    total: subtotal + envio,
    estado: hasta,
    eventos: FLUJO.slice(0, FLUJO.indexOf(hasta) + 1).map((e) => ({ estado: e, fecha })),
    comprador, direccion, modalidad, plazo: PLAZOS[direccion.municipio][modalidad],
  };
};

/* ---- Pedidos de prueba para verificar el seguimiento ---- */
const itemDe = (varId, cantidad) => {
  for (const p of INICIAL) {
    const v = p.variantes.find((x) => x.id === varId);
    if (v) return { productoId: p.id, varianteId: v.id, nombre: p.nombre, etiqueta: v.etiqueta, cantidad, precio: v.precio };
  }
  return null;
};
const COMPRADOR_PRUEBA = { nombre: 'Ana Prueba', telefono: '3000000000' };
const dirPrueba = (municipio) => ({ alias: 'Dirección de prueba', municipio, referencia: 'Casa ficticia de ejemplo' });
const base = { comprador: COMPRADOR_PRUEBA, fecha: 'Datos de prueba' };
const PEDIDOS_PRUEBA = [
  armarPedido({ ...base, codigo: 'PED-0001', items: [itemDe('PROD-002-U', 2)], hasta: 'Confirmado', direccion: dirPrueba('Mosquera'), modalidad: 'estandar' }),
  armarPedido({ ...base, codigo: 'PED-0002', items: [itemDe('PROD-001-N', 1), itemDe('PROD-006-U', 1)], hasta: 'Preparando', direccion: dirPrueba('Funza'), modalidad: 'expres' }),
  armarPedido({ ...base, codigo: 'PED-0003', items: [itemDe('PROD-007-T5', 1)], hasta: 'En camino', direccion: dirPrueba('Madrid'), modalidad: 'estandar' }),
  armarPedido({ ...base, codigo: 'PED-0004', items: [itemDe('PROD-012-U', 3)], hasta: 'Entregado', direccion: dirPrueba('Mosquera'), modalidad: 'expres' }),
];
// Los pedidos de prueba ya "descontaron" su stock: se resta una sola vez al iniciar.
const PRODUCTOS_INICIALES = INICIAL.map((p) => ({
  ...p,
  variantes: p.variantes.map((v) => ({
    ...v,
    stock: v.stock - PEDIDOS_PRUEBA.flatMap((o) => o.items).filter((i) => i.varianteId === v.id).reduce((a, i) => a + i.cantidad, 0),
  })),
}));
const PREGUNTAS_INICIALES = [
  { id: 'Q-1', productoId: 'PROD-001', texto: '¿Cuánto dura la batería?', fecha: 'Ejemplo', estado: 'Respondida', respuesta: 'Respuesta de ejemplo (simulada): unas 20 horas de uso continuo.' },
  { id: 'Q-2', productoId: 'PROD-009', texto: '¿La botella mantiene el agua fría?', fecha: 'Ejemplo', estado: 'Respondida', respuesta: 'Respuesta de ejemplo (simulada): hasta 24 horas.' },
];

const FILTROS_INI = { marca: 'Todas', disp: 'Todas', min: 0, max: Infinity };
const dirVacia = { id: null, alias: '', municipio: '', referencia: '' };
const ticketVacio = { pedido: '', motivo: '', descripcion: '' };

export default function App() {
  /* ----- Estado global (en memoria) ----- */
  const [productos, setProductos] = useState(PRODUCTOS_INICIALES);
  const [favoritos, setFavoritos] = useState([]);
  const [carrito, setCarrito] = useState([]); // [{ productoId, varianteId, cantidad }]
  const [pedidos, setPedidos] = useState(PEDIDOS_PRUEBA);
  const [comparar, setComparar] = useState([]); // ids de 2 a 3 productos
  const [direcciones, setDirecciones] = useState([]);
  const [notifs, setNotifs] = useState([]);
  const [suscripciones, setSuscripciones] = useState([]); // avisos de reposición
  const [preguntas, setPreguntas] = useState(PREGUNTAS_INICIALES);
  const [tickets, setTickets] = useState([]);

  /* ----- Navegación ----- */
  const [pantalla, setPantalla] = useState('catalogo');
  const [seleccionadoId, setSeleccionadoId] = useState(null);
  const [pedidoSel, setPedidoSel] = useState(null);
  const [previa, setPrevia] = useState('catalogo');
  const [confirmCancel, setConfirmCancel] = useState(null);

  /* ----- Catálogo y filtros (HU04 a HU06, HU23) ----- */
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('Todas');
  const [orden, setOrden] = useState('ninguno');
  const [filtros, setFiltros] = useState(FILTROS_INI);
  const [minTxt, setMinTxt] = useState('');
  const [maxTxt, setMaxTxt] = useState('');
  const [errorPrecio, setErrorPrecio] = useState('');
  const [verFiltros, setVerFiltros] = useState(false);

  /* ----- Detalle ----- */
  const [varSelId, setVarSelId] = useState(null);
  const [cantSel, setCantSel] = useState(1);
  const [preguntaTxt, setPreguntaTxt] = useState('');
  const [errPreg, setErrPreg] = useState('');

  /* ----- Checkout ----- */
  const [paso, setPaso] = useState('form'); // form | resumen | confirmado
  const [comprador, setComprador] = useState({ nombre: '', telefono: '' });
  const [dirSelId, setDirSelId] = useState(null);
  const [modalidad, setModalidad] = useState(null);
  const [errorForm, setErrorForm] = useState('');
  const [ultimoCodigo, setUltimoCodigo] = useState('');

  /* ----- Formularios: direcciones y ayuda ----- */
  const [df, setDf] = useState(dirVacia);
  const [errorDf, setErrorDf] = useState('');
  const [hf, setHf] = useState(ticketVacio);
  const [errorHf, setErrorHf] = useState('');

  /* ----- Mensajes (HU16) ----- */
  const [toast, setToast] = useState(null);
  const avisar = (msg, tipo = 'ok') => {
    setToast({ msg, tipo });
    setTimeout(() => setToast(null), 2800);
  };

  /* ============ CÁLCULOS DEL CARRITO (HU11, HU26) ============ */
  const lineas = carrito
    .map((l) => {
      const p = productos.find((x) => x.id === l.productoId);
      const v = p && p.variantes.find((x) => x.id === l.varianteId);
      return p && v ? { ...l, producto: p, variante: v } : null;
    })
    .filter(Boolean);
  const dir = direcciones.find((d) => d.id === dirSelId) || null;
  const subtotal = lineas.reduce((acc, l) => acc + l.cantidad * l.variante.precio, 0);
  // El envío se CALCULA a partir de dirección y modalidad: nunca se acumula, así no se suma dos veces.
  const envio = subtotal === 0 || !dir || !modalidad ? 0 : TARIFAS[dir.municipio][modalidad];
  const total = subtotal + envio;
  const unidades = carrito.reduce((a, l) => a + l.cantidad, 0);
  const sinLeer = notifs.filter((n) => !n.leida).length;

  /* ============ NAVEGACIÓN ============ */
  const ir = (p) => {
    setPantalla(p);
    setPedidoSel(null);
    setConfirmCancel(null);
    if (p === 'carrito') setPaso('form');
  };
  const abrirDetalle = (id) => {
    if (pantalla !== 'detalle') setPrevia(pantalla);
    setSeleccionadoId(id);
    setVarSelId(null);
    setCantSel(1);
    setPreguntaTxt('');
    setErrPreg('');
    setPantalla('detalle');
  };

  /* ============ NOTIFICACIONES (HU29) ============ */
  // "clave" identifica el evento: si ya existe, no se crea una copia.
  const notificar = (clave, tipo, mensaje, ref) => {
    setNotifs((prev) => (prev.some((n) => n.clave === clave)
      ? prev
      : [{ id: 'NOT-' + (prev.length + 1), clave, tipo, mensaje, ref, fecha: ahora(), leida: false }, ...prev]));
  };
  const abrirNotif = (id) => setNotifs((prev) => prev.map((n) => (n.id === id ? { ...n, leida: true } : n)));

  /* ============ FAVORITOS, COMPARADOR, FILTROS ============ */
  const alternarFavorito = (id) => setFavoritos((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  const alternarComparar = (id) => {
    if (comparar.includes(id)) return setComparar(comparar.filter((x) => x !== id));
    if (comparar.length >= 3) return avisar('Solo puedes comparar hasta 3 productos', 'error');
    setComparar([...comparar, id]);
  };

  const aplicarPrecio = () => {
    const min = minTxt.trim() === '' ? 0 : Number(minTxt);
    const max = maxTxt.trim() === '' ? Infinity : Number(maxTxt);
    if (Number.isNaN(min) || Number.isNaN(max) || min < 0 || max < 0) return setErrorPrecio('Escribe valores numéricos positivos');
    if (min > max) return setErrorPrecio('El precio mínimo no puede ser mayor que el máximo');
    setErrorPrecio('');
    setFiltros({ ...filtros, min, max });
  };

  const restablecer = () => {
    setBusqueda(''); setCategoria('Todas'); setOrden('ninguno');
    setFiltros(FILTROS_INI); setMinTxt(''); setMaxTxt(''); setErrorPrecio('');
  };

  /* ============ CARRITO (HU09, HU10, HU21) ============ */
  const agregar = (p, v, cant) => {
    if (!v) return avisar('Elige una opción (talla, color o presentación) antes de agregar', 'error');
    if (v.stock <= 0) return avisar('Esta opción está agotada', 'error');
    const linea = carrito.find((l) => l.varianteId === v.id);
    const maximo = v.stock - (linea ? linea.cantidad : 0);
    if (cant > maximo) {
      return avisar(maximo <= 0
        ? 'Ya tienes todo el stock de esta opción en el carrito'
        : `Máximo permitido: ${maximo} unidad(es) más`, 'error');
    }
    setCarrito(linea
      ? carrito.map((l) => (l.varianteId === v.id ? { ...l, cantidad: l.cantidad + cant } : l))
      : [...carrito, { productoId: p.id, varianteId: v.id, cantidad: cant }]);
    avisar(`${nombreVar(p.nombre, v.etiqueta)} agregado al carrito`);
  };

  const cambiarCantidad = (varId, delta) => {
    const l = lineas.find((x) => x.varianteId === varId);
    const nueva = l.cantidad + delta;
    if (nueva < 1) return eliminar(varId);
    if (nueva > l.variante.stock) return avisar('No hay más stock disponible', 'error');
    setCarrito(carrito.map((x) => (x.varianteId === varId ? { ...x, cantidad: nueva } : x)));
  };

  const eliminar = (varId) => {
    setCarrito(carrito.filter((l) => l.varianteId !== varId));
    avisar('Producto quitado del carrito');
  };

  /* ============ COMPRA (HU12, HU13, HU14, HU25, HU26) ============ */
  const validarCompra = () => {
    const faltan = [];
    if (!comprador.nombre.trim()) faltan.push('nombre');
    if (!comprador.telefono.trim()) faltan.push('teléfono');
    if (!dir) faltan.push('dirección de entrega');
    if (!modalidad) faltan.push('modalidad de envío');
    return faltan.length ? `Falta completar: ${faltan.join(', ')}` : '';
  };

  const continuarCheckout = () => {
    const err = validarCompra();
    setErrorForm(err);
    if (!err) setPaso('resumen');
  };

  const confirmarCompra = () => {
    if (lineas.length === 0) return avisar('El carrito está vacío', 'error');
    const err = validarCompra();
    if (err) { setPaso('form'); return setErrorForm(err); }
    // Se verifica TODO el stock antes de descontar nada
    const corto = lineas.find((l) => l.cantidad > l.variante.stock);
    if (corto) {
      return avisar(`Sin stock suficiente de "${nombreVar(corto.producto.nombre, corto.variante.etiqueta)}". No se realizó el pedido.`, 'error');
    }
    const codigo = 'PED-' + String(pedidos.length + 1).padStart(4, '0');
    const pedido = armarPedido({
      codigo, hasta: 'Confirmado', modalidad, fecha: ahora(),
      items: lineas.map((l) => ({
        productoId: l.productoId, varianteId: l.varianteId, nombre: l.producto.nombre,
        etiqueta: l.variante.etiqueta, cantidad: l.cantidad, precio: l.variante.precio,
      })),
      comprador: { ...comprador },
      direccion: { alias: dir.alias, municipio: dir.municipio, referencia: dir.referencia },
    });
    setProductos(productos.map((p) => ({
      ...p,
      variantes: p.variantes.map((v) => {
        const l = lineas.find((x) => x.varianteId === v.id);
        return l ? { ...v, stock: Math.max(0, v.stock - l.cantidad) } : v;
      }),
    })));
    setPedidos([pedido, ...pedidos]);
    notificar(`pedido:${codigo}:Confirmado`, 'Pedido', `Pedido ${codigo}: estado Confirmado`, codigo);
    setCarrito([]);
    setModalidad(null);
    setUltimoCodigo(codigo);
    setPaso('confirmado');
  };

  /* ============ SEGUIMIENTO Y CANCELACIÓN (HU27, HU28) ============ */
  const cambiarEstado = (codigo, nuevo) => {
    setPedidos((prev) => prev.map((o) => (o.codigo === codigo
      ? { ...o, estado: nuevo, eventos: [...o.eventos, { estado: nuevo, fecha: ahora() }] }
      : o)));
    notificar(`pedido:${codigo}:${nuevo}`, 'Pedido', `Pedido ${codigo}: estado ${nuevo}`, codigo);
  };

  const avanzar = (codigo) => {
    const o = pedidos.find((x) => x.codigo === codigo);
    if (o.estado === 'Entregado' || o.estado === 'Cancelado') {
      return avisar(`El pedido está ${o.estado}: no admite más transiciones`, 'error');
    }
    cambiarEstado(codigo, FLUJO[FLUJO.indexOf(o.estado) + 1]); // siempre el siguiente: no se salta estados
  };

  const solicitarCancelacion = (o) => {
    if (o.estado === 'Cancelado') return avisar('Este pedido ya está cancelado', 'error');
    if (o.estado !== 'Confirmado' && o.estado !== 'Preparando') {
      return avisar(`No se puede cancelar: el pedido ya está ${o.estado}`, 'error');
    }
    setConfirmCancel(o.codigo);
  };

  const cancelar = (codigo) => {
    const o = pedidos.find((x) => x.codigo === codigo);
    // La guarda de estado impide reintegrar dos veces
    if (o.estado !== 'Confirmado' && o.estado !== 'Preparando') return avisar('Este pedido ya no se puede cancelar', 'error');
    setProductos(productos.map((p) => ({
      ...p,
      variantes: p.variantes.map((v) => {
        const it = o.items.find((i) => i.varianteId === v.id);
        return it ? { ...v, stock: v.stock + it.cantidad } : v;
      }),
    })));
    cambiarEstado(codigo, 'Cancelado');
    setConfirmCancel(null);
    avisar('Pedido cancelado y stock restituido');
  };

  /* ============ AVISOS DE REPOSICIÓN (HU30) ============ */
  const avisarme = (p, v) => {
    if (suscripciones.some((s) => s.varianteId === v.id)) return avisar('Ya tienes un aviso activo para esta opción', 'error');
    setSuscripciones([...suscripciones, { id: 'SUB-' + Date.now(), productoId: p.id, varianteId: v.id }]);
    avisar('Te avisaremos cuando haya stock');
  };
  const cancelarAviso = (varId) => {
    setSuscripciones(suscripciones.filter((s) => s.varianteId !== varId));
    avisar('Aviso cancelado');
  };
  const simularReposicion = (p, v) => {
    if (v.stock > 0) return;
    setProductos(productos.map((x) => (x.id !== p.id ? x : {
      ...x, variantes: x.variantes.map((y) => (y.id === v.id ? { ...y, stock: y.stock + REPOSICION } : y)),
    })));
    suscripciones.filter((s) => s.varianteId === v.id).forEach((s) => {
      notificar(`repo:${s.id}`, 'Reposición', `Ya hay stock de ${nombreVar(p.nombre, v.etiqueta)}`, p.id);
    });
    setSuscripciones(suscripciones.filter((s) => s.varianteId !== v.id));
    avisar(`Reposición simulada: +${REPOSICION} unidades`);
  };

  /* ============ PREGUNTAS (HU24) ============ */
  const enviarPregunta = (pid) => {
    if (preguntaTxt.trim().length < 10) return setErrPreg('La pregunta debe tener al menos 10 caracteres');
    setPreguntas([...preguntas, { id: 'Q-' + Date.now(), productoId: pid, texto: preguntaTxt.trim(), fecha: ahora(), estado: 'Pendiente', respuesta: '' }]);
    setPreguntaTxt('');
    setErrPreg('');
    avisar('Pregunta enviada. Estado: Pendiente');
  };
  const simularRespuesta = (qid) => {
    setPreguntas(preguntas.map((q) => (q.id === qid
      ? { ...q, estado: 'Respondida', respuesta: 'Respuesta automática de demostración (no la escribió una persona real).' }
      : q)));
  };

  /* ============ DIRECCIONES (HU25) ============ */
  const guardarDireccion = () => {
    if (!df.alias.trim()) return setErrorDf('El alias es obligatorio');
    if (!df.municipio) return setErrorDf('Elige un municipio');
    if (df.referencia.trim().length < 5) return setErrorDf('La referencia de entrega debe tener al menos 5 caracteres');
    const datos = { alias: df.alias.trim(), municipio: df.municipio, referencia: df.referencia.trim() };
    if (df.id) {
      setDirecciones(direcciones.map((d) => (d.id === df.id ? { ...d, ...datos } : d)));
      avisar('Dirección actualizada');
    } else {
      setDirecciones([...direcciones, { id: 'DIR-' + Date.now(), ...datos, principal: direcciones.length === 0 }]);
      avisar('Dirección agregada');
    }
    setDf(dirVacia);
    setErrorDf('');
  };
  // Solo una principal; la "seleccionada" es la que usarás en este pedido (dirSelId)
  const hacerPrincipal = (id) => setDirecciones(direcciones.map((d) => ({ ...d, principal: d.id === id })));

  /* ============ AYUDA (HU32) ============ */
  const enviarTicket = () => {
    const errs = [];
    if (!hf.pedido) errs.push('selecciona un pedido');
    if (!hf.motivo) errs.push('elige un motivo');
    if (hf.descripcion.trim().length < 15) errs.push('la descripción debe tener al menos 15 caracteres');
    if (errs.length) return setErrorHf('Revisa: ' + errs.join('; '));
    const id = 'CASO-' + String(tickets.length + 1).padStart(4, '0');
    setTickets([{ id, pedido: hf.pedido, motivo: hf.motivo, descripcion: hf.descripcion.trim(), fecha: ahora(), estado: 'Abierto', respuesta: '' }, ...tickets]);
    setHf(ticketVacio);
    setErrorHf('');
    avisar(`Solicitud ${id} creada`);
  };
  const simularRespuestaTicket = (id) => {
    setTickets(tickets.map((t) => (t.id === id
      ? { ...t, estado: 'Respondido', respuesta: 'Respuesta de prueba (simulada): tu caso fue revisado.' }
      : t)));
  };

  /* ============ PANTALLAS ============ */
  const tarjeta = (p) => (
    <View style={s.card}>
      <Pressable style={s.cardFila} onPress={() => abrirDetalle(p.id)}>
        <Foto key={p.imagen} producto={p} />
        <View style={{ flex: 1 }}>
          <Text style={s.cardTitulo}>{p.nombre}</Text>
          <Text style={s.gris}>{p.marca} · {p.categoria}</Text>
          <Text style={s.precio}>{textoPrecio(p)}</Text>
          <Text style={{ color: stockTotal(p) > 0 ? '#15803D' : '#B91C1C', fontWeight: '600' }}>{disponibilidad(p)}</Text>
        </View>
      </Pressable>
      <View style={s.cardAcciones}>
        <Pressable onPress={() => alternarFavorito(p.id)} hitSlop={8}>
          <Text style={s.link}>{favoritos.includes(p.id) ? 'En favoritos' : 'Favorito'}</Text>
        </Pressable>
        <Pressable onPress={() => alternarComparar(p.id)} hitSlop={8}>
          <Text style={s.link}>{comparar.includes(p.id) ? 'Quitar de comparación' : 'Comparar'}</Text>
        </Pressable>
      </View>
    </View>
  );

  const renderCatalogo = () => {
    const marcas = [...new Set(productos.map((p) => p.marca))];
    let lista = productos.filter((p) =>
      p.nombre.toLowerCase().includes(busqueda.trim().toLowerCase()) &&
      (categoria === 'Todas' || p.categoria === categoria) &&
      (filtros.marca === 'Todas' || p.marca === filtros.marca) &&
      (filtros.disp === 'Todas' || (filtros.disp === 'Disponible') === (stockTotal(p) > 0)) &&
      p.variantes.some((v) => v.precio >= filtros.min && v.precio <= filtros.max));
    if (orden === 'asc') lista = [...lista].sort((a, b) => precioDesde(a) - precioDesde(b));
    if (orden === 'desc') lista = [...lista].sort((a, b) => precioDesde(b) - precioDesde(a));

    const cabecera = (
      <View>
        <TextInput style={s.input} placeholder="Buscar producto..." value={busqueda} onChangeText={setBusqueda} />
        <View style={s.fila}>
          {['Todas', ...CATEGORIAS].map((c) => (
            <Chip key={c} texto={c} activo={categoria === c} onPress={() => setCategoria(c)} />
          ))}
        </View>
        <View style={s.fila}>
          <Chip texto="Menor a mayor" activo={orden === 'asc'} onPress={() => setOrden('asc')} />
          <Chip texto="Mayor a menor" activo={orden === 'desc'} onPress={() => setOrden('desc')} />
          <Chip texto="Sin orden" activo={orden === 'ninguno'} onPress={() => setOrden('ninguno')} />
        </View>
        <View style={s.fila}>
          <Chip texto={verFiltros ? 'Ocultar filtros' : 'Más filtros'} activo={verFiltros} onPress={() => setVerFiltros(!verFiltros)} />
          <Chip texto={`Comparar (${comparar.length})`} onPress={() => ir('comparador')} />
          <Chip texto="Restablecer" onPress={restablecer} />
        </View>
        {verFiltros && (
          <View style={s.caja}>
            <Text style={s.subtitulo}>Marca</Text>
            <View style={s.fila}>
              {['Todas', ...marcas].map((m) => (
                <Chip key={m} texto={m} activo={filtros.marca === m} onPress={() => setFiltros({ ...filtros, marca: m })} />
              ))}
            </View>
            <Text style={s.subtitulo}>Disponibilidad</Text>
            <View style={s.fila}>
              {['Todas', 'Disponible', 'Agotado'].map((d) => (
                <Chip key={d} texto={d} activo={filtros.disp === d} onPress={() => setFiltros({ ...filtros, disp: d })} />
              ))}
            </View>
            <Text style={s.subtitulo}>Rango de precio (COP)</Text>
            <View style={s.fila}>
              <TextInput style={[s.input, { flex: 1, marginBottom: 0 }]} placeholder="Mínimo" keyboardType="numeric" value={minTxt} onChangeText={setMinTxt} />
              <TextInput style={[s.input, { flex: 1, marginBottom: 0 }]} placeholder="Máximo" keyboardType="numeric" value={maxTxt} onChangeText={setMaxTxt} />
              <Boton texto="Aplicar" onPress={aplicarPrecio} />
            </View>
            {!!errorPrecio && <Text style={s.error}>{errorPrecio}</Text>}
          </View>
        )}
      </View>
    );

    return (
      <FlatList
        data={lista}
        keyExtractor={(p) => p.id}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={cabecera}
        ListEmptyComponent={<Vacio texto="No encontramos productos" accion="Restablecer filtros" onAccion={restablecer} />}
        renderItem={({ item }) => tarjeta(item)}
      />
    );
  };

  const renderDetalle = () => {
    const p = productos.find((x) => x.id === seleccionadoId);
    if (!p) return <Vacio texto="Producto no encontrado" accion="Volver al catálogo" onAccion={() => ir('catalogo')} />;
    const v = p.variantes.length === 1 ? p.variantes[0] : p.variantes.find((x) => x.id === varSelId) || null;
    const susc = v ? suscripciones.some((x) => x.varianteId === v.id) : false;
    const susPreguntas = preguntas.filter((q) => q.productoId === p.id);
    const relacionados = productos
      .filter((x) => x.categoria === p.categoria && x.id !== p.id && stockTotal(x) > 0)
      .slice(0, 4);

    return (
      <ScrollView key={p.id} keyboardShouldPersistTaps="handled">
        <Boton texto="← Volver" tipo="sec" onPress={() => ir(previa)} />
        <View style={{ alignSelf: 'center', marginVertical: 12 }}>
          <Foto key={p.imagen} producto={p} tam={180} />
        </View>
        <Text style={s.titulo}>{p.nombre}</Text>
        <Text style={s.gris}>{p.marca} · {p.categoria}</Text>
        <Text style={[s.precio, { fontSize: 24 }]}>{v ? cop(v.precio) : textoPrecio(p)}</Text>
        <Text style={{ marginVertical: 8 }}>{p.descripcion}</Text>

        {p.variantes.length > 1 && (
          <View>
            <Text style={s.subtitulo}>Elige una opción</Text>
            <View style={s.fila}>
              {p.variantes.map((x) => (
                <Chip key={x.id} texto={x.stock > 0 ? x.etiqueta : `${x.etiqueta} (agotada)`} activo={varSelId === x.id} onPress={() => setVarSelId(x.id)} />
              ))}
            </View>
          </View>
        )}

        <Text style={{ fontWeight: '700', color: (v ? v.stock : stockTotal(p)) > 0 ? '#15803D' : '#B91C1C' }}>
          {v ? (v.stock > 0 ? `Stock de esta opción: ${v.stock} unidades` : 'AGOTADO') : `Stock total: ${stockTotal(p)} unidades`}
        </Text>

        {v && v.stock === 0 && (
          <View style={s.caja}>
            {susc
              ? <Boton texto="Cancelar aviso de reposición" tipo="sec" onPress={() => cancelarAviso(v.id)} />
              : <Boton texto="Avisarme cuando haya stock" onPress={() => avisarme(p, v)} />}
            <Boton texto={`Simular reposición (demostración, +${REPOSICION})`} tipo="sec" onPress={() => simularReposicion(p, v)} />
          </View>
        )}

        <View style={[s.fila, { marginTop: 10 }]}>
          <Text style={s.subtitulo}>Cantidad</Text>
          <Pressable style={s.mini} onPress={() => setCantSel(Math.max(1, cantSel - 1))}><Text style={s.miniTxt}>−</Text></Pressable>
          <Text style={{ fontWeight: '700', minWidth: 24, textAlign: 'center' }}>{cantSel}</Text>
          <Pressable style={s.mini} onPress={() => setCantSel(cantSel + 1)}><Text style={s.miniTxt}>+</Text></Pressable>
        </View>
        <View style={s.fila}>
          <Boton texto="Agregar al carrito" deshabilitado={!!v && v.stock <= 0} onPress={() => agregar(p, v, cantSel)} />
          <Boton texto={favoritos.includes(p.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'} tipo="sec" onPress={() => alternarFavorito(p.id)} />
          <Boton texto={comparar.includes(p.id) ? 'Quitar de comparación' : 'Comparar'} tipo="sec" onPress={() => alternarComparar(p.id)} />
        </View>

        <Text style={[s.subtitulo, { marginTop: 14 }]}>Preguntas</Text>
        {susPreguntas.length === 0 && <Text style={s.gris}>Este producto aún no tiene preguntas.</Text>}
        {susPreguntas.map((q) => (
          <View key={q.id} style={s.caja}>
            <Text style={{ fontWeight: '700' }}>{q.texto}</Text>
            <Text style={s.gris}>{q.fecha} · {q.estado}</Text>
            {q.estado === 'Respondida'
              ? <Text style={{ marginTop: 4 }}>{q.respuesta}</Text>
              : <Boton texto="Simular respuesta (demostración)" tipo="sec" onPress={() => simularRespuesta(q.id)} />}
          </View>
        ))}
        <TextInput style={s.input} placeholder="Escribe tu pregunta (mínimo 10 caracteres)" value={preguntaTxt} onChangeText={setPreguntaTxt} />
        {!!errPreg && <Text style={s.error}>{errPreg}</Text>}
        <Boton texto="Enviar pregunta" onPress={() => enviarPregunta(p.id)} />

        <Text style={[s.subtitulo, { marginTop: 14 }]}>Productos relacionados</Text>
        {relacionados.length === 0
          ? <Text style={s.gris}>No hay otros productos disponibles en esta categoría.</Text>
          : relacionados.map((x) => <View key={x.id}>{tarjeta(x)}</View>)}
      </ScrollView>
    );
  };

  const renderFavoritos = () => (
    <FlatList
      data={productos.filter((p) => favoritos.includes(p.id))}
      keyExtractor={(p) => p.id}
      ListEmptyComponent={<Vacio texto="No tienes favoritos guardados" accion="Ir al catálogo" onAccion={() => ir('catalogo')} />}
      renderItem={({ item }) => tarjeta(item)}
    />
  );

  const renderComparador = () => {
    const lista = comparar.map((id) => productos.find((p) => p.id === id)).filter(Boolean);
    if (lista.length < 2) {
      return <Vacio texto={`Selecciona entre 2 y 3 productos para compararlos (llevas ${lista.length})`} accion="Ir al catálogo" onAccion={() => ir('catalogo')} />;
    }
    return (
      <ScrollView>
        <Text style={s.subtitulo}>Comparador</Text>
        <View style={{ flexDirection: 'row', gap: 8 }}>
          {lista.map((p) => (
            <View key={p.id} style={[s.caja, { flex: 1 }]}>
              <Text style={s.cardTitulo}>{p.nombre}</Text>
              <Text style={s.gris}>Marca</Text>
              <Text>{p.marca}</Text>
              <Text style={[s.gris, { marginTop: 6 }]}>Precio</Text>
              <Text style={s.precio}>{textoPrecio(p)}</Text>
              <Text style={[s.gris, { marginTop: 6 }]}>Disponibilidad</Text>
              <Text>{disponibilidad(p)}</Text>
              <Boton texto="Ver detalle" onPress={() => abrirDetalle(p.id)} />
              <Boton texto="Quitar" tipo="sec" onPress={() => alternarComparar(p.id)} />
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };

  const renderCarrito = () => {
    if (paso === 'confirmado') {
      return (
        <View style={s.centro}>
          <Text style={s.titulo}>¡Pedido {ultimoCodigo} confirmado!</Text>
          <Text style={[s.gris, { textAlign: 'center', marginVertical: 8 }]}>
            Esta es una SIMULACIÓN académica: no se realizó ningún cobro real.
          </Text>
          <Boton texto="Ver mis pedidos" onPress={() => ir('historial')} />
          <Boton texto="Seguir comprando" tipo="sec" onPress={() => ir('catalogo')} />
        </View>
      );
    }
    if (lineas.length === 0) {
      return <Vacio texto="Tu carrito está vacío" accion="Ir al catálogo" onAccion={() => ir('catalogo')} />;
    }
    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        {lineas.map((l) => (
          <View key={l.varianteId} style={s.card}>
            <View style={s.cardFila}>
              <View style={{ flex: 1 }}>
                <Text style={s.cardTitulo}>{nombreVar(l.producto.nombre, l.variante.etiqueta)}</Text>
                <Text style={s.gris}>{cop(l.variante.precio)} c/u</Text>
                <Text style={s.precio}>{cop(l.cantidad * l.variante.precio)}</Text>
              </View>
              {paso === 'form' ? (
                <View style={{ alignItems: 'center' }}>
                  <View style={s.fila}>
                    <Pressable style={s.mini} onPress={() => cambiarCantidad(l.varianteId, -1)}><Text style={s.miniTxt}>−</Text></Pressable>
                    <Text style={{ fontWeight: '700', marginHorizontal: 8 }}>{l.cantidad}</Text>
                    <Pressable style={s.mini} onPress={() => cambiarCantidad(l.varianteId, 1)}><Text style={s.miniTxt}>+</Text></Pressable>
                  </View>
                  <Pressable onPress={() => eliminar(l.varianteId)}><Text style={{ color: '#B91C1C', marginTop: 6 }}>Eliminar</Text></Pressable>
                </View>
              ) : (
                <Text style={{ fontWeight: '700' }}>x{l.cantidad}</Text>
              )}
            </View>
          </View>
        ))}

        <View style={s.caja}>
          <Fila a="Subtotal" b={cop(subtotal)} />
          <Fila a="Envío" b={dir && modalidad ? cop(envio) : 'Por definir'} />
          <Fila a="Total" b={cop(total)} fuerte />
          {dir && modalidad && (
            <Text style={s.gris}>Envío {nomMod(modalidad)} a {dir.municipio}: {PLAZOS[dir.municipio][modalidad]}</Text>
          )}
        </View>

        {paso === 'form' ? (
          <View style={s.caja}>
            <Text style={s.subtitulo}>Datos de contacto</Text>
            <TextInput style={s.input} placeholder="Nombre completo (ficticio)" value={comprador.nombre} onChangeText={(t) => setComprador({ ...comprador, nombre: t })} />
            <TextInput style={s.input} placeholder="Teléfono" keyboardType="phone-pad" value={comprador.telefono} onChangeText={(t) => setComprador({ ...comprador, telefono: t })} />

            <Text style={s.subtitulo}>Dirección de entrega</Text>
            {direcciones.length === 0 ? (
              <View>
                <Text style={s.gris}>Aún no tienes direcciones registradas.</Text>
                <Boton texto="Agregar una dirección" tipo="sec" onPress={() => ir('direcciones')} />
              </View>
            ) : (
              <View style={s.fila}>
                {direcciones.map((d) => (
                  <Chip key={d.id} texto={`${d.alias} · ${d.municipio}${d.principal ? ' (principal)' : ''}`} activo={dirSelId === d.id} onPress={() => setDirSelId(d.id)} />
                ))}
              </View>
            )}

            <Text style={s.subtitulo}>Modalidad de envío</Text>
            <View style={s.fila}>
              {['estandar', 'expres'].map((m) => (
                <Chip key={m} texto={dir ? `${nomMod(m)} · ${cop(TARIFAS[dir.municipio][m])}` : nomMod(m)} activo={modalidad === m} onPress={() => setModalidad(m)} />
              ))}
            </View>

            {!!errorForm && <Text style={s.error}>{errorForm}</Text>}
            <Text style={s.gris}>Prototipo académico: usa datos ficticios, sin datos bancarios ni sensibles.</Text>
            <Boton texto="Continuar al resumen" onPress={continuarCheckout} />
          </View>
        ) : (
          <View style={s.caja}>
            <Text style={s.subtitulo}>Entregar a</Text>
            <Text>{comprador.nombre} · {comprador.telefono}</Text>
            <Text>{dir.alias} · {dir.municipio}</Text>
            <Text>{dir.referencia}</Text>
            <Text style={s.gris}>Envío {nomMod(modalidad)} · plazo {PLAZOS[dir.municipio][modalidad]}</Text>
            <Text style={[s.gris, { marginVertical: 6 }]}>Simulación sin cobro real.</Text>
            <Boton texto="Confirmar compra" onPress={confirmarCompra} />
            <Boton texto="← Editar datos" tipo="sec" onPress={() => setPaso('form')} />
          </View>
        )}
      </ScrollView>
    );
  };

  const renderHistorial = () => {
    const o = pedidoSel ? pedidos.find((x) => x.codigo === pedidoSel) : null;
    if (o) {
      const final = o.estado === 'Entregado' || o.estado === 'Cancelado';
      return (
        <ScrollView>
          <Boton texto="← Volver a mis pedidos" tipo="sec" onPress={() => ir('historial')} />
          <Text style={s.titulo}>{o.codigo}</Text>
          <Text style={s.gris}>{o.fecha}</Text>
          <Text style={[s.subtitulo, { color: MARCA.color1 }]}>Estado: {o.estado}</Text>
          <Text style={s.gris}>Entregar a: {o.comprador.nombre} · {o.comprador.telefono}</Text>
          <Text style={s.gris}>{o.direccion.alias} · {o.direccion.municipio} · {o.direccion.referencia}</Text>
          <Text style={[s.gris, { marginBottom: 8 }]}>Envío {nomMod(o.modalidad)} · plazo {o.plazo}</Text>
          {o.items.map((it) => (
            <View key={it.varianteId} style={s.card}>
              <View style={[s.cardFila, { justifyContent: 'space-between' }]}>
                <View style={{ flex: 1 }}>
                  <Text style={s.cardTitulo}>{nombreVar(it.nombre, it.etiqueta)}</Text>
                  <Text style={s.gris}>{it.cantidad} x {cop(it.precio)}</Text>
                </View>
                <Text style={s.precio}>{cop(it.cantidad * it.precio)}</Text>
              </View>
            </View>
          ))}
          <View style={s.caja}>
            <Fila a="Subtotal" b={cop(o.subtotal)} />
            <Fila a="Envío" b={cop(o.envio)} />
            <Fila a="Total" b={cop(o.total)} fuerte />
          </View>
          <View style={s.caja}>
            <Text style={s.subtitulo}>Seguimiento</Text>
            {o.eventos.map((e, i) => <Text key={i}>{e.estado} · <Text style={s.gris}>{e.fecha}</Text></Text>)}
          </View>
          <Boton texto="Simular avance de entrega" deshabilitado={final} onPress={() => avanzar(o.codigo)} />
          {final && <Text style={s.gris}>Pedido {o.estado.toLowerCase()}: no admite más transiciones.</Text>}
          {confirmCancel === o.codigo ? (
            <View style={s.caja}>
              <Text style={{ fontWeight: '700' }}>¿Confirmas la cancelación de {o.codigo}?</Text>
              <Boton texto="Sí, cancelar pedido" onPress={() => cancelar(o.codigo)} />
              <Boton texto="No, mantenerlo" tipo="sec" onPress={() => setConfirmCancel(null)} />
            </View>
          ) : (
            <Boton texto="Cancelar pedido" tipo="sec" onPress={() => solicitarCancelacion(o)} />
          )}
        </ScrollView>
      );
    }
    return (
      <FlatList
        data={pedidos}
        keyExtractor={(x) => x.codigo}
        ListEmptyComponent={<Vacio texto="No hay pedidos registrados" accion="Ir al catálogo" onAccion={() => ir('catalogo')} />}
        renderItem={({ item }) => (
          <Pressable style={s.card} onPress={() => setPedidoSel(item.codigo)}>
            <View style={[s.cardFila, { justifyContent: 'space-between' }]}>
              <View style={{ flex: 1 }}>
                <Text style={s.cardTitulo}>{item.codigo}</Text>
                <Text style={s.gris}>{item.fecha}</Text>
                <Text style={{ color: MARCA.color1, fontWeight: '700' }}>{item.estado}</Text>
              </View>
              <Text style={s.precio}>{cop(item.total)}</Text>
            </View>
          </Pressable>
        )}
      />
    );
  };

  const renderNotificaciones = () => (
    <FlatList
      data={notifs}
      keyExtractor={(n) => n.id}
      ListEmptyComponent={<Vacio texto="No tienes notificaciones" accion="Ir al catálogo" onAccion={() => ir('catalogo')} />}
      renderItem={({ item }) => (
        <Pressable style={[s.card, !item.leida && { borderLeftWidth: 4, borderColor: MARCA.color2 }]} onPress={() => abrirNotif(item.id)}>
          <View style={{ flex: 1 }}>
            <Text style={s.cardTitulo}>{item.mensaje}</Text>
            <Text style={s.gris}>{item.tipo} · {item.fecha} · {item.leida ? 'Leída' : 'Nueva'}</Text>
          </View>
        </Pressable>
      )}
    />
  );

  const renderDirecciones = () => (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Text style={s.subtitulo}>{df.id ? 'Editar dirección' : 'Nueva dirección'} (datos ficticios)</Text>
      <TextInput style={s.input} placeholder="Alias (ej. Casa)" value={df.alias} onChangeText={(t) => setDf({ ...df, alias: t })} />
      <View style={s.fila}>
        {MUNICIPIOS.map((m) => <Chip key={m} texto={m} activo={df.municipio === m} onPress={() => setDf({ ...df, municipio: m })} />)}
      </View>
      <TextInput style={s.input} placeholder="Referencia de entrega" value={df.referencia} onChangeText={(t) => setDf({ ...df, referencia: t })} />
      {!!errorDf && <Text style={s.error}>{errorDf}</Text>}
      <Boton texto={df.id ? 'Guardar cambios' : 'Guardar dirección'} onPress={guardarDireccion} />
      {df.id && <Boton texto="Cancelar edición" tipo="sec" onPress={() => { setDf(dirVacia); setErrorDf(''); }} />}
      <Text style={[s.subtitulo, { marginTop: 16 }]}>Mis direcciones ({direcciones.length})</Text>
      {direcciones.length === 0 && <Text style={s.gris}>Aún no tienes direcciones registradas.</Text>}
      {direcciones.map((d) => (
        <View key={d.id} style={s.card}>
          <View style={{ flex: 1 }}>
            <Text style={s.cardTitulo}>{d.alias}{d.principal ? ' (principal)' : ''}</Text>
            <Text style={s.gris}>{d.municipio} · {d.referencia}</Text>
          </View>
          <View style={{ alignItems: 'flex-end', gap: 6 }}>
            {!d.principal && <Pressable onPress={() => hacerPrincipal(d.id)}><Text style={s.link}>Hacer principal</Text></Pressable>}
            <Pressable onPress={() => { setDf({ id: d.id, alias: d.alias, municipio: d.municipio, referencia: d.referencia }); setErrorDf(''); }}><Text style={s.link}>Editar</Text></Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
  );

  const renderAyuda = () => (
    <ScrollView keyboardShouldPersistTaps="handled">
      <Text style={s.subtitulo}>Nueva solicitud de ayuda</Text>
      {pedidos.length === 0 ? (
        <Vacio texto="Aún no tienes pedidos para reportar" accion="Ir al catálogo" onAccion={() => ir('catalogo')} />
      ) : (
        <View>
          <Text style={s.gris}>Pedido</Text>
          <View style={s.fila}>
            {pedidos.map((o) => <Chip key={o.codigo} texto={o.codigo} activo={hf.pedido === o.codigo} onPress={() => setHf({ ...hf, pedido: o.codigo })} />)}
          </View>
          <Text style={s.gris}>Motivo</Text>
          <View style={s.fila}>
            {['Entrega', 'Producto', 'Otro'].map((m) => <Chip key={m} texto={m} activo={hf.motivo === m} onPress={() => setHf({ ...hf, motivo: m })} />)}
          </View>
          <TextInput style={s.input} placeholder="Describe el problema (mínimo 15 caracteres)" value={hf.descripcion} onChangeText={(t) => setHf({ ...hf, descripcion: t })} />
          {!!errorHf && <Text style={s.error}>{errorHf}</Text>}
          <Boton texto="Enviar solicitud" onPress={enviarTicket} />
        </View>
      )}
      <Text style={[s.subtitulo, { marginTop: 16 }]}>Mis solicitudes ({tickets.length})</Text>
      {tickets.length === 0 && <Text style={s.gris}>Aún no has creado solicitudes.</Text>}
      {tickets.map((t) => (
        <View key={t.id} style={s.caja}>
          <Text style={s.cardTitulo}>{t.id} · {t.estado}</Text>
          <Text style={s.gris}>{t.pedido} · {t.motivo} · {t.fecha}</Text>
          <Text style={{ marginVertical: 4 }}>{t.descripcion}</Text>
          {t.estado === 'Respondido'
            ? <Text>{t.respuesta}</Text>
            : <Boton texto="Simular respuesta (demostración)" tipo="sec" onPress={() => simularRespuestaTicket(t.id)} />}
        </View>
      ))}
    </ScrollView>
  );

  const renderMas = () => (
    <ScrollView>
      <Text style={s.subtitulo}>Más opciones</Text>
      <Boton texto="Mis direcciones" onPress={() => ir('direcciones')} />
      <Boton texto={`Comparador (${comparar.length})`} onPress={() => ir('comparador')} />
      <Boton texto="Centro de ayuda" onPress={() => ir('ayuda')} />
    </ScrollView>
  );

  const secciones = {
    catalogo: renderCatalogo, detalle: renderDetalle, favoritos: renderFavoritos, comparador: renderComparador,
    carrito: renderCarrito, historial: renderHistorial, notificaciones: renderNotificaciones,
    direcciones: renderDirecciones, ayuda: renderAyuda, mas: renderMas,
  };

  const tabs = [
    ['catalogo', 'Catálogo'],
    ['favoritos', `Favoritos (${favoritos.length})`],
    ['carrito', `Carrito (${unidades})`],
    ['historial', 'Pedidos'],
    ['mas', 'Más'],
  ];
  const origen = pantalla === 'detalle' ? previa : pantalla;
  const tabActiva = ['comparador', 'direcciones', 'ayuda'].includes(origen) ? 'mas' : origen;

  /* ============ RENDER PRINCIPAL ============ */
  return (
    <View style={s.app}>
      <StatusBar barStyle="light-content" />
      <View style={s.header}>
        <Logo />
        <View style={{ flex: 1 }}>
          <Text style={s.marca}>{MARCA.nombre}</Text>
          <Text style={s.eslogan}>{MARCA.eslogan}</Text>
        </View>
        <Pressable onPress={() => ir('notificaciones')} hitSlop={8}>
          <Text style={s.avisos}>Avisos{sinLeer > 0 ? ` (${sinLeer})` : ''}</Text>
        </Pressable>
      </View>

      {toast && (
        <View style={[s.toast, { backgroundColor: toast.tipo === 'error' ? '#B91C1C' : '#15803D' }]}>
          <Text style={{ color: '#fff', fontWeight: '600' }}>{toast.msg}</Text>
        </View>
      )}

      <View style={s.contenido}>{secciones[pantalla]()}</View>

      <View style={s.tabbar}>
        {tabs.map(([key, label]) => {
          const activa = tabActiva === key;
          return (
            <Pressable key={key} style={[s.tab, activa && { borderColor: MARCA.color1 }]} onPress={() => ir(key)}>
              <Text style={[s.tabTxt, activa && { color: MARCA.color1, fontWeight: '800' }]}>{label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

/* ============ COMPONENTES PEQUEÑOS ============ */
function Logo() {
  return (
    <View style={s.logo}>
      {MARCA.logo
        ? <Image source={MARCA.logo} style={{ width: 44, height: 44 }} resizeMode="contain" />
        : <Text style={s.logoTxt}>{MARCA.iniciales}</Text>}
    </View>
  );
}

function Foto({ producto, tam = 60 }) {
  const [fallo, setFallo] = useState(false);
  const caja = { width: tam, height: tam, borderRadius: 12, backgroundColor: '#CCFBF1', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' };
  return (
    <View style={caja}>
      {producto.imagen && !fallo
        ? <Image source={{ uri: producto.imagen }} style={{ width: tam, height: tam }} resizeMode="cover" onError={() => setFallo(true)} />
        : <Text style={{ fontSize: tam / 2.5, fontWeight: '800', color: MARCA.color1 }}>{iniciales(producto.nombre)}</Text>}
    </View>
  );
}

function Chip({ texto, activo, onPress }) {
  return (
    <Pressable onPress={onPress} style={[s.chip, activo && { backgroundColor: MARCA.color1 }]}>
      <Text style={{ color: activo ? '#fff' : '#334155', fontWeight: '600', fontSize: 12 }}>{texto}</Text>
    </Pressable>
  );
}

function Boton({ texto, onPress, tipo, deshabilitado }) {
  const sec = tipo === 'sec';
  return (
    <Pressable onPress={onPress} style={[s.boton, sec && s.botonSec, deshabilitado && { opacity: 0.4 }]}>
      <Text style={{ color: sec ? MARCA.color1 : '#fff', fontWeight: '700' }}>{texto}</Text>
    </Pressable>
  );
}

function Vacio({ texto, accion, onAccion }) {
  return (
    <View style={s.centro}>
      <Text style={[s.subtitulo, { marginVertical: 8, textAlign: 'center' }]}>{texto}</Text>
      {accion && <Boton texto={accion} onPress={onAccion} />}
    </View>
  );
}

function Fila({ a, b, fuerte }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 2 }}>
      <Text style={fuerte && { fontWeight: '800', fontSize: 18 }}>{a}</Text>
      <Text style={fuerte && { fontWeight: '800', fontSize: 18 }}>{b}</Text>
    </View>
  );
}

/* ============ ESTILOS ============ */
const s = StyleSheet.create({
  app: { flex: 1, backgroundColor: '#F8FAFC' },
  header: {
    backgroundColor: MARCA.color1, flexDirection: 'row', alignItems: 'center',
    paddingTop: (Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 48) + 8,
    paddingBottom: 12, paddingHorizontal: 16,
  },
  logo: { width: 44, height: 44, borderRadius: 12, backgroundColor: MARCA.color2, alignItems: 'center', justifyContent: 'center', marginRight: 12, overflow: 'hidden' },
  logoTxt: { fontWeight: '900', fontSize: 18, color: '#fff' },
  marca: { color: '#fff', fontSize: 20, fontWeight: '800' },
  eslogan: { color: '#CCFBF1', fontSize: 12 },
  avisos: { color: '#fff', fontWeight: '700', fontSize: 13 },
  contenido: { flex: 1, padding: 12 },
  tabbar: { flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#E2E8F0', paddingBottom: 8 },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderTopWidth: 3, borderColor: 'transparent' },
  tabTxt: { fontSize: 11, color: '#64748B', textAlign: 'center' },
  toast: { paddingVertical: 10, paddingHorizontal: 16 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 10, padding: 10, marginBottom: 8 },
  fila: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginBottom: 8, gap: 6 },
  chip: { backgroundColor: '#E2E8F0', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 10, elevation: 1 },
  cardFila: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  cardAcciones: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  cardTitulo: { fontSize: 16, fontWeight: '700' },
  link: { color: MARCA.color1, fontWeight: '700', fontSize: 12 },
  gris: { color: '#64748B', fontSize: 12 },
  precio: { color: MARCA.color1, fontWeight: '800', fontSize: 16 },
  titulo: { fontSize: 22, fontWeight: '800' },
  subtitulo: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  caja: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 10 },
  boton: { backgroundColor: MARCA.color1, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10, alignItems: 'center', marginVertical: 4 },
  botonSec: { backgroundColor: '#fff', borderWidth: 1, borderColor: MARCA.color1 },
  mini: { width: 30, height: 30, borderRadius: 15, backgroundColor: MARCA.color2, alignItems: 'center', justifyContent: 'center' },
  miniTxt: { color: '#fff', fontWeight: '900', fontSize: 18 },
  error: { color: '#B91C1C', fontWeight: '600', marginBottom: 6 },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
});