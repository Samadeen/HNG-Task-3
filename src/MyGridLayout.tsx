import React, { useState } from 'react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import GridLayout from 'react-grid-layout';

const MyGridLayout = () => {
  const [layout, setLayout] = useState([
    { i: 'a', x: 0, y: 0, w: 2, h: 2 },
    { i: 'b', x: 2, y: 0, w: 3, h: 2 },
    { i: 'c', x: 0, y: 2, w: 4, h: 2 },
  ]);

  const onLayoutChange = (
    newLayout: React.SetStateAction<
      { i: string; x: number; y: number; w: number; h: number }[]
    >
  ) => {
    // Save the new layout when it changes
    setLayout(newLayout);
  };

  return (
    <GridLayout
      className='layout'
      layout={layout}
      onLayoutChange={onLayoutChange}
      cols={4} // Number of columns in the grid
      rowHeight={100} // Height of each row in pixels
      width={800} // Width of the grid in pixels
    >
      <div key='a'>Item A</div>
      <div key='b'>Item B</div>
      <div key='c'>Item C</div>
    </GridLayout>
  );
};

export default MyGridLayout;
