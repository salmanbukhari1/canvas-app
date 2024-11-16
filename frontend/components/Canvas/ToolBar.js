import React from 'react';
import { Rect, Text } from 'react-konva';

const Toolbar = ({ x, y, onDelete }) =>  {
    return (
      <React.Fragment>
        {/* Toolbar Background */}
        <Rect
          x={x}
          y={y}
          width={45}
          height={25}
          fill="black"
          opacity={0.8}
          cornerRadius={5}
        />
        {/* Delete Button */}
        <Text
          text="Delete"
          fontSize={12}
          fill="white"
          x={x + 5}
          y={y + 7}
          onClick={onDelete}
          style={{ cursor: 'pointer' }}
        />
      </React.Fragment>
    );
}

export default Toolbar;