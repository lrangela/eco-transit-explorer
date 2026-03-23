# ADR-002: Documentation Governance and Consolidation

## English

- Status: Accepted
- Date: 2026-03-23

### Context

The repository documentation drifted away from the real implementation. Some files still described:

- backend proxy assumptions that no longer exist
- PrimeFlex usage that has been removed
- fragmented setup instructions spread across multiple documents

This created onboarding friction and audit noise.

### Decision

The project keeps a reduced documentation set with explicit ownership:

- `README.md`
  - product-level entry point
  - bilingual
  - includes problem, solution, architecture, stack, technical decisions, highlighted features, run, deploy, and live URL

- `docs/API_INTEGRATION.md`
  - integration contract and runtime config

- `docs/LOCAL_SETUP.md`
  - local execution only

- `docs/adr/ADR-001-zoneless-architecture.md`
  - zoneless architecture decision

- `docs/adr/ADR-002-documentation-governance.md`
  - this governance decision

- `docs/adr/ADR-003-data-fetching-strategy.md`
  - data fetching strategy

### Internal or Historical Documents

- `docs/SECRET_REMEDIATION.md`
  - maintainer-only operational runbook

- `docs/frontend-audit-2026-03.md`
  - historical point-in-time audit artifact

### Documents Removed

- `docs/SCRIPTS_CONFIG.md`
  - removed because its content is now covered by `README.md` and `docs/LOCAL_SETUP.md`

- `docs/ADR-001-DATA-FETCHING.md`
  - moved to `docs/adr/ADR-003-data-fetching-strategy.md` to keep ADR numbering and location consistent

### Consequences

Benefits:

- one canonical project overview
- less duplicated setup content
- easier auditing and onboarding

Costs:

- contributors must update fewer but more important documents
- README becomes a higher-signal document and must stay curated

## Español

- Estado: Aceptado
- Fecha: 2026-03-23

### Contexto

La documentación del repositorio se había desalineado respecto a la implementación real. Algunos archivos todavía describían:

- supuestos de backend proxy que ya no existen
- uso de PrimeFlex que ya fue eliminado
- instrucciones de setup fragmentadas en múltiples documentos

Eso generaba fricción de onboarding y ruido de auditoría.

### Decisión

El proyecto conserva un set reducido de documentación con responsabilidad explícita:

- `README.md`
  - punto de entrada del producto
  - bilingüe
  - incluye problema, solución, arquitectura, stack, decisiones técnicas, features destacadas, ejecución, despliegue y URL pública

- `docs/API_INTEGRATION.md`
  - contrato de integración y configuración runtime

- `docs/LOCAL_SETUP.md`
  - ejecución local únicamente

- `docs/adr/ADR-001-zoneless-architecture.md`
  - decisión de arquitectura zoneless

- `docs/adr/ADR-002-documentation-governance.md`
  - esta decisión de gobierno documental

- `docs/adr/ADR-003-data-fetching-strategy.md`
  - estrategia de data fetching

### Documentos internos o históricos

- `docs/SECRET_REMEDIATION.md`
  - runbook operativo para maintainers

- `docs/frontend-audit-2026-03.md`
  - artefacto histórico de auditoría puntual

### Documentos eliminados

- `docs/SCRIPTS_CONFIG.md`
  - se elimina porque su contenido ahora vive en `README.md` y `docs/LOCAL_SETUP.md`

- `docs/ADR-001-DATA-FETCHING.md`
  - se mueve a `docs/adr/ADR-003-data-fetching-strategy.md` para mantener la numeración y ubicación de ADRs de forma coherente

### Consecuencias

Beneficios:

- una vista general canónica del proyecto
- menos contenido duplicado
- auditoría y onboarding más simples

Costes:

- los contributors deben actualizar menos documentos, pero más importantes
- el README pasa a ser un documento de alto valor y debe mantenerse curado
