// app/about/page.js
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './about.module.css';

export default function About() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

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
      {/* === PAGE WAVE FADE - 1. SAYFADAN 2. SAYFAYA GEÇİŞ === */}
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
        <div className='hero-background'>
          <Image
            src='/Background.png'
            alt='Türkiye Arkaplan'
            fill
            priority
            quality={100}
          />
        </div>

        <div className='hero-overlay'></div>

        <div className='floating-elements'>
          <div className='floating-element left-mosque'>
            <Image
              src='/LeftMosque.png'
              alt='Sol Cami'
              width={700}
              height={800}
              style={{ objectFit: 'contain' }}
            />
          </div>

          <div className='floating-element turkish-flag'>
            <Image
              src='/TurkishFlag.png'
              alt='Türk Bayrağı'
              width={800}
              height={900}
              style={{ objectFit: 'contain' }}
            />
          </div>

          <div className='floating-element galata-tower'>
            <Image
              src='/Galata.png'
              alt='Galata Kulesi'
              width={800}
              height={900}
              style={{ objectFit: 'contain' }}
            />
          </div>

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

        <div className='hero-content'>
          <div className='turkishway-logo'>
            <h1 className={styles.aboutTitle}>ABOUT TÜRKİYE</h1>
            <p className={styles.aboutSubtitle}>
              Discover the Beauty and Culture
            </p>
          </div>
        </div>
      </section>

      {/* === İKİNCİ SAYFA - WHY TÜRKİYE? === */}
      <section className={styles.whyTurkiyeSection}>
        <div className={styles.whyTurkiyeContainer}>
          <div className={styles.whyTurkiyeTitle}></div>

          {/* Madde 1 - Sol Yazı, Sağ Resim */}
          <div className={styles.reasonRow}>
            <div className={`${styles.reasonText} ${styles.reasonTextLeft}`}>
              <h3>
                A country{' '}
                <span className={styles.highlightText}>between continents</span>
              </h3>
              <p>
                Türkiye sits at the crossroads of Europe and Asia, and you feel
                that everywhere in the architecture, the food, the music, and
                even the rhythm of daily life. It&apos;s a place where modern
                districts stand next to ancient landmarks, creating a unique
                balance of old and new.
              </p>
            </div>
            <div className={styles.reasonImage}>
              <div className={styles.circleImage}>
                <div className={styles.circlePlaceholder}>🌍</div>
              </div>
            </div>
          </div>

          {/* Madde 2 - Sağ Yazı, Sol Resim */}
          <div className={`${styles.reasonRow} ${styles.reasonRowReverse}`}>
            <div className={styles.reasonImage}>
              <div className={styles.circleImage}>
                <div className={styles.circlePlaceholder}>🤝</div>
              </div>
            </div>
            <div className={`${styles.reasonText} ${styles.reasonTextRight}`}>
              <h3>
                <span className={styles.highlightText}>Warm</span> and{' '}
                <span className={styles.highlightText}>welcoming</span> people
              </h3>
              <p>
                Turkish hospitality isn&apos;t a stereotype – it is real. People
                are open, social, and genuinely cared about foreigners.
                You&apos;ll hear &quot;Hoş geldiniz!&quot; more times than you
                can count, and it&apos;s incredibly easy to form meaningful
                friendships.
              </p>
            </div>
          </div>

          {/* Madde 3 - Sol Yazı, Sağ Resim */}
          <div className={styles.reasonRow}>
            <div className={`${styles.reasonText} ${styles.reasonTextLeft}`}>
              <h3>
                Explosive <span className={styles.highlightText}>flavors</span>{' '}
                and <span className={styles.highlightText}>colors</span>
              </h3>
              <p>
                From street food to traditional desserts, Türkiye is a full-on
                sensory experience. The smell of spices, fresh simit, grilled
                kebabs, and strong tea follows you everywhere. Local markets
                burst with colors, sounds, and energy you don&apos;t find just
                anywhere.
              </p>
            </div>
            <div className={styles.reasonImage}>
              <div className={styles.circleImage}>
                <div className={styles.circlePlaceholder}>🎨</div>
              </div>
            </div>
          </div>

          {/* Madde 4 - Sağ Yazı, Sol Resim */}
          <div className={`${styles.reasonRow} ${styles.reasonRowReverse}`}>
            <div className={styles.reasonImage}>
              <div className={styles.circleImage}>
                <div className={styles.circlePlaceholder}>🏞️</div>
              </div>
            </div>
            <div className={`${styles.reasonText} ${styles.reasonTextRight}`}>
              <h3>
                Nature{' '}
                <span className={styles.highlightText}>
                  from sea to mountains
                </span>
              </h3>
              <p>
                Whether you prefer swimming in the turquoise waters of the
                Mediterranean, hiking in green highlands, or exploring
                otherworldly landscapes in Cappadocia, Türkiye&apos;s natural
                diversity will leave you in awe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* === PAGE WAVE FADE 2 - 2. SAYFADAN 3. SAYFAYA GEÇİŞ === */}
      <div className='page-wave-fade-2'>
        <Image
          src='/PageWaveFade.png'
          alt='Sayfa Geçiş Dalgası'
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* === ÜÇÜNCÜ SAYFA - TÜRKİYE HIGHLIGHTS === */}
      <section className={styles.turkiyeHighlightsSection}>
        <div className='programs-background-pattern'>
          <div
            className='programs-bg-layer'
            style={{ backgroundImage: "url('/EP PHOTO (3) 1.png')" }}
          />
          <div
            className='programs-bg-layer'
            style={{ backgroundImage: "url('/EP PHOTO (3) 2.png')" }}
          />
          <div
            className='programs-bg-layer'
            style={{ backgroundImage: "url('/EP PHOTO (3) 1.png')" }}
          />
        </div>

        <div
          className='programs-svg-bg'
          style={{ backgroundImage: "url('/EP PHOTO (1).svg')" }}
        />

        <div className='programs-vignette' />

        <div className={styles.highlightsContainer}></div>
      </section>
    </div>
  );
}
