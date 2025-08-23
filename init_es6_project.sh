#!/usr/bin/env bash
set -euo pipefail

if [ $# -lt 1 ]; then
  echo "Usage: $0 ES6_project_name"
  echo "e.g.:  $0 ES6_classes"
  exit 1
fi

PROJECT="$1"
ROOT="$(pwd)"

ensure_node20() {
  local have_node=0
  if command -v node >/dev/null 2>&1; then
    have_node=1
  fi

  if [ $have_node -eq 1 ]; then
    local ver
    ver="$(node -v | sed 's/^v//')"
    local major="${ver%%.*}"
    if [ "$major" = "20" ]; then
      echo "✔ Node $(node -v) already installed."
      echo "✔ npm  $(npm -v)"
      return 0
    fi
    echo "ℹ Detected Node v$ver (major=$major), installing Node 20.x as required..."
  else
    echo "ℹ Node not found, installing Node 20.x as required..."
  fi

  # Install Node 20.x EXACTLY as you specified
  curl -sL https://deb.nodesource.com/setup_20.x -o nodesource_setup.sh
  sudo bash nodesource_setup.sh
  sudo apt install nodejs -y

  echo "✔ Installed:"
  node -v
  npm -v
}

create_project() {
  mkdir -p "$ROOT/$PROJECT"
  cd "$ROOT/$PROJECT"

  # package.json (Holberton template)
  cat > package.json <<'JSON'
{
  "scripts": {
    "lint": "./node_modules/.bin/eslint",
    "check-lint": "lint [0-9]*.js",
    "dev": "npx babel-node",
    "test": "jest",
    "full-test": "./node_modules/.bin/eslint [0-9]*.js && jest"
  },
  "devDependencies": {
    "@babel/core": "^7.6.0",
    "@babel/preset-env": "^7.6.0",
    "@babel/node": "^7.8.0",
    "eslint": "^6.8.0",
    "eslint-config-airbnb-base": "^14.0.0",
    "eslint-plugin-import": "^2.18.2",
    "eslint-plugin-jest": "^22.17.0",
    "jest": "^24.9.0"
  }
}
JSON

  # babel.config.js (Holberton template)
  cat > babel.config.js <<'JS'
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};
JS

  # .eslintrc.js (Holberton template)
  cat > .eslintrc.js <<'JS'
module.exports = {
  env: {
    browser: false,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:jest/all',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['jest'],
  rules: {
    'max-classes-per-file': 'off',
    'no-underscore-dangle': 'off',
    'no-console': 'off',
    'no-shadow': 'off',
    'no-restricted-syntax': [
      'error',
      'LabeledStatement',
      'WithStatement',
    ],
  },
  overrides:[
    {
      files: ['*.js'],
      excludedFiles: 'babel.config.js',
    }
  ]
};
JS

  # .npmrc
  echo "loglevel=silent" > .npmrc

  # Install devDependencies as declared in package.json
  npm install

  echo
  echo "✅ Project '$PROJECT' is ready."
  echo "   Files: package.json, .eslintrc.js, babel.config.js, .npmrc"
  echo "   Commands:"
  echo "     npm run check-lint"
  echo "     npm test"
  echo "     npm run full-test"
}

ensure_node20
create_project
