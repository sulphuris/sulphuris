![Sulphuris logo](https://avatars.githubusercontent.com/u/83950228)

# Sulphuris v1.0.5
[![npm version](https://img.shields.io/npm/v/sulphuris)](https://www.npmjs.com/package/sulphuris)
[![CSS gzip size](https://img.badgesize.io/sulphuris/sulphuris/main/dist/css/sulphuris.min.css?compression=gzip&label=CSS%20gzip%20size)](https://github.com/sulphuris/sulphuris/blob/main/dist/css/sulphuris.min.css)

An adaptable CSS ultility library

> Sulphuris aims to be the soul of your next front-end project. Inspired by [Bootstrap](https://github.com/twbs/bootstrap) and [Primer](https://github.com/primer/css), but tailored to suit your everyday front-end development needs.

## WIP 🚧

## 💻 Local Development

Don't forget to `npm install` and have `Node 14+`! Then you can decide on one of the following commands.

Build and watch, builds also minified version

```bash
$ npm run dev
```

### Highlights

The goal of Sulphuris is to reduce the time of front-end development, not by offering a fixed already designed system, but by being flexible enough to be used in a variety of differently designed projects.

* **Themes** - separated from the rest of the code to enable quick and easy extension.
* **Less !important usage** - abstaining from `!important` usage as much as possible.
* **Spacing size classes in pixels** - e.g. `.pt-32` results in `padding-top: 32px;`, and `.pt--32` results in `padding-top: -32px;`. **Note:** this might not be smart cause reusability of html like components, revise.
* **XXL screen breakpoint** -  from 1680px.
* **REM units** - only for font sizes. **Note:** not sure if this was smart... revise

### ToDo:
* [ ] Test and refactor color generators, usage of CSS variables and color theming
* [ ] Inline links
* [ ] Animations and transitions
* [ ] Forms
* [ ] Start working on modules
* [ ] Provide basic icons set
