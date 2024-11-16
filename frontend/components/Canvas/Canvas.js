import { Stage, Layer, Rect, Line } from 'react-konva';
import React, { useEffect, useState } from 'react';
import Button from '../Controls/Button';
import Toolbar from './ToolBar';

function Canvas({ shapes, onAddShape, onDeleteShape, onUpdateShape }) {
  const [selectedShape, setSelectedShape] = useState(null); // Track the selected shape
  const [toolbarPosition, setToolbarPosition] = useState({ x: 0, y: 0 });
  const [drawing, setDrawing] = useState(false); // Track drawing state
  const [newLine, setNewLine] = useState([]); // Points for the current line

  useEffect(() => {
    console.log("selectedShape", selectedShape);
  }, [selectedShape]);

  // Add new rectangle to canvas
  const handleAddShape = () => {
    const newShape = {
      id: `rect${Date.now()}`,
      x: 20,
      y: 20,
      width: 100,
      height: 100,
      fill: 'red',
      draggable: true,
    };
    onAddShape(newShape);
  };

  // Handle dragging of shapes
  const handleDragMove = (e, shape) => {
    // move toolbar
    setToolbarPosition(determineToolBarPosition(e, shape));

    // update shape position
    const newPosition = { id: shape.id, newAttrs: {x: e.target.x(), y: e.target.y()} };
    
    onUpdateShape(newPosition);
  };

  // what the position of toolbar should be
  const determineToolBarPosition = (e, shape) => {
    return {
      x: e.target.x() + shape.width + 3, // Position next to the shape
      y: e.target.y() - 25, // Position above the shape
    } 
  }

  // Handle deletion of shapes
  const handleDeleteShape = () => {
    if (selectedShape) {
      onDeleteShape(selectedShape.id);
      setSelectedShape(null); // Clear selection after deletion
    }
  };

  // Handle shape selection
  const handleShapeClick = (e, shape) => {
    e.cancelBubble = true; // Prevent background click from being triggered
    setSelectedShape(shape); // Select the clicked shape
    setToolbarPosition(determineToolBarPosition(e, shape));
  };

  // Handle line drawing events
  const handleMouseDown = (e) => {
    if (e.target === e.target.getStage()) {
      setDrawing(true);
      const { x, y } = e.target.getStage().getPointerPosition();
      setNewLine([x, y, x, y]);
    }
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;
    const { x, y } = e.target.getStage().getPointerPosition();
    setNewLine((prevLine) => [...prevLine.slice(0, -2), x, y]);
  };

  const handleMouseUp = () => {
    if (!drawing) return;
    onAddShape({
      id: `line${Date.now()}`,
      points: newLine,
      stroke: 'black',
      strokeWidth: 2,
      draggable: false,
    });
    setDrawing(false);
    setNewLine([]);
  };

  return (
    <>
      <Button onClick={handleAddShape}>Add Rectangle</Button>
      <Stage
        width={800}
        height={600}
        style={{ border: '1px solid #afafaf', borderRadius: '5px' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={() => setSelectedShape(null)} // Deselect shape on canvas click
      >
        <Layer>
          {shapes?.map((shape) =>
            shape.points ? (
              // Render Line
              <Line
                key={shape.id}
                points={shape.points}
                stroke={shape.stroke}
                strokeWidth={shape.strokeWidth}
              />
            ) : (
              // Render Rectangle
              <React.Fragment key={shape.id}>
                <Rect
                  {...shape}
                  onDragMove={(e) => handleDragMove(e, shape)}
                  onClick={(e) => handleShapeClick(e, shape)}
                  fill={shape.id === selectedShape?.id ? '#ff000070' : shape.fill}
                />
                {selectedShape?.id === shape.id && (
                  <Toolbar
                    x={toolbarPosition.x}
                    y={toolbarPosition.y}
                    onDelete={handleDeleteShape}
                  />
                )}
              </React.Fragment>
            )
          )}

          {/* Render the currently drawn line */}
          {drawing && (
            <Line
              points={newLine}
              stroke="black"
              strokeWidth={2}
              lineCap="round"
              lineJoin="round"
            />
          )}
        </Layer>
      </Stage>
    </>
  );
}

export default Canvas;
