"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  GraduationCap,
  Users,
  Award,
  BookOpen,
  Clock,
  CheckCircle,
  TrendingUp,
  Zap,
  Target,
  Briefcase,
  Calendar,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

const TrainingProgramsPage = () => {
  const [selectedProgram, setSelectedProgram] = useState(0);
  const heroRef = useRef(null);
  const programsRef = useRef(null);
  const benefitsRef = useRef(null);
  const processRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);

  const programs = [
    {
      id: "electrical-fundamentals",
      icon: Zap,
      title: "Electrical Engineering Fundamentals",
      duration: "12 weeks",
      level: "Beginner to Intermediate",
      description:
        "Comprehensive training in electrical theory, circuit design, and practical installations",
      modules: [
        "Basic Electrical Theory & Safety",
        "Circuit Analysis & Design",
        "Wiring Standards & Regulations",
        "Testing & Troubleshooting",
        "AutoCAD for Electrical Design",
        "Hands-on Installation Practice",
      ],
      prerequisites: "Basic technical knowledge",
      certification: "JEFCOM Certified Electrical Technician",
      image: "/images/wiring.jpg",
      color: "from-green-700 to-green-900",
    },
    {
      id: "solar-installation",
      icon: Target,
      title: "Solar Energy Systems Installation",
      duration: "8 weeks",
      level: "Intermediate",
      description:
        "Specialized training in solar panel design, installation, and maintenance",
      modules: [
        "Solar Energy Principles",
        "System Design & Sizing",
        "Panel Installation Techniques",
        "Inverter & Battery Systems",
        "Grid Integration",
        "System Commissioning & Maintenance",
      ],
      prerequisites: "Basic electrical knowledge",
      certification: "Certified Solar Installation Technician",
      image: "/images/solar.jpg",
      color: "from-yellow-600 to-orange-700",
    },
    {
      id: "control-systems",
      icon: Briefcase,
      title: "Control Panel & Automation",
      duration: "10 weeks",
      level: "Advanced",
      description:
        "Advanced training in PLC programming, control panel design, and industrial automation",
      modules: [
        "PLC Programming (Siemens, Allen Bradley)",
        "SCADA Systems & HMI Design",
        "Control Panel Fabrication",
        "Motor Control Systems",
        "Industrial Communication Protocols",
        "Project Implementation",
      ],
      prerequisites: "Electrical engineering background",
      certification: "Certified Control Systems Engineer",
      image: "/images/controlpanel.jpg",
      color: "from-gray-700 to-gray-900",
    },
    {
      id: "home-automation",
      icon: Users,
      title: "Smart Home & Building Automation",
      duration: "6 weeks",
      level: "Intermediate",
      description:
        "Training in modern smart home technologies and building automation systems",
      modules: [
        "Smart Home Technologies",
        "IoT Device Integration",
        "Security System Installation",
        "Network Configuration",
        "Mobile App Control Systems",
        "Client Consultation Skills",
      ],
      prerequisites: "Basic IT & electrical knowledge",
      certification: "Certified Smart Home Specialist",
      image: "/images/automation.jpg",
      color: "from-orange-600 to-orange-800",
    },
    {
      id: "project-management",
      icon: TrendingUp,
      title: "Electrical Project Management",
      duration: "8 weeks",
      level: "Advanced",
      description:
        "Professional development for electrical engineers moving into project management",
      modules: [
        "Project Planning & Estimation",
        "Team Leadership & Communication",
        "Resource & Budget Management",
        "Quality Control & Safety",
        "Client Relationship Management",
        "Project Software Tools",
      ],
      prerequisites: "5+ years field experience",
      certification: "Professional Project Management Certificate",
      image: "/images/career.jpg",
      color: "from-blue-700 to-blue-900",
    },
    {
      id: "safety-certification",
      icon: Award,
      title: "Electrical Safety & Compliance",
      duration: "4 weeks",
      level: "All Levels",
      description:
        "Essential safety training and regulatory compliance for electrical workers",
      modules: [
        "Workplace Safety Standards",
        "Personal Protective Equipment",
        "Hazard Identification & Prevention",
        "Nigerian Electrical Code",
        "Emergency Response Procedures",
        "Safety Documentation",
      ],
      prerequisites: "None",
      certification: "Certified Electrical Safety Professional",
      image: "/images/team.jpg",
      color: "from-red-700 to-red-900",
    },
  ];

  const benefits = [
    {
      icon: GraduationCap,
      title: "Industry-Standard Training",
      description:
        "Learn from certified professionals with 25+ years experience",
    },
    {
      icon: BookOpen,
      title: "Practical & Theoretical",
      description:
        "Balanced curriculum combining hands-on practice with theory",
    },
    {
      icon: Award,
      title: "Recognized Certification",
      description: "Receive certificates valued by employers across Nigeria",
    },
    {
      icon: Users,
      title: "Small Class Sizes",
      description: "Maximum 12 students per class for personalized attention",
    },
  ];

  const testimonials = [
    {
      name: "Chukwuemeka Okafor",
      role: "Solar Technician, JEFCOM",
      program: "Solar Energy Systems",
      image: "/images/team.jpg",
      quote:
        "The training was intensive but incredibly rewarding. I went from basic knowledge to confidently installing complete solar systems. The instructors were patient and the hands-on practice was invaluable.",
    },
    {
      name: "Amina Ibrahim",
      role: "Control Systems Engineer",
      program: "Control Panel & Automation",
      image: "/images/careerr.jpg",
      quote:
        "This program transformed my career. The PLC programming skills I gained opened up new opportunities, and I was promoted within 6 months of completing the course.",
    },
    {
      name: "Oluwaseun Adebayo",
      role: "Electrical Project Manager",
      program: "Project Management",
      image: "/images/careerrr.jpg",
      quote:
        "As an engineer for 7 years, I needed to transition into management. This course gave me the tools and confidence to lead teams effectively. Now I'm managing major projects for JEFCOM.",
    },
  ];

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
            ".training-hero-title",
            { opacity: 0, y: 100 },
            { opacity: 1, y: 0, duration: 1.2, ease: "power4.out", delay: 0.3 }
          );

          gsap.fromTo(
            ".training-hero-line",
            { scaleX: 0 },
            { scaleX: 1, duration: 0.8, ease: "power3.out", delay: 0.8 }
          );

          gsap.fromTo(
            ".training-hero-desc",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 1 }
          );

          // Programs Animation
          gsap.fromTo(
            ".program-card",
            { opacity: 0, y: 80, rotationX: -15 },
            {
              opacity: 1,
              y: 0,
              rotationX: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: programsRef.current,
                start: "top 70%",
              },
            }
          );

          // Benefits Animation
          gsap.fromTo(
            ".benefit-item",
            { opacity: 0, scale: 0.5 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.6,
              stagger: 0.15,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: benefitsRef.current,
                start: "top 70%",
              },
            }
          );

          // Process Animation
          gsap.fromTo(
            ".process-step",
            { opacity: 0, x: -100 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              stagger: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: processRef.current,
                start: "top 70%",
              },
            }
          );

          // Testimonials Animation
          gsap.fromTo(
            ".testimonial-card",
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: testimonialsRef.current,
                start: "top 70%",
              },
            }
          );

          // CTA Animation
          gsap.fromTo(
            ".training-cta",
            { opacity: 0, scale: 0.9 },
            {
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ctaRef.current,
                start: "top 80%",
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
            <h1 className="text-5xl md:text-6xl font-black mb-6 training-hero-title opacity-0 heading-font text-shadow-glow">
              Training <span className="gradient-text">Programs</span>
            </h1>
            <div className="w-24 h-1 bg-orange-600 mx-auto mb-8 training-hero-line origin-center"></div>
            <p className="text-xl text-gray-300 mb-8 training-hero-desc opacity-0 font-semibold leading-relaxed">
              Develop your skills with Nigeria&apos;s leading electrical
              engineering training programs
            </p>
          </div>
        </div>
      </section>

      {/* Why Train With Us */}
      <section
        ref={benefitsRef}
        className="py-20 bg-gray-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 grid-overlay opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/10 via-transparent to-green-900/10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4 heading-font">
              Why Train With <span className="gradient-text">Jefcom</span>
            </h2>
            <div className="w-24 h-1 bg-orange-600 mx-auto mb-6"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="benefit-item opacity-0 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 hover:border-orange-500 p-8 rounded-xl text-center hover:shadow-2xl transition-all duration-300 box-shadow-glow group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-green-700 to-green-900 rounded-full flex items-center justify-center border-2 border-green-500 box-shadow-glow mx-auto mb-6">
                    <Icon className="w-8 h-8 text-white float-icon" />
                  </div>
                  <h3 className="text-xl font-black text-white mb-3 heading-font group-hover:text-orange-400 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400 font-semibold">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Training Programs */}
      <section
        ref={programsRef}
        className="py-20 bg-gray-800 relative overflow-hidden"
      >
        <div className="absolute inset-0 grid-overlay opacity-15"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/10 via-transparent to-orange-900/10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4 heading-font">
              Available <span className="gradient-text">Programs</span>
            </h2>
            <div className="w-24 h-1 bg-orange-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-semibold leading-relaxed">
              Choose from our comprehensive range of professional development
              courses
            </p>
          </div>

          {/* Program Selector */}
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {programs.map((program, index) => {
              const Icon = program.icon;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedProgram(index)}
                  className={`program-card opacity-0 p-4 rounded-xl text-center transition-all duration-300 border-2 ${
                    selectedProgram === index
                      ? "bg-gradient-to-br " +
                        program.color +
                        " border-orange-500 scale-105 box-shadow-glow"
                      : "bg-gray-800 border-gray-700 hover:border-orange-500/50"
                  }`}
                >
                  <Icon
                    className={`w-8 h-8 mx-auto mb-2 ${
                      selectedProgram === index
                        ? "text-white"
                        : "text-green-500"
                    }`}
                  />
                  <div
                    className={`text-sm font-bold ${
                      selectedProgram === index ? "text-white" : "text-gray-300"
                    }`}
                  >
                    {program.title.split(" ")[0]}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Program Details */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border-2 border-gray-700">
                <div className="relative h-64">
                  <Image
                    src={programs[selectedProgram].image}
                    alt={programs[selectedProgram].title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                  <div
                    className={`absolute top-4 right-4 px-4 py-2 bg-gradient-to-r ${programs[selectedProgram].color} rounded-full border-2 border-white/20`}
                  >
                    <span className="text-white font-bold text-sm heading-font">
                      {programs[selectedProgram].level}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-6 mb-4 text-sm text-gray-400 font-semibold">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-orange-500" />
                      {programs[selectedProgram].duration}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-orange-500" />
                      Max 12 students
                    </span>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 border-2 border-gray-700">
                    <div className="text-sm text-gray-400 mb-2 font-semibold">
                      Prerequisites:
                    </div>
                    <div className="text-white font-bold">
                      {programs[selectedProgram].prerequisites}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div
                className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${programs[selectedProgram].color} mb-6 shadow-2xl border-2 border-white/20`}
              >
                {React.createElement(programs[selectedProgram].icon, {
                  className: "w-8 h-8 text-white",
                })}
              </div>

              <h3 className="text-3xl font-black text-white mb-4 heading-font">
                {programs[selectedProgram].title}
              </h3>

              <p className="text-lg text-gray-300 mb-8 leading-relaxed font-semibold">
                {programs[selectedProgram].description}
              </p>

              <div className="mb-8">
                <h4 className="text-xl font-black text-white mb-4 heading-font flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-orange-500" />
                  Course Modules
                </h4>
                <div className="space-y-3">
                  {programs[selectedProgram].modules.map((module, idx) => (
                    <div key={idx} className="flex items-start space-x-3 group">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5 group-hover:scale-125 transition-transform" />
                      <span className="text-gray-300 font-semibold">
                        {module}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-600/20 to-orange-500/20 border-2 border-orange-500 rounded-xl p-6 mb-8">
                <div className="flex items-center mb-2">
                  <Award className="w-6 h-6 text-orange-500 mr-3" />
                  <span className="text-sm text-gray-400 font-semibold">
                    Upon Completion
                  </span>
                </div>
                <div className="text-white font-black text-lg heading-font">
                  {programs[selectedProgram].certification}
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href="/contact"
                  className="flex-1 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-6 py-4 rounded-xl hover:from-orange-700 hover:to-orange-600 transition-all duration-300 font-black text-center heading-font tracking-wider transform hover:scale-105 box-shadow-glow"
                >
                  Enroll Now
                </a>
                <a
                  href="/contact"
                  className="px-6 py-4 border-2 border-orange-500 text-orange-500 rounded-xl hover:bg-orange-500 hover:text-white transition-all duration-300 font-black heading-font tracking-wider transform hover:scale-105"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training Process */}
      <section
        ref={processRef}
        className="py-20 bg-gray-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 grid-overlay opacity-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4 heading-font">
              Your Learning <span className="gradient-text">Journey</span>
            </h2>
            <div className="w-24 h-1 bg-orange-600 mx-auto mb-6"></div>
          </div>

          <div className="space-y-6">
            {[
              {
                step: "01",
                title: "Application & Assessment",
                description:
                  "Submit your application and complete a skills assessment to ensure the right program fit",
                icon: BookOpen,
              },
              {
                step: "02",
                title: "Classroom Theory",
                description:
                  "Learn fundamental concepts and principles from experienced instructors in modern facilities",
                icon: GraduationCap,
              },
              {
                step: "03",
                title: "Hands-On Practice",
                description:
                  "Apply your knowledge in our fully-equipped workshops with real equipment and projects",
                icon: Zap,
              },
              {
                step: "04",
                title: "On-Site Experience",
                description:
                  "Participate in actual JEFCOM projects to gain real-world experience under supervision",
                icon: Briefcase,
              },
              {
                step: "05",
                title: "Certification & Placement",
                description:
                  "Complete final assessment, receive certification, and get assistance with job placement",
                icon: Award,
              },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="process-step opacity-0 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 hover:border-orange-500 rounded-xl p-6 transition-all duration-300 box-shadow-glow group"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-600 to-orange-500 rounded-xl flex items-center justify-center shadow-2xl border-2 border-orange-400 group-hover:scale-110 transition-transform">
                        <span className="text-2xl font-black text-white heading-font">
                          {item.step}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <Icon className="w-6 h-6 text-orange-500 mr-3" />
                        <h3 className="text-2xl font-black text-white heading-font group-hover:text-orange-400 transition-colors">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-gray-300 text-lg leading-relaxed font-semibold">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        ref={testimonialsRef}
        className="py-20 bg-gray-800 relative overflow-hidden"
      >
        <div className="absolute inset-0 grid-overlay opacity-15"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4 heading-font">
              Success <span className="gradient-text">Stories</span>
            </h2>
            <div className="w-24 h-1 bg-orange-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-semibold leading-relaxed">
              Hear from graduates who transformed their careers through our
              programs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-card opacity-0 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 hover:border-orange-500 rounded-xl p-8 transition-all duration-300 box-shadow-glow"
              >
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-orange-500 mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-black text-white heading-font">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-400 font-semibold">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <div className="text-xs text-orange-500 font-bold mb-4 uppercase tracking-wider">
                  {testimonial.program}
                </div>
                <p className="text-gray-300 leading-relaxed font-semibold italic">
                  &quot;{testimonial.quote}&quot;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        ref={ctaRef}
        className="py-20 bg-gradient-to-br from-orange-700 to-orange-600 relative overflow-hidden"
      >
        <div className="absolute inset-0 animated-bg opacity-40"></div>
        <div className="absolute inset-0 grid-overlay opacity-20"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="training-cta opacity-0">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 heading-font text-shadow-glow">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-orange-100 mb-8 font-semibold leading-relaxed">
              Join our next cohort and take the first step towards advancing
              your electrical engineering career
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center bg-white text-orange-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-300 font-black shadow-2xl text-lg heading-font tracking-wider transform hover:scale-110"
              >
                Apply Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
              <a
                href="/contact"
                className="inline-block border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-orange-600 transition-all duration-300 font-black text-lg heading-font tracking-wider transform hover:scale-110"
              >
                Schedule a Call
              </a>
            </div>
            <div className="mt-8 flex items-center justify-center gap-8 text-white">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span className="font-semibold">
                  Next Cohort: February 2026
                </span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span className="font-semibold">Limited Spots Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TrainingProgramsPage;
