TypeScript sample with Visual Studio 2015, Jspm, tsd.
-----------------------------------------------------
*note: VS does not play nicely with jspm and typescript, you still need a compiler for the ts files. So for now, this repo is not functioning as expected. 
I'll try to fix it at a later stage. It is a solid foundation to start from and use gulp, grunt...*

**Set the stage**
* This sample is for Visual Studio developers to get started with Jspm and TypeScript.
* No grunt or gulp needed (so far). Limited use of command line to see what Visual Studio 2015 out of the box can do.
* TypeScript is configured as transpiler (requires at least jspm 0.16).
* Visual Studio IntelliSense is configured using tsd.
* **todo**: bundling using jspm.

**Credits**
* jspm: [https://github.com/jspm/jspm-cli/wiki/Getting-Started](https://github.com/jspm/jspm-cli/wiki/Getting-Started)
* tsconfig: [http://basarat.gitbooks.io/typescript/content/docs/project/tsconfig.html](http://basarat.gitbooks.io/typescript/content/docs/project/tsconfig.html)
* tsd: [http://definitelytyped.org/tsd/](http://definitelytyped.org/tsd/)
* TypeScript: [https://github.com/Microsoft/TypeScript](https://github.com/Microsoft/TypeScript)
* Definitelytyped: [http://definitelytyped.org/](http://definitelytyped.org/)

**Replay Repo**

1. File - New Project - ASP.NET 5 empty template
2. Add Jspm using

   - command line and node
   ```
   npm install jspm --save-dev
   ```
   - Visual Studio's Dependencies packaging system
     * Add *NPM Configuration file*
     * Visual Studio will download jspm and put the package in the Dependencies on save of package.json
      ```json
      {
        "version": "1.0.0",
        "name": "Ts-Vs2015-Jspm",
        "private": true,
        "devDependencies": {
            "jspm": "^0.16.2"
         }
      }
      ```

3. Configure Jspm

   ```
   jspm init
   use defaults except:
   Enter server baseURL (public folder path) [./]:wwwroot/
   Do you wish to use an ES6 transpiler? [yes]:n
   ```
   the package.json should look now like this:
   ```json
   {
   "version": "1.0.0",
   "name": "Ts-Vs2015-Jspm",
   "private": true,
   "devDependencies": {
       "jspm": "^0.16.2"
   },
   "jspm": {
       "directories": {
       "baseURL": "wwwroot"
       },
       "devDependencies": {}
   }
   }
   ```
   jspm_packages will be added in wwwroot
   config.js file is created and looks like
   ```JavaScript
   System.config({
     baseURL: "/",
     defaultJSExtensions: true,
     transpiler: "none",
     paths: {}
   });
   ```
4. Add TypeScript and core-js as a devdependency of Jspm
   ```
   jspm install typescript
   jspm install core-js
   ```
   package.json:
   ```json
   {
   "version": "1.0.0",
   "name": "Ts-Vs2015-Jspm",
   "private": true,
   "devDependencies": {
    "jspm": "^0.16.2"
   },
   "jspm": {
    "directories": {
      "baseURL": "wwwroot"
    },
    "dependencies": {
      "core-js": "npm:core-js@^1.1.3",
      "typescript": "npm:typescript@^1.5.3"
    },
    "devDependencies": {}
   }
   }
   ```
   config.js will look like this:
   ```JavaScript
   System.config({
      baseURL: "/",
      defaultJSExtensions: true,
      transpiler: "none"
      paths: {
       "github:*": "jspm_packages/github/*",
       "npm:*": "jspm_packages/npm/*"
   },

   map: {
    "core-js": "npm:core-js@1.1.3",
    "typescript": "npm:typescript@1.5.3",
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.4.3"
    },
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:buffer@3.4.3": {
      "base64-js": "npm:base64-js@0.0.8",
      "ieee754": "npm:ieee754@1.1.6",
      "is-array": "npm:is-array@1.0.1"
    },
    "npm:core-js@1.1.3": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:typescript@1.5.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "os": "github:jspm/nodelibs-os@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "readline": "github:jspm/nodelibs-readline@0.1.0"
    }
   }
   });
   ```
5. Configure TypeScript transpiler
   * set typescript as the transpiler and configure the paths (src)
   ```JavaScript
   System.config({
      baseURL: "/",
      defaultJSExtensions: true,
      transpiler: "typescript",
      paths: {
       "*": "src/*",
       "src": "src",
       "github:*": "jspm_packages/github/*",
       "npm:*": "jspm_packages/npm/*"
   },
   ```
6. Add some typescript files
   - under **wwwroot** add a **src** folder with
  
   **app.ts**
   ```TypeScript
   import { Greeter } from 'greeter'

   export function main(el: HTMLElement): void {
    let greeter = new Greeter(el);
    greeter.start();
   }
   ```
   **greeter.ts**   
   ```TypeScript
   import repeat from "core-js/fn/string/repeat";

   export class Greeter {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;

    constructor(element: HTMLElement) {
        this.element = element;
        this.element.innerText += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }

    start() {
        this.timerToken = setInterval(() => this.span.innerText = `"${repeat(new Date().toUTCString() + " ", 2) }"`, 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }
   }
   ```
   * Add a index.html page under wwwroot
   ```html   
   <html>
   <head>
    <title>Jspm sample</title>
    <script src="jspm_packages/system.src.js"></script>
    <script src="config.js"></script>
   </head>
   <body>
    <div id="content"></div>
    <script>
        System.import('app').then(function(m) {
            var element = document.getElementById("content");
            m.main(element);
        });
    </script>
   </body>
   </html>
   ```
7. do a testrun by starting IISExpress 
   * comment the default Startup.Configure implementation 
   ```C#  
   public void Configure(IApplicationBuilder app)
   {
      //app.Run(async (context) =>
      //{
      //    await context.Response.WriteAsync("Hello World!");
      //});
   }
   ```   
8. Configure Visual Studio intelliSense for TypeScript to fix the VS errors for the line import repeat from "core-js/fn/string/repeat"; We need to tell vs to use the amd module loader.    
   
   Add TypeScript JSON Configuration File **tsconfig.json** in the wwwroot folder
   ```json    
   {
    "compilerOptions": {
      "module": "amd",
      "noImplicitAny": false,
      "noEmitOnError": true,
      "removeComments": false,
      "sourceMap": true,
      "target": "es5"
    }
   }
   ```
9. Configure Type definition files to fix the 'Cannot find module 'core-js/fn/string/repeat' error in VS.
   ```
   npm install tsd -g
   tsd init
   ```
   - a folder named typings is created it contains an empty tsd.d.ts file
   - a file tsd.json is created
   - add typedefintions for core-js by running:
   ```
   tsd install core-js --save
   ```
   contents tsd.json
   ```json
   {
    "version": "v4",
    "repo": "borisyankov/DefinitelyTyped",
    "ref": "master",
    "path": "typings",
    "bundle": "typings/tsd.d.ts",
    "installed": {
     "core-js/core-js.d.ts": {
       "commit": "de1bfe2c1de921da660cc17a5af1de6c095b35eb"
    }
   }
   }
   ```
   contents tsd.d.ts
   ```C#
   /// <reference path="core-js/core-js.d.ts" />
   ```
   Drag the tsd.d.ts file over to greeter.js and the the reference will be added to the file.
   ```C#
   /// <reference path="../../typings/tsd.d.ts" />
   import repeat from "core-js/fn/string/repeat";
   ```
   Only issue at this time of writing is that VS complains that the core-js module has no default export.
   
   To fix this, go the type defintion file (core-js.d.ts) and add default manualy
   ```TypeScript
   declare module "core-js/fn/string/repeat" {
     var repeat: typeof core.String.repeat;
     export default repeat;
   }
   ```
   