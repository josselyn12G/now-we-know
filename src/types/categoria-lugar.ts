export type PlataformaOrigen = "TikTok" | "Instagram" | "Manual"

export interface CategoriaLugar{
    categoria_id: string;
    lugar_id: string;
    agregado_por: string;
    enlace_origen: string | null;
    plataforma_origen: PlataformaOrigen;
    agregado_en: string;
}