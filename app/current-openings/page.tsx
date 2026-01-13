"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  ChevronDown,
  Search,
  Filter,
  CheckCircle,
  Users,
  TrendingUp,
  Award,
  Send,
  Mail,
  Phone,
} from "lucide-react";
import Image from "next/image";

const CurrentOpeningsPage = () => {
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const filtersRef = useRef(null);
  const jobsRef = useRef(null);
  const benefitsRef = useRef(null);
  const applicationRef = useRef(null);

  const departments = [
    "All",
    "Engineering",
    "Renewable Energy",
    "Installation",
    "Operations",
    "Business Development",
  ];

  const locations = ["All", "Lagos", "Abuja", "Port Harcourt"];

  const openings = [
    {
      title: "Senior Electrical Engineer",
      department: "Engineering",
      location: "Lagos, Nigeria",
      type: "Full-time",
      experience: "5+ years",
      salary: "Competitive",
      postedDate: "2 days ago",
      description:
        "Lead electrical design and installation projects for commercial and industrial clients. Oversee project teams and ensure quality delivery.",
      responsibilities: [
        "Design electrical systems for buildings and industrial facilities",
        "Lead project teams and coordinate with clients",
        "Prepare technical drawings and documentation",
        "Ensure compliance with electrical codes and standards",
        "Conduct site inspections and quality control",
      ],
      requirements: [
        "Bachelor's degree in Electrical Engineering",
        "Minimum 5 years experience in electrical design",
        "Professional registration (COREN) preferred",
        "Proficiency in AutoCAD and electrical design software",
        "Strong project management skills",
      ],
      benefits: [
        "Competitive salary package",
        "Health insurance coverage",
        "Professional development opportunities",
        "Performance bonuses",
      ],
    },
    {
      title: "Control Systems Engineer",
      department: "Engineering",
      location: "Lagos, Nigeria",
      type: "Full-time",
      experience: "3-5 years",
      salary: "₦5M - ₦8M/year",
      postedDate: "5 days ago",
      description:
        "Design and implement control panel systems for industrial automation projects. Work with PLC programming and SCADA systems.",
      responsibilities: [
        "Design and program control panel systems",
        "Develop PLC and SCADA applications",
        "Troubleshoot and maintain automation systems",
        "Prepare technical specifications and documentation",
        "Provide technical support to clients",
      ],
      requirements: [
        "Bachelor's degree in Electrical/Electronic Engineering",
        "Experience with PLC programming (Siemens, Allen Bradley, Schneider)",
        "Knowledge of SCADA systems and HMI design",
        "Understanding of industrial communication protocols",
        "Strong problem-solving abilities",
      ],
      benefits: [
        "Industry-leading compensation",
        "Training and certification programs",
        "Career advancement opportunities",
        "Work-life balance",
      ],
    },
    {
      title: "Solar Energy Technician",
      department: "Renewable Energy",
      location: "Lagos, Nigeria",
      type: "Full-time",
      experience: "2-4 years",
      salary: "₦3M - ₦5M/year",
      postedDate: "1 week ago",
      description:
        "Install and maintain solar power systems for residential and commercial clients. Ensure optimal system performance and client satisfaction.",
      responsibilities: [
        "Install solar panels, inverters, and battery systems",
        "Conduct site surveys and system assessments",
        "Perform system commissioning and testing",
        "Troubleshoot and repair solar installations",
        "Maintain accurate installation records",
      ],
      requirements: [
        "Diploma/Degree in Electrical Engineering or related field",
        "Hands-on experience with solar installations",
        "Knowledge of solar system components and design",
        "Ability to work at heights and in outdoor conditions",
        "Valid driver's license",
      ],
      benefits: [
        "Competitive salary",
        "Field allowances",
        "Equipment and tools provided",
        "Growth in renewable energy sector",
      ],
    },
    {
      title: "Electrical Technician",
      department: "Installation",
      location: "Lagos, Nigeria",
      type: "Full-time",
      experience: "1-3 years",
      salary: "₦2M - ₦3.5M/year",
      postedDate: "3 days ago",
      description:
        "Execute electrical installations for residential and commercial projects. Work under supervision of senior engineers.",
      responsibilities: [
        "Install electrical wiring and fixtures",
        "Read and interpret electrical drawings",
        "Conduct electrical testing and troubleshooting",
        "Maintain tools and equipment",
        "Follow safety procedures on site",
      ],
      requirements: [
        "Technical certification in Electrical Installation",
        "Basic understanding of electrical codes",
        "Ability to use electrical testing equipment",
        "Good physical fitness",
        "Team player with good communication skills",
      ],
      benefits: [
        "Entry-level friendly",
        "On-the-job training",
        "Career progression path",
        "Safety equipment provided",
      ],
    },
    {
      title: "Project Manager - Electrical",
      department: "Operations",
      location: "Abuja, Nigeria",
      type: "Full-time",
      experience: "5+ years",
      salary: "₦8M - ₦12M/year",
      postedDate: "1 week ago",
      description:
        "Manage multiple electrical engineering projects from inception to completion. Coordinate teams, clients, and resources.",
      responsibilities: [
        "Plan and execute project timelines and budgets",
        "Coordinate with clients, engineers, and contractors",
        "Monitor project progress and quality",
        "Manage project documentation and reporting",
        "Resolve project issues and risks",
      ],
      requirements: [
        "Bachelor's degree in Engineering or Project Management",
        "PMP certification preferred",
        "Proven track record in project management",
        "Strong leadership and communication skills",
        "Proficiency in project management software",
      ],
      benefits: [
        "Executive compensation package",
        "Company vehicle",
        "Performance-based bonuses",
        "Leadership development",
      ],
    },
    {
      title: "Sales Engineer",
      department: "Business Development",
      location: "Lagos, Nigeria",
      type: "Full-time",
      experience: "2-4 years",
      salary: "₦4M - ₦7M/year + Commission",
      postedDate: "4 days ago",
      description:
        "Drive business growth by identifying opportunities and providing technical solutions to clients in the electrical engineering sector.",
      responsibilities: [
        "Identify and pursue new business opportunities",
        "Prepare technical proposals and quotations",
        "Conduct client presentations and demonstrations",
        "Build and maintain client relationships",
        "Achieve sales targets and objectives",
      ],
      requirements: [
        "Bachelor's degree in Engineering or Business",
        "Experience in technical sales",
        "Knowledge of electrical systems and products",
        "Excellent communication and negotiation skills",
        "Self-motivated with strong business acumen",
      ],
      benefits: [
        "Base salary + commission",
        "Sales incentives and bonuses",
        "Travel allowances",
        "Networking opportunities",
      ],
    },
    {
      title: "Automation Engineer",
      department: "Engineering",
      location: "Port Harcourt, Nigeria",
      type: "Full-time",
      experience: "3-5 years",
      salary: "₦5M - ₦9M/year",
      postedDate: "1 week ago",
      description:
        "Design and implement building automation and smart home systems. Work with cutting-edge IoT and control technologies.",
      responsibilities: [
        "Design smart home and building automation systems",
        "Program and configure IoT devices and controllers",
        "Integrate security, HVAC, and lighting systems",
        "Provide technical support and system commissioning",
        "Train clients on system operation",
      ],
      requirements: [
        "Bachelor's degree in Electrical/Electronic Engineering",
        "Experience with building automation systems",
        "Knowledge of IoT protocols and smart home technologies",
        "Programming skills (Python, C++, or similar)",
        "Strong troubleshooting abilities",
      ],
      benefits: [
        "Work with latest technologies",
        "Technical training and certifications",
        "Flexible working arrangements",
        "Innovation-driven environment",
      ],
    },
    {
      title: "Electrical Design Engineer",
      department: "Engineering",
      location: "Lagos, Nigeria",
      type: "Full-time",
      experience: "3-5 years",
      salary: "₦4.5M - ₦7M/year",
      postedDate: "2 weeks ago",
      description:
        "Create detailed electrical designs and technical drawings for residential, commercial, and industrial projects.",
      responsibilities: [
        "Develop electrical design drawings using AutoCAD",
        "Perform load calculations and circuit design",
        "Prepare bill of materials and specifications",
        "Collaborate with architects and other engineers",
        "Review and approve shop drawings",
      ],
      requirements: [
        "Bachelor's degree in Electrical Engineering",
        "Proficiency in AutoCAD, Revit, or similar software",
        "Knowledge of electrical codes and standards",
        "Strong attention to detail",
        "Good communication skills",
      ],
      benefits: [
        "Modern office environment",
        "Design software licenses",
        "Continuing education support",
        "Work-from-home flexibility",
      ],
    },
  ];

  const filteredJobs = openings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "All" || job.department === selectedDepartment;
    const matchesLocation =
      selectedLocation === "All" || job.location.includes(selectedLocation);
    return matchesSearch && matchesDepartment && matchesLocation;
  });

  // GSAP Animations
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("gsap").then((gsapModule) => {
        const gsap = gsapModule.default;
        import("gsap/ScrollTrigger").then((ScrollTriggerModule) => {
          const ScrollTrigger = ScrollTriggerModule.default;
          gsap.registerPlugin(ScrollTrigger);

          // Hero Animation
          gsap.fromTo(
            ".openings-hero-title",
            { opacity: 0, y: 100 },
            { opacity: 1, y: 0, duration: 1.2, ease: "power4.out", delay: 0.3 }
          );

          gsap.fromTo(
            ".openings-hero-line",
            { scaleX: 0 },
            { scaleX: 1, duration: 0.8, ease: "power3.out", delay: 0.8 }
          );

          gsap.fromTo(
            ".openings-hero-desc",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 1 }
          );

          // Stats Animation
          gsap.fromTo(
            ".stat-card",
            { opacity: 0, scale: 0.5, rotation: -10 },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: statsRef.current,
                start: "top 70%",
              },
            }
          );

          // Job Cards Animation
          gsap.fromTo(
            ".job-card",
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: jobsRef.current,
                start: "top 70%",
              },
            }
          );

          // Benefits Animation
          gsap.fromTo(
            ".benefit-card",
            { opacity: 0, x: -80 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: benefitsRef.current,
                start: "top 70%",
              },
            }
          );

          // Application Form Animation
          gsap.fromTo(
            ".application-form",
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: applicationRef.current,
                start: "top 70%",
              },
            }
          );

          // Floating Animation
          gsap.to(".float-icon", {
            y: -10,
            duration: 2,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            stagger: 0.2,
          });
        });
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-gray-900">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="pt-32 pb-20 bg-gradient-to-br from-green-900 via-green-800 to-gray-900 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 grid-overlay opacity-20"></div>
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-orange-500 rounded-full opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            ></div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-black mb-6 openings-hero-title opacity-0 heading-font text-shadow-glow">
              Current <span className="gradient-text">Openings</span>
            </h1>
            <div className="w-24 h-1 bg-orange-600 mx-auto mb-8 openings-hero-line origin-center"></div>
            <p className="text-xl text-gray-300 mb-8 openings-hero-desc opacity-0 font-semibold leading-relaxed">
              Join our team of exceptional professionals building Nigeria&apos;s
              electrical infrastructure
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        className="py-16 bg-gray-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 grid-overlay opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-4 gap-6">
            <div className="stat-card opacity-0 bg-gradient-to-br from-green-700 to-green-900 p-6 rounded-xl text-white border-2 border-green-600 hover:border-orange-500 transition-all duration-300 text-center box-shadow-glow">
              <div className="text-4xl font-black mb-2 heading-font">
                {filteredJobs.length}
              </div>
              <div className="text-green-100 font-bold">Open Positions</div>
            </div>
            <div className="stat-card opacity-0 bg-gradient-to-br from-orange-600 to-orange-700 p-6 rounded-xl text-white border-2 border-orange-500 hover:border-green-500 transition-all duration-300 text-center box-shadow-glow">
              <div className="text-4xl font-black mb-2 heading-font">6</div>
              <div className="text-orange-100 font-bold">Departments</div>
            </div>
            <div className="stat-card opacity-0 bg-gradient-to-br from-gray-700 to-gray-900 p-6 rounded-xl text-white border-2 border-gray-600 hover:border-orange-500 transition-all duration-300 text-center box-shadow-glow">
              <div className="text-4xl font-black mb-2 heading-font">3</div>
              <div className="text-gray-100 font-bold">Office Locations</div>
            </div>
            <div className="stat-card opacity-0 bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-xl text-white border-2 border-green-500 hover:border-orange-500 transition-all duration-300 text-center box-shadow-glow">
              <div className="text-4xl font-black mb-2 heading-font">50+</div>
              <div className="text-green-100 font-bold">Team Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section
        ref={filtersRef}
        className="py-12 bg-gray-800 relative overflow-hidden"
      >
        <div className="absolute inset-0 grid-overlay opacity-15"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search positions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none transition-colors font-semibold"
              />
            </div>

            {/* Department Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-xl text-white focus:border-orange-500 focus:outline-none transition-colors font-semibold appearance-none cursor-pointer"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === "All" ? "All Departments" : dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-xl text-white focus:border-orange-500 focus:outline-none transition-colors font-semibold appearance-none cursor-pointer"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc === "All" ? "All Locations" : loc}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section
        id="jobs"
        ref={jobsRef}
        className="py-20 bg-gray-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 grid-overlay opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-transparent to-orange-900/20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4 heading-font">
              Available <span className="gradient-text">Positions</span>
            </h2>
            <div className="w-24 h-1 bg-orange-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-300 font-semibold">
              {filteredJobs.length}{" "}
              {filteredJobs.length === 1 ? "position" : "positions"} found
            </p>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-4">
                No positions match your search criteria
              </div>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedDepartment("All");
                  setSelectedLocation("All");
                }}
                className="text-orange-500 hover:text-orange-400 font-bold"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredJobs.map((job, index) => (
                <div
                  key={index}
                  className="job-card opacity-0 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 hover:border-orange-500 rounded-xl overflow-hidden transition-all duration-300 box-shadow-glow"
                >
                  <button
                    onClick={() =>
                      setExpandedJob(expandedJob === index ? null : index)
                    }
                    className="w-full p-6 text-left flex items-start justify-between hover:bg-gray-700/30 transition-colors group"
                  >
                    <div className="flex-1">
                      <div className="flex items-center flex-wrap gap-3 mb-3">
                        <h3 className="text-2xl font-black text-white heading-font group-hover:text-orange-400 transition-colors">
                          {job.title}
                        </h3>
                        <span className="px-3 py-1 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-full text-xs font-bold heading-font tracking-wider border-glow">
                          {job.type}
                        </span>
                        <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-xs font-bold">
                          {job.postedDate}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400 font-semibold mb-3">
                        <span className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-2 text-orange-500" />
                          {job.department}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                          {job.location}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-orange-500" />
                          {job.experience}
                        </span>
                        <span className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-2 text-orange-500" />
                          {job.salary}
                        </span>
                      </div>
                      <p className="text-gray-300 font-semibold">
                        {job.description}
                      </p>
                    </div>
                    <ChevronDown
                      className={`w-6 h-6 text-orange-500 flex-shrink-0 ml-4 transition-transform duration-300 ${
                        expandedJob === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {expandedJob === index && (
                    <div className="p-6 border-t border-gray-700 bg-gray-800/50 animate-fadeIn">
                      <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                          <h4 className="text-lg font-black text-white mb-4 heading-font flex items-center">
                            <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                            Key Responsibilities
                          </h4>
                          <ul className="space-y-3">
                            {job.responsibilities.map((item, idx) => (
                              <li
                                key={idx}
                                className="flex items-start text-sm text-gray-300 font-semibold"
                              >
                                <span className="text-orange-500 mr-2 font-bold text-lg">
                                  •
                                </span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-lg font-black text-white mb-4 heading-font flex items-center">
                            <CheckCircle className="w-5 h-5 mr-2 text-orange-500" />
                            Requirements
                          </h4>
                          <ul className="space-y-3">
                            {job.requirements.map((item, idx) => (
                              <li
                                key={idx}
                                className="flex items-start text-sm text-gray-300 font-semibold"
                              >
                                <span className="text-green-500 mr-2 font-bold text-lg">
                                  •
                                </span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-green-900/30 to-orange-900/30 border-2 border-green-500/30 rounded-xl p-6 mb-6">
                        <h4 className="text-lg font-black text-white mb-4 heading-font flex items-center">
                          <Award className="w-5 h-5 mr-2 text-orange-500" />
                          Benefits & Perks
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          {job.benefits.map((benefit, idx) => (
                            <div
                              key={idx}
                              className="flex items-center text-sm text-gray-300 font-semibold"
                            >
                              <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0" />
                              {benefit}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <a
                          href={`/contact?position=${encodeURIComponent(
                            job.title
                          )}`}
                          className="flex-1 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-3 rounded-lg hover:from-orange-700 hover:to-orange-600 transition-all duration-300 font-black heading-font tracking-wider text-center transform hover:scale-105 box-shadow-glow"
                        >
                          Apply Now
                        </a>
                        <a
                          href={`mailto:careers@jefcomgroup.com?subject=Application for ${job.title}`}
                          className="px-8 py-3 border-2 border-orange-500 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 font-black heading-font tracking-wider flex items-center justify-center"
                        >
                          <Mail className="w-5 h-5 mr-2" />
                          Email
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Join Us */}
      <section
        ref={benefitsRef}
        className="py-20 bg-gray-800 relative overflow-hidden"
      >
        <div className="absolute inset-0 grid-overlay opacity-15"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/10 via-transparent to-orange-900/10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4 heading-font">
              Why Join <span className="gradient-text">Jefcom</span>
            </h2>
            <div className="w-24 h-1 bg-orange-600 mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: TrendingUp,
                title: "Career Growth",
                description:
                  "Clear progression paths with regular training and professional development opportunities",
                image: "/images/career.jpg",
              },
              {
                icon: Award,
                title: "Competitive Compensation",
                description:
                  "Industry-leading salary packages with performance bonuses and comprehensive benefits",
                image: "/images/careerr.jpg",
              },
              {
                icon: Users,
                title: "Collaborative Culture",
                description:
                  "Work with passionate professionals in a supportive, team-oriented environment",
                image: "/images/team.jpg",
              },
              {
                icon: Briefcase,
                title: "Challenging Projects",
                description:
                  "Work on diverse, high-impact projects for Nigeria's leading organizations",
                image: "/images/careerrr.jpg",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="benefit-card opacity-0 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 hover:border-orange-500 rounded-xl overflow-hidden transition-all duration-300 box-shadow-glow group"
                >
                  <div className="relative h-48">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={600}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-500 rounded-xl flex items-center justify-center border-2 border-orange-400 box-shadow-glow">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-black text-white mb-3 heading-font group-hover:text-orange-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 font-semibold leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Application Section */}
      <section
        ref={applicationRef}
        className="py-20 bg-gradient-to-br from-orange-700 to-orange-600 relative overflow-hidden"
      >
        <div className="absolute inset-0 animated-bg opacity-40"></div>
        <div className="absolute inset-0 grid-overlay opacity-20"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="application-form opacity-0 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 heading-font text-shadow-glow">
              Ready to Apply?
            </h2>
            <p className="text-xl text-orange-100 mb-8 font-semibold leading-relaxed">
              Send us your CV and cover letter to get started
            </p>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/20">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="text-left">
                  <div className="flex items-center text-white mb-2">
                    <Mail className="w-5 h-5 mr-3" />
                    <span className="font-bold heading-font">Email</span>
                  </div>
                  <a
                    href="mailto:careers@jefcomgroup.com"
                    className="text-orange-100 hover:text-white transition-colors font-semibold"
                  >
                    careers@jefcomgroup.com
                  </a>
                </div>
                <div className="text-left">
                  <div className="flex items-center text-white mb-2">
                    <Phone className="w-5 h-5 mr-3" />
                    <span className="font-bold heading-font">Phone</span>
                  </div>
                  <a
                    href="tel:+2348023456789"
                    className="text-orange-100 hover:text-white transition-colors font-semibold"
                  >
                    +234 802 345 6789
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="mailto:careers@jefcomgroup.com"
                  className="inline-flex items-center bg-white text-orange-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 font-black shadow-2xl text-lg heading-font tracking-wider transform hover:scale-110"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Application
                </a>
                <a
                  href="/contact"
                  className="inline-block border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-orange-600 transition-all duration-300 font-black text-lg heading-font tracking-wider transform hover:scale-110"
                >
                  Contact HR
                </a>
              </div>
            </div>

            <p className="text-orange-100 mt-8 font-semibold">
              We review all applications within 5 business days
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CurrentOpeningsPage;
