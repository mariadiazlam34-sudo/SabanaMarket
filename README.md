# Sabana Market - Marketplace 2.0

Lo mejor de la Sabana, en tu bolsillo.

Prototipo academico de una tienda movil hecha con React Native y Expo, para productos de emprendedores de Mosquera, Madrid y Funza. Todo funciona en memoria: no hay servidor, pagos reales ni notificaciones push. Al reiniciar la app, los datos vuelven a su estado inicial.


## Ramas

- main: version 1.0 (Taller 4), sin cambios.
- marketplace-v2: version 2.0 (Taller 5).

## Como ejecutarlo

Necesitas Node.js, Visual Studio Code y la app Expo Go en el celular.

En la terminal, dentro de la carpeta del proyecto:

    npm install
    npx expo start

Escanea el codigo QR con Expo Go. Si cambias el logo o las imagenes y no se actualizan, usa:

    npx expo start -c

No hay que instalar librerias adicionales.

## Archivos

- App.js: toda la aplicacion (datos, estado, reglas y pantallas).

## Navegacion

La barra inferior tiene Catalogo, Favoritos, Carrito, Pedidos y Mas. Arriba a la derecha esta Avisos (notificaciones internas). En Mas estan Mis direcciones, el Comparador y el Centro de ayuda.

## Que incluye

Version 1.0: catalogo de 12 productos en 4 categorias, busqueda, orden por precio, detalle, favoritos, carrito con cantidades y stock, compra simulada, descuento de existencias e historial.

Version 2.0:
- Variantes de producto (color, talla o presentacion) con precio y stock propios.
- Comparador de 2 a 3 productos.
- Filtros por marca, disponibilidad y precio, combinados con la busqueda.
- Preguntas sobre el producto con respuesta simulada.
- Libreta de direcciones con una sola direccion principal.
- Envio por municipio y modalidad, con plazo estimado.
- Seguimiento de pedidos por estados y cancelacion con devolucion de stock.
- Centro de notificaciones y avisos de reposicion.
- Productos relacionados.
- Centro de ayuda con solicitudes de soporte.

Los botones que dicen "Simular" son solo para demostracion.


## Datos de prueba

La app inicia con cuatro pedidos de ejemplo: PED-0001 (Confirmado), PED-0002 (Preparando), PED-0003 (En camino) y PED-0004 (Entregado). Los productos con variantes son Audifonos Bluetooth, Balon de futbol, Botella termica y Cama para perro. El Mouse inalambrico y algunas variantes vienen agotados a proposito.

## Aviso

Todo es una simulacion. No se piden ni se guardan contrasenas, tarjetas ni datos reales. Usa nombres, telefonos y direcciones ficticios.