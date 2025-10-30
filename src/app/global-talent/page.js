// app/global-volunteer/page.js
'use client';
import Image from 'next/image';
import './styles.css';

export default function GlobalVolunteer() {
  return (
    <div>
      {/* === BİRİNCİ BÖLÜM - GVBG1.svg === */}
      <section className="gv-section">
        <div className="gv-background">
          <Image
            src="gte_svg/GTeB1.svg"
            alt="Global Volunteer Background 1"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        <div className="gv-hero-container">
          <Image
            src="gta_svg/big_talent.svg"
            alt="Global Volunteer"
            width={800}
            height={400}
            className="gv-logo"
            priority
          />
        </div>

        <div className="gv-wave-fade">
          <Image
            src="/PageWaveFade.png"
            alt="Sayfa Geçiş Dalgası"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </section>

      {/* === İKİNCİ BÖLÜM - GVBG2.svg === */}
      <section className="gv-section">
        <div className="gv-background">
          <Image
            src="/GVBG2.svg"
            alt="Global Volunteer Background 2"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        <div className="gv-content-split">
          <div className="gv-text-side">
            <Image
              src="gta_svg/global.svg"
              alt="Global Talent"
              width={500}
              height={120}
              className="gv-title-image"
              priority
            />
            <p className="gv-description">Global Talent is AIESEC’s professional internship program that connects ambitious young people with companies and startups in Turkiye looking for international talent. It offers opportunities in fields such as marketing, business development, engineering, and IT. Participants gain hands-on work experience in a dynamic, multicultural environment, enhancing their career potential while contributing to global business growth. The program typically lasts from six weeks to eighteen months, depending on the role and organization. Interns receive mentorship, develop cross-cultural communication skills, and build a deeper understanding of international markets. Through this experience, young professionals not only strengthen their résumés but also cultivate adaptability, independence, and confidence. Global Talent helps bridge the gap between education and employment, empowering youth to make a professional and personal impact worldwide while discovering the beauty and culture of Turkiye.            </p>
          </div>

          <div className="gv-image-side">
            <Image
              src="gta_svg/GTaEP2.svg"
              alt="Global Talent Experience"
              width={480}
              height={600}
              className="gv-ep-image"
              sizes="(max-width: 992px) 100vw, 480px"
              priority
            />
          </div>
        </div>

        <div className="gv-wave-fade">
          <Image
            src="/PageWaveFade.png"
            alt="Sayfa Geçiş Dalgası"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </section>

      {/* === ÜÇÜNCÜ BÖLÜM - GVBG3.svg === */}
      <section className="gv-section">
        <div className="gv-background">
          <Image
            src="/GVBG3.svg"
            alt="Global Volunteer Background 3"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        <div className="gv-opportunity-section">
          <Image
            src="gta_svg/Heading.svg"
            alt="Find Your Opportunity"
            width={600}
            height={120}
            className="gv-opportunity-title-img"
            priority
          />

          <div className="gv-filters-container">
            <button className="gv-filter-button">Select city</button>
            <button className="gv-filter-button">Select project</button>
            <button className="gv-filter-button">Select dates</button>
            <button className="gv-search-btn">Search</button>
          </div>

          <div className="gv-projects-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="gv-project-card">
                <div className="gv-project-image">
                  Photo from aiesec.org
                </div>

                <div className="gv-project-info">
                  <h3 className="gv-project-title">Project name</h3>

                  <div className="gv-project-meta-row">
                    <div className="gv-project-meta-left">
                      <div>Home LC:</div>
                      <div>Salary:</div>
                    </div>
                    <div className="gv-project-meta-right">
                      <div>Location:</div>
                      <div className="gv-project-fee">Fee:</div>
                    </div>
                  </div>

                  <div className="gv-project-meta-row">
                    <div>Available Slots:</div>
                    <div className="gv-slots-container">
                      {[...Array(5)].map((_, j) => (
                        <div key={j} className="gv-slot-bar" />
                      ))}
                    </div>
                  </div>

                  <button className="gv-view-details">View details</button>
                </div>
              </div>
            ))}
          </div>

          <div className="gv-pagination">
            <button className="gv-page-btn">
              <Image src="gta_svg/Previous_page.svg" alt="Previous" width={24} height={24} />
            </button>
            <button className="gv-page-btn">
              <Image src="gta_svg/Next_page.svg" alt="Next" width={24} height={24} />
            </button>
          </div>
        </div>

        <div className="gv-wave-fade">
          <Image
            src="/PageWaveFade.png"
            alt="Sayfa Geçiş Dalgası"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
        </div>
      </section>
    </div>
  );
}