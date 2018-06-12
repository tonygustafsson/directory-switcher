# Directory Switcher Extension

A tool for handling situations where you have a base directory and a corresponding directory where
files match the base dir. This extension simply switches the active file from base dir to the other directory and back.
If the file is not yet created it will ask if you want to.

A common case for this extension is for systems like Wordpress and Salesforce where you override files
simply by adding a file with the same name in the same path in your plugin / cartridge.

## Usage

CTRL+ALT+P and type "DirectorySwitcher: Open Corresponding File".

This will open the same file in the corresponding path defined in settings.
If the file does not exist, it will give you the posibility to create it.

## Settings example

You should not include the path to the working space.

```
{
    "directorySwitcher.baseDirectory": "relativePath\\subPath",
    "directorySwitcher.correspondingDirectory": "relativePath\\subPath2"
}
```

## Build

```
$ npm install
$ npm install -g vsce
$ vsce package
```
