"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink, Folder, Star } from "lucide-react";
import { projects } from "@/lib/data";
import { useState, useEffect } from "react";

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  stargazers_count: number;
  language: string;
}

export default function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const [githubRepos, setGithubRepos] = useState<GitHubRepo[]>([]);
  const categories = ["All", "Research", "Machine Learning", "Computer Vision", "Robotics", "Generative AI"];

  useEffect(() => {
    fetchGitHubRepos();
  }, []);

  const fetchGitHubRepos = async () => {
    try {
      const response = await fetch("https://api.github.com/users/Iammohithhh/repos?sort=updated&per_page=6");
      if (response.ok) {
        const data = await response.json();
        setGithubRepos(data);
      }
    } catch (error) {
      console.error("Error fetching GitHub repos:", error);
    }
  };

  const filteredProjects = filter === "All"
    ? projects
    : projects.filter(project => project.category === filter);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-600 to-neon-cyan mx-auto mb-8" />
          <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
            A showcase of my research work, machine learning projects, and innovative solutions
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                filter === category
                  ? "bg-primary-600 text-white glow-purple"
                  : "glass-effect text-gray-400 hover:text-white hover:bg-gray-800/50"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {/* GitHub Repos Section */}
        {githubRepos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-center mb-8">
              Recent <span className="text-gradient">GitHub</span> Activity
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {githubRepos.slice(0, 6).map((repo, index) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GitHubRepoCard repo={repo} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-effect p-6 rounded-xl h-full flex flex-col hover:bg-gray-800/40 transition-all duration-300 group relative overflow-hidden"
    >
      {/* Gradient Border Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/20 to-neon-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-primary-600/20 rounded-lg group-hover:bg-primary-600/30 transition-colors">
            <Folder className="w-6 h-6 text-primary-400" />
          </div>
          {project.featured && (
            <span className="px-3 py-1 bg-neon-cyan/20 text-neon-cyan text-xs font-semibold rounded-full">
              Featured
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
          {project.title}
        </h3>

        <p className="text-gray-400 text-sm mb-4 leading-relaxed flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.slice(0, 3).map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-gray-800/50 text-primary-300 text-xs rounded-full"
            >
              {tech}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="px-3 py-1 bg-gray-800/50 text-gray-400 text-xs rounded-full">
              +{project.tech.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">{project.date}</span>
          <span className="px-3 py-1 bg-primary-600/20 text-primary-300 text-xs rounded-full">
            {project.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function GitHubRepoCard({ repo }: { repo: GitHubRepo }) {
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -5 }}
      className="glass-effect p-6 rounded-xl h-full flex flex-col hover:bg-gray-800/40 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-gray-800/50 rounded-lg group-hover:bg-primary-600/20 transition-colors">
          <Github className="w-6 h-6 text-gray-400 group-hover:text-primary-400 transition-colors" />
        </div>
        <div className="flex items-center gap-2">
          {repo.stargazers_count > 0 && (
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <Star className="w-4 h-4" />
              <span>{repo.stargazers_count}</span>
            </div>
          )}
          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-primary-400 transition-colors" />
        </div>
      </div>

      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">
        {repo.name}
      </h3>

      <p className="text-gray-400 text-sm mb-4 flex-1">
        {repo.description || "No description available"}
      </p>

      <div className="flex flex-wrap gap-2">
        {repo.language && (
          <span className="px-3 py-1 bg-gray-800/50 text-neon-cyan text-xs rounded-full">
            {repo.language}
          </span>
        )}
        {repo.topics.slice(0, 2).map((topic, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-gray-800/50 text-gray-400 text-xs rounded-full"
          >
            {topic}
          </span>
        ))}
      </div>
    </motion.a>
  );
}
