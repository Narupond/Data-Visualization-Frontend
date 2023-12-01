import React from 'react';

const ModelViewer = ({ modelData }) => {
  return (
    <div>
      <h2>Model Viewer</h2>
      <pre>{JSON.stringify(modelData.model, null, 2)}</pre>
    </div>
  );
};

export default ModelViewer;
