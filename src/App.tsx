import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Briefcase,
  Layers,
  Code,
  Sparkles,
  MapPin,
  ArrowRight,
  ChevronRight,
  Send,
  Users,
  ExternalLink,
  Laptop,
  Compass,
  Zap,
  CheckCircle2,
  Lock
} from 'lucide-react';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

// Project specs to display
interface Project {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  role: string;
  tagline: string;
  badge: string;
  description: string;
  achievements: string[];
  tech: string[];
  colorTheme: 'orange' | 'violet';
  stat: string;
  statLabel: string;
  timeframe: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: 'min-jiang-kueh',
    title: 'Min Jiang Kueh Food Chain',
    subtitle: 'Enterprise Odoo Setup & Multi-Outlet Integration',
    location: 'Singapore',
    role: 'Odoo Project Coordinator & BA',
    timeframe: 'GCA Yangon // 2024 – 2026',
    tagline: 'Unifying multi-outlet food chain operations.',
    badge: 'Retail POS & Logistics',
    description: 'Led the comprehensive Odoo POS, central inventory management, and Tenet SFTP system integration for a traditional food chain across 21 active commercial outlets. Handled direct configurations and technical vendor communications.',
    achievements: [
      'Successfully integrated Odoo POS with Adyen Payment Gateway and secure payment terminals',
      'Developed stable landlord SFTP configurations and automated schedule transfers for 15+ shopping malls',
      'Coordinated local and offshore team members to ensure a seamless, on-time go-live launch'
    ],
    tech: ['Odoo POS & Inventory', 'Adyen Payment Gateway', 'Tenet Landlord SFTP', 'Vendor Relations'],
    colorTheme: 'orange',
    stat: '21',
    statLabel: 'Active Retail Outlets',
  },
  {
    id: 'vehicle-tracking',
    title: 'Fleet Telematics Platform',
    subtitle: 'Cross-Border Event Vehicle Fleet Tracker',
    location: 'Singapore // Italy',
    role: 'Project Coordinator & BA',
    timeframe: 'Global Connect Asia // 2024 – 2026',
    tagline: 'High-precision active team telematics and map tracking.',
    badge: 'IoT & Telematics',
    description: 'Coordinated cross-functional product teams (offshore—Singapore/Italy) for the research, design, and deployment of a vehicle tracking solution. Managed helpdesk coordination, multi-system QA, and production release guidelines.',
    achievements: [
      'Acquired user requirement frameworks to drive UI/UX research & mockups in Figma',
      'Managed direct system helpdesk support and escalated cross-platform tickets',
      'Guaranteed system quality control and standard production deployment safety compliance'
    ],
    tech: ['Figma Prototyping', 'Scrum / Jira Management', 'API Integrations', 'Quality Assurance'],
    colorTheme: 'violet',
    stat: '100%',
    statLabel: 'Deployment Checklist Compliance',
  },
  {
    id: 'home-appliance-erp',
    title: 'Home Appliance Trading ERP',
    subtitle: 'System Stabilization and Legacy Debt Management',
    location: 'Malaysia',
    role: 'Account Manager & BA',
    timeframe: 'GCA Remote // 2024 – 2026',
    tagline: 'Remediating system logic debt for corporate transformation.',
    badge: 'Trading & Operations',
    description: 'Acted as corporate account manager and core Business Analyst to stabilize a complex Odoo instance for a regional trading firm. Resolved deep technical and logical debt to pave the way for succeeding operational phases.',
    achievements: [
      'Directly analyzed old ledger structures and corrected database system mismatch issues',
      'Supervised customer helpdesk escalations and compiled thorough production deployment logs',
      'Serrated communication gaps between client executives and remote software engineers'
    ],
    tech: ['Odoo ERP Optimization', 'SLA Administration', 'Change Management', 'Database Audit'],
    colorTheme: 'orange',
    stat: '0',
    statLabel: 'Critical Post-Stabilization Blocker Incidents',
  },
  {
    id: 'ngo-france',
    title: 'EU NGO Collaboration Media Platform',
    subtitle: 'Friendly User Training and UI/UX Strategy',
    location: 'France // Hybrid',
    role: 'System Coordinator & Designer',
    timeframe: 'EU-Wide Coalition // 2024 – 2026',
    tagline: 'Empowering multicultural advocates through clean interfaces.',
    badge: 'Social Sector Tech',
    description: 'Managed user onboarding and designed clean, highly accessible mobile and desktop interfaces in Figma. Coordinated digital training sessions to onboard international NGO delegates across varied technical fluencies.',
    achievements: [
      'Designed responsive, elegant layout designs in Figma with interactive walkthrough blueprints',
      'Trained and onboarded non-technical volunteers on complex contact and newsletter management setups',
      'Successfully mapped delegate permission boundaries into system configuration guides'
    ],
    tech: ['Figma UI/UX Design', 'Stakeholder Training Guides', 'Digital Onboarding', 'Information Architecture'],
    colorTheme: 'violet',
    stat: '100%',
    statLabel: 'Volunteer User Onboarding',
  },
  {
    id: 'local-based-erp',
    title: 'Cross-Sector Local ERP Operations',
    subtitle: 'Non-Renewable Energy, Mobile Retail & Agriculture',
    location: 'Myanmar (Local-Based)',
    role: 'Customer Success Engineer',
    timeframe: 'Global Connect Asia // Local Ops',
    tagline: 'Optimized Odoo implementations and maximized local systemic usage.',
    badge: 'Multi-Sector Operations',
    description: 'Acted as a core customer success engineer to deploy and troubleshoot Odoo optimizations for various local sectors, including the non-renewable energy sector, mobile accessories retail, and agricultural machinery trading businesses.',
    achievements: [
      'Spearheaded Odoo optimizations to match domestic accounting standards',
      'Resolved technical complaints and escalated complex issues to development teams',
      'Maximized overall system usage via direct, hands-on user training programs'
    ],
    tech: ['Odoo Optimization', 'Helpdesk Support', 'User Training', 'Incident Triage'],
    colorTheme: 'orange',
    stat: '100%',
    statLabel: 'Local System Optimization',
  }
];

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  // GSAP animations on mount
  useEffect(() => {
    // -------------------------------------------------------------
    // Canvas Background Animation
    // -------------------------------------------------------------
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      let animationFrameId: number;
      let width = (canvas.width = window.innerWidth);
      let height = (canvas.height = window.innerHeight);

      const handleResize = () => {
        if (canvas) {
          width = canvas.width = window.innerWidth;
          height = canvas.height = window.innerHeight;
        }
      };
      window.addEventListener('resize', handleResize);

      // Particle generator
      const particles: Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
        radius: number;
        color: string;
      }> = [];

      for (let i = 0; i < 45; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1,
          color: Math.random() > 0.5 ? 'rgba(26, 26, 26, 0.08)' : 'rgba(139, 92, 246, 0.12)'
        });
      }

      let mouseX = 0;
      let mouseY = 0;
      const handleMouseMove = (e: MouseEvent) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      };
      window.addEventListener('mousemove', handleMouseMove);

      const draw = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, width, height);

        // Grid lines background (sleek designer grid layout)
        ctx.strokeStyle = 'rgba(26, 26, 26, 0.025)';
        ctx.lineWidth = 1;
        const gridSize = 80;
        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }

        // Draw and update particles
        particles.forEach((p, idx) => {
          p.x += p.vx;
          p.y += p.vy;

          // Wrap boundaries
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Gentle gravity attraction towards mouse
          if (mouseX > 0 && mouseY > 0) {
            const dx = mouseX - p.x;
            const dy = mouseY - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 280) {
              p.x += (dx / dist) * 0.15;
              p.y += (dy / dist) * 0.15;
            }
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();

          // Connect adjacent particles
          for (let j = idx + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 180) {
              ctx.strokeStyle = `rgba(26, 26, 26, ${0.04 * (1 - dist / 180)})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        });

        // Ambient interactive glowing aura near mouse
        if (mouseX > 0 && mouseY > 0) {
          const auraRad = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 300);
          auraRad.addColorStop(0, 'rgba(139, 92, 246, 0.015)');
          auraRad.addColorStop(0.5, 'rgba(26, 26, 26, 0.005)');
          auraRad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = auraRad;
          ctx.beginPath();
          ctx.arc(mouseX, mouseY, 300, 0, Math.PI * 2);
          ctx.fill();
        }

        animationFrameId = requestAnimationFrame(draw);
      };

      draw();

      // Clean up canvas logic
      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  useEffect(() => {
    // GSAP context scope for reliable React cleanups
    const ctx = gsap.context(() => {
      // -------------------------------------------------------------
      // Hero Title Text Reveal Split-Fade Animation
      // -------------------------------------------------------------
      const textBlock = heroTextRef.current;
      if (textBlock) {
        const words = textBlock.querySelectorAll('.reveal-word');
        const subtitle = containerRef.current?.querySelectorAll('.reveal-sub');
        const badgeObj = containerRef.current?.querySelectorAll('.reveal-badge');

        const tl = gsap.timeline();

        // Reveal badges first
        tl.fromTo(badgeObj, 
          { opacity: 0, y: -20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
        );

        // Sequence reveal words
        tl.fromTo(words,
          { opacity: 0, y: 40, rotateX: -15 },
          { opacity: 1, y: 0, rotateX: 0, duration: 1.2, stagger: 0.08, ease: 'power4.out' },
          '-=0.5'
        );

        // Reveal subtitle and meta details
        tl.fromTo(subtitle,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.0, stagger: 0.15, ease: 'power3.out' },
          '-=0.7'
        );
      }

      // -------------------------------------------------------------
      // Global Project Timeline - Horizontal GSAP ScrollTrigger
      // -------------------------------------------------------------
      const horizontalSection = horizontalSectionRef.current;
      const scrollTriggerObj = triggerRef.current;

      if (horizontalSection && scrollTriggerObj) {
        // Calculate dynamic scroll distance
        const getScrollAmount = () => {
          let sectionWidth = horizontalSection.scrollWidth;
          return sectionWidth - window.innerWidth;
        };

        const horizontalTween = gsap.to(horizontalSection, {
          x: () => -getScrollAmount(),
          ease: 'none',
          scrollTrigger: {
            trigger: scrollTriggerObj,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${getScrollAmount()}`,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          }
        });

        // Parallax background layer
        gsap.to('.parallax-bg', {
          x: () => -(getScrollAmount() * 0.4),
          ease: 'none',
          scrollTrigger: {
            trigger: scrollTriggerObj,
            scrub: 1,
            start: 'top top',
            end: () => `+=${getScrollAmount()}`,
            invalidateOnRefresh: true,
          }
        });

        // Add index dynamic active card highlights
        PROJECTS_DATA.forEach((proj) => {
          gsap.fromTo(`#project-card-${proj.id}`,
            { y: 60, opacity: 0.7 },
            {
              y: 0,
              opacity: 1,
              scrollTrigger: {
                trigger: `#project-card-${proj.id}`,
                containerAnimation: horizontalTween,
                start: 'left right-=100',
                end: 'center center',
                scrub: true,
              }
            }
          );
        });
      }

      // -------------------------------------------------------------
      // Experience Cards Floating Animations
      // -------------------------------------------------------------
      gsap.fromTo('.magnetic-card-parent',
        { opacity: 0.8, y: 15 },
        {
          opacity: 1,
          y: -10,
          duration: 3,
          repeat: -1,
          yoyo: true,
          stagger: 0.25,
          ease: "sine.inOut"
        }
      );

              {/* Education Animation */}
              const eduItems = containerRef.current?.querySelectorAll('.edu-animate');
              if (eduItems && eduItems.length > 0) {
                gsap.fromTo(eduItems,
                  { opacity: 0, y: 30 },
                  {
                    opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: {
                      trigger: '#education',
                      start: 'top bottom-=100',
                      toggleActions: 'play none none reverse'
                    }
                  }
                );
              }

              const softSkills = containerRef.current?.querySelectorAll('.soft-skill-animate');
              if (softSkills && softSkills.length > 0) {
                gsap.fromTo(softSkills,
                  { opacity: 0, y: 20 },
                  {
                    opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: 'power2.out',
                    scrollTrigger: {
                      trigger: '#education',
                      start: 'top bottom-=100',
                      toggleActions: 'play none none reverse'
                    }
                  }
                );
              }

    }, containerRef);

    return () => ctx.revert(); // perfectly kill all memory leaks and active ScrollTriggers on re-render!
  }, []);

  // -------------------------------------------------------------
  // Magnetic Card Interaction (Standard JS coordinate tracker)
  // -------------------------------------------------------------
  const handleMagneticMove = (e: React.MouseEvent<HTMLDivElement>, color: string) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    // Exact client offset within the card bounds
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate normalized relative pull centered on (0, 0)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const px = (x - centerX) / centerX; // ranges from -1.0 to 1.0
    const py = (y - centerY) / centerY; // ranges from -1.0 to 1.0

    // Magnetic visual displacement factor
    const magnetX = px * 14; 
    const magnetY = py * 14; 

    // Apply micro-motions via standard state attributes or inline CSS variables for top rendering speed
    card.style.transform = `translate3d(${magnetX}px, ${magnetY}px, 0) scale3d(1.02, 1.02, 1.02)`;
    card.style.setProperty('--glow-x', `${x}px`);
    card.style.setProperty('--glow-y', `${y}px`);
    card.style.setProperty('--glow-opacity', '1');
    card.style.borderColor = color === 'orange' ? '#F97316' : '#8B5CF6';
    card.style.boxShadow = color === 'orange' 
      ? '0 10px 30px -10px rgba(249, 115, 22, 0.25)' 
      : '0 10px 30px -10px rgba(139, 92, 246, 0.25)';
  };

  const handleMagneticLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `translate3d(0px, 0px, 0) scale3d(1, 1, 1)`;
    card.style.setProperty('--glow-opacity', '0');
    card.style.borderColor = 'rgba(51, 65, 85, 0.5)';
    card.style.boxShadow = 'none';
  };

  return (
    <div id="portfolio-container" ref={containerRef} className="relative min-h-screen bg-[#f8f7f2] text-[#1a1a1a] overflow-hidden antialiased">
      
      {/* 
        -----------------------------------------------------------------------------
        BACKGROUND VISUAL GRAPH - INTERACTIVE CANVAS & GLOW ELEMENTS
        -----------------------------------------------------------------------------
        Below sits the high-performance HTML5 background canvas overlayed with gradients.
        
        PLACEHOLDER COMMENT FOR 3D CANVAS ENGINES (Three.js / Spline):
        =============================================================================
        If integrating Spline or Three.js in the future:
        1. Replace the <canvas ref={canvasRef} /> below with a 3D canvas viewport container:
           e.g. <div id="spline-3d-anchor" className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none" />
        2. Load Spline Application runtime:
           import { Application } from '@splinetool/runtime';
           const spline = new Application(canvasElement);
           spline.load('https://prod.spline.design/your-scene-id/scene.splinecode');
        =============================================================================
      */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
        
        {/* Soft elegant editorial gradients */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-[#1a1a1a]/3 to-transparent blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-gradient-to-tr from-[#8B5CF6]/5 to-transparent blur-[160px]" />
      </div>

      {/* Modern floating top bar for immersive brand context */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 md:px-12 flex justify-between items-center backdrop-blur-md bg-[#f8f7f2]/70 border-b border-[#1a1a1a]/10">
        <div id="brand-signature" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-[#1a1a1a] flex items-center justify-center text-[#f8f7f2] font-display font-bold text-xs select-none">
            BB
          </div>
          <div className="flex flex-col">
            <span className="font-display font-semibold tracking-wider text-sm text-[#1a1a1a]">BO BO</span>
            <span className="text-[10px] text-zinc-500 tracking-widest uppercase">Odoo ERP // Business Analyst</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-8 font-display text-xs tracking-wider uppercase text-zinc-500">
            <a href="#about" className="hover:text-black transition-colors hover:border-b hover:border-black font-semibold">Coordinates</a>
            <a href="#toolkit" className="hover:text-black transition-colors hover:border-b hover:border-black font-semibold">Toolkit</a>
            <a href="#projects" className="hover:text-black transition-colors hover:border-b hover:border-black font-semibold">Timeline</a>
            <a href="#contact" className="hover:text-black transition-colors hover:border-b hover:border-black font-semibold">Contact & Links</a>
          </div>

          <a 
            href="#contact"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1a1a1a]/20 bg-white/50 hover:border-[#1a1a1a] text-xs font-display tracking-wide uppercase text-black transition-all shadow-sm"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
            Active Grid
          </a>
        </div>
      </header>

      {/* 
        -----------------------------------------------------------------------------
        HERO SECTION: TYPOGRAPHY MAJESTY & REVEALS
        -----------------------------------------------------------------------------
      */}
      <section id="about" className="relative h-screen min-h-[750px] flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-20 z-10 select-none">
        
        {/* Left Vertical Tag */}
        <div className="absolute left-6 md:left-12 lg:left-14 top-1/2 -translate-y-1/2 hidden xl:block pointer-events-none">
          <div className="writing-vertical text-[10px] uppercase font-bold tracking-[0.5em] text-[#1a1a1a]/40 whitespace-nowrap">
            ESTABLISHED / MMXXIV — ISSUE NO. 01
          </div>
        </div>

        {/* Elegant top metadata */}
        <div className="flex items-center gap-2 mb-6 reveal-badge opacity-0 lg:pl-12">
          <div className="h-[1px] w-8 bg-[#F97316]" />
          <span className="text-xs uppercase tracking-[0.3em] text-[#F97316] font-mono font-bold">
            ERP Implementation & Business Analysis
          </span>
        </div>

        {/* Huge Split Headline for GSAP Reveal */}
        <h1 
          ref={heroTextRef} 
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tighter leading-[0.95] text-[#1a1a1a] max-w-5xl lg:pl-12"
        >
          {`COORDINATING SEAMLESS ODOO ERP SUCCESS`.split(" ").map((word, i) => (
            <span 
              key={i} 
              className="reveal-word inline-block mr-3 md:mr-5 transform-gpu origin-bottom text-[#1a1a1a]"
            >
              {word}
            </span>
          ))}
        </h1>

        {/* Secondary Title Highlight */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl reveal-sub opacity-0 lg:pl-12">
          <p className="lg:col-span-6 text-base sm:text-lg md:text-xl text-zinc-700 font-light leading-relaxed font-sans">
            A professional synthesis of <strong className="font-semibold text-black">Odoo ERP project management</strong>, systematic <strong className="font-semibold text-black">business process mapping</strong>, and targeted <strong className="font-semibold text-[#8B5CF6]">UI/UX design validation</strong>. Connecting client requirements to stable system architecture.
          </p>

          <div className="lg:col-span-[5] lg:col-start-8 flex flex-col justify-center gap-4 border-l-2 border-[#1a1a1a]/20 pl-6 py-2">
            <div className="flex items-center gap-3 text-xs text-zinc-600">
              <MapPin className="w-4 h-4 text-zinc-400" />
              <span className="tracking-wide">Coordinates: Tamwe, Yangon, Myanmar</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-600">
              <Briefcase className="w-4 h-4 text-[#F97316]" />
              <span className="tracking-wide">Active Track: ERP Project Coordinator & BA</span>
            </div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="absolute bottom-10 left-6 md:left-12 lg:left-24 flex items-center gap-3 text-[10px] tracking-widest uppercase text-zinc-500 reveal-sub opacity-0">
          <span>SCROLL FOR TRACK TIMELINE</span>
          <ArrowRight className="w-3.5 h-3.5 text-zinc-500 animate-bounce" />
        </div>

        <div className="absolute bottom-10 right-6 md:right-12 text-[10px] tracking-widest font-mono text-zinc-500 text-right reveal-sub opacity-0">
          <span>PORT_STATUS // LIVE_GRID</span>
        </div>
      </section>

      {/* 
        -----------------------------------------------------------------------------
        SKILLS TOOLKIT: MAGNETIC INTERACTIVE GLOW CARDS
        -----------------------------------------------------------------------------
      */}
      <section id="toolkit" ref={skillsRef} className="py-24 md:py-32 px-6 md:px-12 lg:px-24 border-t border-[#1a1a1a]/10 bg-[#f1f0e8]/50 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-[#8B5CF6]" />
                <span className="text-xs uppercase tracking-widest font-mono text-[#8B5CF6]">TECHNICAL BLUEPRINT</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-[#1a1a1a] tracking-tight">
                An Agile Toolkit.
              </h2>
            </div>
            <p className="text-sm text-zinc-600 max-w-md font-sans leading-relaxed">
              Hover over cards below to test physical magnetic attraction dynamics and immersive accent glow responses designed specifically for system coordinators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* CARD 1: Jira */}
            <div 
              className="group relative rounded-xl border border-[#1a1a1a]/10 bg-white/80 p-6 md:p-8 flex flex-col justify-between h-[300px] transition-all duration-300 overflow-hidden cursor-crosshair ease-elastic select-none shadow-[0_2px_10px_rgba(26,26,26,0.03)] hover:border-[#1a1a1a]/30"
              style={{
                '--glow-opacity': '0',
                '--glow-x': '0px',
                '--glow-y': '0px',
              } as React.CSSProperties}
              onMouseMove={(e) => handleMagneticMove(e, 'orange')}
              onMouseLeave={handleMagneticLeave}
            >
              {/* Internal glow layer */}
              <div 
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 blur-[30px]"
                style={{
                  opacity: 'var(--glow-opacity)',
                  background: 'radial-gradient(circle 120px at var(--glow-x) var(--glow-y), rgba(249, 115, 22, 0.12), transparent 100%)'
                }}
              />
              <div className="z-10">
                <div className="w-10 h-10 rounded-lg bg-[#F97316]/10 flex items-center justify-center mb-6 border border-[#F97316]/20 group-hover:scale-110 transition-transform">
                  <img src="https://cdn.simpleicons.org/jira/0052CC" alt="Jira Logo" className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-display font-medium text-[#1a1a1a] group-hover:text-black mb-2 leading-tight">
                  Jira & Scrum
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                  Agile workflow orchestration, milestone mappings, multi-timezone developer alignment, and direct KPI coordination.
                </p>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-wider text-zinc-500 group-hover:text-[#F97316] transition-colors z-10">
                <span>01 // governance.sys</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>

            {/* CARD 2: Figma */}
            <div 
              className="group relative rounded-xl border border-[#1a1a1a]/10 bg-white/80 p-6 md:p-8 flex flex-col justify-between h-[300px] transition-all duration-300 overflow-hidden cursor-crosshair ease-elastic select-none shadow-[0_2px_10px_rgba(26,26,26,0.03)] hover:border-[#1a1a1a]/30"
              style={{
                '--glow-opacity': '0',
                '--glow-x': '0px',
                '--glow-y': '0px',
              } as React.CSSProperties}
              onMouseMove={(e) => handleMagneticMove(e, 'violet')}
              onMouseLeave={handleMagneticLeave}
            >
              <div 
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 blur-[30px]"
                style={{
                  opacity: 'var(--glow-opacity)',
                  background: 'radial-gradient(circle 120px at var(--glow-x) var(--glow-y), rgba(139, 92, 246, 0.12), transparent 100%)'
                }}
              />
              <div className="z-10">
                <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center mb-6 border border-[#8B5CF6]/20 group-hover:scale-110 transition-transform">
                  <img src="https://cdn.simpleicons.org/figma/F24E1E" alt="Figma Logo" className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-display font-medium text-[#1a1a1a] group-hover:text-black mb-2 leading-tight">
                  Figma UI/UX
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                  Figma wireframing, high-fidelity UI/UX design research, component design systems, and visual validation mappings.
                </p>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-wider text-zinc-500 group-hover:text-[#8B5CF6] transition-colors z-10">
                <span>02 // blueprint.fig</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>

            {/* CARD 3: Odoo ERP */}
            <div 
              className="group relative rounded-xl border border-[#1a1a1a]/10 bg-white/80 p-6 md:p-8 flex flex-col justify-between h-[300px] transition-all duration-300 overflow-hidden cursor-crosshair ease-elastic select-none shadow-[0_2px_10px_rgba(26,26,26,0.03)] hover:border-[#1a1a1a]/30"
              style={{
                '--glow-opacity': '0',
                '--glow-x': '0px',
                '--glow-y': '0px',
              } as React.CSSProperties}
              onMouseMove={(e) => handleMagneticMove(e, 'orange')}
              onMouseLeave={handleMagneticLeave}
            >
              <div 
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 blur-[30px]"
                style={{
                  opacity: 'var(--glow-opacity)',
                  background: 'radial-gradient(circle 120px at var(--glow-x) var(--glow-y), rgba(249, 115, 22, 0.12), transparent 100%)'
                }}
              />
              <div className="z-10">
                <div className="w-10 h-10 rounded-lg bg-[#F97316]/10 flex items-center justify-center mb-6 border border-[#F97316]/20 group-hover:scale-110 transition-transform">
                  <img src="https://cdn.simpleicons.org/odoo/714B67" alt="Odoo Logo" className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-display font-medium text-[#1a1a1a] group-hover:text-black mb-2 leading-tight">
                  Odoo ERP
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                  Configuring POS systems, custom module structures, third-party integrations (SFTP / gateways), and post-go-live helpdesk support.
                </p>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-wider text-zinc-500 group-hover:text-[#F97316] transition-colors z-10">
                <span>03 // database.orl</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>

            {/* CARD 4: AI Prototyping */}
            <div 
              className="group relative rounded-xl border border-[#1a1a1a]/10 bg-white/80 p-6 md:p-8 flex flex-col justify-between h-[300px] transition-all duration-300 overflow-hidden cursor-crosshair ease-elastic select-none shadow-[0_2px_10px_rgba(26,26,26,0.03)] hover:border-[#1a1a1a]/30"
              style={{
                '--glow-opacity': '0',
                '--glow-x': '0px',
                '--glow-y': '0px',
              } as React.CSSProperties}
              onMouseMove={(e) => handleMagneticMove(e, 'violet')}
              onMouseLeave={handleMagneticLeave}
            >
              <div 
                className="absolute inset-0 pointer-events-none transition-opacity duration-300 blur-[30px]"
                style={{
                  opacity: 'var(--glow-opacity)',
                  background: 'radial-gradient(circle 120px at var(--glow-x) var(--glow-y), rgba(139, 92, 246, 0.12), transparent 100%)'
                }}
              />
              <div className="z-10">
                <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center mb-6 border border-[#8B5CF6]/20 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-5 h-5 text-[#8B5CF6]" />
                </div>
                <h3 className="text-2xl font-display font-medium text-[#1a1a1a] group-hover:text-black mb-2 leading-tight">
                  AI-Driven Prototyping
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed font-sans mt-2">
                  As a PM professional, I accelerate conceptual stages by prototyping robust business logic and UI/UX flows utilizing advanced AI accelerators like <strong className="text-zinc-800 font-semibold">Google AI Studio</strong>, <strong className="text-zinc-800 font-semibold">Cursor</strong>, and <strong className="text-zinc-800 font-semibold">GitHub Copilot</strong>.
                </p>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-wider text-zinc-500 group-hover:text-[#8B5CF6] transition-colors z-10">
                <span>04 // ai.accelerate</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 
        -----------------------------------------------------------------------------
        GLOBAL PROJECT TIMELINE SECTION: PINNING HORIZONTAL TIMELINE
        -----------------------------------------------------------------------------
      */}
      <div id="projects" ref={triggerRef} className="relative z-20">
        
        {/* Horizontal Pin Wrapper */}
        <section className="h-screen w-full flex items-center overflow-hidden bg-[#f1f0e8] relative border-t border-b border-[#1a1a1a]/10">
          
          {/* Parallax Background Layers */}
          <div className="parallax-bg absolute w-[300vw] h-full inset-0 pointer-events-none opacity-[0.15]">
            <div className="absolute top-[10%] left-[20vw] w-64 h-64 rounded-full border border-[#1a1a1a]" />
            <div className="absolute top-[60%] left-[80vw] w-96 h-96 rounded-full border border-[#1a1a1a]" />
            <div className="absolute top-[20%] left-[140vw] w-[40rem] h-[40rem] rounded-full border border-[#F97316] bg-[#F97316]/5" />
            <div className="absolute top-[30%] left-[220vw] w-72 h-72 rounded-full border border-[#1a1a1a]" />
            <div className="absolute top-[70%] left-[280vw] w-[30rem] h-[30rem] rounded-full border border-[#8B5CF6] bg-[#8B5CF6]/5" />
            <div className="absolute top-[15%] left-[340vw] w-[25rem] h-[25rem] rounded-full border border-[#1a1a1a]" />
          </div>

          {/* Static Title Header inside pinned area */}
          <div className="absolute top-10 left-6 md:left-12 lg:left-24 z-30 select-none">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#F97316] uppercase block mb-1">
              Active Project Timeline
            </span>
            <h2 className="text-xl md:text-3xl font-display font-bold text-black tracking-tight flex items-center gap-3">
              Global Missions
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            </h2>
          </div>

          {/* Indicator helper */}
          <div className="absolute bottom-8 right-6 md:right-12 lg:right-24 z-30 hidden md:block">
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-md border border-[#1a1a1a]/10 px-4 py-2 rounded-lg text-xs text-zinc-600 font-mono shadow-sm">
              <Compass className="w-4 h-4 text-[#8B5CF6] animate-spin" style={{ animationDuration: '6s' }} />
              <span>Scroll down to slide horizontal grid</span>
            </div>
          </div>

          {/* This container will be translated leftwards dynamically */}
          <div 
            ref={horizontalSectionRef} 
            className="flex flex-row flex-nowrap items-center h-full pl-6 md:pl-12 lg:pl-24 gap-8 md:gap-12 lg:gap-24 w-max pr-[20vw]"
          >
            {[
              {
                country: "Singapore & Italy",
                projects: PROJECTS_DATA.filter(p => p.location.includes("Singapore"))
              },
              {
                country: "Malaysia",
                projects: PROJECTS_DATA.filter(p => p.location.includes("Malaysia"))
              },
              {
                country: "France",
                projects: PROJECTS_DATA.filter(p => p.location.includes("France"))
              },
              {
                country: "Myanmar",
                projects: PROJECTS_DATA.filter(p => p.location.includes("Myanmar"))
              }
            ].map((group) => (
              <React.Fragment key={group.country}>
                {/* Country Heading Card */}
                <div className="w-[70vw] md:w-[35vw] lg:w-[25vw] max-w-[400px] flex-shrink-0 flex flex-col justify-center gap-4 pl-0 md:pl-12">
                  <MapPin className="w-8 h-8 text-[#8B5CF6]" />
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-[#1a1a1a] tracking-tight">{group.country}<br />Operations</h3>
                  <div className="h-1 w-12 bg-[#F97316] rounded-full mt-2" />
                </div>
                
                {/* Projects for this country */}
                {group.projects.map((proj) => (
                  <div 
                    key={proj.id}
                    id={`project-card-${proj.id}`}
                    className="w-[85vw] md:w-[68vw] lg:w-[60vw] max-w-[850px] flex-shrink-0 flex flex-col h-auto max-h-[85vh] bg-[#fafaf8] backdrop-blur-md rounded-2xl border border-[#1a1a1a]/15 p-5 md:p-10 relative overflow-y-auto overflow-x-hidden transition-all duration-300 shadow-[0_4px_24px_rgba(26,26,26,0.03)] [&::-webkit-scrollbar]:hidden"
                    style={{ scrollbarWidth: 'none' }}
                  >
                    {/* Visual subtle glow corresponding to theme */}
                    <div 
                      className={`absolute -top-1/4 -right-1/4 w-[350px] h-[350px] rounded-full blur-[100px] pointer-events-none opacity-10
                        ${proj.colorTheme === 'orange' ? 'bg-[#F97316]' : 'bg-[#8B5CF6]'}
                      `}
                    />

                    {/* Grid header details */}
                    <div className="flex flex-wrap justify-between items-start gap-4 mb-6 md:mb-8 border-b border-black/10 pb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2 font-mono text-[10px] tracking-wider text-zinc-500">
                          <span>{proj.location}</span>
                          <span>•</span>
                          <span className="text-zinc-650 font-sans">{proj.timeframe}</span>
                        </div>
                        <h3 className="text-2xl md:text-4xl font-display font-extrabold text-zinc-900 tracking-tight leading-tight">
                          {proj.title}
                        </h3>
                        <p className="text-xs md:text-sm font-medium text-zinc-600 uppercase tracking-wider mt-1 font-sans">
                          {proj.subtitle}
                        </p>
                      </div>

                      <span className={`inline-block px-3 py-1 rounded-sm text-[10px] font-mono tracking-widest uppercase border
                        ${proj.colorTheme === 'orange' 
                          ? 'bg-[#F97316]/5 border-[#F97316]/30 text-[#F97316]' 
                          : 'bg-[#8B5CF6]/5 border-[#8B5CF6]/30 text-[#8B5CF6]'
                        }
                      `}>
                        {proj.badge}
                      </span>
                    </div>

                    {/* Project content split */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center lg:items-start grow">
                      
                      {/* Left Column Description */}
                      <div className="lg:col-span-7 flex flex-col justify-between h-full">
                        <div>
                          {/* Active coordinator role stamp */}
                          <div className="flex items-center gap-2 mb-3 bg-zinc-150/80 border border-black/5 px-2 md:px-3 py-1.5 rounded w-fit">
                            <Zap className={`w-3.5 h-3.5 ${proj.colorTheme === 'orange' ? 'text-[#F97316]' : 'text-[#8B5CF6]'}`} />
                            <span className="text-[9px] md:text-[10px] font-mono tracking-wider uppercase text-zinc-700 font-bold">
                              Role: {proj.role}
                            </span>
                          </div>

                          <p className="text-sm md:text-base text-zinc-700 font-light leading-relaxed mb-4">
                            {proj.description}
                          </p>

                          <div className="space-y-2 mt-4">
                            {proj.achievements.map((ach, i) => (
                              <div key={i} className="flex items-start gap-2 text-xs text-zinc-650">
                                <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 min-w-[14px] md:min-w-[16px] ${proj.colorTheme === 'orange' ? 'text-[#F97316]' : 'text-[#8B5CF6]'}`} />
                                <span className="text-[11px] md:text-xs leading-snug lg:leading-normal">{ach}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right Column Stats & Tech Stack tags */}
                      <div className="lg:col-span-5 flex flex-col justify-between h-full border-t lg:border-t-0 lg:border-l border-black/10 pt-4 lg:pt-0 lg:pl-8 mt-2 lg:mt-0">
                        
                        {/* Unique Highlight metric */}
                        <div className="mb-6 bg-[#f8f7f2] rounded-xl p-4 border border-[#1a1a1a]/10">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
                            KEY DELIVERABLE METRIC
                          </span>
                          <div className="flex items-baseline gap-2">
                            <span className={`text-3xl md:text-4xl font-display font-extrabold tracking-tight ${proj.colorTheme === 'orange' ? 'text-[#F97316]' : 'text-[#8B5CF6]'}`}>
                              {proj.stat}
                            </span>
                            <span className="text-[#1a1a1a] text-xs font-semibold tracking-wide">
                              {proj.statLabel}
                            </span>
                          </div>
                        </div>

                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[#1a1a1a]/60 block mb-2">
                            STACK COORDINATION
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {proj.tech.map((t, idx_t) => (
                              <span 
                                key={idx_t}
                                className="px-2.5 py-1 bg-white text-zinc-800 rounded text-[10px] border border-black/10 font-mono hover:border-black/30 transition shadow-sm"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                      </div>

                    </div>

                  </div>
                ))}
              </React.Fragment>
            ))}
            {/* Added spacer for the final horizontal stretch */}
            <div className="w-[10vw] md:w-[20vw] flex-shrink-0" />
          </div>

        </section>
      </div>

      {/* 
        -----------------------------------------------------------------------------
        EDUCATION & SOFT SKILLS SECTION
        -----------------------------------------------------------------------------
      */}
      <section id="education" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-white relative z-20 border-b border-[#1a1a1a]/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]" />
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-zinc-500 font-bold">
                Academic & Fundamental Baseline
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-extrabold text-zinc-900 tracking-tight leading-tight mb-8">
              Education.
            </h2>
            <div className="space-y-6">
              <div className="group relative pl-6 border-l-2 border-black/10 hover:border-[#8B5CF6] transition-colors edu-animate">
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full border-2 border-white bg-black group-hover:bg-[#8B5CF6] transition-colors" />
                <span className="text-[10px] font-mono text-zinc-500 font-semibold tracking-wider block mb-1">Oct 2024 – Present</span>
                <h4 className="font-display font-bold text-zinc-900 mb-1 text-lg leading-tight">Bachelor of Arts in Business Management</h4>
                <p className="text-xs text-zinc-600 font-sans leading-relaxed">Yangon University of Economics (Third Year)</p>
              </div>
              <div className="group relative pl-6 border-l-2 border-black/10 hover:border-[#8B5CF6] transition-colors edu-animate">
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full border-2 border-white bg-black group-hover:bg-[#8B5CF6] transition-colors" />
                <span className="text-[10px] font-mono text-zinc-500 font-semibold tracking-wider block mb-1">2024 – 2027</span>
                <h4 className="font-display font-bold text-zinc-900 mb-1 text-lg leading-tight">Diploma In Computing</h4>
                <p className="text-xs text-zinc-600 font-sans leading-relaxed">KBTC School of IT, NCC Education (UK) – BSc (Hons) Business Computing and Information Systems</p>
              </div>
              <div className="group relative pl-6 border-l-2 border-black/10 hover:border-[#8B5CF6] transition-colors edu-animate">
                <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full border-2 border-white bg-black group-hover:bg-[#8B5CF6] transition-colors" />
                <span className="text-[10px] font-mono text-zinc-500 font-semibold tracking-wider block mb-1">Jul 2023 – May 2024</span>
                <h4 className="font-display font-bold text-zinc-900 mb-1 text-lg leading-tight">Diploma in Web Development</h4>
                <p className="text-xs text-zinc-600 font-sans leading-relaxed">KMD Institute (All Distinctions)</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="bg-[#f8f7f2] rounded-2xl border border-[#1a1a1a]/5 p-8 md:p-12 relative overflow-hidden shadow-sm">
               <div className="flex items-center gap-2 border-b border-black/10 pb-4 mb-8">
                 <Zap className="w-5 h-5 text-[#F97316]" />
                 <span className="font-display font-semibold tracking-wider text-zinc-950 text-xl">Soft Skills Matrix</span>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                 <div className="soft-skill-animate">
                   <h5 className="font-sans font-bold text-sm text-zinc-800 mb-2 border-l-2 border-[#8B5CF6] pl-2">Cross-Cultural Comm.</h5>
                   <p className="text-xs text-zinc-600 leading-relaxed pl-2.5">Bridging technical constraints between international teams across Singapore, Myanmar, and Europe.</p>
                 </div>
                 <div className="soft-skill-animate">
                   <h5 className="font-sans font-bold text-sm text-zinc-800 mb-2 border-l-2 border-[#F97316] pl-2">Stakeholder Management</h5>
                   <p className="text-xs text-zinc-600 leading-relaxed pl-2.5">Translating business pain points into executable ERP solutions and user training materials.</p>
                 </div>
                 <div className="soft-skill-animate">
                   <h5 className="font-sans font-bold text-sm text-zinc-800 mb-2 border-l-2 border-[#8B5CF6] pl-2">Agile Adaptability</h5>
                   <p className="text-xs text-zinc-600 leading-relaxed pl-2.5">Navigating shifting requirements and prioritizing essential design/logic tickets within constraints.</p>
                 </div>
                 <div className="soft-skill-animate">
                   <h5 className="font-sans font-bold text-sm text-zinc-800 mb-2 border-l-2 border-[#F97316] pl-2">Analytical Workflows</h5>
                   <p className="text-xs text-zinc-600 leading-relaxed pl-2.5">Conducting root cause analysis on database mismatches and rectifying complex logical debt.</p>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        -----------------------------------------------------------------------------
        CONTACT SECTION
        -----------------------------------------------------------------------------
      */}
      <section id="contact" className="py-24 md:py-32 px-6 md:px-12 lg:px-24 border-t border-[#1a1a1a]/10 bg-[#f8f7f2] relative z-20">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#8B5CF6] font-bold">
              Initiate Contact
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-display font-extrabold text-zinc-900 tracking-tight leading-tight mb-8">
            Ready to Connect.
          </h2>

          <p className="text-sm md:text-base text-zinc-600 font-sans leading-relaxed mb-12 max-w-2xl">
            Whether you need to architect an ERP operational pipeline, resolve technical logistics, or map cross-border business logic, I'm ready to synthesize requirements into stable solutions. Let's start the dialogue.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a 
              href="mailto:bobo@global-connect.asia"
              className="bg-[#1a1a1a] hover:bg-black text-white font-display text-sm font-semibold tracking-wide uppercase px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 w-full sm:w-auto transform hover:-translate-y-0.5"
            >
              <Send className="w-4 h-4" />
              <span>Email Coordination</span>
            </a>
            
            <a 
              href="https://www.linkedin.com/in/bobo"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-zinc-50 text-zinc-800 border border-[#1a1a1a]/20 font-display text-sm font-semibold tracking-wide uppercase px-8 py-4 rounded-full transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-3 w-full sm:w-auto transform hover:-translate-y-0.5"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Connect on LinkedIn</span>
            </a>
          </div>

        </div>
      </section>

      {/* 
        -----------------------------------------------------------------------------
        FOOTER METRICS
        -----------------------------------------------------------------------------
      */}
      <footer className="py-12 border-t border-[#1a1a1a]/10 bg-[#f1f0e8] relative z-20 font-sans">
        <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-center">
          <p className="text-xs text-zinc-500 uppercase tracking-widest font-mono text-center">
            copywrite using google ai studio.
          </p>
        </div>
      </footer>

    </div>
  );
}
