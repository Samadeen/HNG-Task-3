import { useState } from 'react';
import styles from './Signup.module.scss';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase.ts';
import logo from '../../assets/shared/logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { motion as m } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Signup = () => {
  const navigate = useNavigate();
  const [errorState, setErrorState] = useState(null); // Change errorState to null initially

  const formik = useFormik({
    // form state
    initialValues: {
      email: '',
      password: '',
    },

    // form validation
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),

    // form submission
    onSubmit: (values) => {
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          if (userCredential.user.email) {
            navigate('/gallery');
          }
        })
        .catch((error) => {
          setErrorState(error.message); // Set error message
          console.error(error);
        });
    },
  });

  return (
    <section className={styles.signup_container}>
      <div className={styles.monalisa} />
      <form onSubmit={formik.handleSubmit}>
        <m.img
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.5,
            type: 'spring',
            stiffness: 150,
            duration: 1.5,
          }}
          src={logo}
          alt='logo'
        />
        <m.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 1,
            type: 'spring',
            stiffness: 150,
            duration: 2,
          }}
        >
          Sign Up
        </m.h1>
        {errorState && <small style={{ color: 'salmon' }}>{errorState}</small>}
        <div className={styles.signup_form}>
          <label htmlFor='email'>
            Email
            <input
              name='email'
              type='email'
              placeholder='Enter your email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <small className={styles.error}>{formik.errors.email}</small>
            ) : null}
          </label>
          <label htmlFor='password'>
            Password
            <input
              name='password'
              type='password'
              placeholder='Enter your password'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <small className={styles.error}>{formik.errors.password}</small>
            ) : null}
          </label>
          <div className=''>
            <button type='submit'>Sign Up</button>
            <p>
              Already have an account? <Link to='/signin'>Sign in</Link>
            </p>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Signup;
