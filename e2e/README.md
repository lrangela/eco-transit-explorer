# EcoTransit Explorer - End-to-End Testing

Este proyecto utiliza **Playwright** para pruebas E2E, siguiendo las mejores prácticas de la industria con un enfoque "Zoneless First" y "Signals First".

## 🚀 Ejecución de Tests

| Comando              | Descripción                                                         |
| -------------------- | ------------------------------------------------------------------- |
| `npm run e2e`        | Ejecuta todos los tests en modo headless (background).              |
| `npm run e2e:ui`     | Abre la UI interactiva de Playwright para depuración y time-travel. |
| `npm run e2e:headed` | Ejecuta tests viendo el navegador.                                  |
| `npm run e2e:report` | Muestra el reporte HTML de la última ejecución.                     |

## 🏗 Arquitectura de Tests

Seguimos el patrón **Page Object Model (POM)** para mantenibilidad y escalabilidad.

### Estructura

```
e2e/
├── fixtures/           # Datos estáticos y mocks (Senior Pattern: Deterministic Tests)
│   └── weather-mock-data.ts
├── pages/              # Page Objects (Abstracción de UI)
│   ├── base.page.ts    # Métodos base (navegación, mocking)
│   └── weather.page.ts # Lógica específica del dashboard
└── tests/              # Specs ordenados por feature
    └── weather/
        ├── weather-search.spec.ts
        └── weather-error-handling.spec.ts
```

## 🛠 Mejores Prácticas Implementadas

1.  **API Mocking por Defecto:**
    - Evitamos flaky tests y límites de API (Quota limits) usando `page.route()` para interceptar y mockear OpenWeatherMap.
    - Se simulan estados de carga (latency) para probar skeletons/spinners.

2.  **Selectores Quirúrgicos:**
    - Uso de `data-testid` en lugar de selectores CSS frágiles o jerarquías complejas de PrimeNG.
    - Ejemplo: `page.getByTestId('loading-spinner')`.

3.  **Validación de UX:**
    - Los tests validan no solo datos, sino estados de transición (Loading -> Data).
    - Esperas inteligentes (`waitFor`) compatibles con Angular Zoneless y hydration.

4.  **Aislamiento:**
    - Cada test es independiente y resetea su estado (navegación y mocks en `beforeEach`).
