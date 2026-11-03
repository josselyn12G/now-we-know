# Retro · Sprint 1 · TypeScript para el modelo

**Semana:** 16 de octubre al 3 de noviembre de 2026 · **Versión:** `v0.1.0` · **Tareas:** 5 de 5

## Logros

1. **Los 8 tipos del modelo** en `src/types/`, un archivo por tabla, tomando una decisión en cada campo: qué es obligatorio, qué acepta nulo y qué tipo tiene.
2. **Uniones de strings** para `RolGrupo` y `PlataformaOrigen`: esos campos ya no aceptan cualquier texto.
3. Decisiones de modelo que no estaban en el documento 02: lugares manuales sin ID de Google, código de invitación que nace con el grupo, fechas de las tablas intermedias y salida de un grupo.
4. ESLint, Prettier, formato al guardar y TypeScript estricto configurados.

## Aprendizajes

1. **`?` contra `| null`.** El `?` dice que la propiedad puede no existir; `| null` dice que siempre existe pero puede estar vacía. Una columna de la base de datos existe siempre, así que se tipa con `| null`. Un tipo tiene que describir cómo llegan los datos de verdad.
2. **Claves compuestas.** En `CategoriaLugar`, la clave es `categoria_id` + `lugar_id`. Si `agregado_por` formara parte de la clave, dos personas podrían agregar el mismo lugar a la misma categoría, y se duplicaría.
3. **Uniones contra `enum`.** Las uniones se borran al compilar y aceptan directamente el texto que devuelve Supabase. Los `enum` generan código y obligan a convertir los datos.

## Desafíos

1. **Entender `?` contra `| null`.** Tomó varias vueltas: primero usé `?`, después las dos cosas juntas, hasta entender que el tipo debe ser lo más preciso posible.
2. **Los títulos de los PR.** Con `gh pr create --fill`, dos PR quedaron titulados con el nombre de la rama en lugar de un título en formato Conventional Commits.
3. **Arrancar `RolGrupo`.** No sabía por dónde empezar con las uniones hasta que vi un ejemplo completo con otro tema.

## Qué cambio para el sprint 2

1. **Pedir un ejemplo antes de trabarme.** Si no sé por dónde empezar, pido un ejemplo con otro tema y lo adapto.
2. **Usar `gh pr create --fill --title "..."`**, para que el título del PR salga bien desde el comando.
3. **Correr `npm run typecheck` y `npm run lint` antes de cada PR.**

## Acciones del sprint 0

- `gh pr create --fill`: cumplida, aunque con el problema del título.
- `git status` antes y después de mover archivos: no hizo falta, no hubo que mover archivos.
- Commitear seguido: cumplida, con commits a mitad de tarea en S1-D2 y S1-D4.
