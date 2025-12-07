'use client';
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import './styles.css';

// The API endpoint used for the job/opportunity data
const API_URL = "https://script.google.com/macros/s/AKfycbwFSTE_LebWAn05ByY-dPe3uGwVMTtul6rew9m22FFqMsMrtHDNRnNuAG_oVQ6V6dkpKA/exec";
const ITEMS_PER_PAGE = 6;
const MAX_VISIBLE_PAGES = 5;

// Helper function to convert the array-of-arrays into an array-of-objects
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
        // Normalize categories for filtering (grab the first category)
        projectType: opp[4]?.trim().split(',')[0].trim() || 'Other',
    }));
};


export default function GlobalVolunteer() {
    // State for data and carousel control
    const [opportunities, setOpportunities] = useState([]);
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

    
    // Filtering Logic (Optimized with useMemo)
    const filteredOpportunities = useMemo(() => {
        return opportunities.filter(opp => {
            const cityMatch = filters.city === '' || opp.city.toLowerCase() === filters.city.toLowerCase();
            const projectMatch = filters.project === '' || opp.projectType.toLowerCase() === filters.project.toLowerCase();
            return cityMatch && projectMatch;
        });
    }, [opportunities, filters]); 


    // Recalculate pagination based on filtered data
    const finalOpportunities = filteredOpportunities;
    const finalTotalPages = Math.ceil(finalOpportunities.length / ITEMS_PER_PAGE);
    const finalStartIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const opportunitiesToDisplay = finalOpportunities.slice(finalStartIndex, finalStartIndex + ITEMS_PER_PAGE);

    // Get unique filter options
    const uniqueCities = [...new Set(opportunities.map(opp => opp.city))].sort();
    const uniqueProjects = [...new Set(opportunities.map(opp => opp.projectType))].sort();


    // --- CAROUSEL NAVIGATION FUNCTIONS ---
    const handleNext = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, finalTotalPages));
    };

    const handlePrev = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };
    
    const handleGoToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // --- VIEW DETAILS FUNCTION (FIXED FOR GLOBAL VOLUNTEER) ---
    const handleViewDetails = (opportunityId) => {
        if (opportunityId) {
            // Correct URL path for Global Volunteer
            const url = `https://aiesec.org/opportunity/global-volunteer/${opportunityId}`; 
            window.open(url, '_blank'); 
        }
    };
    // -----------------------------------------------------------


    // --- CAROUSEL PAGE RANGE LOGIC (5-dot logic) ---
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
    const visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    // --- END CAROUSEL PAGE RANGE LOGIC ---


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
            {/* === BİRİNCİ BÖLÜM - HERO SECTION (Volunteer Images) === */}
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

            {/* === İKİNCİ BÖLÜM - DESCRIPTION SECTION (Volunteer Content) === */}
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

            {/* === ÜÇÜNCÜ BÖLÜM - OPPORTUNITY LIST SECTION with CAROUSEL and FILTERS === */}
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
                            Search ({finalOpportunities.length})
                        </button>
                    </div>

                    {/* OPPORTUNITY GRID */}
                    <div className="gv-projects-grid">
                        {isLoading && <p>Loading opportunities...</p>}
                        {error && <p className="error">{error}</p>}
                        
                        {/* Display filtered and paginated opportunities */}
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

                                    {/* IMPLEMENTED: View Details Button with correct Volunteer navigation */}
                                    <button 
                                        className="gv-view-details"
                                        onClick={() => handleViewDetails(opp.id)}
                                    >
                                        View details
                                    </button>
                                </div>
                            </div>
                        ))}
                        
                        {!isLoading && finalOpportunities.length === 0 && !error && <p>No opportunities found matching your criteria.</p>}
                        
                    </div>

                    {/* CAROUSEL NAVIGATION (Fixed 5-dot logic) */}
                    {finalTotalPages > 1 && ( // Only show pagination if there is more than 1 page
                        <div className="gv-pagination">
                            {/* Previous Button */}
                            <button className="gv-page-btn" onClick={handlePrev} disabled={currentPage === 1}>
                                <Image src="/PreviousPage.png" alt="Previous" width={24} height={24} />
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
                            {endPage < finalTotalPages && (
                                <>
                                    {endPage < finalTotalPages - 1 && <span style={{ padding: '0 5px' }}>...</span>}
                                    <button
                                        className={`gv-carousel-dot ${currentPage === finalTotalPages ? 'active' : ''}`}
                                        onClick={() => handleGoToPage(finalTotalPages)}
                                    >
                                        {finalTotalPages}
                                    </button>
                                </>
                            )}
                            

                            {/* Next Button */}
                            <button className="gv-page-btn" onClick={handleNext} disabled={currentPage === finalTotalPages}>
                                <Image src="/NextPage.png" alt="Next" width={24} height={24} />
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