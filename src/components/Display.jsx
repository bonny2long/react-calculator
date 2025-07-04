import React from 'react';

const Display = ({ value }) => {
  return (
    <div
      id="display"
      className="bg-gray-900 text-green-400 text-right text-4xl font-mono px-4 py-6 rounded-md min-h-[4rem] overflow-x-auto"
    >
      {value}
    </div>
  );
};

export default Display;
