import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='container fw-bold text-center'>
      <div className='wrapper' style={{ minHeight: '50vh', position: 'relative' }}>
        <footer className='flex-wrap py-3 my-4 border-top' style={{ position: 'absolute', bottom: 0, width: '100%' }}>
          <div>
            <Link
              to='/home'
              className='mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1'
            ></Link>
            <p className='text-center text-muted'>©2023 Food Delivered, Yay!</p>
          </div>

          <ul className='nav col-md-4 justify-content-end list-unstyled d-flex'></ul>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
