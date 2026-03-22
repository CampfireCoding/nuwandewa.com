/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Gamepad2, 
  Settings, 
  Activity, 
  Hammer, 
  Calculator, 
  Box, 
  Heart, 
  Github,
  Linkedin,
  Mail,
  ChevronRight,
  ChevronDown,
  Download,
  Terminal,
  User,
  Code,
  Briefcase,
  Star,
  ExternalLink,
  X
} from 'lucide-react';
import { portfolioData } from './data';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Components ---

const IconMap: Record<string, React.ElementType> = {
  Trophy,
  Gamepad2,
  Settings,
  Activity,
  Hammer,
  Calculator,
  Box,
  Heart,
};

const SectionHeading = ({ title, subtitle, icon: Icon }: { title: string; subtitle?: string; icon?: React.ElementType }) => (
  <div className="mb-12">
    <div className="flex items-center gap-3 mb-2">
      {Icon && <Icon className="w-6 h-6 text-[#00ff88]" />}
      <h2 className="text-3xl font-display font-bold tracking-tight uppercase">{title}</h2>
    </div>
    {subtitle && <p className="text-zinc-400 font-mono text-sm">{subtitle}</p>}
    <div className="h-px w-24 bg-[#00ff88] mt-4" />
  </div>
);

const SectionDivider = () => <hr className="section-divider" />;

const ProjectCard = ({ project, onClick }: { project: any; onClick: () => void }) => {
  const Icon = IconMap[project.icon] || Code;
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="glass p-6 rounded-2xl group relative overflow-hidden glow-hover transition-all duration-300 flex flex-col h-full cursor-pointer"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon size={80} />
      </div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center mb-4 group-hover:bg-[#00ff88]/20 transition-colors">
          <Icon className="w-6 h-6 text-[#00ff88]" />
        </div>
        <h3 className="text-xl font-display font-bold mb-2">{project.title}</h3>
        <p className="text-zinc-400 text-sm mb-4 line-clamp-3 flex-grow">{project.description}</p>
        
        {project.albumUrl && (
          <a 
            href={project.albumUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#00ff88] text-xs font-mono uppercase tracking-widest mb-4 hover:underline"
          >
            View Full Album <ExternalLink size={14} />
          </a>
        )}

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag: string) => (
            <span key={tag} className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded bg-zinc-800 text-zinc-300">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [blogIndex, setBlogIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('about');
  const [showProjectScrollHint, setShowProjectScrollHint] = useState(false);
  const [showPostScrollHint, setShowPostScrollHint] = useState(false);
  const projectScrollRef = useRef<HTMLDivElement>(null);
  const postScrollRef = useRef<HTMLDivElement>(null);

  const checkProjectScroll = useCallback(() => {
    const el = projectScrollRef.current;
    if (!el) return;
    const hasMore = el.scrollHeight > el.clientHeight + 8;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 8;
    setShowProjectScrollHint(hasMore && !atBottom);
  }, []);

  const checkPostScroll = useCallback(() => {
    const el = postScrollRef.current;
    if (!el) return;
    const hasMore = el.scrollHeight > el.clientHeight + 8;
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 8;
    setShowPostScrollHint(hasMore && !atBottom);
  }, []);

  useEffect(() => {
    if (selectedProject) setTimeout(checkProjectScroll, 50);
    else setShowProjectScrollHint(false);
  }, [selectedProject, checkProjectScroll]);

  useEffect(() => {
    if (selectedPost) setTimeout(checkPostScroll, 50);
    else setShowPostScrollHint(false);
  }, [selectedPost, checkPostScroll]);

  useEffect(() => {
    const sections = ['about', 'projects', 'skills', 'blog', 'contact'];
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-88px 0px -60% 0px', threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const navLink = (href: string, label: string) => {
    const id = href.replace('#', '');
    const isActive = activeSection === id;
    return (
      <a
        href={href}
        className={`relative font-mono text-xs uppercase tracking-widest transition-colors pb-1 ${isActive ? 'text-white' : 'text-zinc-400 hover:text-white'}`}
      >
        {label}
        <span className={`absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-[#00ff88] transition-all duration-300 ${isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} style={{ transformOrigin: 'left' }} />
      </a>
    );
  };

  return (
    <div className="min-h-screen selection:bg-[#00ff88] selection:text-black">
      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12"
          >
            <div 
              className="absolute inset-0 bg-black/90 backdrop-blur-xl" 
              onClick={() => setSelectedProject(null)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative glass max-w-4xl w-full max-h-[80vh] rounded-[40px] flex flex-col overflow-hidden"
            >
              {/* Scroll hint overlay */}
              <AnimatePresence>
                {showProjectScrollHint && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 z-20 flex flex-col items-center justify-end pb-4 rounded-b-[40px]"
                    style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, transparent 100%)' }}
                  >
                    <motion.div
                      animate={{ y: [0, 6, 0] }}
                      transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                      className="flex flex-col items-center gap-1 text-zinc-500"
                    >
                      <span className="text-[10px] font-mono uppercase tracking-widest">scroll for more</span>
                      <ChevronDown size={16} />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Scrollable content */}
              <div
                ref={projectScrollRef}
                className="overflow-y-auto scrollbar-hide p-8 md:p-12"
                onScroll={checkProjectScroll}
              >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-8 right-8 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-30"
              >
                <X size={24} />
              </button>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl bg-[#00ff88]/10 flex items-center justify-center">
                  {React.createElement(IconMap[selectedProject.icon] || Code, { className: "w-8 h-8 text-[#00ff88]" })}
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">
                    {selectedProject.title}
                  </h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedProject.tags.map((tag: string) => (
                      <span key={tag} className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded bg-zinc-800 text-zinc-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {selectedProject.image && (
                <div className="aspect-video rounded-3xl overflow-hidden mb-8 glass">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
              
              <div className="prose prose-invert max-w-none">
                <p className="text-zinc-300 text-lg leading-relaxed mb-8 text-justify">
                  {selectedProject.longDescription || selectedProject.description}
                </p>
              </div>

              {selectedProject.features && (
                <div className="mb-8">
                  {selectedProject.features.map((f: string, i: number) => (
                    <div key={i} className={`flex items-start gap-4 py-4 ${i < selectedProject.features.length - 1 ? 'border-b border-white/10' : ''}`}>
                      <span className="text-[#00ff88] mt-0.5 shrink-0">→</span>
                      <span className="text-zinc-300">{f}</span>
                    </div>
                  ))}
                </div>
              )}

              {selectedProject.documentUrl !== undefined && (
                <a
                  href={selectedProject.documentUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#00ff88] text-[#00ff88] px-8 py-3 rounded-2xl font-bold hover:bg-[#00ff88]/10 transition-colors mb-8"
                >
                  View Project Document
                </a>
              )}

              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-[#00ff88] text-[#00ff88] px-8 py-3 rounded-2xl font-bold hover:bg-[#00ff88]/10 transition-colors mb-8 ml-4"
                >
                  <Github size={18} /> View on GitHub
                </a>
              )}

              {selectedProject.albumUrl && (
                <a 
                  href={selectedProject.albumUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#00ff88] text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform mb-12"
                >
                  View External Album <ExternalLink size={18} />
                </a>
              )}

              {selectedProject.gallery && (
                <div className="mt-12 pt-12 border-t border-white/10">
                  <h3 className="text-xl font-display font-bold mb-6 uppercase tracking-widest text-[#00ff88]">Project Gallery</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedProject.gallery.map((img: string, i: number) => (
                      <div key={i} className="aspect-video rounded-2xl overflow-hidden glass group/img relative">
                        <img
                          src={img}
                          alt={`Gallery image ${i + 1}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover/img:bg-transparent transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Blog Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12"
          >
            <div 
              className="absolute inset-0 bg-black/90 backdrop-blur-xl" 
              onClick={() => setSelectedPost(null)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative glass max-w-4xl w-full max-h-[80vh] rounded-[40px] flex flex-col overflow-hidden"
            >
              {/* Scroll hint overlay */}
              <AnimatePresence>
                {showPostScrollHint && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 z-20 flex flex-col items-center justify-end pb-4 rounded-b-[40px]"
                    style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.95) 0%, transparent 100%)' }}
                  >
                    <motion.div
                      animate={{ y: [0, 6, 0] }}
                      transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                      className="flex flex-col items-center gap-1 text-zinc-500"
                    >
                      <span className="text-[10px] font-mono uppercase tracking-widest">scroll for more</span>
                      <ChevronDown size={16} />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Scrollable content */}
              <div
                ref={postScrollRef}
                className="overflow-y-auto scrollbar-hide p-8 md:p-12"
                onScroll={checkPostScroll}
              >
              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-8 right-8 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-30"
              >
                <X size={24} />
              </button>

              <div className="aspect-video rounded-3xl overflow-hidden mb-8">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="font-mono text-[10px] text-[#00ff88] uppercase tracking-widest mb-4">
                {selectedPost.date}
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight">
                {selectedPost.title}
              </h2>
              <div className="prose prose-invert max-w-none">
                {selectedPost.content.split('\n\n').map((para: string, i: number) => (
                  <p key={i} className="text-zinc-400 text-lg leading-relaxed mb-6 text-justify">
                    {para}
                  </p>
                ))}
              </div>

              {selectedPost.gallery && (
                <div className="mt-12 pt-12 border-t border-white/10">
                  <h3 className="text-xl font-display font-bold mb-6 uppercase tracking-widest text-[#00ff88]">Gallery</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedPost.gallery.map((img: string, i: number) => (
                      <div key={i} className="aspect-video rounded-2xl overflow-hidden glass">
                        <img
                          src={img}
                          alt={`Gallery image ${i + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b-0 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="font-display font-bold text-xl tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-[#00ff88] rounded-lg flex items-center justify-center text-black">
            <Terminal size={18} />
          </div>
          NUWAN.DEWA
        </div>
        <div className="hidden md:flex gap-8">
          {navLink('#about', 'ABOUT')}
          {navLink('#projects', 'PROJECTS')}
          {navLink('#skills', 'SKILLS')}
          {navLink('#blog', 'BLOG')}
          {navLink('#contact', 'CONTACT')}
        </div>
        <div className="flex gap-4">
          <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer">
            <Github size={18} className="text-zinc-400 hover:text-white cursor-pointer" />
          </a>
          <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer">
            <Linkedin size={18} className="text-zinc-400 hover:text-white cursor-pointer" />
          </a>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto space-y-0">

        
        {/* Hero Section */}
        <section id="about">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-3 py-1 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/20 text-[#00ff88] text-xs font-mono uppercase tracking-widest mb-6">
              Available for Collaboration, brainstorming, or casually making friends
            </div>
            <div className="relative w-full rounded-3xl overflow-hidden" style={{ minHeight: '560px' }}>
              {/* Background photo */}
              <img
                src="/Nuwan.JPG"
                alt="Nuwan Dewasurendra"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: 'left center' }}
              />
              {/* Right-side dark panel */}
              <div className="absolute inset-y-0 right-0 w-full md:w-1/2 bg-gradient-to-l from-black via-black/95 to-transparent flex items-center">
                <div className="p-8 md:p-12 ml-auto w-full md:w-[90%]">
                  <h1 className="text-4xl md:text-6xl font-display font-bold leading-[0.9] tracking-tighter mb-6">
                    Building <br /> the <span className="text-[#00ff88]">Future</span>.
                  </h1>
                  <p className="text-zinc-300 text-base md:text-lg mb-8 leading-relaxed text-justify">
                    {portfolioData.about}
                  </p>
                  <div className="flex gap-4 flex-wrap">
                    <a href="#projects" className="bg-[#00ff88] text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform text-sm">
                      View Projects <ChevronRight size={16} />
                    </a>
                    <a href="#blog" className="glass px-6 py-3 rounded-xl font-bold hover:bg-white/5 transition-colors text-sm">
                      Read Blog
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <div className="py-16"><SectionDivider /></div>

        {/* Projects Grid */}
        <section id="projects">
          <SectionHeading
            title="Selected Projects"
            subtitle="A collection of my technical explorations"
            icon={Code}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioData.projects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <ProjectCard 
                  project={project} 
                  onClick={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </div>
        </section>

        <div className="py-16"><SectionDivider /></div>

        {/* Skills & Stats */}
        <section id="skills" className="grid md:grid-cols-2 gap-12">
          <div>
            <SectionHeading 
              title="Technical Skills" 
              subtitle="Proficiency across various domains" 
              icon={Terminal} 
            />
            <div className="grid grid-cols-1 gap-4">
              {portfolioData.skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-3 glass p-4 rounded-xl border border-white/5">
                  <div className="w-2 h-2 rounded-full bg-[#00ff88]" />
                  <span className="font-mono text-sm text-zinc-300">{skill.name}</span>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <SectionHeading 
                title="Education" 
                subtitle="Academic & Specialized Training" 
                icon={User} 
              />
              <div className="space-y-6">
                {portfolioData.education.map((edu, i) => (
                  <div key={i} className="glass p-6 rounded-2xl">
                    <div className="text-[10px] font-mono text-[#00ff88] mb-1">{edu.period}</div>
                    <h4 className="text-lg font-display font-bold">{edu.school}</h4>
                    <p className="text-zinc-400 text-sm mt-2">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <SectionHeading 
              title="Experience" 
              subtitle="Professional & Leadership Journey" 
              icon={Briefcase} 
            />
            <div className="space-y-6">
              {portfolioData.experience.map((exp, i) => (
                <div key={i} className="relative pl-8 border-l border-white/10 pb-8 last:pb-0">
                  <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-[#00ff88] shadow-[0_0_10px_#00ff88]" />
                  <div className="text-[10px] font-mono text-[#00ff88] mb-1">{exp.period}</div>
                  <h4 className="text-xl font-display font-bold">{exp.role}</h4>
                  <div className="text-zinc-500 text-sm mb-2">{exp.organization}</div>
                  <p className="text-zinc-400 text-sm leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-35 flex justify-center">
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 bg-[#00ff88] text-black px-6 py-3 rounded-xl font-bold hover:scale-105 transition-transform text-sm"
              >
                Resume <Download size={16} />
              </a>
            </div>
          </div>
        </section>

        <div className="py-16"><SectionDivider /></div>

        {/* Hobbies Bento */}
        <section className="pb-16">
          <SectionHeading 
            title="Beyond Code" 
            subtitle="Interests & Hobbies" 
            icon={Star} 
          />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {portfolioData.hobbies.map((hobby, i) => {
              const Icon = IconMap[hobby.icon] || Activity;
              return (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="glass p-6 rounded-2xl flex flex-col items-center justify-center gap-3 text-center glow-hover transition-all"
                >
                  <Icon className="w-8 h-8 text-[#00ff88]" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">{hobby.name}</span>
                </motion.div>
              );
            })}
          </div>
        </section>

        <div className="py-16"><SectionDivider /></div>

        {/* Blog Section */}
        <section id="blog">
          <div className="flex items-end justify-between mb-12">
            <SectionHeading
              title="The Builder's Blog"
              subtitle="Thoughts on engineering, mastery, and the wild"
              icon={Terminal}
            />
            <div className="flex gap-3 mb-1 shrink-0">
              <button
                onClick={() => setBlogIndex(i => Math.max(0, i - 1))}
                disabled={blogIndex === 0}
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight size={18} className="rotate-180" />
              </button>
              <button
                onClick={() => setBlogIndex(i => Math.min(portfolioData.blogPosts.length - 3, i + 1))}
                disabled={blogIndex >= portfolioData.blogPosts.length - 3}
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="overflow-hidden">
            <motion.div
              className="flex gap-8"
              animate={{ x: `calc(-${blogIndex * (100 / 3)}% - ${blogIndex * 32 / 3}px)` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {portfolioData.blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="glass rounded-3xl overflow-hidden flex flex-col glow-hover transition-all cursor-pointer shrink-0 w-full md:w-[calc(33.333%-22px)]"
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-mono text-[#00ff88] uppercase tracking-widest">
                      {post.date}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-display font-bold mb-3 leading-tight">{post.title}</h3>
                    <p className="text-zinc-400 text-sm mb-6 line-clamp-3">{post.excerpt}</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedPost(post); }}
                      className="mt-auto text-[#00ff88] font-mono text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all"
                    >
                      Read Full Post <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: portfolioData.blogPosts.length - 2 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setBlogIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${blogIndex === i ? 'w-6 bg-[#00ff88]' : 'w-1.5 bg-zinc-600'}`}
              />
            ))}
          </div>
        </section>

      </main>

      <footer id="contact" className="py-20 px-6 border-t border-white/5 text-center space-y-8">
        <div className="flex justify-center gap-12">
          <a href={`mailto:${portfolioData.contact.emailUser}${'@'}${portfolioData.contact.emailDomain}`} className="text-zinc-400 hover:text-[#00ff88] transition-colors flex items-center gap-2">
            <Mail size={20} /> <span className="hidden md:inline font-mono text-sm">{portfolioData.contact.emailUser}{'@'}{portfolioData.contact.emailDomain}</span>
          </a>
          <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#00ff88] transition-colors flex items-center gap-2">
            <Github size={20} /> <span className="hidden md:inline font-mono text-sm">GitHub</span>
          </a>
          <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[#00ff88] transition-colors flex items-center gap-2">
            <Linkedin size={20} /> <span className="hidden md:inline font-mono text-sm">LinkedIn</span>
          </a>
        </div>
        <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-[0.2em]">
          Designed & Built by Nuwan Dewasurendra © 2026
        </p>
      </footer>
    </div>
  );
}
