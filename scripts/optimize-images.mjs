// Genera public/fotos/*.webp desde referencias/originales/*.png (npm run fotos).
// Quita residuos de captura de pantalla y nunca agranda una imagen.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SRC = 'referencias/originales';
const OUT = 'public/fotos';
const MAX_CAMPANA = 1600;
const MAX_PRODUCTO = 1000;

// recorte: píxeles a quitar de cada lado del original
const CAMPANA = {
  'hero-virgen': {},
  'pasarela-capucha-blanca': { top: 18 },
  'editorial-chamarra-piel': { left: 5, right: 47 }, // franja de la foto contigua
  'editorial-manos-circulo': {},
  'editorial-abrigo-rosario': { left: 2, right: 2 },
  'editorial-saco-blanco': {},
  'poster-cuadros-estrellas': { left: 25 }, // flecha del carrusel
};
const PRODUCTOS = {
  'hoodie-kali': {},
  'hoodie-cruces-rosa': {},
  'lentes-dijes-plata': {},
  'collar-arcangeles': {},
  'collar-eslabon-trinidad': {},
  'collar-crucifijo-rojo': { top: 12 }, // ícono cortado
  'collar-cruz-cuentas': { left: 5, top: 8 }, // franja negra e ícono cortado
};

async function recortar(name, { left = 0, right = 0, top = 0, bottom = 0 }) {
  const file = `${SRC}/${name}.png`;
  const { width, height } = await sharp(file).metadata();
  return sharp(await sharp(file)
    .extract({ left, top, width: width - left - right, height: height - top - bottom })
    .toBuffer());
}

await mkdir(`${OUT}/campana`, { recursive: true });
await mkdir(`${OUT}/productos`, { recursive: true });

for (const [name, crop] of Object.entries(CAMPANA)) {
  const img = await recortar(name, crop);
  await img.flatten({ background: '#000' })
    .resize({ width: MAX_CAMPANA, withoutEnlargement: true })
    .webp({ quality: 86 })
    .toFile(`${OUT}/campana/${name}.webp`);
}

// Las tarjetas son 4:5 con object-fit:cover: se completa con blanco para no cortar la pieza
for (const [name, crop] of Object.entries(PRODUCTOS)) {
  const base = await (await recortar(name, crop)).flatten({ background: '#fff' }).png().toBuffer();
  const { width, height } = await sharp(base).metadata();
  const w = Math.max(width, Math.ceil(height * 4 / 5));
  const h = Math.max(height, Math.ceil(w * 5 / 4));
  const left = Math.floor((w - width) / 2);
  const top = Math.floor((h - height) / 2);
  await sharp(base)
    .extend({ left, right: w - width - left, top, bottom: h - height - top, background: '#fff' })
    .resize({ width: MAX_PRODUCTO, withoutEnlargement: true })
    .webp({ quality: 88 })
    .toFile(`${OUT}/productos/${name}.webp`);
}
