import React, { useState, useEffect } from 'react';
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
const ENVIO = 8000;
const ENVIO_GRATIS_DESDE = 150000;
const CUPON = { codigo: 'BIENVENIDO10', porcentaje: 0.10 };

/* ============ DATOS INICIALES (HU03) ============ */
const INICIAL = [
  { id: 'PROD-001', nombre: 'Audífonos Bluetooth', categoria: 'Tecnología', precio: 89000, stock: 8, descripcion: 'Audífonos inalámbricos con 20 horas de batería.', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQBPNTdgTDz4dwl_sZ6pmUP4pyS4Y_jkwpEGbg-ggMKdd2NzDvJDomca8&s=10', ratings: [] },
  { id: 'PROD-002', nombre: 'Cargador rápido USB-C', categoria: 'Tecnología', precio: 45000, stock: 15, descripcion: 'Cargador de 30W compatible con la mayoría de celulares.', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPFstza8zJP1boAEzVSfuyVdGzSNlxR421-11cocSZoLM5Dha2NYAvkHQK&s=10', ratings: [] },
  { id: 'PROD-003', nombre: 'Mouse inalámbrico', categoria: 'Tecnología', precio: 62000, stock: 0, descripcion: 'Mouse ergonómico silencioso con receptor USB.', imagen: 'https://panamericana.vtexassets.com/arquivos/ids/532180/mouse-inalambrico-1-hora-rat001-negro-6974368773033.jpg?v=638442150952330000', ratings: [] },
  { id: 'PROD-004', nombre: 'Lámpara LED de escritorio', categoria: 'Hogar', precio: 54000, stock: 10,  descripcion: 'Lámpara con tres niveles de brillo y brazo flexible.', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQptVSr_pSVuZ5t-JSiFKI1R3QFR03jNUc3BqlW6IVpyw&s=10', ratings: [] },
  { id: 'PROD-005', nombre: 'Set de ollas 3 piezas', categoria: 'Hogar', precio: 180000, stock: 4,  descripcion: 'Ollas antiadherentes con tapa de vidrio templado.', imagen: 'https://hogaruniversal.vtexassets.com/arquivos/ids/168503/L72408-OLLA-6-ULTRA-TV-20CM-01.jpg.jpg?v=638824008866670000', ratings: [] },
  { id: 'PROD-006', nombre: 'Organizador de cocina', categoria: 'Hogar', precio: 32000, stock: 20,  descripcion: 'Organizador de dos niveles para especias y utensilios.', imagen: 'https://exitocol.vteximg.com.br/arquivos/ids/18252234/organizador-especias-cocina-especiero-condimenteros-movible.jpg?v=638188337003430000', ratings: [] },
  { id: 'PROD-007', nombre: 'Balón de fútbol', categoria: 'Deporte', precio: 75000, stock: 12, descripcion: 'Balón número 5 cosido a máquina, ideal para cancha.', imagen: 'https://deportesregol.com/cdn/shop/files/927201_Balon_Futbol_Golty_Latir_No.jpg?v=1742199984', ratings: [] },
  { id: 'PROD-008', nombre: 'Cuerda para saltar', categoria: 'Deporte', precio: 18000, stock: 30, descripcion: 'Cuerda ajustable con mangos antideslizantes.', imagen: 'https://http2.mlstatic.com/D_NQ_NP_663959-MLA99632749117_112025-O.webp', ratings: [] },
  { id: 'PROD-009', nombre: 'Botella térmica 750 ml', categoria: 'Deporte', precio: 48000, stock: 9, descripcion: 'Mantiene el agua fría por 24 horas, acero inoxidable.', imagen: 'https://verdepluma.com.co/cdn/shop/files/06_LIGHT-750-02.webp?v=1791406327&width=720', ratings: [] },
  { id: 'PROD-010', nombre: 'Cama para perro', categoria: 'Mascotas', precio: 120000, stock: 5,  descripcion: 'Cama acolchada y lavable para perros medianos.', imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrRlPXHkO5Etn08Z4HpQAuv-xxe56RQimmehu8CO8bDA&s', ratings: [] },
  { id: 'PROD-011', nombre: 'Rascador para gatos', categoria: 'Mascotas', precio: 95000, stock: 6, descripcion: 'Torre rascadora con plataforma y juguete colgante.', imagen: 'https://http2.mlstatic.com/D_NQ_NP_816118-MCO112925589672_072026-O.webp', ratings: [] },
  { id: 'PROD-012', nombre: 'Juguete masticable', categoria: 'Mascotas', precio: 15000, stock: 25, descripcion: 'Hueso de caucho resistente para perros activos.', imagen: 'https://http2.mlstatic.com/D_NQ_NP_628827-MCO96981303393_112025-O.webp', ratings: [] },
];

/* ============ UTILIDADES ============ */
const cop = (n) => '$' + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const promedio = (r) => (r.length ? r.reduce((a, b) => a + b, 0) / r.length : 0);
const estrellas = (n) => '★'.repeat(Math.round(n)) + '☆'.repeat(5 - Math.round(n));
const iniciales = (n) => n.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');
const formVacio = { id: null, nombre: '', categoria: CATEGORIAS[0], precio: '', stock: '', descripcion: '', imagen: '' };

export default function App() {
  /* ----- Estado global (en memoria) ----- */
  const [productos, setProductos] = useState(INICIAL);
  const [favoritos, setFavoritos] = useState([]);
  const [carrito, setCarrito] = useState([]); // [{id, cantidad}]
  const [pedidos, setPedidos] = useState([]);
  const [cuponAplicado, setCuponAplicado] = useState(false);
  const [cuponTexto, setCuponTexto] = useState('');

  /* ----- Navegación ----- */
  const [pantalla, setPantalla] = useState('catalogo');
  const [seleccionadoId, setSeleccionadoId] = useState(null);
  const [pedidoSel, setPedidoSel] = useState(null);
  const [previa, setPrevia] = useState('catalogo'); // desde dónde se abrió el detalle

  /* ----- Catálogo ----- */
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('Todas');
  const [orden, setOrden] = useState('ninguno');

  /* ----- Checkout ----- */
  const [paso, setPaso] = useState('form'); // form | resumen | confirmado
  const [comprador, setComprador] = useState({ nombre: '', telefono: '', municipio: '', direccion: '' });
  const [errorForm, setErrorForm] = useState('');
  const [ultimoCodigo, setUltimoCodigo] = useState('');

  /* ----- Vendedor y reseñas ----- */
  const [sf, setSf] = useState(formVacio);
  const [errorSf, setErrorSf] = useState('');
  const [ratingTexto, setRatingTexto] = useState('');

  /* ----- Mensajes (HU16) ----- */
  const [toast, setToast] = useState(null);
  const avisar = (msg, tipo = 'ok') => {
    setToast({ msg, tipo });
    setTimeout(() => setToast(null), 2500);
  };

  // Un carrito vacío no conserva cupón (HU17)
  useEffect(() => {
    if (carrito.length === 0) { setCuponAplicado(false); setCuponTexto(''); }
  }, [carrito]);

  /* ============ CÁLCULOS DEL CARRITO (HU11, HU17) ============ */
  const lineas = carrito
    .map((l) => ({ ...l, producto: productos.find((p) => p.id === l.id) }))
    .filter((l) => l.producto);
  const subtotal = lineas.reduce((acc, l) => acc + l.cantidad * l.producto.precio, 0);
  const descuento = cuponAplicado && subtotal > 0 ? Math.round(subtotal * CUPON.porcentaje) : 0;
  const envio = subtotal === 0 ? 0 : subtotal < ENVIO_GRATIS_DESDE ? ENVIO : 0;
  const total = Math.max(0, subtotal - descuento + envio);
  const unidades = carrito.reduce((a, l) => a + l.cantidad, 0);

  /* ============ ACCIONES ============ */
  const ir = (p) => { setPantalla(p); if (p === 'carrito') setPaso('form'); };
  const abrirDetalle = (id) => { setPrevia(pantalla); setSeleccionadoId(id); setRatingTexto(''); setPantalla('detalle'); };

  const alternarFavorito = (id) => {
    setFavoritos((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  };

  const agregar = (id) => {
    const p = productos.find((x) => x.id === id);
    if (!p || p.stock <= 0) return avisar('Producto agotado', 'error');
    const linea = carrito.find((l) => l.id === id);
    const actual = linea ? linea.cantidad : 0;
    if (actual >= p.stock) return avisar('Ya tienes todo el stock disponible en el carrito', 'error');
    setCarrito(linea
      ? carrito.map((l) => (l.id === id ? { ...l, cantidad: l.cantidad + 1 } : l))
      : [...carrito, { id, cantidad: 1 }]);
    avisar(`${p.nombre} agregado al carrito`);
  };

  const cambiarCantidad = (id, delta) => {
    const p = productos.find((x) => x.id === id);
    const linea = carrito.find((l) => l.id === id);
    const nueva = linea.cantidad + delta;
    if (nueva < 1) return eliminar(id); // criterio consistente: llegar a 0 elimina
    if (nueva > p.stock) return avisar('No hay más stock disponible', 'error');
    setCarrito(carrito.map((l) => (l.id === id ? { ...l, cantidad: nueva } : l)));
  };

  const eliminar = (id) => {
    setCarrito(carrito.filter((l) => l.id !== id));
    avisar('Producto quitado del carrito');
  };

  const aplicarCupon = () => {
    if (subtotal === 0) return avisar('Agrega productos antes de usar un cupón', 'error');
    if (cuponTexto.trim().toUpperCase() === CUPON.codigo) {
      setCuponAplicado(true);
      avisar('Cupón aplicado: 10% de descuento');
    } else {
      avisar('Cupón no válido', 'error');
    }
  };

  const validarComprador = () => {
    const campos = [['nombre', 'Nombre'], ['telefono', 'Teléfono'], ['municipio', 'Municipio'], ['direccion', 'Dirección']];
    for (const [k, etiqueta] of campos) {
      if (!comprador[k].trim()) return `Falta el campo obligatorio: ${etiqueta}`;
    }
    return '';
  };

  const continuarCheckout = () => {
    const err = validarComprador();
    setErrorForm(err);
    if (!err) setPaso('resumen');
  };

  const confirmarCompra = () => {
    if (lineas.length === 0) return avisar('El carrito está vacío', 'error');
    // Verifica TODO el stock antes de descontar nada (HU13-CA02)
    const sinStock = lineas.find((l) => l.cantidad > l.producto.stock);
    if (sinStock) {
      return avisar(`Sin stock suficiente de "${sinStock.producto.nombre}". No se realizó el pedido.`, 'error');
    }
    const codigo = 'PED-' + String(pedidos.length + 1).padStart(4, '0');
    const pedido = {
      codigo,
      fecha: new Date().toLocaleString(),
      items: lineas.map((l) => ({
        nombre: l.producto.nombre, cantidad: l.cantidad, precio: l.producto.precio,
      })), // copia independiente del carrito
      subtotal, descuento, envio, total,
      comprador: { ...comprador },
    };
    setProductos(productos.map((p) => {
      const l = lineas.find((x) => x.id === p.id);
      return l ? { ...p, stock: Math.max(0, p.stock - l.cantidad) } : p;
    }));
    setPedidos([pedido, ...pedidos]);
    setCarrito([]);
    setCuponAplicado(false);
    setCuponTexto('');
    setUltimoCodigo(codigo);
    setPaso('confirmado');
  };

  const guardarResena = (id) => {
    const n = Number(ratingTexto);
    if (!Number.isInteger(n) || n < 1 || n > 5) return avisar('La valoración debe ser un entero entre 1 y 5', 'error');
    setProductos(productos.map((p) => (p.id === id ? { ...p, ratings: [...p.ratings, n] } : p)));
    setRatingTexto('');
    avisar('¡Gracias por tu valoración!');
  };

  const guardarProducto = () => {
    const precio = Number(sf.precio);
    const stock = Number(sf.stock);
    if (!sf.nombre.trim()) return setErrorSf('El nombre no puede estar vacío');
    if (sf.descripcion.trim().length < 15) return setErrorSf('La descripción debe tener al menos 15 caracteres');
    if (!Number.isInteger(precio) || precio <= 0) return setErrorSf('El precio debe ser un entero positivo');
    if (sf.stock.trim() === '' || !Number.isInteger(stock) || stock < 0) return setErrorSf('El stock debe ser un entero no negativo');
    if (sf.imagen.trim() && !/^https:\/\//i.test(sf.imagen.trim())) return setErrorSf('La URL de la imagen debe empezar por https://');
    if (sf.id) {
      setProductos(productos.map((p) => (p.id === sf.id
        ? { ...p, nombre: sf.nombre.trim(), categoria: sf.categoria, precio, stock, descripcion: sf.descripcion.trim(), imagen: sf.imagen.trim() }
        : p)));
      avisar('Producto actualizado');
    } else {
      const max = productos.reduce((m, p) => Math.max(m, parseInt(p.id.split('-')[1], 10)), 0);
      const nuevo = {
        id: 'PROD-' + String(max + 1).padStart(3, '0'),
        nombre: sf.nombre.trim(), categoria: sf.categoria, precio, stock,
        descripcion: sf.descripcion.trim(), imagen: sf.imagen.trim(), ratings: [],
      };
      setProductos([...productos, nuevo]);
      avisar('Producto creado');
    }
    setSf(formVacio);
    setErrorSf('');
  };

  /* ============ PANTALLAS ============ */

  // Etiqueta de disponibilidad
  const disponibilidad = (p) => (p.stock > 0 ? `Disponible (${p.stock})` : 'Agotado');

  const renderCatalogo = () => {
    let lista = productos.filter((p) =>
      p.nombre.toLowerCase().includes(busqueda.trim().toLowerCase()) &&
      (categoria === 'Todas' || p.categoria === categoria));
    if (orden === 'asc') lista = [...lista].sort((a, b) => a.precio - b.precio);
    if (orden === 'desc') lista = [...lista].sort((a, b) => b.precio - a.precio);

    return (
      <View style={{ flex: 1 }}>
        <TextInput
          style={s.input} placeholder="Buscar producto..." value={busqueda}
          onChangeText={setBusqueda}
        />
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
        <FlatList
          data={lista}
          keyExtractor={(p) => p.id}
          ListEmptyComponent={<Vacio texto="No encontramos productos" />}
          renderItem={({ item }) => tarjeta(item)}
        />
      </View>
    );
  };

  const tarjeta = (p) => (
    <Pressable style={s.card} onPress={() => abrirDetalle(p.id)}>
      <Foto key={p.imagen} producto={p} />
      <View style={{ flex: 1 }}>
        <Text style={s.cardTitulo}>{p.nombre}</Text>
        <Text style={s.gris}>{p.categoria}</Text>
        <Text style={s.precio}>{cop(p.precio)}</Text>
        <Text style={{ color: p.stock > 0 ? '#15803D' : '#B91C1C', fontWeight: '600' }}>{disponibilidad(p)}</Text>
      </View>
      <Pressable onPress={() => alternarFavorito(p.id)} hitSlop={10}>
        <Text style={{ color: MARCA.color1, fontWeight: '700', fontSize: 12 }}>{favoritos.includes(p.id) ? 'En favoritos' : 'Favorito'}</Text>
      </Pressable>
    </Pressable>
  );

  const renderDetalle = () => {
    const p = productos.find((x) => x.id === seleccionadoId);
    if (!p) return <Vacio texto="Producto no encontrado" accion="Volver al catálogo" onAccion={() => ir('catalogo')} />;
    const prom = promedio(p.ratings);
    return (
      <ScrollView>
        <Boton texto="← Volver" tipo="sec" onPress={() => ir(previa)} />
        <View style={{ alignSelf: 'center', marginVertical: 12 }}>
          <Foto key={p.imagen} producto={p} tam={180} />
        </View>
        <Text style={s.titulo}>{p.nombre}</Text>
        <Text style={s.gris}>{p.categoria}</Text>
        <Text style={[s.precio, { fontSize: 24 }]}>{cop(p.precio)}</Text>
        <Text style={{ marginVertical: 8 }}>{p.descripcion}</Text>
        <Text style={{ fontWeight: '700', color: p.stock > 0 ? '#15803D' : '#B91C1C' }}>
          {p.stock > 0 ? `Stock: ${p.stock} unidades` : 'AGOTADO'}
        </Text>
        <Text style={{ marginTop: 6 }}>
          {p.ratings.length
            ? `${estrellas(prom)}  ${prom.toFixed(1)} (${p.ratings.length} valoraciones)`
            : 'Aún sin valoraciones'}
        </Text>
        <View style={[s.fila, { marginTop: 12 }]}>
          <Boton
            texto={favoritos.includes(p.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            tipo="sec" onPress={() => alternarFavorito(p.id)}
          />
          <Boton texto="Agregar al carrito" deshabilitado={p.stock <= 0} onPress={() => agregar(p.id)} />
        </View>
        <Text style={[s.subtitulo, { marginTop: 18 }]}>Califica este producto</Text>
        <View style={s.fila}>
          <TextInput
            style={[s.input, { flex: 1, marginBottom: 0 }]} placeholder="Estrellas (1 a 5)"
            keyboardType="numeric" value={ratingTexto} onChangeText={setRatingTexto}
          />
          <Boton texto="Guardar" onPress={() => guardarResena(p.id)} />
        </View>
      </ScrollView>
    );
  };

  const renderFavoritos = () => {
    const lista = productos.filter((p) => favoritos.includes(p.id));
    return (
      <FlatList
        data={lista} keyExtractor={(p) => p.id}
        ListEmptyComponent={<Vacio texto="No tienes favoritos guardados" accion="Ir al catálogo" onAccion={() => ir('catalogo')} />}
        renderItem={({ item }) => tarjeta(item)}
      />
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
          <Boton texto="Ver historial" onPress={() => ir('historial')} />
          <Boton texto="Seguir comprando" tipo="sec" onPress={() => ir('catalogo')} />
        </View>
      );
    }
    if (lineas.length === 0) {
      return <Vacio texto="Tu carrito está vacío" accion="Ir al catálogo" onAccion={() => ir('catalogo')} />;
    }
    return (
      <ScrollView>
        {lineas.map((l) => (
          <View key={l.id} style={s.card}>
            <View style={{ flex: 1 }}>
              <Text style={s.cardTitulo}>{l.producto.nombre}</Text>
              <Text style={s.gris}>{cop(l.producto.precio)} c/u</Text>
              <Text style={s.precio}>{cop(l.cantidad * l.producto.precio)}</Text>
            </View>
            {paso === 'form' && (
              <View style={{ alignItems: 'center' }}>
                <View style={s.fila}>
                  <Pressable style={s.mini} onPress={() => cambiarCantidad(l.id, -1)}><Text style={s.miniTxt}>−</Text></Pressable>
                  <Text style={{ fontWeight: '700', marginHorizontal: 8 }}>{l.cantidad}</Text>
                  <Pressable style={s.mini} onPress={() => cambiarCantidad(l.id, 1)}><Text style={s.miniTxt}>+</Text></Pressable>
                </View>
                <Pressable onPress={() => eliminar(l.id)}><Text style={{ color: '#B91C1C', marginTop: 6 }}>Eliminar</Text></Pressable>
              </View>
            )}
            {paso === 'resumen' && <Text style={{ fontWeight: '700' }}>x{l.cantidad}</Text>}
          </View>
        ))}

        {paso === 'form' && (
          <View style={s.caja}>
            <Text style={s.subtitulo}>Cupón</Text>
            <View style={s.fila}>
              <TextInput
                style={[s.input, { flex: 1, marginBottom: 0 }]} placeholder="Código de cupón"
                autoCapitalize="characters" value={cuponTexto} onChangeText={setCuponTexto}
              />
              <Boton texto="Aplicar" onPress={aplicarCupon} />
            </View>
          </View>
        )}

        <View style={s.caja}>
          <Fila a="Subtotal" b={cop(subtotal)} />
          {descuento > 0 && <Fila a="Descuento (10%)" b={'−' + cop(descuento)} />}
          <Fila a="Envío" b={envio === 0 ? 'Gratis' : cop(envio)} />
          <Fila a="Total" b={cop(total)} fuerte />
          {subtotal < ENVIO_GRATIS_DESDE && (
            <Text style={s.gris}>Envío gratis desde {cop(ENVIO_GRATIS_DESDE)}</Text>
          )}
        </View>

        {paso === 'form' ? (
          <View style={s.caja}>
            <Text style={s.subtitulo}>Datos de entrega</Text>
            {[['nombre', 'Nombre completo'], ['telefono', 'Teléfono'], ['municipio', 'Municipio'], ['direccion', 'Dirección']].map(([k, ph]) => (
              <TextInput
                key={k} style={s.input} placeholder={ph} value={comprador[k]}
                keyboardType={k === 'telefono' ? 'phone-pad' : 'default'}
                onChangeText={(t) => setComprador({ ...comprador, [k]: t })}
              />
            ))}
            {!!errorForm && <Text style={s.error}>{errorForm}</Text>}
            <Text style={s.gris}>Prototipo académico: no ingreses datos bancarios ni sensibles.</Text>
            <Boton texto="Continuar al resumen" onPress={continuarCheckout} />
          </View>
        ) : (
          <View style={s.caja}>
            <Text style={s.subtitulo}>Entregar a</Text>
            <Text>{comprador.nombre} · {comprador.telefono}</Text>
            <Text>{comprador.direccion}, {comprador.municipio}</Text>
            <Text style={[s.gris, { marginVertical: 6 }]}>Simulación sin cobro real.</Text>
            <Boton texto="Confirmar compra" onPress={confirmarCompra} />
            <Boton texto="← Editar datos" tipo="sec" onPress={() => setPaso('form')} />
          </View>
        )}
      </ScrollView>
    );
  };

  const renderHistorial = () => {
    if (pedidoSel) {
      const p = pedidos.find((x) => x.codigo === pedidoSel);
      return (
        <ScrollView>
          <Boton texto="← Volver al historial" tipo="sec" onPress={() => setPedidoSel(null)} />
          <Text style={s.titulo}>{p.codigo}</Text>
          <Text style={s.gris}>{p.fecha}</Text>
          <Text style={s.gris}>Entregar a: {p.comprador.nombre} · {p.comprador.direccion}, {p.comprador.municipio}</Text>
          {p.items.map((it, i) => (
            <View key={i} style={s.card}>
              <View style={{ flex: 1 }}>
                <Text style={s.cardTitulo}>{it.nombre}</Text>
                <Text style={s.gris}>{it.cantidad} x {cop(it.precio)}</Text>
              </View>
              <Text style={s.precio}>{cop(it.cantidad * it.precio)}</Text>
            </View>
          ))}
          <View style={s.caja}>
            <Fila a="Subtotal" b={cop(p.subtotal)} />
            {p.descuento > 0 && <Fila a="Descuento" b={'−' + cop(p.descuento)} />}
            <Fila a="Envío" b={p.envio === 0 ? 'Gratis' : cop(p.envio)} />
            <Fila a="Total" b={cop(p.total)} fuerte />
          </View>
        </ScrollView>
      );
    }
    return (
      <FlatList
        data={pedidos} keyExtractor={(p) => p.codigo}
        ListEmptyComponent={<Vacio texto="No hay pedidos registrados" accion="Ir al catálogo" onAccion={() => ir('catalogo')} />}
        renderItem={({ item }) => (
          <Pressable style={s.card} onPress={() => setPedidoSel(item.codigo)}>
            <View style={{ flex: 1 }}>
              <Text style={s.cardTitulo}>{item.codigo}</Text>
              <Text style={s.gris}>{item.fecha}</Text>
            </View>
            <Text style={s.precio}>{cop(item.total)}</Text>
          </Pressable>
        )}
      />
    );
  };

  const renderVendedor = () => (
    <ScrollView>
      <Text style={s.subtitulo}>{sf.id ? `Editando ${sf.id}` : 'Nuevo producto'}</Text>
      <TextInput style={s.input} placeholder="Nombre" value={sf.nombre} onChangeText={(t) => setSf({ ...sf, nombre: t })} />
      <View style={s.fila}>
        {CATEGORIAS.map((c) => (
          <Chip key={c} texto={c} activo={sf.categoria === c} onPress={() => setSf({ ...sf, categoria: c })} />
        ))}
      </View>
      <TextInput style={s.input} placeholder="Precio (COP)" keyboardType="numeric" value={String(sf.precio)} onChangeText={(t) => setSf({ ...sf, precio: t })} />
      <TextInput style={s.input} placeholder="Stock" keyboardType="numeric" value={String(sf.stock)} onChangeText={(t) => setSf({ ...sf, stock: t })} />
      <TextInput style={s.input} placeholder="Descripción (mín. 15 caracteres)" value={sf.descripcion} onChangeText={(t) => setSf({ ...sf, descripcion: t })} />
      <TextInput style={s.input} placeholder="URL de imagen https (opcional)" autoCapitalize="none" value={sf.imagen} onChangeText={(t) => setSf({ ...sf, imagen: t })} />
      {!!errorSf && <Text style={s.error}>{errorSf}</Text>}
      <Boton texto={sf.id ? 'Guardar cambios' : 'Crear producto'} onPress={guardarProducto} />
      {sf.id && <Boton texto="Cancelar edición" tipo="sec" onPress={() => { setSf(formVacio); setErrorSf(''); }} />}
      <Text style={[s.subtitulo, { marginTop: 16 }]}>Productos ({productos.length})</Text>
      {productos.map((p) => (
        <View key={p.id} style={s.card}>
          <View style={{ flex: 1 }}>
            <Text style={s.cardTitulo}>{p.nombre}</Text>
            <Text style={s.gris}>{p.id} · {cop(p.precio)} · stock {p.stock}</Text>
          </View>
          <Pressable onPress={() => { setSf({ id: p.id, nombre: p.nombre, categoria: p.categoria, precio: String(p.precio), stock: String(p.stock), descripcion: p.descripcion, imagen: p.imagen || '' }); setErrorSf(''); }}>
            <Text style={{ color: MARCA.color1, fontWeight: '700' }}>Editar</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );

  const secciones = {
    catalogo: renderCatalogo, detalle: renderDetalle, favoritos: renderFavoritos,
    carrito: renderCarrito, historial: renderHistorial, vendedor: renderVendedor,
  };

  const tabs = [
    ['catalogo', 'Catálogo'],
    ['favoritos', `Favoritos (${favoritos.length})`],
    ['carrito', `Carrito (${unidades})`],
    ['historial', 'Historial'],
    ['vendedor', 'Vendedor'],
  ];

  /* ============ RENDER PRINCIPAL ============ */
  return (
    <View style={s.app}>
      <StatusBar barStyle="light-content" />
      <View style={s.header}>
        <Logo />
        <View>
          <Text style={s.marca}>{MARCA.nombre}</Text>
          <Text style={s.eslogan}>{MARCA.eslogan}</Text>
        </View>
      </View>

      {toast && (
        <View style={[s.toast, { backgroundColor: toast.tipo === 'error' ? '#B91C1C' : '#15803D' }]}>
          <Text style={{ color: '#fff', fontWeight: '600' }}>{toast.msg}</Text>
        </View>
      )}

      <View style={s.contenido}>{secciones[pantalla]()}</View>

      <View style={s.tabbar}>
        {tabs.map(([key, label]) => {
          const activa = pantalla === key || (pantalla === 'detalle' && key === previa);
          return (
            <Pressable key={key} style={[s.tab, activa && { borderTopWidth: 3, borderColor: MARCA.color1 }]} onPress={() => { ir(key); setPedidoSel(null); }}>
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

function Chip({ texto, activo, onPress }) {
  return (
    <Pressable onPress={onPress} style={[s.chip, activo && { backgroundColor: MARCA.color1 }]}>
      <Text style={{ color: activo ? '#fff' : '#334155', fontWeight: '600', fontSize: 12 }}>{texto}</Text>
    </Pressable>
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

function Boton({ texto, onPress, tipo, deshabilitado }) {
  const sec = tipo === 'sec';
  return (
    <Pressable
      onPress={onPress}
      style={[s.boton, sec && s.botonSec, deshabilitado && { opacity: 0.4 }]}
    >
      <Text style={{ color: sec ? MARCA.color1 : '#fff', fontWeight: '700' }}>{texto}</Text>
    </Pressable>
  );
}

function Vacio({ texto, accion, onAccion }) {
  return (
    <View style={s.centro}>
      <Text style={[s.subtitulo, { marginVertical: 8 }]}>{texto}</Text>
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
  contenido: { flex: 1, padding: 12 },
  tabbar: { flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#E2E8F0', paddingBottom: 8 },
  tab: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 12, borderTopWidth: 3, borderColor: 'transparent' },
  tabTxt: { fontSize: 11, color: '#64748B', textAlign: 'center' },
  toast: { paddingVertical: 10, paddingHorizontal: 16 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 10, padding: 10, marginBottom: 8 },
  fila: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', marginBottom: 8, gap: 6 },
  chip: { backgroundColor: '#E2E8F0', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 16 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 12, elevation: 1 },
  cardTitulo: { fontSize: 16, fontWeight: '700' },
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