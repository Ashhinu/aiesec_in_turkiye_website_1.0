'use client';
import { motion } from 'framer-motion'; // YENİ - Animasyon için
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import styles from './styles.module.css';
// The API endpoint used for the job/opportunity data
const API_URL =
  'https://script.google.com/macros/s/AKfycbwFSTE_LebWAn05ByY-dPe3uGwVMTtul6rew9m22FFqMsMrtHDNRnNuAG_oVQ6V6dkpKA/exec';
const ITEMS_PER_PAGE = 6;
const MAX_VISIBLE_PAGES = 5;

// Helper function to convert the array-of-arrays into an array-of-objects
const parseOpportunityData = (data) => {
  return data.map((opp) => ({
    id: opp[0],
    jobTitle: opp[1]?.trim() || 'N/A',
    company: opp[3]?.trim() || 'N/A',
    categories: opp[4]?.trim() || 'N/A',
    city: opp[5]?.trim() || 'N/A',
    country: opp[6]?.trim() || 'Turkey',
    salary: opp[13] || 'No salary',
    deadline: opp[15] || 'N/A',
    availableSlots: parseInt(opp[11]) || 0,
    projectType: opp[4]?.trim().split(',')[0].trim() || 'Other',
  }));
};

export default function GlobalVolunteer() {
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Scroll progress bar için state - YENİ EKLENDİ
  const [scrollProgress, setScrollProgress] = useState(0);

  const [filters, setFilters] = useState({
    city: '',
    project: '',
    date: '',
  });

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

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    setCurrentPage(1);
  };

  useEffect(() => {
    async function fetchOpportunities() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const rawData = await response.json();
        const structuredOpportunities = parseOpportunityData(rawData);

        setOpportunities(structuredOpportunities);
        setError(null);
      } catch (e) {
        console.error('Failed to fetch opportunities:', e);
        setError('Failed to load opportunities. Please check the API link.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchOpportunities();
  }, []);

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((opp) => {
      const cityMatch =
        filters.city === '' ||
        opp.city.toLowerCase() === filters.city.toLowerCase();
      const projectMatch =
        filters.project === '' ||
        opp.projectType.toLowerCase() === filters.project.toLowerCase();
      return cityMatch && projectMatch;
    });
  }, [opportunities, filters]);

  const finalOpportunities = filteredOpportunities;
  const finalTotalPages = Math.ceil(finalOpportunities.length / ITEMS_PER_PAGE);
  const finalStartIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const opportunitiesToDisplay = finalOpportunities.slice(
    finalStartIndex,
    finalStartIndex + ITEMS_PER_PAGE
  );

  const uniqueCities = [
    ...new Set(opportunities.map((opp) => opp.city)),
  ].sort();
  const uniqueProjects = [
    ...new Set(opportunities.map((opp) => opp.projectType)),
  ].sort();

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, finalTotalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleGoToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewDetails = (opportunityId) => {
    if (opportunityId) {
      const url = `https://aiesec.org/opportunity/global-volunteer/${opportunityId}`;
      window.open(url, '_blank');
    }
  };

  let startPage = 1;
  let endPage = finalTotalPages;

  if (finalTotalPages > MAX_VISIBLE_PAGES) {
    const maxPagesBeforeCurrent = Math.floor(MAX_VISIBLE_PAGES / 2);
    const maxPagesAfterCurrent = Math.ceil(MAX_VISIBLE_PAGES / 2) - 1;

    if (currentPage <= maxPagesBeforeCurrent) {
      endPage = MAX_VISIBLE_PAGES;
    } else if (currentPage + maxPagesAfterCurrent >= finalTotalPages) {
      startPage = finalTotalPages - MAX_VISIBLE_PAGES + 1;
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
          className={`${styles.gvSlotBar} ${
            isFilled ? styles.gvSlotFilled : styles.gvSlotEmpty
          }`}
        />
      );
    }
    return bars;
  };

  return (
    <div className='volunteer'>
      {/* Scroll progress bar */}
      <div className='scrollProgress' style={{ width: `${scrollProgress}%` }} />

      <section className={styles.gvSection}>
        <div className={styles.gvBackground}>
          <Image
            src='/GVBG1.svg'
            alt='Global Volunteer Background 1'
            fill
            sizes='100vw'
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        <motion.div
          className={styles.gvHeroContainer}
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
              src='/GlobalVolunteer.png'
              alt='Global Volunteer'
              width={800}
              height={400}
              className={styles.gvLogo}
              priority
            />
          </motion.div>

          <motion.p
            className={styles.heroSlogan}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Make a difference. Create impact. Be the change.
          </motion.p>
        </motion.div>

        <div className={styles.gvWaveFade}>
          <Image
            src='/PageWaveFade.png'
            alt='Sayfa Geçiş Dalgası'
            fill
            sizes='100vw'
            style={{ objectFit: 'cover' }}
          />
        </div>
      </section>

      <section className={styles.gvSection}>
        <div className={styles.gvBackground}>
          <Image
            src='/GVBG2.svg'
            alt='Global Volunteer Background 2'
            fill
            sizes='100vw'
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        <div className={styles.gvContentSplit}>
          <motion.div
            className={styles.gvTextSide}
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
                src='/ep_image_gv2.png'
                alt='Global Volunteer'
                width={500}
                height={120}
                className={styles.gvTitleImage}
                priority
              />
            </motion.div>

            <motion.p
              className={styles.gvDescription}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Global Volunteer is an international exchange program designed for
              young people who want to create social impact while exploring the
              world. Through this program, participants travel to Türkiye to
              work on short-term community projects that support the United
              Nations Sustainable Development Goals. Projects often focus on
              education, environmental protection, equality, and cultural
              understanding. Volunteers collaborate with local organizations,
              schools, or NGOs to deliver workshops, raise awareness, or assist
              with ongoing initiatives. Beyond contributing to positive change,
              participants gain practical experience, expand their global
              network, and develop personal leadership skills through cultural
              immersion and teamwork. Global Volunteer is about stepping outside
              your comfort zone, discovering new perspectives, and becoming part
              of something meaningful that leaves a lasting mark on both the
              community and yourself.
            </motion.p>
          </motion.div>

          <motion.div
            className={styles.gvImageSide}
            initial={{ opacity: 0, x: 50, rotate: -5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 2 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src='/ep_image_gv.png'
              alt='Global Volunteer Experience'
              width={480}
              height={600}
              className={styles.gvEpImage}
              sizes='(max-width: 992px) 100vw, 480px'
              priority
            />
          </motion.div>
        </div>

        <div className={styles.gvWaveFade}>
          <Image
            src='/PageWaveFade.png'
            alt='Sayfa Geçiş Dalgası'
            fill
            sizes='100vw'
            style={{ objectFit: 'cover' }}
          />
        </div>
      </section>
      {/* ÜÇÜNCÜ BÖLÜM - OPPORTUNITY LIST SECTION */}
      <section className={styles.gvSection}>
        <div className={styles.gvBackground}>
          <Image
            src='/GVBG3.svg'
            alt='Global Volunteer Background 3'
            fill
            sizes='100vw'
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        <div className={styles.gvOpportunitySection}>
          <Image
            src='/FindYourOpportunity.png'
            alt='Find Your Opportunity'
            width={600}
            height={120}
            className={styles.gvOpportunityTitleImg}
            priority
          />

          {/* FILTERS CONTAINER */}
          <div className={styles.gvFiltersContainer}>
            <select
              className={styles.gvFilterButton}
              name='city'
              value={filters.city}
              onChange={handleFilterChange}
              disabled={isLoading}
            >
              <option value=''>Select city</option>
              {uniqueCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <select
              className={styles.gvFilterButton}
              name='project'
              value={filters.project}
              onChange={handleFilterChange}
              disabled={isLoading}
            >
              <option value=''>Select project</option>
              {uniqueProjects.map((project) => (
                <option key={project} value={project}>
                  {project}
                </option>
              ))}
            </select>

            <button className={styles.gvFilterButton}>Select dates</button>

            <button
              className={styles.gvSearchBtn}
              onClick={() => setCurrentPage(1)}
            >
              Search ({finalOpportunities.length})
            </button>
          </div>

          {/* OPPORTUNITY GRID */}
          <div className={styles.gvProjectsGrid}>
            {isLoading && <p>Loading opportunities...</p>}
            {error && <p className={styles.error}>{error}</p>}

            {!isLoading &&
              opportunitiesToDisplay.length > 0 &&
              opportunitiesToDisplay.map(
                (
                  opp,
                  index // DEĞİŞTİ: opp -> opp, index
                ) => (
                  <motion.div // DEĞİŞTİ: div -> motion.div
                    key={opp.id}
                    className={styles.gvProjectCard}
                    initial={{ opacity: 0, y: 50 }} // YENİ: Animasyon başlangıç
                    whileInView={{ opacity: 1, y: 0 }} // YENİ: Görününce
                    viewport={{ once: true }} // YENİ: Sadece bir kere
                    transition={{ duration: 0.5, delay: index * 0.1 }} // YENİ: Gecikmeli
                    whileHover={{ scale: 1.03 }} // YENİ: Hover efekti
                  >
                    <div className={styles.gvProjectImage}>
                      Photo from aiesec.org
                    </div>

                    <div className={styles.gvProjectInfo}>
                      <h3 className={styles.gvProjectTitle}>{opp.jobTitle}</h3>

                      <div className={styles.gvProjectMetaRow}>
                        <div className={styles.gvProjectMetaLeft}>
                          <div>**Organization:** {opp.company}</div>
                          <div>**Stipend:** {opp.salary}</div>
                        </div>
                        <div className={styles.gvProjectMetaRight}>
                          <div>
                            **Location:** {opp.city}, {opp.country}
                          </div>
                          <div className={styles.gvProjectFee}>
                            **Deadline:** {opp.deadline}
                          </div>
                        </div>
                      </div>

                      <div className={styles.gvProjectMetaRow}>
                        <div>Available Slots: {opp.availableSlots}</div>
                        <div className={styles.gvSlotsContainer}>
                          {renderSlots(opp.availableSlots)}
                        </div>
                      </div>

                      <button
                        className={styles.gvViewDetails}
                        onClick={() => handleViewDetails(opp.id)}
                      >
                        View details
                      </button>
                    </div>
                  </motion.div> // DEĞİŞTİ: </div> -> </motion.div>
                )
              )}

            {!isLoading && finalOpportunities.length === 0 && !error && (
              <p>No opportunities found matching your criteria.</p>
            )}
          </div>

          {/* CAROUSEL NAVIGATION */}
          {finalTotalPages > 1 && (
            <div className={styles.gvPagination}>
              <button
                className={styles.gvPageBtn}
                onClick={handlePrev}
                disabled={currentPage === 1}
              >
                <Image
                  src='/PreviousPage.png'
                  alt='Previous'
                  width={24}
                  height={24}
                />
              </button>

              {startPage > 1 && (
                <>
                  <button
                    className={`${styles.gvCarouselDot} ${
                      currentPage === 1 ? styles.active : ''
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
                  className={`${styles.gvCarouselDot} ${
                    currentPage === pageNumber ? styles.active : ''
                  }`}
                  onClick={() => handleGoToPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              ))}

              {endPage < finalTotalPages && (
                <>
                  {endPage < finalTotalPages - 1 && (
                    <span style={{ padding: '0 5px' }}>...</span>
                  )}
                  <button
                    className={`${styles.gvCarouselDot} ${
                      currentPage === finalTotalPages ? styles.active : ''
                    }`}
                    onClick={() => handleGoToPage(finalTotalPages)}
                  >
                    {finalTotalPages}
                  </button>
                </>
              )}

              <button
                className={styles.gvPageBtn}
                onClick={handleNext}
                disabled={currentPage === finalTotalPages}
              >
                <Image src='/NextPage.png' alt='Next' width={24} height={24} />
              </button>
            </div>
          )}
        </div>

        <div className={styles.gvWaveFade}>
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
