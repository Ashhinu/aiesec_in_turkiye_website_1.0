// app/layout.js
'use client';

import './globals.css';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function RootLayout({ children }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <html lang='tr'>
      <body>
        {/* Header with Nazar Logo */}
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
          <nav className='navbar'>
            {/* Tıklanabilir Nazar Logo - Ana sayfaya yönlendirir */}
            <Link href='/' className='logo'>
              <Image
                src='/nazar.png'
                alt='Nazar Boncuğu'
                width={75}
                height={60}
                style={{ objectFit: 'contain' }}
              />
            </Link>

            {/* Navigasyon Linkleri */}
            <div className='nav-links'>
              <a href='#products' className='nav-link'>
                products
              </a>
              <a href='#about' className='nav-link'>
                about Türkiye
              </a>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
