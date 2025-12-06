'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react'; // Import necessary hooks
import './styles.css';

// The API endpoint used for the job/opportunity data
const API_URL = "https://script.google.com/macros/s/AKfycbwFSTE_LebWAn05ByY-dPe3uGwVMTtul6rew9m22FFqMsMrtHDNRnNuAG_oVQ6V6dkpKA/exec";
const ITEMS_PER_PAGE = 6; 

// Helper function to convert the array-of-arrays into an array-of-objects
// (Assumes the volunteer data follows the same array index structure as the talent data)
const parseOpportunityData = (data) => {
  return data.map(opp => ({
    id: opp[0],
    jobTitle: opp[1]?.trim() || 'N/A', // Title of the opportunity/project
    company: opp[3]?.trim() || 'N/A', // Organization name
    categories: opp[4]?.trim() || 'N/A',
    city: opp[5]?.trim() || 'N/A',
    country: opp[6]?.trim() || 'Turkey',
    salary: opp[13] || 'No salary', // Often 'Fee' or 'Stipend' for volunteer/intern roles
    deadline: opp[15] || 'N/A',
    availableSlots: parseInt(opp[11]) || 0, // Number of available slots
  }));
};


export default function GlobalVolunteer() {
  // State for data and carousel control
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); 

  // Carousel logic
  const totalPages = Math.ceil(opportunities.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const opportunitiesToDisplay = opportunities.slice(startIndex, endIndex);

  // Navigation Handlers
  const handleNext = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };
  
  const handleGoToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
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
        console.error("Failed to fetch opportunities:", e);
        setError("Failed to load opportunities. Please check the API link.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchOpportunities();
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

      {/* === ÜÇÜNCÜ BÖLÜM - GVBG3.svg (OPPORTUNITY LIST SECTION with CAROUSEL) === */}
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
            {isLoading && <p>Loading opportunities...</p>}
            {error && <p className="error">{error}</p>}
            
            {/* Map over the current page's slice of data */}
            {!isLoading && opportunitiesToDisplay.length > 0 && opportunitiesToDisplay.map((opp) => (
              <div key={opp.id} className="gv-project-card">
                <div className="gv-project-image">
                  Photo from aiesec.org
                </div>

                <div className="gv-project-info">
                  <h3 className="gv-project-title">{opp.jobTitle}</h3>

                  <div className="gv-project-meta-row">
                    <div className="gv-project-meta-left">
                      <div>**Organization:** {opp.company}</div>
                      <div>**Stipend:** {opp.salary}</div>
                    </div>
                    <div className="gv-project-meta-right">
                      <div>**Location:** {opp.city}, {opp.country}</div>
                      <div className="gv-project-fee">**Deadline:** {opp.deadline}</div>
                    </div>
                  </div>

                  <div className="gv-project-meta-row">
                    <div>Available Slots: {opp.availableSlots}</div>
                    <div className="gv-slots-container">
                      {renderSlots(opp.availableSlots)}
                    </div>
                  </div>

                  <button className="gv-view-details">View details</button>
                </div>
              </div>
            ))}
            
            {!isLoading && opportunities.length === 0 && !error && <p>No opportunities found.</p>}
            
          </div>

          {/* Carousel Navigation */}
          <div className="gv-pagination">
            {/* Previous Button */}
            <button className="gv-page-btn" onClick={handlePrev} disabled={currentPage === 1}>
              <Image src="/PreviousPage.png" alt="Previous" width={24} height={24} />
            </button>
            
            {/* Carousel Page Buttons (Dots) */}
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