# Contributing

## Getting started

- Git clone the repo in a Hugo site's theme directory : `git clone https://github.com/aubm/hugo-code-editor-theme.git /path/to/site/themes/code-editor`
- Go in to the site's directory : `cd /path/to/site`
- Serve the website with Hugo : `hugo server`
- Open a new terminal and go in to the theme's directory : `cd /path/to/site/themes/code-editor`
- Install dependencies with npm : `npm i`
- Build static files : `npm run build`

## Code

Please do not edit the `theme.css`, `theme.min.css`, `theme.js` or `theme.min.js` files directly. Prefer working on source 
files and use the `npm run watch` command to automatically rebuild on edit.

## Commit message guidelines

Please try to keep a clean history and use the [official Angular guidelines](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines) for commit messages.
