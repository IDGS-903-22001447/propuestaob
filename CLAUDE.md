# Obcesive — mockup de tienda en línea

Propuesta de tienda para Obcesive (Instagram: obsexcive), marca de ropa y joyería hecha a mano en León, Guanajuato. Vende piezas únicas 1/1: hoodies intervenidos, collares y chokers con crucifijos, rosarios, pulseras de dijes y lentes. Su estética es dark/editorial, Y2K, grunge y religiosa: cortinas rojas, fotos con flash, cromo, cruces y pósters con tipografía condensada en azul eléctrico y magenta.

## Regla principal

**No cambies el diseño sin pedir permiso.** Esto incluye estilo visual, paleta, tipografías y animaciones.

## Paleta

| Variable | Color | Uso |
|---|---|---|
| `--bg` | `#060607` | Fondo principal |
| `--bg2` | `#0e0d10` | Fondo secundario |
| `--red` | `#b3121b` | Rojo |
| `--wine` | `#5a070c` | Vino |
| `--blue` | `#1d33d6` | Azul eléctrico |
| `--pink` | `#f3a7cf` | Rosa |
| `--magenta` | `#c0185e` | Magenta |

## Tipografías

UnifrakturMaguntia, Anton, Syncopate, Cormorant Garamond y Space Mono, cargadas desde Google Fonts en `index.html`.

## Estructura

```
index.html                 Marcado de la página
src/style.css              Todos los estilos
src/main.js                WHATSAPP, inventario DEFAULT, modal, panel y hero 3D
public/fotos/campana/      Hero, lookbook y póster (WebP, generadas)
public/fotos/productos/    Fotos de inventario en 4:5 (WebP, generadas)
referencias/originales/    PNG fuente; no se publican
referencias/promo-descuento-leon.png  Promo con texto; se dejó fuera del sitio
scripts/optimize-images.mjs  Recortes y conversión a WebP
```

## Comandos

- `npm run dev`: servidor local.
- `npm run build`: genera `dist/` para publicar.
- `npm run preview`: sirve `dist/` en local.
- `npm run fotos`: regenera `public/fotos/` desde `referencias/originales/`.

## Notas

- `three` está fijo en `0.128.0`, la versión del diseño aprobado. Una versión nueva puede cambiar el color de la cruz 3D.
- Si cambias el formato de los datos de `DEFAULT`, sube la versión de `KEY` en `src/main.js` para que no se carguen datos viejos de `localStorage`.
- `WHATSAPP` en `src/main.js` todavía es un número de relleno.
- Los precios y materiales del inventario son de ejemplo.
- Las fotos actuales son capturas de baja resolución. Para cambiarlas, reemplaza los PNG con el mismo nombre y revisa los recortes de `scripts/optimize-images.mjs`, porque son específicos de cada captura.
