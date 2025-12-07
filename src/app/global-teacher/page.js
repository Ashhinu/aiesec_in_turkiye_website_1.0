'use client';
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react'; // Added useMemo back for proper filtering setup
import './styles.css';

// The API endpoint used for the job/opportunity data
const API_URL = "https://script.google.com/macros/s/AKfycbzuG4RU5RIrJrWauY7Neye6mIrKxptpUhrX9sS97NNJUDpfcB4rwwl1Zb_hLeZsfj7S/exec";
const ITEMS_PER_PAGE = 6;
const MAX_VISIBLE_PAGES = 5;

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
    // Add projectType for filtering logic
    projectType: job[4]?.trim().split(',')[0].trim() || 'Other',
  }));
};


export default function GlobalVolunteer() { // Preserving the function name
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  // State for Filters
  const [filters, setFilters] = useState({
      city: '',
      project: '',
      date: '',
  });


  // Filter Handler
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({
        ...prevFilters,
        [name]: value,
    }));
    // Reset to the first page when filters change
    setCurrentPage(1); 
  };


  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) { throw new Error(`HTTP error! Status: ${response.status}`); }
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


  // Filtering Logic (Optimized with useMemo)
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const cityMatch = filters.city === '' || job.city.toLowerCase() === filters.city.toLowerCase();
      const projectMatch = filters.project === '' || job.projectType.toLowerCase() === filters.project.toLowerCase();
      return cityMatch && projectMatch;
    });
  }, [jobs, filters]); 


  // Recalculate pagination based on filtered data
  const finalJobs = filteredJobs;
  const totalPages = Math.ceil(finalJobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const jobsToDisplay = finalJobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Get unique filter options
  const uniqueCities = [...new Set(jobs.map(job => job.city))].sort();
  const uniqueProjects = [...new Set(jobs.map(job => job.projectType))].sort();


  // --- CAROUSEL NAVIGATION FUNCTIONS ---
  const handleNext = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };
  
  const handleGoToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // ------------------------------------

  // --- VIEW DETAILS FUNCTION (Corrected for Global Teacher) ---
  const handleViewDetails = (opportunityId) => {
      if (opportunityId) {
          const url = `https://aiesec.org/opportunity/global-teacher/${opportunityId}`;
          window.open(url, '_blank'); 
      }
  };
  // -------------------------------------------------------------


  // --- CAROUSEL PAGE RANGE LOGIC (5-dot logic) ---
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
  // -------------------------------------------------------------


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
      {/* === BİRİNCİ BÖLÜM - HERO SECTION (Teacher Images) === */}
      <section className="gv-section">
        <div className="gv-background">
          <Image src="gte_svg/GTeB1.svg" alt="Global Volunteer Background 1" fill sizes="100vw" style={{ objectFit: 'cover' }} priority />
        </div>
        <div className="gv-hero-container">
          <Image src="gte_svg/big_teacher.svg" alt="Global Volunteer" width={800} height={400} className="gv-logo" priority />
        </div>
        <div className="gv-wave-fade">
          <Image src="/PageWaveFade.png" alt="Sayfa Geçiş Dalgası" fill sizes="100vw" style={{ objectFit: 'cover' }} />
        </div>
      </section>

      {/* === İKİNCİ BÖLÜM - DESCRIPTION SECTION === */}
      <section className="gv-section">
        <div className="gv-background">
          <Image src="/GVBG2.svg" alt="Global Volunteer Background 2" fill sizes="100vw" style={{ objectFit: 'cover' }} priority />
        </div>
        <div className="gv-content-split">
          <div className="gv-text-side">
            <Image src="gte_svg/global_teacher.svg" alt="Global Volunteer" width={500} height={120} className="gv-title-image" priority />
            <p className="gv-description">Global Teacher is a professional exchange program that allows young educators and aspiring teachers to share knowledge and cultural perspectives in schools and educational institutions across Turkiye. The program connects global talent with local learning environments that value innovation, language exchange, and diverse teaching methods. Participants teach subjects such as English, STEM, or arts, while also engaging students in activities that promote global awareness and inclusivity. It’s an opportunity to gain international classroom experience, enhance teaching skills, and learn how education shapes communities worldwide. Placements range from short-term internships to semester-long experiences, often providing housing and cultural support. By joining Global Teacher, participants contribute to the development of young minds, inspire curiosity, and foster mutual understanding between nations — all while growing as educators and global citizens in one of the world’s most culturally rich countries.            </p>
          </div>
          <div className="gv-image-side">
            <Image src="gte_svg/GTeEP.svg" alt="Global Volunteer Experience" width={480} height={600} className="gv-ep-image" sizes="(max-width: 992px) 100vw, 480px" priority />
          </div>
        </div>
        <div className="gv-wave-fade">
          <Image src="/PageWaveFade.png" alt="Sayfa Geçiş Dalgası" fill sizes="100vw" style={{ objectFit: 'cover' }} />
        </div>
      </section>

      {/* === ÜÇÜNCÜ BÖLÜM - OPPORTUNITY LIST SECTION with CAROUSEL and FILTERS === */}
      <section className="gv-section">
        <div className="gv-background">
          <Image src="/GVBG3.svg" alt="Background 3" fill sizes="100vw" style={{ objectFit: 'cover' }} priority />
        </div>

        <div className="gv-opportunity-section">
          <Image src="gte_svg/Heading.svg" alt="Find Your Opportunity" width={600} height={120} className="gv-opportunity-title-img" priority />

          {/* FILTERS CONTAINER */}
          <div className="gv-filters-container">
            {/* Filter 1: City */}
            <select 
                className="gv-filter-button" 
                name="city" 
                value={filters.city} 
                onChange={handleFilterChange}
                disabled={isLoading}
            >
                <option value="">Select city</option>
                {uniqueCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                ))}
            </select>
            
            {/* Filter 2: Project Type */}
            <select 
                className="gv-filter-button" 
                name="project" 
                value={filters.project} 
                onChange={handleFilterChange}
                disabled={isLoading}
            >
                <option value="">Select project</option>
                {uniqueProjects.map(project => (
                    <option key={project} value={project}>{project}</option>
                ))}
            </select>

            {/* Filter 3: Select Dates (Static for now) */}
            <button className="gv-filter-button">Select dates</button>
            
            <button 
                className="gv-search-btn" 
                onClick={() => setCurrentPage(1)}
            >
                Search ({finalJobs.length})
            </button>
          </div>

          {/* OPPORTUNITY GRID */}
          <div className="gv-projects-grid">
            {isLoading && <p>Loading job opportunities...</p>}
            {error && <p className="error">{error}</p>}
            
            {/* Display filtered and paginated opportunities */}
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

                  <button 
                        className="gv-view-details"
                        onClick={() => handleViewDetails(job.id)}
                    >
                        View details
                    </button>
                </div>
              </div>
            ))}
            
            {!isLoading && finalJobs.length === 0 && !error && <p>No job opportunities found matching your criteria.</p>}
          </div>

          {/* CAROUSEL NAVIGATION */}
          {totalPages > 1 && ( // Only show pagination if there is more than 1 page
            <div className="gv-pagination">
              {/* Previous Button */}
              <button className="gv-page-btn" onClick={handlePrev} disabled={currentPage === 1}>
                <Image src="gte_svg/Previous_page.svg" alt="Previous" width={24} height={24} />
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
                <Image src="/Next page.svg" alt="Next" width={24} height={24} />
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