export interface Categoria {
  id: string;
  nombre: string;
  creador_id: string;
  grupo_id: string | null;
  icono: string | null;
  creado_en: string;
  actualizado_en: string;
}
