# Monster Blocks - Agent Guide

## Project Type
FoundryVTT module (D&D 5e NPC statblock sheet)

## Key Commands

```bash
# Lint code (source files only, excludes submodules)
make lint
# or: npx eslint monsterblock.js scripts/ macros.js

# Create release zip (module distribution)
npx gulp zip
```

## Build & Release
- **Release process**: Tag a commit with `v*` (e.g., `v3.7.4`) and push - CI automatically creates a GitHub release
- **Release file**: `monsterblock.zip` contains: `module.json`, `monsterblock.js`, `monsterblock.css`, `templates/`, `scripts/`, `lang/`, `input-expressions/handler.js`
- **No tests**: `npm test` is a placeholder

## Module Entry Points
- `monsterblock.js` - main module (ES module)
- `monsterblock.css` - styles
- `templates/dnd5e/` - Handlebars templates
- `scripts/dnd5e/` - 5e-specific logic (actions, attacks, casting, items, etc.)
- `scripts/utilities.js`, `scripts/handler.js` - core utilities

## External Dependencies
- `_mathjs` module (required, defined in module.json relationships)
- dnd5e system (minimum 2.4.4)
- Foundry 10+

## Submodules
- `input-expressions/` is a git submodule (used for expression parsing)

## Style Notes
- ESLint config uses `babel-eslint` parser, ES2020 + jQuery globals
- Double quotes preferred, with allowTemplateLiterals
- Many Foundry globals pre-defined in `.eslintrc.json` globals section