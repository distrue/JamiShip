import React from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';


interface CodeEditorProps {
  onChange: (value: string) => unknown;
  value: string;
  style?: React.CSSProperties;
  className?: string;
}

const CodeEditor = (props: CodeEditorProps) => {
  const { className, value, onChange } = props;
  return (
    <AceEditor
      mode="javascript"
      theme="monokai"
      className={className}
      value={value}
      onChange={onChange}
      width="100%"
      height="100%"
      fontSize={14}
      tabSize={2}
    />
  );
};

export default CodeEditor;
