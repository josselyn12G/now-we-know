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

Usamos [Conventional Commits](https://www.conventionalcommits.org/es/): `tipo: descripción`. Los tipos son los mismos que los prefijos de las ramas.

- `feat: crear categoría`
- `fix: validar nombre de categoría vacío`
- `docs: agregar modelo de datos`
- `chore: configurar ESLint y Prettier`

La descripción va en minúsculas, en infinitivo y sin punto final. Los commits son pequeños y frecuentes: cada uno hace una sola cosa.

## Pull Requests

Cada tarea entra a `main` con su propio Pull Request.

1. Abrir el PR con un título en formato Conventional Commits.
2. Revisarlo línea por línea, como si fuera de otra persona.
3. Mezclarlo a `main`.
4. Borrar la rama.

```
gh pr create --base main --title "docs: definir convenciones" --body "Qué cambia y cómo revisarlo"
```

## Cierre del sprint

Cada viernes se hace la revisión general del sprint: repasar lo mezclado durante la semana, anotar qué se aprendió y qué costó, y crear el tag de versión.

## Versiones

El tag de versión se crea sobre `main` al cerrar cada sprint: `v0.0.1` para el sprint 0, `v0.1.0` para el sprint 1, y así hasta `v1.0.0` con la publicación en el App Store.

```
git switch main
git pull
git tag v0.0.1
git push origin v0.0.1
```

## Si una tarea se alarga

No pasa nada: sigue al día siguiente. Las fechas del plan son ideales; manda el progreso real.
