'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import './styles.css';

const API_URL = "Https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhrHjY3rvXsbe0EL8H-RovNtxcxM7VZwtbryFm30m12xG5cdSkqMMM12untA85NrGW-GyebKipFe6gRE9NvR4t9kvIwiPktAq-2Nnm65-dJtjBL5LTVajPM_tZRzVmgMMzzKzn0dxNPtj2zXmet7QKD2UPJckGjBy0N4gxham0NpNhD8K7MkxT_VR9Pi_-WGjiGgHvkBqzxZ0CeeYfeEIjq7O8rsu_J2eHQsJBgWhMbUzCAx5mLk4Ns0ZAJGwwZRw6JkYLaJ-h-OANTuoeS6tlWml8LFZpDGN-4pcwt&lib=MaWnGEOyC3eVXwH0PYbdQtZdmlDGjJ_fQ";
const ITEMS_PER_PAGE = 6; 

// Helper function to convert the array-of-arrays into an array-of-objects
const parseJobData = (data) => {
  // Use the estimated structure indexes:
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

  // Calculate the jobs to display on the current carousel slide
  const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const jobsToDisplay = jobs.slice(startIndex, endIndex);

  // Navigation Handlers
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

  
  // Helper to render the slot bars based on availability
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
      {/* === BİRİNCİ BÖLÜM - GVBG1.svg (HERO SECTION) === */}
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
            src="gte_svg/big_teacher.svg"
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

      {/* === İKİNCİ BÖLÜM - GVBG2.svg (DESCRIPTION SECTION) === */}
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
              src="gte_svg/global_teacher.svg"
              alt="Global Volunteer"
              width={500}
              height={120}
              className="gv-title-image"
              priority
            />
            <p className="gv-description">Global Teacher is a professional exchange program that allows young educators and aspiring teachers to share knowledge and cultural perspectives in schools and educational institutions across Turkiye. The program connects global talent with local learning environments that value innovation, language exchange, and diverse teaching methods. Participants teach subjects such as English, STEM, or arts, while also engaging students in activities that promote global awareness and inclusivity. It’s an opportunity to gain international classroom experience, enhance teaching skills, and learn how education shapes communities worldwide. Placements range from short-term internships to semester-long experiences, often providing housing and cultural support. By joining Global Teacher, participants contribute to the development of young minds, inspire curiosity, and foster mutual understanding between nations — all while growing as educators and global citizens in one of the world’s most culturally rich countries.            </p>
          </div>

          <div className="gv-image-side">
            <Image
              src="gte_svg/GTeEP.svg"
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

      {/* === ÜÇÜNCÜ BÖLÜM - GVBG3.svg (PROJECT LIST SECTION with CAROUSEL) === */}
      <section className="gv-section">
        <div className="gv-background">
          <Image src="/GVBG3.svg" alt="Background 3" fill sizes="100vw" style={{ objectFit: 'cover' }} priority />
        </div>

        <div className="gv-opportunity-section">
          <Image src="gte_svg/Heading.svg" alt="Find Your Opportunity" width={600} height={120} className="gv-opportunity-title-img" priority />

          <div className="gv-filters-container">
            <button className="gv-filter-button">Select city</button>
            <button className="gv-filter-button">Select project</button>
            <button className="gv-filter-button">Select dates</button>
            <button className="gv-search-btn">Search</button>
          </div>

          <div className="gv-projects-grid">
            {isLoading && <p>Loading job opportunities...</p>}
            {error && <p className="error">{error}</p>}
            
            {/* Map over the current page's slice of data */}
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

                  <button className="gv-view-details">View details</button>
                </div>
              </div>
            ))}
            
            {!isLoading && jobs.length === 0 && !error && <p>No job opportunities found.</p>}
            
          </div>

          {/* Updated Pagination/Carousel Navigation */}
          <div className="gv-pagination">
            {/* Previous Button */}
            <button className="gv-page-btn" onClick={handlePrev} disabled={currentPage === 1}>
              <Image src="gte_svg/Previous_page.svg" alt="Previous" width={24} height={24} />
            </button>
            
            {/* Carousel Page Buttons */}
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={`gv-carousel-dot ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => handleGoToPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            {/* Next Button */}
            <button className="gv-page-btn" onClick={handleNext} disabled={currentPage === totalPages}>
              <Image src="/Next page.svg" alt="Next" width={24} height={24} />
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