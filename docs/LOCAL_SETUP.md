# 🚀 Guía Rápida: Desarrollo Local

## ¿No tienes la API Key? ¡No hay problema!

Sigue estos pasos para ejecutar el proyecto localmente:

---

## 📝 Paso 1: Obtener API Key GRATIS de OpenWeatherMap

1. **Crear cuenta**:
   - Ve a: [https://openweathermap.org/api](https://openweathermap.org/api)
   - Click en **Sign Up** (registro gratuito)
   - Completa el formulario de registro
   - Verifica tu email

2. **Obtener tu API Key**:
   - Inicia sesión en [https://home.openweathermap.org/api_keys](https://home.openweathermap.org/api_keys)
   - Copia tu **"Default API Key"** (se genera automáticamente)
   - Ejemplo: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

⏱️ **Nota**: La API key puede tardar ~10 minutos en activarse después del registro.

---

## ⚙️ Paso 2: Configurar Environment Local

1. **Crea el archivo de configuración local**:

   ```bash
   cd c:\D\Angular\github\eco-transit-explorer\src\environments
   copy environment.local.example.ts environment.local.ts
   ```

2. **Edita `environment.local.ts`**:
   - Abre el archivo recién creado
   - Encuentra la línea: `apiKey: 'YOUR_API_KEY_HERE'`
   - Reemplaza `'YOUR_API_KEY_HERE'` con tu API key real

   **Ejemplo**:

   ```typescript
   export const environment: Environment = {
     production: false,
     openWeather: {
       baseUrl: 'https://api.openweathermap.org/data/2.5',
       apiKey: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6', // ← Tu API key aquí
     },
   };
   ```

3. **Guarda el archivo**

✅ **¡Listo!** `environment.local.ts` está en `.gitignore` y NO se subirá a GitHub.

---

## 🚀 Paso 3: Ejecutar el Proyecto

### Opción 1: Modo Local (Recomendado)

```bash
npm run start:local
```

**Usa**: `environment.local.ts` (con tu API key personal)

### Opción 2: Modo Development

```bash
npm run start:dev
```

**Usa**: `environment.development.ts` (placeholder, NO funcionará sin modificar)

### Opción 3: Comando estándar

```bash
npm start
```

**Usa**: `environment.ts` (placeholder por defecto)

---

## 📋 Resumen de Comandos Disponibles

| Comando               | Environment                  | Uso                       |
| --------------------- | ---------------------------- | ------------------------- |
| `npm start`           | `environment.ts`             | Por defecto (placeholder) |
| `npm run start:local` | `environment.local.ts`       | **👈 Desarrollo local**   |
| `npm run start:dev`   | `environment.development.ts` | Development (placeholder) |
| `npm run start:prod`  | `environment.prod.ts`        | Producción (placeholder)  |
| `npm run build:local` | `environment.local.ts`       | Build local               |
| `npm run build:prod`  | `environment.prod.ts`        | Build producción          |

---

## ✅ Verificar que Funciona

1. **Ejecuta**:

   ```bash
   npm run start:local
   ```

2. **Abre el navegador**:
   - Ve a: `http://localhost:4200/`

3. **Prueba la búsqueda**:
   - Escribe una ciudad (ej: "Madrid")
   - Espera 500ms (debounce)
   - Deberías ver el clima actual y el forecast de 5 días

4. **Revisa la consola**:
   - **✅ SIN errores** = Todo funciona
   - **❌ Error 401** = API key inválida o no activada aún (espera 10 min)
   - **❌ Error 404** = Ciudad no encontrada (prueba con otra)

---

## 🔒 Seguridad

- ✅ `environment.local.ts` **NO se sube** a GitHub (.gitignore)
- ✅ Tu API key personal **permanece SEGURA** en tu máquina
- ✅ Para CI/CD, usamos GitHub Secrets (configuración separada)

---

## ❓ Troubleshooting

### Error: "Cannot find module 'environment.local.ts'"

**Solución**: Creaste el archivo correctamente?

```bash
# Verifica que existe:
dir src\environments\environment.local.ts

# Si no existe, créalo desde el ejemplo:
copy src\environments\environment.local.example.ts src\environments\environment.local.ts
```

### Error 401: "Invalid API key"

**Posibles causas**:

1. La API key no está activada aún (espera 10 minutos después de registro)
2. Copiaste mal la key (verifica espacios extra)
3. Usaste comillas incorrectas en el archivo

**Solución**: Revisa tu API key en [https://home.openweathermap.org/api_keys](https://home.openweathermap.org/api_keys)

### La app carga pero no muestra clima

**Causa**: Estás usando `npm start` en lugar de `npm run start:local`

**Solución**:

```bash
# Detén el servidor (Ctrl+C)
npm run start:local
```

---

## 🎉 ¡Todo listo!

Ahora puedes desarrollar localmente con tu propia API key sin preocuparte por la seguridad.
