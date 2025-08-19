# Holberton Dev‑Container Setup Cheat Sheet
Tools covered: **Node**, **Babel**, **Jest**, **ESLint**, **Prettier**  
Repo shape assumed: a workspace root (e.g., `/home/Work`) with multiple sub‑projects such as `holbertonschool-web_back_end/ES6_basic`.

---

## 0) Where to run each tool
- **Workspace root**: central ESLint + Prettier config and scripts. Run formatting here; lint either here (scoped) or inside each project.
- **Per‑project dir** (e.g., `/home/Work/holbertonschool-web_back_end/ES6_basic`): Babel + Jest install and config; run tests here.

---

## 1) Root setup (ESLint + Prettier)

### Install
```bash
cd /home/Work
npm i -D eslint @eslint/js eslint-plugin-prettier eslint-config-prettier prettier globals
```

### `eslint.config.cjs` (root)
```js
const js = require('@eslint/js');
const spellcheck = require('eslint-plugin-spellcheck'); // optional
const prettier = require('eslint-plugin-prettier');
const globals = require('globals');

module.exports = [
  { ignores: ['**/node_modules/**', '**/dist/**', '**/build/**'] },

  js.configs.recommended,

  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: { spellcheck, prettier },
    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      semi: ['error', 'always'],
      'prettier/prettier': 'error',
      'spellcheck/spell-checker': ['warn', {
        comments: true, strings: true, identifiers: false, lang: 'en_US',
        skipWords: ['eslint','doctype','btn','argv','usr','num','Whitespace'],
        skipIfMatch: ['http://[^s]*','^[-\\w]+/[-\\w\\.]+$'], minLength: 3
      }],
    },
  },

  {
    files: ['**/*.config.js','**/*.config.cjs','**/babel.config.js','**/prettier.config.cjs'],
    rules: { 'spellcheck/spell-checker': 'off' },
  },
];
```

### `prettier.config.cjs` (root)
```js
module.exports = {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'none',
  htmlWhitespaceSensitivity: 'ignore',
};
```

### `.prettierignore` (root)
```gitignore
node_modules
dist
build
coverage
*.min.js
holbertonschool-higher_level_programming
holbertonschool-hbnb
```

### Root `package.json` scripts
```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:es6_basic": "eslint holbertonschool-web_back_end/ES6_basic",
    "format": "prettier --write .",
    "check:format": "prettier --check ."
  }
}
```

### VS Code settings (root `.vscode/settings.json`)
Use ESLint on save and require a Prettier config:
```json
{
  "editor.formatOnSave": false,
  "editor.codeActionsOnSave": { "source.fixAll.eslint": "always" },
  "eslint.useFlatConfig": true,
  "prettier.requireConfig": true,
  "eslint.validate": ["javascript", "javascriptreact"],
  "javascript.validate.enable": false
}
```

### Run at the root
```bash
npm run format          # Prettier formats files (layout only)
npm run check:format    # Dry-run check
npm run lint            # ESLint across repo (JS only)
npm run lint:es6_basic  # ESLint scoped to ES6_basic
```

---

## 2) Project setup (Babel + Jest for ES modules)

Example project: `/home/Work/holbertonschool-web_back_end/ES6_basic`

### Install (in the project dir)
```bash
cd /home/Work/holbertonschool-web_back_end/ES6_basic
npm init -y
npm i -D @babel/cli @babel/core @babel/preset-env jest babel-jest
```

### `babel.config.js` (project)
```js
module.exports = {
  presets: [['@babel/preset-env', { targets: { node: 'current' } }]],
};
```

### `package.json` (project)
```json
{
  "type": "module",
  "scripts": {
    "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js",
    "lint": "eslint ."
  }
}
```

### Verify (in the project dir)
```bash
npx babel --version      # expect 7.x
npx jest --version       # expect 29.x
npm test                 # runs project tests
npm run lint             # lints project files using root config
```

If you temporarily have no tests, allow zero tests:
```bash
npm set-script test "node --experimental-vm-modules node_modules/jest/bin/jest.js --passWithNoTests"
npm test
```

---

## 3) HTML formatting and validation (optional)

### Format HTML with Prettier
```bash
# format only front-end HTML
npm run format -- "holbertonschool-web_front_end/**/*.html"

# check without writing
npx prettier --check "holbertonschool-web_front_end/**/*.html"
```

### Validate HTML structure (optional)

**HTMLHint**
```bash
npm i -D htmlhint
echo '{ "tag-pair": true, "img-alt-require": true, "attr-value-double-quotes": true }' > .htmlhintrc
npx htmlhint "holbertonschool-web_front_end/**/*.html"
```

**HTML Tidy** (auto-fix tags, system package)
```bash
apt-get update && apt-get install -y tidy
find holbertonschool-web_front_end -name "*.html" -print0 | xargs -0 -I{} \
  tidy -m -q -indent -wrap 0 --tidy-mark no --drop-empty-elements no --force-output yes {}
```

---

## 4) Git hygiene

Do not commit dependencies or build output. In each repo:
```
node_modules/
**/node_modules/
dist/
build/
coverage/
*.log
.DS_Store
```

Make a dedicated formatting commit:
```bash
git add -A
git commit -m "chore(format): apply Prettier"
```

---

## 5) Troubleshooting

- **Jest: `Cannot use import statement outside a module`**  
  Ensure project `package.json` has `"type": "module"`, `babel-jest` is installed, and the test script uses `--experimental-vm-modules` as shown above.

- **ESLint HTML processor errors**  
  Keep ESLint focused on JS only; use Prettier for HTML formatting and HTMLHint/Tidy for HTML structure.

- **Too many files formatted**  
  Use `.prettierignore`, or scope the format command:  
  `npm run format -- "holbertonschool-web_back_end/ES6_basic/**/*.{js,html,css}"`

---

## 6) One‑page command recap

### Root
```bash
npm run format
npm run check:format
npm run lint
npm run lint:es6_basic
```

### Project (`holbertonschool-web_back_end/ES6_basic`)
```bash
npm i -D @babel/cli @babel/core @babel/preset-env jest babel-jest
npm test
npm run lint
```
