import React, { useState, SyntheticEvent } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import './Croply.css';

enum Corner {
  BottomLeft = 'BL',
  BottomRight = 'BR',
  TopLeft = 'TL',
  TopRight = 'TR',
}

/*
 * The parameter `image` is mandatory and corresponds to the image being cropped.
 * The parameter `minDimenstions` is optional and corresponds to the minimum dimensions the crop area can have. Default values 
 * of '50px' are assigned to both width and height if none are provided.
*/
const Croply: React.FC<CroplyInt> = ({ image, minDimensions = { height: 150, width: 150 } }) => {

  const [cropArea, setCropArea] = useState<CropRect>({ x: 0, y: 0, width: 0, height: 0 });
  
  const validateWidth = (width: number) => width < minDimensions.width ? minDimensions.width : width
  const validateHeight = (height: number) => height < minDimensions.height ? minDimensions.height : height

  const handleDrag = (corner?: string) => (e: DraggableEvent, dragData: DraggableData) => {
    const { deltaX, deltaY } = dragData;
    const { height, width, x, y } = cropArea;
    
    switch (corner) {
      case Corner.BottomLeft:
        setCropArea(state => ({ ...state, height: validateHeight(height + deltaY), width: validateWidth(width - deltaX), x: x + deltaX }));
        break;
      case Corner.BottomRight:
        setCropArea(state => ({ ...state, height: validateHeight(state.height + deltaY), width: validateWidth(state.width + deltaX) }));
        break;
      case Corner.TopLeft:
        setCropArea({height: validateHeight(height - deltaY), width: validateWidth(width - deltaX), x: x + deltaX, y: y + deltaY });
        break;
      case Corner.TopRight:
        setCropArea(state => ({ ...state, height: validateHeight(height - deltaY), width: validateWidth(width + deltaX), y: y + deltaY }));
        break;
      default:
        setCropArea(state => ({ ...state, x: x + deltaX, y: y + deltaY }));
        break;
    }
  }

  const setImageDimensions = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const { clientHeight, clientWidth } = e.currentTarget
    setCropArea({...cropArea, height: clientHeight - 100, width: clientWidth - 100})
  }

  return (
    <div className="croply">
      <img alt="" src={image} onLoad={setImageDimensions} />
      <Draggable bounds="parent" position={{ x: cropArea.x, y: cropArea.y }} onDrag={handleDrag()}>
        <div className="croply__crop-area" style={{ height: cropArea.height, width: cropArea.width }}></div>
      </Draggable>
      <Draggable onDrag={handleDrag(Corner.BottomLeft)} position={{ x: cropArea.x, y: cropArea.y + cropArea.height - 13 }}>
        <div className="croply__crop-area__bl"></div>
      </Draggable>
      <Draggable onDrag={handleDrag(Corner.BottomRight)} position={{ x: cropArea.x + cropArea.width - 13, y: cropArea.y + cropArea.height - 13 }}>
        <div className="croply__crop-area__br"></div>
      </Draggable>
      <Draggable onDrag={handleDrag(Corner.TopLeft)} position={{ x: cropArea.x, y: cropArea.y }}>
        <div className="croply__crop-area__tl"></div>
      </Draggable>
      <Draggable onDrag={handleDrag(Corner.TopRight)} position={{ x: cropArea.x + cropArea.width - 13, y: cropArea.y }}>
        <div className="croply__crop-area__tr"></div>
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
