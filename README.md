# @lilonga/live-editor

> Modular live-coding environment for React

[![NPM](https://img.shields.io/npm/v/@lilonga/live-editor.svg)](https://www.npmjs.com/package/@lilonga/live-editor)

## Demo
[![Demo](https://live-editor.lilo.now.sh/example/public/live-editor-srecord.gif)]

[@lilonga/live-editor demo on Repl.it](https://repl.it/@lilonga/live-editor)

## Install

```bash
npm install --save @lilonga/live-editor
```

## Usage

```jsx
import React, { Component } from "react";

import LiveEditor from "@lilonga/live-editor";
import OutputIframe from "@lilonga/output-iframe";

let iframeCode = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>A title</title>
</head>
<body>
  Hello world
</body>
</html>

`;

class App extends Component {
  constructor(){
    super()
    this.state = {
      input:iframeCode,
    }
  }
  render() {
    return (

      <div>
        <LiveEditor
          input={this.state.input}
          onInputChange={(input) => {
            this.setState({input})
          }}
          editorProps={{
            mode:'html'
          }}
          width={"100%"}
          height={"400px"}
          outputComponent={OutputIframe}
          outputProps={{

          }}
        />

      </div>
    );
  }
}

export default App;

```

## License

MIT © [Luka Kakia](https://github.com/manguluka)
