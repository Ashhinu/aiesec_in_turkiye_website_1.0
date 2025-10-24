// app/page.js
'use client';

import Image from 'next/image';
<<<<<<< HEAD
import { useEffect, useState } from 'react';
=======
import Link from 'next/link';
>>>>>>> 9308028006e4aac004b5d9c2582626c07be1e2da

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 2.5 saniye sonra loading ekranını kaldır
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  // Loading ekranı
  if (isLoading) {
    return (
      <div className='loading-screen'>
        <div className='loading-content'>
          <div className='logo-container'>
            <Image
              src='/EnterenceAnimation.png'
              alt='Yükleniyor'
              width={300}
              height={150}
              className='loading-logo'
              priority
            />
            <div className='loading-bar'></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* === PAGE WAVE FADE - TÜM SAYFANIN ORTASINDA === */}
      <div className='page-wave-fade'>
        <Image
          src='/PageWaveFade.png'
          alt='Sayfa Geçiş Dalgası'
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* === İLK SAYFA - HERO SECTION === */}
      <section className='hero-section'>
        {/* Arkaplan Resmi */}
        <div className='hero-background'>
          <Image
            src='/Background.png'
            alt='Türkiye Arkaplan'
            fill
            priority
            quality={100}
          />
        </div>

        {/* Renk Overlay */}
        <div className='hero-overlay'></div>

        {/* FLOATING ELEMENTS - DEV BOYUTLAR */}
        <div className='floating-elements'>
          {/* SOL CAMİ - DEV BOYUT */}
          <div className='floating-element left-mosque'>
            <Image
              src='/LeftMosque.png'
              alt='Sol Cami'
              width={700}
              height={800}
              style={{ objectFit: 'contain' }}
            />
          </div>

          {/* Türk Bayrağı - DEV BOYUT ORTADA */}
          <div className='floating-element turkish-flag'>
            <Image
              src='/TurkishFlag.png'
              alt='Türk Bayrağı'
              width={800}
              height={900}
              style={{ objectFit: 'contain' }}
            />
          </div>

          {/* GALATA KULESİ - DEV BOYUT ORTADA */}
          <div className='floating-element galata-tower'>
            <Image
              src='/Galata.png'
              alt='Galata Kulesi'
              width={800}
              height={900}
              style={{ objectFit: 'contain' }}
            />
          </div>

          {/* SAĞ CAMİ - DEV BOYUT */}
          <div className='floating-element right-mosque'>
            <Image
              src='/RightMosque.png'
              alt='Sağ Cami'
              width={850}
              height={780}
              style={{ objectFit: 'contain' }}
            />
          </div>
        </div>

        {/* ANA İÇERİK */}
        <div className='hero-content'>
          {/* TurkishWay Logo - ORTADA */}
          <div className='turkishway-logo'>
            <Image
              src='/TurkishWay.png'
              alt='TurkishWay'
              width={600}
              height={150}
              style={{ width: '100%', height: 'auto' }}
              priority
            />
          </div>
        </div>
      </section>

      {/* === İKİNCİ SAYFA - LIVE WITH TÜRKİYE === */}
      <section id='about' className='second-page'>
        {/* Arkaplan Resmi */}
        <div className='second-page-bg'>
          <Image
            src='/Page2BG.png'
            alt='İkinci Sayfa Arkaplan'
            fill
            priority
            quality={100}
          />
        </div>

        <div className='second-page-content'>
          {/* SOL TARAF: Live with Türkiye ve Yazı */}
          <div className='live-with-turkiye'>
            {/* Live with Türkiye Logo */}
            <div className='live-with-turkiye-logo'>
              <Image
                src='/LiveWithTurkiye.png'
                alt='Live with Türkiye'
                width={400}
                height={100}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>

            {/* Yazı Bölümü */}
            <div className='live-with-turkiye-text'>
              <p>
                Turkiye is a country that bridges Europe and Asia, carrying a
                long and diverse history. From the ancient Hittite civilization
                to the Byzantine Empire and the Ottoman period, it has been a
                crossroads of cultures for centuries. Modern Turkiye was founded
                in 1923 under Mustafa Kemal Atatürk, who introduced deep reforms
                in politics, education, and culture. Today the country reflects
                both tradition and modernity. The official language is Turkish,
                though Kurdish and other minority languages are also spoken in
                different regions. Turkiye&apos;s population is around 85
                million people, with Istanbul being the largest city, though
                Ankara serves as the capital. The country covers an area of
                about 783,000 square kilometers, making it one of the largest in
                the region. Its culture is a rich blend of East and West, where
                Islamic heritage meets Mediterranean influences. Turkish
                cuisine, known for kebabs, baklava, and strong tea, plays a
                vital role in everyday life. Art, music, and dance traditions
                highlight both local and global creativity. Hospitality remains
                a key value, and family ties are central to social structure.
                Over centuries, Turkiye has balanced its role as a historical
                empire and a modern republic, offering a unique perspective on
                culture, identity, and geography.
              </p>
            </div>
          </div>

          {/* SAĞ TARAF: Balonlar ve Video */}
          <div className='right-content'>
            {/* Balonlar */}
            <div className='baloons-section'>
              <Image
                src='/Baloons.png'
                alt='Balonlar'
                width={500}
                height={400}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>

            {/* Video Bölümü */}
            <div className='video-section'>
              {/* Video Arkaplan */}
              <div className='video-bg'>
                <Image
                  src='/VideoBG.png'
                  alt='Video Arkaplan'
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>

              {/* Video Yer Tutucu */}
              <div className='video-placeholder'>
                <h3>Video Coming Soon</h3>
                <p>Amazing video about Türkiye will be here</p>
                <div style={{ marginTop: '1rem', fontSize: '2rem' }}>🎥</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* === ÜÇÜNCÜ SAYFA - OUR PROGRAMS === */}
      <section id='programs' style={{ position: 'relative', padding: '120px 2rem 0px', overflow: 'hidden' }}>
         {/* Vertical background pattern */}
         <div
           style={{
             position: 'absolute',
             inset: 0,
             display: 'flex',
             flexDirection: 'column',
             zIndex: 1
           }}
         >
           {/* First third - EP PHOTO (3) 1 */}
           <div
             style={{
               width: '100%',
               height: '33.33%',
               backgroundImage: "url('/EP PHOTO (3) 1.png')",
               backgroundRepeat: 'no-repeat',
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               opacity: 0.6
             }}
           />
           {/* Second third - EP PHOTO (3) 2 */}
           <div
             style={{
               width: '100%',
               height: '33.33%',
               backgroundImage: "url('/EP PHOTO (3) 2.png')",
               backgroundRepeat: 'no-repeat',
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               opacity: 0.6
             }}
           />
           {/* Third third - EP PHOTO (3) 1 */}
           <div
             style={{
               width: '100%',
               height: '33.33%',
               backgroundImage: "url('/EP PHOTO (3) 1.png')",
               backgroundRepeat: 'no-repeat',
               backgroundSize: 'cover',
               backgroundPosition: 'center',
               opacity: 0.6
             }}
           />
         </div>
         {/* EP PHOTO SVG background behind buttons */}
         <div
           style={{
             position: 'absolute',
             top: 0,
             left: 0,
             width: '100%',
             height: '100%',
             backgroundImage: "url('/EP PHOTO (1).svg')",
             backgroundRepeat: 'no-repeat',
             backgroundSize: 'cover',
             backgroundPosition: 'center',
             opacity: 0.8,
             zIndex: 2
           }}
         />
         {/* Dark vignette overlay */}
         <div
           style={{
             position: 'absolute',
             inset: 0,
             background:
               'radial-gradient(100% 60% at 50% 60%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.65) 100%)',
             zIndex: 3
           }}
         />

        <div style={{ position: 'relative', zIndex: 4, maxWidth: 1400, margin: '0 auto' }}>
          {/* Section title image */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
            <Image src='/our programs.png' alt='Our programs' width={360} height={80} style={{ width: '100%', maxWidth: 360, height: 'auto' }} />
          </div>

          {/* Cards grid */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem'
            }}
          >
            {/* Top row - two buttons */}
            <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
              {/* Global Volunteer */}
              <Link href='/' style={{ textDecoration: 'none' }}> 
                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: 20,
                    padding: 0,
                    width: '300px',
                    height: '150px',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Image src='/GV.png' alt='Global Volunteer' width={300} height={200} style={{ width: '100%', height: 'auto' }} />
                  </div>
                </div>
              </Link>

              {/* Global Talent */}
              <Link href='/' style={{ textDecoration: 'none' }}> 
                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: 20,
                    padding: 0,
                    width: '300px',
                    height: '150px',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Image src='/GTA.png' alt='Global Talent' width={300} height={200} style={{ width: '100%', height: 'auto' }} />
                  </div>
                </div>
              </Link>
            </div>

            {/* Bottom row - one centered button */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {/* Global Teacher */}
              <Link href='/' style={{ textDecoration: 'none' }}>
                <div
                  style={{
                    background: '#ffffff',
                    borderRadius: 20,
                    padding: 0,
                    width: '300px',
                    height: '150px',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <Image src='/GTE.png' alt='Global Teacher' width={300} height={200} style={{ width: '100%', height: 'auto' }} />
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Footer image */}
          <div style={{ textAlign: 'center', marginTop: 200,  marginBottom: 20 }}>
            <Image src='/Group 3.png' alt='AIESEC in Türkiye' width={400} height={120} style={{ width: 'auto', height: 'auto', maxWidth: 600 }} />
          </div>
        </div>
      </section>
    </div>
  );
}
