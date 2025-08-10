// package.js - custom package configuration for the 90‑day remission kit
//
// This file mirrors the contents of a standard package.json but is written as a
// CommonJS module. Exporting the configuration as a JavaScript object makes
// it easy to import and extend in other scripts if needed.  The actual
// dependencies are installed via package.json (see the deployment
// instructions), but keeping the metadata in code form helps maintain a
// consistent coding style across the project.

module.exports = {
  name: 'remission‑kit',
  version: '1.0.0',
  description: 'Mobile‑first 90‑Day Diabetes & Obesity Remission Kit for the Indian audience',
  main: 'server.js',
  scripts: {
    start: 'node server.js',
    dev: 'nodemon server.js'
  },
  dependencies: {
    express: '^4.18.2',
    '@supabase/supabase-js': '^2.38.5',
    cors: '^2.8.5',
    dotenv: '^16.3.1'
  },
  devDependencies: {
    nodemon: '^3.0.0'
  }
};
