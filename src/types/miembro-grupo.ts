export type RolGrupo = "Creador" | "Miembro";
export interface MiembroGrupo {
  usuario_id: string;
  grupo_id: string;
  rol: RolGrupo;
  unido_en: string;
}
