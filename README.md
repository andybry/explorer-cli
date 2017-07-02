# explorer-cli

This project is born out of years of using Vim for text editing coupled with 
the frustration of not having all that keyboard navigation in data management
tools like Postman (which is otherwise an amazing tool!). It is also an 
experiment with building a command line interface in Node.js.

I've only tested it on Mac OS.


## Demo

![explorer-cli demo](https://andybry.github.io/explorer-cli/explorer-cli.gif)

### Keystrokes in the above demo

1. Start the application by entering `explorer-cli` (displaying the help page).
2. Load the 'http' template by typing 'l' and entering 'http'.
3. Run the template (to fetch the data). By pressing 'Shift-R'.
4. Navigate to 'body.resources' property by pressing 'p' and entering 'body.resources'
5. View the keys at the current node by pressing 'Shift-K'.
6. Toggle the view back to the data by pressing 'Shift-K' again.
7. Quit the application by pressing 'q'.


## Installation

### Main program

`npm install -g explorer-cli` (to install as a global utility program)

*OR*

`npm install --save-dev explorer-cli` (to install locally for use in the current package)

### Required Run Types

`npm install -g explorer-cli-{runType}` (to install for use with a global  installation of the utility program).

*OR*

`npm install --save-dev explorer-cli-{runType}` (to install locally for use with a local installation of the utility progam).

e.g. 

`npm install -g explorer-cli-http`

## Usage

`explorer-cli` (start with default data)

*OR*

`explorer-cli <filename>` (persist data to the file and start with previously saved data)

*OR (programatically)*

```javascript
const explorerCli = require('explorer-cli');

explorerCli(state);

// Where 'state' is an object with the same form as the JSON in the save files.
// All keys in the 'state' object are optional
```

e.g.

```javascript
explorerCli({ // inspect a selection of environmental variables
    pick: 'HOME,EDITOR,LANG',
    data: process.env
});
```

__NB: a TTY is required (even for programmatic use)__


## Documentation

The main documentation is within the application on the start up page. It can also
be seen at any time by pressing 'h'.

[Here](https://github.com/andybry/explorer-cli/blob/master/helpText.json) is a link 
to the online version.