import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "syahidfrd",
  EMAIL: "syahidfrd@gmail.com",
  NUM_POSTS_ON_HOMEPAGE: 5,
  NUM_PROJECTS_ON_HOMEPAGE: 3,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "Syahidfrd is a minimal and lightweight blog and portfolio.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION:
    "A collection of my projects, with links to repositories and demos.",
};

export const SOCIALS: Socials = [
  {
    NAME: "github",
    HREF: "https://github.com/syahidfrd",
  },
  {
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/syahidfrd",
  },
];
