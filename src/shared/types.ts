export interface allDataType {
  skills: {
    image: string;
    title: string;
    link: string;
  }[];
  projects: {
    id: string;
    title: string;
    description: string;
    demo: string;
    github: string;
    technologies: string[];
    image: {
      url: string;
    };
  }[];
  smallProjects: {
    id: string;
    title: string;
    description: string;
    link: string;
    icon: {
      url: string;
    };
  }[];
}
