import React from "react";

import SplitterLayout from "react-splitter-layout";
import CodeEditor from "@lilonga/code-editor";
import { ReflexContainer, ReflexSplitter, ReflexElement } from "react-reflex";

import "react-reflex/styles.css";
class ResizeAceHack {
  constructor(editor) {
    setTimeout(_ => window.dispatchEvent(new Event("resize")), 500);
    editor.resize();
  }
}
export default class LiveEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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

body.col-resize {
  cursor: col-resize; }

body.row-resize {
  cursor: row-resize; }

.reflex-container {
  justify-content: flex-start;
  /* align items in Main Axis */
  align-items: stretch;
  /* align items in Cross Axis */
  align-content: stretch;
  /* OLD - iOS 6-, Safari 3.1-6 */
  /* OLD - Firefox 19- (buggy but mostly works) */
  /* TWEENER - IE 10 */
  /* NEW - Chrome */
  display: flex;
  position: relative;
  height: 100%;
  width: 100%; }

.reflex-container.horizontal {
  flex-direction: column;
  min-height: 1px; }

.reflex-container.vertical {
  flex-direction: row;
  min-width: 1px; }

.reflex-container > .reflex-element {
  position: relative;
  overflow: auto;
  height: 100%;
  width: 100%; }

.reflex-container.reflex-resizing > .reflex-element {
  pointer-events: none;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none; }

.reflex-container > .reflex-element > .reflex-size-aware {
  height: 100%;
  width: 100%; }

.reflex-container > .reflex-splitter {
  background-color: #eeeeee;
  z-index: 100; }

.reflex-container > .reflex-splitter.active,
.reflex-container > .reflex-splitter:hover {
  background-color: #c6c6c6;
  transition: all 1s ease; }

.horizontal > .reflex-splitter {
  border-bottom: 1px solid #c6c6c6;
  border-top: 1px solid #c6c6c6;
  cursor: row-resize;
  width: 100%;
  height: 2px; }

.reflex-element.horizontal .reflex-handle {
  cursor: row-resize;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none; }

.reflex-container.horizontal > .reflex-splitter:hover,
.reflex-container.horizontal > .reflex-splitter.active {
  border-bottom: 1px solid #eeeeee;
  border-top: 1px solid #eeeeee; }

.reflex-container.vertical > .reflex-splitter {
  border-right: 1px solid #c6c6c6;
  border-left: 1px solid #c6c6c6;
  cursor: col-resize;
  height: 100%;
  width: 2px; }

.reflex-element.vertical .reflex-handle {
  cursor: col-resize;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none; }

.reflex-container.vertical > .reflex-splitter:hover,
.reflex-container.vertical > .reflex-splitter.active {
  border-right: 1px solid #eeeeee;
  border-left: 1px solid #eeeeee; }

.reflex-container > .reflex-splitter.reflex-thin {
  box-sizing: border-box;
  -moz-background-clip: padding;
  -webkit-background-clip: padding;
  background-clip: padding-box;
  opacity: 0.2;
  z-index: 100; }

.reflex-container > .reflex-splitter.reflex-thin.active
.reflex-container > .reflex-splitter.reflex-thin:hover {
  transition: all 1.5s ease;
  opacity: 0.5; }

.reflex-container.horizontal > .reflex-splitter.reflex-thin {
  border-bottom: 8px solid rgba(255, 255, 255, 0);
  border-top: 8px solid rgba(255, 255, 255, 0);
  height: 17px !important;
  cursor: row-resize;
  margin: -8px 0;
  width: 100%; }

.reflex-container.horizontal > .reflex-splitter.reflex-thin.active,
.reflex-container.horizontal > .reflex-splitter.reflex-thin:hover {
  border-bottom: 8px solid #e4e4e4;
  border-top: 8px solid #e4e4e4; }

.reflex-container.vertical > .reflex-splitter.reflex-thin {
  border-right: 8px solid rgba(255, 255, 255, 0);
  border-left: 8px solid rgba(255, 255, 255, 0);
  width: 17px !important;
  cursor: col-resize;
  margin: 0 -8px;
  height: 100%; }

.reflex-container.vertical > .reflex-splitter.reflex-thin.active,
.reflex-container.vertical > .reflex-splitter.reflex-thin:hover {
  border-right: 8px solid #e4e4e4;
  border-left: 8px solid #e4e4e4; }

  `
          }}
        />

        <ReflexContainer orientation="vertical">
          <ReflexElement className="left-pane"
          onDragEnd={() => window.dispatchEvent(new Event("resize"))}>
            <CodeEditor
            {...this.props.editorProps}
            plugins={
              this.props.editorProps.plugins
                ? [ResizeAceHack, ...this.props.editorProps.plugins]
                : [ResizeAceHack]
            }
            height={this.props.editorProps.height || "400px"}
            width={this.props.editorProps.width || "100%"}
            mode={this.props.editorProps.mode}
            onChange={input => {
              this.props.onInputChange(input);
            }}
            code={this.props.input}
          />
          </ReflexElement>

          <ReflexSplitter />

          <ReflexElement className="right-pane">
             <OutputComponent
            {...this.props.outputProps}
            input={this.props.outputSrc || this.props.input}
          />
          </ReflexElement>
        </ReflexContainer>

        {/*<SplitterLayout
          onDragEnd={() => window.dispatchEvent(new Event("resize"))}
          vertical={this.props.vertical || false}
        >
          <CodeEditor
            {...this.props.editorProps}
            plugins={
              this.props.editorProps.plugins
                ? [ResizeAceHack, ...this.props.editorProps.plugins]
                : [ResizeAceHack]
            }
            height={this.props.editorProps.height || "400px"}
            width={this.props.editorProps.width || "100%"}
            mode={this.props.editorProps.mode}
            onChange={input => {
              this.props.onInputChange(input);
            }}
            code={this.props.input}
          />

          <OutputComponent
            {...this.props.outputProps}
            input={this.props.outputSrc || this.props.input}
          />
        </SplitterLayout>*/}
      </div>
    );
  }
}
