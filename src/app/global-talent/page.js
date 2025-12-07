'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react'; // Removed useMemo since filtering is not implemented
import './styles.css';

// The API endpoint used for the job/opportunity data
const API_URL = "https://script.google.com/macros/s/AKfycbwQ9n-jRVUOtYLj5NEQOthwygBBe5mDvEI311wg2AUCYU076F3w2FBJCAY1S30FMjtU2g/exec";
const ITEMS_PER_PAGE = 6;
const MAX_VISIBLE_PAGES = 5; // Constant for the maximum number of visible page buttons

// Helper function to convert the array-of-arrays into an array-of-objects
const parseJobData = (data) => {
  return data.map(job => ({
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


export default function GlobalVolunteer() {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); 

  
  // --- PAGINATION / VIEW DETAILS LOGIC ---

  // Calculate the jobs to display on the current carousel slide
  const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const jobsToDisplay = jobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // 1. Navigation Handlers
  const handleNext = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };
  
  // Carousel Button Handler
  const handleGoToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 2. View Details Navigation Function
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
        console.error("Failed to fetch jobs:", e);
        setError("Failed to load opportunities. Please check the API link.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchJobs();
  }, []);


  // --- CAROUSEL PAGE RANGE LOGIC (Max 5 buttons) ---
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
  const visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  // --- END CAROUSEL PAGE RANGE LOGIC ---

  
  // Helper to render the slot bars based on availability (unchanged)
  const renderSlots = (count) => {
    const MAX_BARS = 5;
    const filledBars = Math.min(count, MAX_BARS);
    const bars = [];
    
    for (let i = 0; i < MAX_BARS; i++) {
        const isFilled = i < filledBars;
        bars.push(
            <div 
                key={i} 
                className={`gv-slot-bar ${isFilled ? 'gv-slot-filled' : 'gv-slot-empty'}`} 
            />
        );
    }
    return bars;
  };

  
  // --- COMPLETE COMPONENT JSX STRUCTURE ---
  return (
    <div>
      {/* === BİRİNCİ BÖLÜM - HERO SECTION === */}
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

      {/* === İKİNCİ BÖLÜM - DESCRIPTION SECTION === */}
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
            <p className="gv-description">Global Talent is AIESEC’s professional internship program that connects ambitious young people with companies and startups in Turkiye looking for international talent. It offers opportunities in fields such as marketing, business development, engineering, and IT. Participants gain hands-on work experience in a dynamic, multicultural environment, enhancing their career potential while contributing to global business growth. The program typically lasts from six weeks to eighteen months, depending on the role and organization. Interns receive mentorship, develop cross-cultural communication skills, and build a deeper understanding of international markets. Through this experience, young professionals not only strengthen their résumés but also cultivate adaptability, independence, and confidence. Global Talent helps bridge the gap between education and employment, empowering youth to make a professional and personal impact worldwide while discovering the beauty and culture of Turkiye.            </p>
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

      {/* === ÜÇÜNCÜ BÖLÜM - OPPORTUNITY LIST SECTION with CAROUSEL) === */}
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
            {isLoading && <p>Loading job opportunities...</p>}
            {error && <p className="error">{error}</p>}
            
            {/* Dynamic content rendering based on the jobsToDisplay slice */}
            {!isLoading && jobsToDisplay.length > 0 && jobsToDisplay.map((job) => (
              <div key={job.id} className="gv-project-card">
                <div className="gv-project-image">
                  Photo from aiesec.org
                </div>

                <div className="gv-project-info">
                  <h3 className="gv-project-title">{job.jobTitle}</h3>

                  <div className="gv-project-meta-row">
                    <div className="gv-project-meta-left">
                      <div>**Company:** {job.company}</div>
                      <div>**Salary:** {job.salary}</div>
                    </div>
                    <div className="gv-project-meta-right">
                      <div>**Location:** {job.city}, {job.country}</div>
                      <div className="gv-project-fee">**Deadline:** {job.deadline}</div>
                    </div>
                  </div>

                  <div className="gv-project-meta-row">
                    <div>Available Slots: {job.availableSlots}</div>
                    <div className="gv-slots-container">
                      {renderSlots(job.availableSlots)}
                    </div>
                  </div>

                  {/* 3. IMPLEMENTED: View Details Button with navigation */}
                  <button 
                        className="gv-view-details"
                        onClick={() => handleViewDetails(job.id)}
                    >
                        View details
                    </button>
                </div>
              </div>
            ))}
            
            {!isLoading && jobs.length === 0 && !error && <p>No job opportunities found.</p>}
            
          </div>

          {/* 4. IMPLEMENTED: Limited Carousel Navigation */}
          {totalPages > 1 && (
                <div className="gv-pagination">
                    {/* Previous Button */}
                    <button className="gv-page-btn" onClick={handlePrev} disabled={currentPage === 1}>
                        <Image src="gta_svg/Previous_page.svg" alt="Previous" width={24} height={24} />
                    </button>
                    
                    {/* First Page button (with ellipsis if needed) */}
                    {startPage > 1 && (
                        <>
                            <button
                                className={`gv-carousel-dot ${currentPage === 1 ? 'active' : ''}`}
                                onClick={() => handleGoToPage(1)}
                            >
                                1
                            </button>
                            {startPage > 2 && <span style={{ padding: '0 5px' }}>...</span>}
                        </>
                    )}

                    {/* Visible Page Buttons (Max 5) */}
                    {visiblePages.map((pageNumber) => (
                        <button
                            key={pageNumber}
                            className={`gv-carousel-dot ${currentPage === pageNumber ? 'active' : ''}`}
                            onClick={() => handleGoToPage(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    ))}

                    {/* Last Page button (with ellipsis if needed) */}
                    {endPage < totalPages && (
                        <>
                            {endPage < totalPages - 1 && <span style={{ padding: '0 5px' }}>...</span>}
                            <button
                                className={`gv-carousel-dot ${currentPage === totalPages ? 'active' : ''}`}
                                onClick={() => handleGoToPage(totalPages)}
                            >
                                {totalPages}
                            </button>
                        </>
                    )}
                    
                    {/* Next Button */}
                    <button className="gv-page-btn" onClick={handleNext} disabled={currentPage === totalPages}>
                        <Image src="gta_svg/Next_page.svg" alt="Next" width={24} height={24} />
                    </button>
                </div>
            )}
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