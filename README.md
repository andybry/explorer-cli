# explorer-cli

This project is born out of years of using Vim for text editing coupled with 
the frustration of not having all that keyboard navigation in data management
tools like Postman (which is otherwise an amazing tool!). It is also an 
experiment with building a command line interface in Node.js.

It's a beta project, but feel free to use it or adapt it if you come across it
(subject to licensing restrictions). But do be aware that it might change quite
a lot.

It currently only works in Node.js v7+ and I've only tested it on Mac OS.


## Demo

![explorer-cli demo](https://andybry.github.io/explorer-cli/explorer-cli.gif)

### Demo Script

    1. Start the application by entering `explorer-cli` (displaying the help page).
    2. Load the 'http' template by typing 'l' and entering 'http'.
    3. Run the template (to fetch the data). By pressing 'Shift-R'.
    4. Navigate to 'body.resources' property by pressing 'p' and entering 'body.resources'
    5. View the keys at the current node by pressing 'Shift-K'.
    6. Toggle the view back to the data by pressing 'Shift-K' again.
    7. Quit the application by pressing 'q'.


## Installation

`npm -g install explorer-cli`


## Usage

`explorer-cli` (start with default data)

*OR*

`explorer-cli <filename>.json` (start with previously saved data)


## Documentation

The main documentation is within the application on the start up page. It can also
be seen at any time by pressing 'h'.

[Here](https://github.com/andybry/explorer-cli/blob/master/helpText.json) is a link 
to the online version.