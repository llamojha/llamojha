
import React, { FC } from 'react';
import { AnimatedSection } from './AnimatedSection';
import { ExternalLinkIcon, GithubIcon } from './Icons';

export const PortfolioPage: FC = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack serverless e-commerce website built on AWS, featuring product catalogs, user authentication, and a payment gateway.',
      imageUrl: 'https://placehold.co/600x400/030712/fcd34d?text=E-Commerce',
      tags: ['React', 'AWS Lambda', 'DynamoDB', 'Serverless', 'Stripe'],
      liveUrl: '#',
      repoUrl: '#',
    },
    {
      title: 'Observability Dashboard',
      description: 'A real-time monitoring dashboard for cloud applications, providing insights into performance metrics, logs, and traces.',
      imageUrl: 'https://placehold.co/600x400/030712/fcd34d?text=Dashboard',
      tags: ['TypeScript', 'New Relic', 'GraphQL', 'ECS Fargate', 'Terraform'],
      liveUrl: '#',
      repoUrl: '#',
    },
    {
      title: 'AI-Powered Chatbot',
      description: 'A customer service chatbot prototype using AWS Bedrock to provide intelligent, context-aware responses to user queries.',
      imageUrl: 'https://placehold.co/600x400/030712/fcd34d?text=AI+Chatbot',
      tags: ['GenAI', 'AWS Bedrock', 'Python', 'React', 'WebSocket'],
      liveUrl: '#',
      repoUrl: '#',
    }
  ];

  return (
    <AnimatedSection id="projects" stagger>
      <div className="pt-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Project Showcase</h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
          A selection of projects I've built, showcasing my skills in web development, cloud architecture, and DevOps.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
        {projects.map((project, index) => (
          <div key={index} className="bg-gray-900 border border-gray-800 rounded-xl transition-all duration-300 hover:border-amber-400/50 hover:-translate-y-2 hover:shadow-[0_0_25px_rgba(252,211,77,0.15)] flex flex-col">
            <div className="relative overflow-hidden aspect-video rounded-t-xl group">
                <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span key={tag} className="bg-amber-400/10 text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
                ))}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed flex-grow mb-6">{project.description}</p>
              <div className="mt-auto flex items-center space-x-6 text-sm">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-300 hover:text-amber-300 transition-colors group">
                  <ExternalLinkIcon className="w-4 h-4" />
                  <span>Live Demo</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-gray-300 hover:text-amber-300 transition-colors group">
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-300 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AnimatedSection>
  );
};
