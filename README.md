# Data Developers

Show a list of developers received from the backend and allows filter them according their names and languages.

## Technologies

![Badge](https://img.shields.io/static/v1?label=structure&message=HTML5&color=E34F26&style=flat)
![Badge](https://img.shields.io/static/v1?label=layout&message=Bootstrap+4.5&color=563D7C&style=flat)
![Badge](https://img.shields.io/static/v1?label=style&message=CSS3&color=1572B6&style=flat)
![Badge](https://img.shields.io/static/v1?label=logic&message=JavaScript&color=F7DF1E&style=flat)
![Badge](https://img.shields.io/static/v1?label=backend&message=Json-Server&color=339933&style=flat)

## Preview

![Data Devs Screenshot](data-devs.gif)

## Goals

- Load data from the backend using `fetch`
- Display developers info on screen
- Allow filter developers according:
  - Name
  - Technologies
- The Technologies filter can be inclusive (or) or exclusive (and)

## How it works

Once the data is loaded it creates, in memory, the dataset, with `loadDevelopers`. This function create a list of objects with normalized data from developers. Every object have:

- `id`: developer's id received from the backend
- `name`: developer's name
- `email`: developer's email address
- `photo`: developer's profile picture
- `technologies`: list of technologies used
- `search`: a normalized text of developer's name

The `search` attribute is defined with `normalize` function, where all characters with accents are changed to normal characters and all spaces are removed. For example: `João Marcos`, becomes `joaomarcos`. The `search` attribute is used to filter developers by name.

After normalize all developers, the `render` function shows the list of developers on screen. Creating a `card` for each one.

All `inputs` have an `eventListener`responsible to get every modification and call the `filter_devs` function. This function get the values of each input and according the parameters passed returns a list of developers.

## How to Use

### Using the Backend

On backend folder, type:

- `npm install` to install all dependences
- `npm start` to run the server

### Using the Frontend

Open the `index.html` file with or without the `liveserver` to use it.


## Final Notes

The list of languages is hard-coded, a cool idea would be create it dynamically allowing the filters grow up easily.
