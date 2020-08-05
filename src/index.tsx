import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Croply from './Croply';

import defaultImage from './static/image.jpg'

ReactDOM.render(
  <Croply image={defaultImage} />,
  document.getElementById('root')
);
