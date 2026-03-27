'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import './talent-styles.css'; // DEĞİŞTİRİLDİ - farklı dosya adı

const API_URL =
  'https://script.google.com/macros/s/AKfycbwQ9n-jRVUOtYLj5NEQOthwygBBe5mDvEI311wg2AUCYU076F3w2FBJCAY1S30FMjtU2g/exec';
const ITEMS_PER_PAGE = 6;
const MAX_VISIBLE_PAGES = 5;

const parseJobData = (data) => {
  return data.map((job) => ({
    id: job[0],
    jobTitle: job[1]?.trim() || 'N/A',
    company: job[3]?.trim() || 'N/A',
    categories: job[4]?.trim() || 'N/A',
    city: job[5]?.trim() || 'N/A',
    country: job[6]?.trim() || 'Turkey',
    salary: job[13] || 'Negotiable',
    deadline: job[15] || 'N/A',
    availableSlots: parseInt(job[11]) || 0,
  }));
};

export default function GlobalTalent() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Scroll progress bar için state - YENİ EKLENDİ
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll takip etme - YENİ EKLENDİ
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPosition = window.pageYOffset;
      const progress = (scrollPosition / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const jobsToDisplay = jobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleGoToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewDetails = (opportunityId) => {
    if (opportunityId) {
      const url = `https://aiesec.org/opportunity/global-talent/${opportunityId}`;
      window.open(url, '_blank');
    }
  };

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const rawData = await response.json();
        const structuredJobs = parseJobData(rawData);
        setJobs(structuredJobs);
        setError(null);
      } catch (e) {
        console.error('Failed to fetch jobs:', e);
        setError('Failed to load opportunities. Please check the API link.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchJobs();
  }, []);

  let startPage = 1;
  let endPage = totalPages;

  if (totalPages > MAX_VISIBLE_PAGES) {
    const maxPagesBeforeCurrent = Math.floor(MAX_VISIBLE_PAGES / 2);
    const maxPagesAfterCurrent = Math.ceil(MAX_VISIBLE_PAGES / 2) - 1;

    if (currentPage <= maxPagesBeforeCurrent) {
      endPage = MAX_VISIBLE_PAGES;
    } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
      startPage = totalPages - MAX_VISIBLE_PAGES + 1;
    } else {
      startPage = currentPage - maxPagesBeforeCurrent;
      endPage = currentPage + maxPagesAfterCurrent;
    }
  }

  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  const renderSlots = (count) => {
    const MAX_BARS = 5;
    const filledBars = Math.min(count, MAX_BARS);
    const bars = [];
    for (let i = 0; i < MAX_BARS; i++) {
      const isFilled = i < filledBars;
      bars.push(
        <div
          key={i}
          className={`gv-slot-bar ${
            isFilled ? 'gv-slot-filled' : 'gv-slot-empty'
          }`}
        />
      );
    }
    return bars;
  };

  return (
    <div className='talent'>
      {/* Scroll progress bar */}
      <div className='scrollProgress' style={{ width: `${scrollProgress}%` }} />

      {/* BİRİNCİ BÖLÜM - HERO SECTION */}
      <motion.section
        className='gv-section'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className='gv-background'>
          <Image
            src='gte_svg/GTeB1.svg'
            alt='Global Talent Background 1'
            fill
            sizes='100vw'
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        <motion.div
          className='gv-hero-container'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Image
              src='gta_svg/big_talent.svg'
              alt='Global Talent'
              width={800}
              height={400}
              className='gv-logo'
              priority
            />
          </motion.div>
        </motion.div>

        <div className='gv-wave-fade'>
          <Image
            src='/PageWaveFade.png'
            alt='Sayfa Geçiş Dalgası'
            fill
            sizes='100vw'
            style={{ objectFit: 'cover' }}
          />
        </div>
      </motion.section>

      {/* İKİNCİ BÖLÜM - DESCRIPTION SECTION */}
      <motion.section
        className='gv-section'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className='gv-background'>
          <Image
            src='/GVBG2.svg'
            alt='Global Talent Background 2'
            fill
            sizes='100vw'
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        <div className='gv-content-split'>
          <motion.div
            className='gv-text-side'
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src='gta_svg/global.svg'
                alt='Global Talent'
                width={500}
                height={120}
                className='gv-title-image'
                priority
              />
            </motion.div>

            <motion.p
              className='gv-description'
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Global Talent is AIESEC&apos;s professional internship program
              that connects ambitious young people with companies and startups
              in Turkiye looking for international talent. It offers
              opportunities in fields such as marketing, business development,
              engineering, and IT. Participants gain hands-on work experience in
              a dynamic, multicultural environment, enhancing their career
              potential while contributing to global business growth. The
              program typically lasts from six weeks to eighteen months,
              depending on the role and organization. Interns receive
              mentorship, develop cross-cultural communication skills, and build
              a deeper understanding of international markets. Through this
              experience, young professionals not only strengthen their résumés
              but also cultivate adaptability, independence, and confidence.
              Global Talent helps bridge the gap between education and
              employment, empowering youth to make a professional and personal
              impact worldwide while discovering the beauty and culture of
              Turkiye.
            </motion.p>
          </motion.div>

          <motion.div
            className='gv-image-side'
            initial={{ opacity: 0, x: 50, rotate: -5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src='gta_svg/GTaEP2.svg'
              alt='Global Talent Experience'
              width={480}
              height={600}
              className='gv-ep-image'
              sizes='(max-width: 992px) 100vw, 480px'
              priority
            />
          </motion.div>
        </div>

        <div className='gv-wave-fade'>
          <Image
            src='/PageWaveFade.png'
            alt='Sayfa Geçiş Dalgası'
            fill
            sizes='100vw'
            style={{ objectFit: 'cover' }}
          />
        </div>
      </motion.section>

      {/* ÜÇÜNCÜ BÖLÜM - OPPORTUNITY LIST SECTION */}
      <section className='gv-section'>
        <div className='gv-background'>
          <Image
            src='/GVBG3.svg'
            alt='Global Talent Background 3'
            fill
            sizes='100vw'
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        <div className='gv-opportunity-section'>
          <Image
            src='gta_svg/Heading.svg'
            alt='Find Your Opportunity'
            width={600}
            height={120}
            className='gv-opportunity-title-img'
            priority
          />

          <div className='gv-filters-container'>
            <button className='gv-filter-button'>Select city</button>
            <button className='gv-filter-button'>Select project</button>
            <button className='gv-filter-button'>Select dates</button>
            <button className='gv-search-btn'>Search</button>
          </div>

          {/* OPPORTUNITY GRID */}
          <div className='gv-projects-grid'>
            {isLoading && <p>Loading job opportunities...</p>}
            {error && <p className='error'>{error}</p>}

            {!isLoading &&
              jobsToDisplay.length > 0 &&
              jobsToDisplay.map((job, index) => (
                <motion.div
                  key={job.id}
                  className='gv-project-card'
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                >
                  {/* Kart içeriği aynı kalacak */}
                  <div className='gv-project-image'>Photo from aiesec.org</div>

                  <div className='gv-project-info'>
                    <h3 className='gv-project-title'>{job.jobTitle}</h3>

                    <div className='gv-project-meta-row'>
                      <div className='gv-project-meta-left'>
                        <div>**Company:** {job.company}</div>
                        <div>**Salary:** {job.salary}</div>
                      </div>
                      <div className='gv-project-meta-right'>
                        <div>
                          **Location:** {job.city}, {job.country}
                        </div>
                        <div className='gv-project-fee'>
                          **Deadline:** {job.deadline}
                        </div>
                      </div>
                    </div>

                    <div className='gv-project-meta-row'>
                      <div>Available Slots: {job.availableSlots}</div>
                      <div className='gv-slots-container'>
                        {renderSlots(job.availableSlots)}
                      </div>
                    </div>

                    <button
                      className='gv-view-details'
                      onClick={() => handleViewDetails(job.id)}
                    >
                      View details
                    </button>
                  </div>
                </motion.div>
              ))}

            {!isLoading && jobs.length === 0 && !error && (
              <p>No job opportunities found.</p>
            )}
          </div>

          {totalPages > 1 && (
            <div className='gv-pagination'>
              <button
                className='gv-page-btn'
                onClick={handlePrev}
                disabled={currentPage === 1}
              >
                <Image
                  src='gta_svg/Previous_page.svg'
                  alt='Previous'
                  width={24}
                  height={24}
                />
              </button>

              {startPage > 1 && (
                <>
                  <button
                    className={`gv-carousel-dot ${
                      currentPage === 1 ? 'active' : ''
                    }`}
                    onClick={() => handleGoToPage(1)}
                  >
                    1
                  </button>
                  {startPage > 2 && (
                    <span style={{ padding: '0 5px' }}>...</span>
                  )}
                </>
              )}

              {visiblePages.map((pageNumber) => (
                <button
                  key={pageNumber}
                  className={`gv-carousel-dot ${
                    currentPage === pageNumber ? 'active' : ''
                  }`}
                  onClick={() => handleGoToPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              ))}

              {endPage < totalPages && (
                <>
                  {endPage < totalPages - 1 && (
                    <span style={{ padding: '0 5px' }}>...</span>
                  )}
                  <button
                    className={`gv-carousel-dot ${
                      currentPage === totalPages ? 'active' : ''
                    }`}
                    onClick={() => handleGoToPage(totalPages)}
                  >
                    {totalPages}
                  </button>
                </>
              )}

              <button
                className='gv-page-btn'
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                <Image
                  src='gta_svg/Next_page.svg'
                  alt='Next'
                  width={24}
                  height={24}
                />
              </button>
            </div>
          )}
        </div>

        <div className='gv-wave-fade'>
          <Image
            src='/PageWaveFade.png'
            alt='Sayfa Geçiş Dalgası'
            fill
            sizes='100vw'
            style={{ objectFit: 'cover' }}
          />
        </div>
      </section>
    </div>
  );
}
