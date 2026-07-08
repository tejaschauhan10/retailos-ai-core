# Folder Structure

See `Architecture.md` for the layer rules. Full tree:

```
src/
  ai/{providers,context,prompts,services,types}
  core/{api,config,constants,errors,logger,notifications,services,utils}
  shared/{hooks,lib,ui,types}
  features/<feature>/{components,hooks,schemas.ts,services,types.ts}
  integrations/<domain>/{providers,services,types,adapters,README.md}
  providers/
  components/{common,layouts,ui}
  routes/
  hooks/
  lib/
docs/
tests/{unit,integration,fixtures,mocks}
```
