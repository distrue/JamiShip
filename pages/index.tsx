import React from 'react';
import engine from '../runtimeEngine';

export default () => {
  React.useEffect(() => {
    engine();
  }, []);

  return <div>Hello</div>;
};
