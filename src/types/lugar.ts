export interface Lugar {
  id: string;
  google_place_id: string | null;
  nombre: string;
  direccion: string | null;
  latitud: number | null;
  longitud: number | null;
  imagen_url: string | null;
  google_maps_url: string | null;
  creado_en: string;
  actualizado_en: string;
}
