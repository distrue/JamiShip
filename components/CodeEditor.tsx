import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";


interface CodeEditorProps {
  onChange: (value: string) => unknown;
  value: string;
  style?: React.CSSProperties;
  className?: string;
}

const CodeEditor = (props: CodeEditorProps) => (
  // <textarea className={props.className} value={props.value} onChange={(e) => {
  //   props.onChange(e.target.value);
  // }} style={props.style} />
  <AceEditor
    mode="java"
    theme="monokai"
    className={props.className}
    value={props.value}
    onChange={props.onChange}
    width="100%"
    height="100%"
    fontSize={14}
  />
);

export default CodeEditor;
