import { SKILLS } from "../data/skills";
import { PROJECTS } from "../data/projects";
import { SIDE_PROJECTS } from "../data/side-projects";
import { allDataType } from "../data/types";

export function getPortfolioData(): allDataType {
  // Transform skills data to match expected format
  const skills = SKILLS.map((skill) => ({
    image: skill.icon, // Map icon to image field
    title: skill.name,
  }));

  // Transform projects data to match expected format
  const projects = PROJECTS.map((project, index) => ({
    id: `project-${index + 1}`,
    title: project.title,
    description: project.description,
    demo: project.demo,
    github: project.github,
    technologies: project.technologies,
    image: {
      url: project.image,
    },
  }));

  // Transform side projects data to match expected format
  const smallProjects = SIDE_PROJECTS.map((project, index) => ({
    id: `small-project-${index + 1}`,
    title: project.title,
    description: project.description,
    link: project.link,
    icon: {
      url: project.icon,
    },
  }));

  return {
    skills,
    projects,
    smallProjects,
  };
}
