import { useState, useEffect } from 'react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Layout, Responsive, WidthProvider } from 'react-grid-layout';
import styles from './Gallery.module.scss';
import logo from '../../assets/shared/logo.svg';
import { signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { galleria } from '../../../data';
import { auth } from '../../../firebase';
const ResponsiveGridLayout = WidthProvider(Responsive);

const initialLayouts = {
  lg: [
    { i: '0', x: 0, y: 0, w: 1, h: 3 },
    { i: '1', x: 1, y: 0, w: 2, h: 4 },
    { i: '2', x: 3, y: 1, w: 1, h: 2 },
    { i: '3', x: 0, y: 2, w: 1, h: 1 },
    { i: '4', x: 3, y: 2, w: 1, h: 3 },
    { i: '5', x: 4, y: 2, w: 1, h: 1 },
    { i: '6', x: 0, y: 2, w: 3, h: 4 },
    { i: '7', x: 4, y: 3, w: 1, h: 3 },
    { i: '8', x: 4, y: 4, w: 1, h: 2 },
    { i: '9', x: 4, y: 5, w: 2, h: 2 },
    { i: '10', x: 3, y: 3, w: 1, h: 1 },
    { i: '11', x: 0, y: 5, w: 1, h: 3 },
    { i: '12', x: 1, y: 5, w: 2, h: 3 },
    { i: '13', x: 3, y: 5, w: 2, h: 5 },
    { i: '14', x: 0, y: 6, w: 3, h: 2 },
  ],
  md: [
    { i: '0', x: 0, y: 0, w: 2, h: 3 },
    { i: '1', x: 1, y: 0, w: 2, h: 4 },
    { i: '2', x: 3, y: 1, w: 1, h: 2 },
    { i: '3', x: 0, y: 2, w: 1, h: 1 },
    { i: '4', x: 3, y: 2, w: 1, h: 3 },
    { i: '5', x: 4, y: 2, w: 1, h: 1 },
    { i: '6', x: 0, y: 2, w: 3, h: 4 },
    { i: '7', x: 4, y: 3, w: 1, h: 3 },
    { i: '8', x: 4, y: 4, w: 1, h: 2 },
    { i: '9', x: 4, y: 5, w: 2, h: 2 },
    { i: '10', x: 3, y: 3, w: 1, h: 1 },
    { i: '11', x: 0, y: 5, w: 1, h: 3 },
    { i: '12', x: 1, y: 5, w: 2, h: 3 },
    { i: '13', x: 3, y: 5, w: 2, h: 5 },
    { i: '14', x: 0, y: 6, w: 3, h: 2 },
  ],
  sm: [
    { i: '0', x: 4, y: 3, w: 5, h: 3 },
    { i: '1', x: 1, y: 0, w: 2, h: 4 },
    { i: '2', x: 3, y: 1, w: 1, h: 2 },
    { i: '3', x: 0, y: 2, w: 1, h: 1 },
    { i: '4', x: 3, y: 2, w: 1, h: 3 },
    { i: '5', x: 4, y: 2, w: 1, h: 1 },
    { i: '6', x: 0, y: 2, w: 3, h: 4 },
    { i: '7', x: 4, y: 3, w: 1, h: 3 },
    { i: '8', x: 4, y: 4, w: 1, h: 2 },
    { i: '9', x: 4, y: 5, w: 2, h: 2 },
    { i: '10', x: 3, y: 3, w: 1, h: 1 },
    { i: '11', x: 0, y: 5, w: 1, h: 3 },
    { i: '12', x: 1, y: 5, w: 2, h: 3 },
    { i: '13', x: 3, y: 5, w: 2, h: 5 },
    { i: '14', x: 0, y: 6, w: 3, h: 2 },
  ],
  xs: [
    { i: '0', x: 0, y: 0, w: 2, h: 3 },
    { i: '1', x: 1, y: 0, w: 2, h: 4 },
    { i: '2', x: 3, y: 1, w: 1, h: 2 },
    { i: '3', x: 0, y: 2, w: 5, h: 1 },
    { i: '4', x: 5, y: 2, w: 1, h: 3 },
    { i: '5', x: 4, y: 2, w: 1, h: 1 },
    { i: '6', x: 0, y: 2, w: 3, h: 4 },
    { i: '7', x: 4, y: 3, w: 1, h: 3 },
    { i: '8', x: 4, y: 4, w: 1, h: 2 },
    { i: '9', x: 4, y: 5, w: 2, h: 2 },
    { i: '10', x: 3, y: 3, w: 1, h: 1 },
    { i: '11', x: 0, y: 5, w: 1, h: 3 },
    { i: '12', x: 1, y: 5, w: 2, h: 3 },
    { i: '13', x: 3, y: 5, w: 2, h: 5 },
    { i: '14', x: 0, y: 6, w: 3, h: 2 },
  ],
  xxs: [
    { i: '0', x: 0, y: 0, w: 1, h: 3 },
    { i: '1', x: 1, y: 0, w: 2, h: 4 },
    { i: '2', x: 3, y: 1, w: 1, h: 2 },
    { i: '3', x: 0, y: 2, w: 1, h: 1 },
    { i: '4', x: 3, y: 2, w: 1, h: 3 },
    { i: '5', x: 4, y: 2, w: 1, h: 1 },
    { i: '6', x: 0, y: 2, w: 3, h: 4 },
    { i: '7', x: 4, y: 3, w: 1, h: 3 },
    { i: '8', x: 4, y: 4, w: 1, h: 2 },
    { i: '9', x: 4, y: 5, w: 2, h: 2 },
    { i: '10', x: 3, y: 3, w: 1, h: 1 },
    { i: '11', x: 0, y: 5, w: 1, h: 3 },
    { i: '12', x: 1, y: 5, w: 2, h: 3 },
    { i: '13', x: 3, y: 5, w: 2, h: 5 },
    { i: '14', x: 0, y: 6, w: 3, h: 2 },
  ],
};

const Gallery = () => {
  const navigate = useNavigate();
  const [display, setDisplay] = useState(galleria);
  const [layout, setLayout] = useState(initialLayouts);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onLayoutChange = (newLayout: Layout[]) => {
    setLayout((prevLayouts) => ({
      ...prevLayouts,
      [screenWidth]: newLayout,
    }));
  };

  const onSearchHandler = (e: { target: { value: string } }) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredDisplay = galleria.filter((gallery) =>
      gallery.name.toLowerCase().includes(searchTerm)
    );
    setDisplay(filteredDisplay);

    if (filteredDisplay.length === galleria.length) {
      // Reset to the initial layout for all breakpoints
      setLayout(initialLayouts);
    } else {
      // Update the layout for the 'lg' breakpoint
      const newLayout = filteredDisplay.map((_, index) => {
        const existingLayout = layout.lg.find(
          (item) => item.i === index.toString()
        );
        return (
          existingLayout || { i: index.toString(), x: 1, y: 1, w: 3, h: 2 }
        );
      });

      // Create a new Layouts object and update the 'lg' breakpoint
      setLayout((prevLayouts) => ({
        ...prevLayouts,
        lg: newLayout,
      }));
    }
  };

  const userSignOut = () => {
    signOut(auth).then(() => {
      navigate('/');
    });
  };

  return (
    <div className={styles.layout_container}>
      <div className={styles.heading}>
        <Link to='/'>
          <img src={logo} alt='logo' />
        </Link>
        <form action=''>
          <label htmlFor='search'>
            <input
              type='text'
              placeholder='Search from our collections...'
              onChange={onSearchHandler}
            />
          </label>
        </form>
        <button onClick={userSignOut}>Sign out</button>
      </div>
      {display.length > 0 ? (
        <ResponsiveGridLayout
          className={styles.layout}
          layouts={initialLayouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 5, md: 5, sm: 5, xs: 4, xxs: 1 }}
          rowHeight={150}
          width={screenWidth}
          onLayoutChange={onLayoutChange}
        >
          {display.map((gallery, index) => (
            <div
              key={index}
              data-grid={{
                ...(layout.lg[index] || {}),
                i: index.toString(),
              }}
              className={styles.grid_item}
            >
              <img
                src={gallery.images.gallery}
                alt={`Slide ${index}`}
                className={styles.grid_image}
              />
              <div className={styles.content}>
                <h2>{gallery.name}</h2>
                <p>{gallery.artist.name}</p>
              </div>
            </div>
          ))}
        </ResponsiveGridLayout>
      ) : (
        <h3>Oops, We don't currently have what you are looking for</h3>
      )}
    </div>
  );
};

export default Gallery;
