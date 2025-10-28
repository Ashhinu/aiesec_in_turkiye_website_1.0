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
            src="/GVBG1.svg"
            alt="Global Volunteer Background 1"
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        <div className="gv-hero-container">
          <Image
            src="/GlobalVolunteer.png"
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
              src="/ep_image_gv2.png"
              alt="Global Volunteer"
              width={500}
              height={120}
              className="gv-title-image"
              priority
            />
            <p className="gv-description">
              Global Volunteer is an international exchange program designed for young people who want to create social impact while exploring the world. Through this program, participants travel to Türkiye to work on short-term community projects that support the United Nations Sustainable Development Goals. Projects often focus on education, environmental protection, equality, and cultural understanding. Volunteers collaborate with local organizations, schools, or NGOs to deliver workshops, raise awareness, or assist with ongoing initiatives. Beyond contributing to positive change, participants gain practical experience, expand their global network, and develop personal leadership skills through cultural immersion and teamwork. Global Volunteer is about stepping outside your comfort zone, discovering new perspectives, and becoming part of something meaningful that leaves a lasting mark on both the community and yourself.
            </p>
          </div>

          <div className="gv-image-side">
            <Image
              src="/ep_image_gv.png"
              alt="Global Volunteer Experience"
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
            src="/FindYourOpportunity.png"
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
              <Image src="/PreviousPage.png" alt="Previous" width={24} height={24} />
            </button>
            <button className="gv-page-btn">
              <Image src="/NextPage.png" alt="Next" width={24} height={24} />
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