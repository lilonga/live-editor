import React from "react";

import SplitterLayout from "react-splitter-layout";
import CodeEditor from "@lilonga/code-editor";

class ResizeAceHack {
  constructor(editor){
    setTimeout(_=>window.dispatchEvent(new Event('resize')),500)
    editor.resize()
  }
}
export default class LiveEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: this.props.input
    };
  }
  render() {
    const OutputComponent = this.props.outputComponent;
    return (
      <div
        style={{
          width: this.props.width,
          height: this.props.height,
          overflow: "scroll"
        }}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `

.splitter-layout {
  position: absolute;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.splitter-layout .layout-pane {
  position: relative;
  flex: 0 0 auto;
  overflow: auto;
}

.splitter-layout .layout-pane.layout-pane-primary {
  flex: 1 1 auto;
}

.splitter-layout > .layout-splitter {
  flex: 0 0 auto;
  width: 4px;
  height: 100%;
  cursor: col-resize;
  background-color: #ccc;
}

.splitter-layout .layout-splitter:hover {
  background-color: #bbb;
}

.splitter-layout.layout-changing {
  cursor: col-resize;
}

.splitter-layout.layout-changing > .layout-splitter {
  background-color: #aaa;
}

.splitter-layout.splitter-layout-vertical {
  flex-direction: column;
}

.splitter-layout.splitter-layout-vertical.layout-changing {
  cursor: row-resize;
}

.splitter-layout.splitter-layout-vertical > .layout-splitter {
  width: 100%;
  height: 4px;
  cursor: row-resize;
}

.splitter-layout{
  position: relative !important;
}
`
          }}
        />
        <SplitterLayout vertical={this.props.vertical || false}>
          <CodeEditor
            {...this.props.editorProps}
            plugins={this.props.editorProps.plugins ? [ResizeAceHack,...this.props.editorProps.plugins] : [ResizeAceHack] }
            height={this.props.editorProps.height || "400px"}
            width={this.props.editorProps.width || "100%"}
            mode={this.props.editorProps.mode}
            onChange={input => {
              this.setState({ input });
              this.props.onInputChange(input);
            }}
            code={this.state.input}
          />

          <OutputComponent
            {...this.props.outputProps}
            input={this.state.input}
          />
        </SplitterLayout>
      </div>
    );
  }
}
