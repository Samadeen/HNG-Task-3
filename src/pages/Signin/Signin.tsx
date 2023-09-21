import { useState } from 'react';
import styles from './Signin.module.scss';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase.ts';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/shared/logo.svg';
import { motion as m } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Signin = () => {
  const [errorState, setErrorState] = useState('');
  const navigate = useNavigate();

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
      password: Yup.string().required('Password is required'),
    }),

    // form submission
    onSubmit: (values) => {
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          if (userCredential.user.email) {
            navigate('/gallery');
          }
        })
        .catch((error) => {
          setErrorState(error);
          console.log(error);
          navigate('/');
        });
    },
  });

  return (
    <section className={styles.signin_container}>
      <div className={styles.lady}></div>
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
          Sign In
        </m.h1>
        {errorState && <small>{errorState}</small>}
        <div className={styles.signin_form}>
          <label htmlFor='email'>
            Email
            <input
              type='email'
              name='email'
              placeholder='Enter your email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className={styles.error}>{formik.errors.email}</div>
            ) : null}
          </label>
          <label htmlFor='password'>
            Password
            <input
              type='password'
              name='password'
              placeholder='Enter your password'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className={styles.error}>{formik.errors.password}</div>
            ) : null}
          </label>
          <div className=''>
            <button type='submit'>Sign In</button>
            <p>
              You don't have an account? <Link to='/signup'>Sign up</Link>
            </p>
          </div>
        </div>{' '}
      </form>
    </section>
  );
};

export default Signin;
