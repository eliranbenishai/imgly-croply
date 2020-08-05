import React, { useState, useEffect } from 'react';
import Draggable, { DraggableEvent } from 'react-draggable';
import './Croply.css';

/*
 * The parameter `image` is mandatory and corresponds to the image being cropped.
 * The parameter `minDimenstions` is optional and corresponds to the minimum dimensions the crop area can have. Default values 
 * of '50px' are assigned to both width and height if none are provided.
*/
const Croply: React.FC<CroplyInt> = ({ image, minDimensions = { height: '50px', width: '50px' } }) => {

  const [cropArea, setCropArea] = useState<CropRect>()
  
  useEffect(() => {
    
  })

  const handleDrag = (e: DraggableEvent) => {
    console.log(e)
  }

  const handleDragCornerStart = (corner: string) => () => {

  }

  const handleDragCornerStop = (corner: string) => () => {

  }

  return (
    <div className="croply">
      <img src={image} />
      <Draggable onDrag={handleDrag}>
        <div className="croply__crop-area">
          <Draggable onStart={handleDragCornerStart('bl')} onStop={handleDragCornerStop('bl')}>
            <div className="croply__crop-area__bl"></div>
          </Draggable>
          <div className="croply__crop-area__br"></div>
          <div className="croply__crop-area__tl"></div>
          <div className="croply__crop-area__tr"></div>
        </div>
      </Draggable>
    </div>
  );
}

interface CroplyInt {
  image: string;
  minDimensions?: { height: number, width: number };
}

interface CropRect {
    x: number;
    y: number;
    width: number;
    height: number;
};

export default Croply;
