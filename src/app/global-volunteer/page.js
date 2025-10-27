// app/global-volunteer/page.js
import Image from 'next/image';
import Link from 'next/link';
import './styles.css';

export default function GlobalVolunteer() {
  return (
    <div>
      {/* === BİRİNCİ BÖLÜM - GVBG1.svg === */}
      <section className='gv-section'>
        {/* Arkaplan Resmi - GVBG1.svg */}
        <div className='gv-background'>
          <Image
            src='/GVBG1.svg'
            alt='Global Volunteer Background 1'
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        {/* Global Volunteer Logo - Tam Ortada */}
        <div className='gv-hero-container'>
          <Image
            src='/GlobalVolunteer.png'
            alt='Global Volunteer'
            width={800}
            height={400}
            className='gv-logo'
            priority
          />
        </div>

        {/* === PAGE WAVE FADE 1 - 1. BÖLÜMDEN 2. BÖLÜME === */}
        <div className='gv-wave-fade'>
          <Image
            src='/PageWaveFade.png'
            alt='Sayfa Geçiş Dalgası'
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </section>

      {/* === İKİNCİ BÖLÜM - GVBG2.svg === */}
      <section className='gv-section'>
        {/* Arkaplan Resmi - GVBG2.svg */}
        <div className='gv-background'>
          <Image
            src='/GVBG2.svg'
            alt='Global Volunteer Background 2'
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* === PAGE WAVE FADE 2 - 2. BÖLÜMDEN 3. BÖLÜME === */}
        <div className='gv-wave-fade'>
          <Image
            src='/PageWaveFade.png'
            alt='Sayfa Geçiş Dalgası'
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </section>

      {/* === ÜÇÜNCÜ BÖLÜM - GVBG3.svg === */}
      <section className='gv-section'>
        {/* Arkaplan Resmi - GVBG3.svg */}
        <div className='gv-background'>
          <Image
            src='/GVBG3.svg'
            alt='Global Volunteer Background 3'
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </section>
    </div>
  );
}
