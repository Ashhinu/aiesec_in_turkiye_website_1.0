// app/global-volunteer/page.js
'use client';
import Image from 'next/image';
import './styles.css';

export default function GlobalVolunteer() {
  return (
    <div>
      {/* === BİRİNCİ BÖLÜM - GVBG1.svg === */}
      <section className='gv-section'>
        <div className='gv-background'>
          <Image
            src='/GVBG1.svg'
            alt='Global Volunteer Background 1'
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

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
        <div className='gv-background'>
          <Image
            src='/GVBG2.svg'
            alt='Global Volunteer Background 2'
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>

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
        <div className='gv-background'>
          <Image
            src='/GVBG3.svg'
            alt='Global Volunteer Background 3'
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* === AYRI AYRI BİLEŞENLER === */}

        {/* 1. Find Your Opportunity - EN ÜSTTE */}
        <div className='gv-title-container'>
          <Image
            src='/FindYourOpportunity.png'
            alt='Find Your Opportunity'
            width={600}
            height={150}
            className='gv-opportunity-title'
          />
        </div>

        {/* 2. Filtreleme Butonları - AYRI AYRI */}

        {/* Select City Butonu */}
        <div className='select-city-button'>
          <button className='filter-button' type='button'>
            <Image
              src='/SelectCity.png'
              alt='Select City'
              width={300}
              height={40}
            />
          </button>
        </div>

        {/* Select Project Butonu */}
        <div className='select-project-button'>
          <button className='filter-button' type='button'>
            <Image
              src='/SelectProject.png'
              alt='Select Project'
              width={300}
              height={40}
            />
          </button>
        </div>

        {/* Select Dates Butonu */}
        <div className='select-dates-button'>
          <button className='filter-button' type='button'>
            <Image
              src='/SelectDates.png'
              alt='Select Dates'
              width={300}
              height={40}
            />
          </button>
        </div>

        {/* Search Butonu */}
        <div className='search-button-container'>
          <button className='search-button' type='button'>
            <Image src='/Search.png' alt='Search' width={100} height={30} />
          </button>
        </div>

        {/* 3. Project Bileşenleri - ORTA ALAN */}
        <div className='projects-container'>
          {/* 1. Project */}
          <div className='project-item'>
            <button className='project-button' type='button'>
              <Image
                src='/Project.png'
                alt='Project'
                width={350}
                height={200}
                className='project-image'
              />
            </button>
          </div>

          {/* 2. Project */}
          <div className='project-item'>
            <button className='project-button' type='button'>
              <Image
                src='/Project.png'
                alt='Project'
                width={350}
                height={200}
                className='project-image'
              />
            </button>
          </div>

          {/* 3. Project */}
          <div className='project-item'>
            <button className='project-button' type='button'>
              <Image
                src='/Project.png'
                alt='Project'
                width={350}
                height={200}
                className='project-image'
              />
            </button>
          </div>

          {/* 4. Project */}
          <div className='project-item'>
            <button className='project-button' type='button'>
              <Image
                src='/Project.png'
                alt='Project'
                width={350}
                height={200}
                className='project-image'
              />
            </button>
          </div>

          {/* 5. Project */}
          <div className='project-item'>
            <button className='project-button' type='button'>
              <Image
                src='/Project.png'
                alt='Project'
                width={500}
                height={400}
                className='project-image'
              />
            </button>
          </div>

          {/* 6. Project */}
          <div className='project-item'>
            <button className='project-button' type='button'>
              <Image
                src='/Project.png'
                alt='Project'
                width={500}
                height={400}
                className='project-image'
              />
            </button>
          </div>
        </div>

        {/* Previous Page Butonu - SOL ALT */}
        <div className='previous-page-button'>
          <button className='nav-button' type='button'>
            <Image
              src='/PreviousPage.png'
              alt='Previous Page'
              width={150}
              height={40}
            />
          </button>
        </div>

        {/* Next Page Butonu - SAĞ ALT */}
        <div className='next-page-button'>
          <button className='nav-button' type='button'>
            <Image
              src='/NextPage.png'
              alt='Next Page'
              width={150}
              height={40}
            />
          </button>
        </div>
      </section>
    </div>
  );
}
