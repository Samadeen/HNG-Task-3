import { Link } from 'react-router-dom';
import styles from './Home.module.scss';
import logo from '../../assets/shared/logo.svg';
import { useEffect, useState } from 'react';
import { motion as m } from 'framer-motion';
import { galleria } from '../../../data.ts';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebase.ts';

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [authUser, setAuthUser] = useState<User | null>(null);

  // Function to move to the next image
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % galleria.length);
  };

  // Use useEffect to start the automatic sliding
  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    const interval = setInterval(nextImage, 5000); // Slide every 5 seconds

    // Clear the interval when the component unmounts
    return () => {
      listen();
      clearInterval(interval);
    };
  }, []);

  return (
    <section className={styles.home_container}>
      <div className={styles.right}>
        <div className={styles.top_nav}>
          <m.img
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 250 }}
            src={logo}
            alt='logo'
          />
          <div className={styles.side_nav}>
            <ul>
              <Link to={authUser ? '/gallery' : '/signup'}>Gallery</Link>
            </ul>
            {authUser ? <li>Signed In</li> : <Link to='/signin'>Sign In</Link>}
          </div>
        </div>
        <div className={styles.details}>
          <m.h1
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 1.2,
              type: 'spring',
              stiffness: 150,
              duration: 2,
            }}
          >
            Bringing <br /> Arts to you <br /> the Art way
          </m.h1>
          <m.p
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              delay: 1.5,
              type: 'spring',
              stiffness: 150,
              duration: 3,
            }}
          >
            Welcome to the 5th International Offline conference "Galleria: Arts
            or Art showcase". Gaze and take in art at it's vintage form.
          </m.p>
          <m.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 1.8,
              type: 'spring',
              stiffness: 150,
              duration: 4,
            }}
            className=''
          >
            <Link to='/signup'>Sign Up</Link>
          </m.div>
        </div>
      </div>
      <div className={styles.left}>
        <div className={styles.nav}>
          <ul>
            <Link to={authUser ? '/gallery' : '/signup'}>Explore</Link>
            <Link to={authUser ? '/gallery' : '/signup'}>Gallery</Link>
          </ul>
          {authUser ? <li>Signed In</li> : <Link to='/signin'>Sign In</Link>}
        </div>
        <m.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 2, type: 'spring', stiffness: 150, duration: 5 }}
          className={styles.image_slider}
        >
          {galleria.map((gallery, index) => (
            <div key={index} className={styles.fullImage}>
              <img
                src={`../.${gallery.images.gallery}`}
                alt={`Slide ${gallery.artist.name}`}
                className={index === currentImageIndex ? styles.active : ''}
              />
              <div className={index === currentImageIndex ? styles.active : ''}>
                <m.div className={styles.details}>
                  <m.img
                    src={`../.${gallery.artist.image}`}
                    alt={gallery.artist.name}
                    className={index === currentImageIndex ? styles.active : ''}
                  />
                  <h2
                    className={index === currentImageIndex ? styles.active : ''}
                  >
                    {gallery.artist.name}
                  </h2>
                </m.div>
              </div>
            </div>
          ))}
        </m.div>
      </div>
    </section>
  );
};

export default Home;
