

interface CodeEditorProps {
  onChange: (value: string) => unknown;
  value: string;
  style?: React.CSSProperties;
}

const CodeEditor = (props: CodeEditorProps) => (
  <textarea value={props.value} onChange={(e) => {
    props.onChange(e.target.value);
  }} style={props.style} />
);

export default CodeEditor;
