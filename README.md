# Directory Switcher Extension

A tool for handling situations where you have a base directory and a corresponding directory where
files match the base dir. This extension simply switches the active file from base dir to the other directory and back.
If the file is not yet created it will ask if you want to.

A common case for this extension is for systems like Wordpress and Salesforce where you override files
simply by adding a file with the same name in the same path in your plugin / cartridge.

## Usage

Press F1 and type "DirectorySwitcher: Open Corresponding File".

This will open the same file in the corresponding path defined in settings.
If the file does not exist, it will give you the posibility to create it.

## Settings example

You should not include the path to the working directory. Use relative paths.
The recommendation is to add these settings to ./.vscode/settings.json in the
project you are working on, so that you can have different paths for different projects.

```
{
    "directorySwitcher.baseDirectory": "relativePath/subPath",
    "directorySwitcher.correspondingDirectory": "relativePath/subPath2"
}
```

## Add keyboard shortcut

Go to File > Preferences > Keyboard shortcuts and add the following:

```
{
    "key": "ctrl+1",
    "command": "directorySwitcher.openCorrespondingFile",
    "when": "editorTextFocus && !editorReadonly"
}
```

## Build

```
git clone https://github.com/tonygustafsson/directory-switcher.git
npm install
npm install -g vsce
vsce package
```

A new file will be created that you can install named directoy-switcher-VERSION.vsix
