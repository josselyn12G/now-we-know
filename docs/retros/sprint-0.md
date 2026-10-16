# Retro · Sprint 0 · Entorno y repositorio

**Semana:** 9 al 15 de octubre de 2026 · **Versión:** `v0.0.1` · **Tareas:** 5 de 5

## Logros

1. Mac lista para desarrollar: Node, Git, VS Code, Xcode y simulador iOS.
2. Repositorio en GitHub con README, convenciones de trabajo y los documentos de alcance y modelo de datos.
3. Rama `main` protegida: solo acepta cambios por Pull Request.
4. Proyecto Expo con TypeScript creado y corriendo en el simulador iOS.

## Aprendizajes

1. Ver la historia del repo con `git log --oneline --graph`: se ve cada PR como un bloque.
2. Revisar la salud del proyecto con `npx expo-doctor`, y corregir versiones con `npx expo install --fix`, que instala la versión compatible con mi SDK de Expo.
3. Crear una rama por tarea con `git switch -c tipo/nombre`.
4. Todo lo commiteado se puede recuperar con `git restore`, aunque se borre o se pise.

## Desafíos

1. **Crear el Pull Request desde la terminal.** El comando con `--title` y `--body` es largo y me cuesta recordarlo.
2. **Un `mv` que renombró en lugar de mover.** Al crear el proyecto Expo había que apartar `README.md` y `CONTRIBUTING.md`, porque la plantilla los iba a sobrescribir. Al mover los archivos con `mv` sin indicar la carpeta de destino, el README se renombró como CONTRIBUTING y lo pisó. Lo recuperé desde Git con `git restore`, porque estaba commiteado.

## Qué cambio para el sprint 1

1. Crear los PR con `gh pr create --fill`, que toma el título y la descripción de mis commits. Si hace falta, los edito después en GitHub.
2. Correr `git status` antes y después de mover o borrar archivos.
3. Commitear seguido, para tener siempre un punto al que volver.
