# SRequire
Simple requiring tool that loads everything you want from your cwd (or any other route you want to specify)

## Installation
Installation is done using the **npm install** command:
```
$ npm install srequire
```

## Usage
1. If you want, you could specify **baseRoutes** on your **cwd**:
    On **JavaScript** (`baseRoutes.js`):
    ```javascript
    module.exports = {
        models: 'src/api/models',
        controllers: 'src/api/controllers',
        uploads: 'src/common/uploads',
        logger: 'src/common/logger'
    };
    ```
    Or **JSON** (`baseRoutes.json`):
    ```javascript
    {
        "models": "src/api/models",
        "controllers": "src/api/controllers",
        "uploads": "src/common/uploads",
        "logger": "src/common/logger"
    };
    ```
    Or **load** them only **1 time** for all your project:
    ```javascript
    const srequire = require('srequire');
    
    srequire.serBaseRoutes({ models: 'src/api/models' });
    ```
2. Require your modules:
    ```javascript
    const srequire = require('srequire');
    // If you specified on your base route a baseDir, you can use it like this
    const users = srequire('models/users');
    const errors = srequire('src/api/lib/tools/pepe/xxx/errors');
    
    // You can also set modules as baseRoutes!
    const Logger = srequire('logger');
    
    Logger.info('Works!... must work..');
    ```

3. Use it to join paths to your **cwd**:
    ```javascript
    const { readFileSync } = require('fs');
    const { joinToCWD } = require('srequire');
    
    // You can also use your baseRoutes
    const dirPath = joinToCWD('/any/dir', 'you/want', 'pepe.json');
    const config = JSON.parse(readFileSync(dirPath));
    ```
 
 4. Use it to join paths to your **baseRoutes** or any path as you do with the module **path**:
    ```javascript
    const user = await users.getOne({...});
    const { join } = srequire('srequire');
    const uploadsDir = join('uploads', user.uploads);
    ```
