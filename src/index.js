import React from "react";

import SplitterLayout from "react-splitter-layout";
import "react-splitter-layout/lib/index.css"
import "./styles.css"
import CodeEditor from "@lilonga/code-editor";

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
          width: this.props.width ,
          height: this.props.height ,
          overflow: "scroll"
        }}
      >
        <SplitterLayout vertical={this.props.vertical || false}>
          <CodeEditor
            {...this.props.editorProps}
            height={this.props.editorProps.height || "400px"}
            width={this.props.editorProps.width || "400px"}
            mode = {this.props.editorProps.mode}
            onChange={input => {
              this.setState({ input });
              this.props.onInputChange(input)
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
