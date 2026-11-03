# Cómo trabajamos

Reglas de trabajo del repositorio. Aplican aunque el equipo sea una sola persona: el historial de GitHub cuenta la historia del proyecto.

## Ramas

Nunca se trabaja directo en `main`. La rama `main` está protegida: no acepta push directo, solo cambios que llegan por Pull Request.

Cada tarea va en su propia rama, que nace de `main`. El nombre lleva un prefijo según el tipo de trabajo:

| Prefijo | Para qué | Ejemplo |
|---|---|---|
| `feat/` | Funcionalidad nueva | `feat/crear-categoria` |
| `fix/` | Corrección de un error | `fix/login-email-vacio` |
| `docs/` | Documentación | `docs/convenciones` |
| `chore/` | Configuración y mantenimiento | `chore/eslint-prettier` |

Los nombres van en minúsculas, sin tildes y con guiones.

```
git switch main
git pull
git switch -c feat/crear-categoria
```

## Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/es/): `tipo: descripción`. Los tipos son los mismos que los prefijos de las ramas, más `style`.

- `feat: crear categoría`
- `fix: validar nombre de categoría vacío`
- `docs: agregar modelo de datos`
- `chore: configurar ESLint y Prettier`
- `style: aplicar formato de Prettier`: cambios que no alteran lo que hace el código (espacios, sangría, punto y coma). Van siempre en su propio commit.

La descripción va en minúsculas, en infinitivo y sin punto final. Los commits son pequeños y frecuentes: cada uno hace una sola cosa.

## Pull Requests

Cada tarea entra a `main` con su propio Pull Request.

1. Antes de abrir el PR, correr los dos chequeos. Los dos deben pasar sin errores:
   ```
   npm run typecheck
   npm run lint
   ```
2. Abrir el PR con un título en formato Conventional Commits. `--fill` arma la descripción con los commits, y `--title` evita que el título salga con el nombre de la rama:
   ```
   gh pr create --fill --title "feat: crear categoría"
   ```
3. Revisarlo línea por línea, como si fuera de otra persona.
4. Mezclarlo a `main` con **Merge commit**. GitHub borra la rama remota sola.
5. Ponerse al día y borrar la rama local:
   ```
   git switch main
   git pull
   git branch -d feat/crear-categoria
   ```

## Cierre del sprint

Cada viernes se hace la revisión general del sprint: repasar lo mezclado durante la semana, anotar qué se aprendió y qué costó, y crear el tag de versión.

## Versiones

El tag de versión se crea sobre `main` al cerrar cada sprint: `v0.0.1` para el sprint 0, `v0.1.0` para el sprint 1, y así hasta `v1.0.0` con la publicación en el App Store. Los tags son **anotados** (`-a`): guardan quién los creó, cuándo y un mensaje.

```
git switch main
git pull
git tag -a v0.1.0 -m "Sprint 1: TypeScript para el modelo"
git push origin v0.1.0
```

## Si una tarea se alarga

No pasa nada: sigue al día siguiente. Las fechas del plan son ideales; manda el progreso real.
