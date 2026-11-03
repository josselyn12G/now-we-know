# Documento 05 · Arquitectura

**Versión 1.0.** Decidida al cerrar el sprint 1, antes de escribir pantallas.

Cómo se organiza el código de Now We Know. Es una arquitectura limpia **ligera**: se queda con la regla de dependencias y la separación de responsabilidades, sin las capas completas de Clean Architecture, que serían demasiada ceremonia para cuatro casos de uso y una sola desarrolladora.

## 1. Carpetas

```
src/
  app/            pantallas y navegación (Expo Router): solo UI
  components/     piezas de UI reutilizables
  types/          tipos del modelo de datos: el dominio
  repositories/   acceso a Supabase, un archivo por entidad
  hooks/          conectan pantallas con repositorios (carga, error, datos)
  lib/            cliente de Supabase y utilidades
```

Cada carpeta se crea cuando se necesita por primera vez, no antes.

## 2. Regla de dependencias

Las dependencias van en un solo sentido:

```
app → hooks → repositories → lib
```

`types/` y `components/` se pueden importar desde cualquier capa.

- **Una pantalla nunca importa Supabase.** Pide los datos a un hook, y el hook a un repositorio.
- **Un repositorio no sabe nada de la UI.** Recibe y devuelve datos con los tipos de `types/`.
- Si un día Supabase se reemplaza por otro servicio, solo cambia `repositories/` y `lib/`.

## 3. Principios

| Principio | Cómo se aplica |
|---|---|
| **Repository** | Cada entidad tiene su repositorio, con funciones como `listarCategorias()`. Las pantallas no saben de dónde vienen los datos. |
| **Responsabilidad única (S de SOLID)** | Una pantalla muestra, un hook maneja estado, un repositorio trae datos. |
| **Inversión de dependencias (D de SOLID)** | La UI depende de funciones propias, no de Supabase directamente. |
| **Clean Code** | Nombres claros en español, funciones cortas, sin código muerto. ESLint, Prettier y TypeScript estricto lo vigilan. |

Las otras tres letras de SOLID se lucen con clases. En React, con funciones y componentes, casi no aparecen.

## 4. Nombres

| Qué | Formato | Ejemplo |
|---|---|---|
| Campos del modelo y columnas de la base de datos | `snake_case` | `nombre_usuario` |
| Tipos e interfaces | `PascalCase` | `GrupoDeAmigos` |
| Archivos | `kebab-case` | `grupo-de-amigos.ts` |
| Variables y funciones | `camelCase` | `listarCategorias` |
| Valores de uniones | Mayúscula inicial | `"Creador"`, `"TikTok"` |

**Por qué `snake_case` en el modelo:** es como se llaman las columnas en Supabase y así llegan los datos. Los tipos que genera Supabase también usan `snake_case`, y no hace falta traducir nombres en cada repositorio.

**Valores de uniones:** se guardan tal cual en la base de datos, y Postgres distingue mayúsculas. Hay que escribirlos exactamente igual en el código, en las migraciones y en las políticas de seguridad.

## 5. Tipos

- Uniones de strings en lugar de `enum`: se borran al compilar y aceptan directamente el texto que devuelve Supabase.
- Un campo que puede estar vacío es `tipo | null`, nunca `?`.
- `noUncheckedIndexedAccess` está activado: acceder a `lista[0]` obliga a revisar si existe.

## 6. Observabilidad (pendiente)

Durante el desarrollo, los datos se revisan en el panel de Supabase. No hay rol de administradora dentro de la app.

**Propuesta, por decidir:** agregar **Sentry** (errores en los teléfonos) y **PostHog** (analítica de uso) en el sprint 14, antes de invitar personas a TestFlight. Si se usa PostHog, hay que declararlo en las etiquetas de privacidad del App Store (S15-D1).

---

Anterior: [02 · Modelo de datos](02-modelo-de-datos.md). El documento 03 es el plan de sprints, y el 04, seguridad, llega en el sprint 4.
