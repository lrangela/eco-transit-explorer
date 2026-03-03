# Configuración de Scripts y Environments

Se agregaron comandos npm para facilitar el desarrollo local y trabajar con diferentes configuraciones.

## Comandos Nuevos en package.json

### Desarrollo (Serve):

- `npm start` - Por defecto (usa environment.ts con placeholder)
- `npm run start:local` - **👈 USAR ESTE** para desarrollo local con tu API key
- `npm run start:dev` - Development (placeholder)
- `npm run start:prod` - Producción (placeholder)

### Build:

- `npm run build` - Build por defecto
- `npm run build:local` - Build con environment.local.ts
- `npm run build:dev` - Build development
- `npm run build:prod` - Build producción

## Nueva Configuración en angular.json

Se agregó la configuración `"local"` en las `configurations`:

```json
"local": {
  "optimization": false,
  "extractLicenses": false,
  "sourceMap": true,
  "fileReplacements": [
    {
      "replace": "src/environments/environment.ts",
      "with": "src/environments/environment.local.ts"
    }
  ]
}
```

**Efecto**: Cuando ejecutas `npm run start:local`, Angular usa `environment.local.ts` en lugar del environment.ts base.

## Archivos Creados

1. **environment.local.example.ts** - Template con instrucciones
2. **environment.local.ts** - Archivo real para desarrollo local (en .gitignore)
3. **docs/LOCAL_SETUP.md** - Guía completa de configuración

## Cómo Usar

1. **Primera vez**:

   ```bash
   copy src\environments\environment.local.example.ts src\environments\environment.local.ts
   ```

2. **Editar environment.local.ts**:
   - Reemplaza `'YOUR_API_KEY_HERE'` con tu API key real de OpenWeatherMap

3. **Ejecutar**:
   ```bash
   npm run start:local
   ```

## Seguridad

✅ `environment.local.ts` está en `.gitignore`
✅ Tu API key personal **NUNCA** se sube a GitHub
✅ Solo usas placeholders en los archivos versionados
