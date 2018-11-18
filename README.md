# @davidahouse/lincoln-api

[![npm (scoped)](https://img.shields.io/npm/v/@davidahouse/lincoln-api.svg)](https://www.npmjs.com/package/davidahouse/lincoln-api)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/@davidahouse/lincoln-api.svg)](https://www.npmjs.com/package/davidahouse/lincoln-api)

API for accessing the Lincoln file storage

## Install

```
$ npm install @davidahouse/lincoln-api
```

## Usage

Configuring the API is easy, just specify the vault you want to interact with by name:

```
var LincolnVault = require('@davidahouse/lincoln-api')

var vault = new LincolnVault("yourvaultname")
```

You can get the path to any of the Lincoln containers by using the `pathFor` method:

```
var path = vault.pathFor("Today")
```

The container names are as follows:

| Container | Description |
|-----------|-------------|
| Today     | The journal folder that points to today's date |
| Journal/YYYY-MM-DD | The journal folder for a specific date |
| Glance    | The glance container |
| Frequent  | The frequent container |
| Content/optional_folder_path | A content container. The folder path represents the folders under the main content root, but is optional |

You can create a new markdown document using the `newDocument` method:

```
vault.newDocument("Glance", "My Document", "## The markdown contents go here")
```
