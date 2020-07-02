# Logger

Enhanced file system handler for nodejs.

[![Version](https://img.shields.io/badge/git-%40argus--inc%2Flogger-orange)](https://github.com/argus-inc/logger/packages/296778)
[![Downloads/week](https://img.shields.io/github/package-json/v/argus-inc/logger)](https://github.com/argus-inc/flogger/packages/296778)
[![License](https://img.shields.io/github/license/argus-inc/logger)](https://github.com/argus-inc/logger/blob/master/LICENSE)

Simple enhanced logger for easy and beautiful logs.

Supports debug logging that can be triggered on/off from config file.

## Installation

To install with yarn:

```bash
yarn add https://github.com/argus-inc/logger
```

To install with npm:

```bash
npm install @argus-inc/logger
```

## Configuration 

You can configure logger in two ways. One by editing the `package.json` and one by creating a `argus.json` at the same level as your `package.json`. (this is optional as logger comes with a default configuration)

These is what is needed for the confiiguration:

```json
{
    "argusInc": {
        "logger": {
            "debug": true
        }
    }
}
```

## Usage

To use logger simply do the following:

```typescript
import {log, debug, debugContent, LogType} from '@argus-inc/logger';
log("Logger is initialized", LogType.Success)
debugContent({myObject: "hello"})
debug(['Here is my array', [1, 2, 3, 4, 5]])
```


## Author

**Author**: [Argus](https://github.com/argus-inc)

**Developer**: [Mederic Burlet](https://github.com/crimson-med)

**Licence**: [GPL-3-0-only](https://github.com/argus-inc/fluct/blob/master/LICENSE)
