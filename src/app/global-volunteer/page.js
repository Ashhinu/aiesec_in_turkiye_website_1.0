// app/global-volunteer/page.js
import Image from 'next/image';
import Link from 'next/link';

export default function GlobalVolunteer() {
  return (
    <div>
      {/* === BİRİNCİ BÖLÜM - GVBG1.png === */}
      <section
        style={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Arkaplan Resmi - GVBG1.png */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        >
          <Image
            src='/GVBG1.png'
            alt='Global Volunteer Background 1'
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        {/* Global Volunteer Logo - Tam Ortada */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            src='/GlobalVolunteer.png'
            alt='Global Volunteer'
            width={600}
            height={200}
            style={{
              width: '100%',
              maxWidth: '600px',
              height: 'auto',
              filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5))',
            }}
            priority
          />
        </div>
      </section>

      {/* === İKİNCİ BÖLÜM - GVBG2.png === */}
      <section
        style={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Arkaplan Resmi - GVBG2.png */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        >
          <Image
            src='/GVBG2.png'
            alt='Global Volunteer Background 2'
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </section>

      {/* === ÜÇÜNCÜ BÖLÜM - GVBG3.png === */}
      <section
        style={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Arkaplan Resmi - GVBG3.png */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        >
          <Image
            src='/GVBG3.png'
            alt='Global Volunteer Background 3'
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </section>
    </div>
  );
}
