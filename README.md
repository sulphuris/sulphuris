![Sulphuris logo](https://avatars.githubusercontent.com/u/83950228)

# Sulphuris
[![npm version](https://img.shields.io/npm/v/sulphuris)](https://www.npmjs.com/package/sulphuris)
[![CSS gzip size](https://img.badgesize.io/sulphuris/sulphuris/main/dist/sulphuris.min.css?compression=gzip&label=CSS%20gzip%20size)](https://github.com/sulphuris/sulphuris/blob/main/dist/sulphuris.min.css)

An adaptable CSS utility library

> Sulphuris aims to be the soul of your next front-end project. Inspired by [Bootstrap](https://github.com/twbs/bootstrap) and [Primer](https://github.com/primer/css), but tailored to suit your everyday front-end development needs.

It achieves this by having a single `_config.scss` file as a source of truth. These variables are then used by generators to generate almost all of the utility classes. This makes it easy to extend and customize the library to suit your needs.

### Highlights

* **Themes** - separated from the rest of the code to enable quick and easy extension.
* **Less !important usage** - abstaining from `!important` usage as much as possible.
* **Spacing size classes in pixels** - e.g. `.pt-32` results in `padding-top: 32px;`, and `.pt--32` results in `padding-top: -32px;`. **Note:** this might not be smart cause reusability of html like components, revise.
* **XXL screen breakpoint** -  from 1680px.
* **REM units** - only for font sizes. **Note:** not sure if this was smart... revise

## 🚀 Getting Started

### Install

```bash
$ npm install sulphuris
```

### Usage

In your main SCSS file, import Sulphuris:
```scss
@import '_config.scss'; // Import your own configuration, it overrides the default one src/core/_config.scss so you can change only the variables you need
@import 'sulphuris';
```

Be sure to include the `node_modules` directory in your `sass` include paths. This is usually done in your build tool configuration.

## 💻 Local Development

Sulphuris

The build process is powered by [Poops](https://github.com/stamat/poops), a simple and fast build tool for modern web development.

Don't forget to `npm install` and have `Node 14+`!

```bash
$ npm run dev
```

This command will start a local development server. It will also watch for the changes and rebuild the project when necessary.

## 📝 Contributing

If you have any ideas on how to improve Sulphuris, feel free to open an issue or a pull request. We're always looking for new contributors to help us make this project better.

### ToDo:
* [ ] Optional numerical utilities like bootstrap or primer
* [ ] Inline links
* [ ] Animations and transitions
* [ ] Forms
* [ ] WRITE DOCS!!!!! (and complete the site)

## Name

Sulphuris is a Latin word for sulfur. Sulfur is a chemical element. Elemental sulfur at room temperature is a bright yellow, crystalline solid.

Sulphur is one of three components of lapis philosophorum, the philosopher's stone. Other two are mercury and salt. Sulphur is the soul of the stone, mercury is the spirit and salt is the body. 

I was very interested in alchemy and the philosopher's stone when I was a kid. Fascinated by the idea of achieving immortality. And after I matured a bit I realized that the philosopher's stone is a metaphor for the state of enlightenment and inner balance. And that achieving immortality is not about living forever, but about living a meaningful life. Because infinite time means death of meaning. 

I noticed that this aspect of the tria prima (three primes) is ambiguous and can be interpreted in many ways. Like the three primes of front-end development: HTML, CSS and JavaScript. So I decided to name this project Sulphuris. Where JavaScript is the spirit, HTML is the body and CSS is the soul - Front-end philosopher's stone.

But then if we look the tria prima from perspective of the web development front-end would represent the soul, back-end would represent the spirit and the database would represent the body. This means that one philosopher's stone can be made of many other philosopher's stones, and so on. Like a fractal. That's Alchemy.

*~Fullstack Alchemist* :laughing:

## License

[MIT © Sulphuris](LICENSE)
