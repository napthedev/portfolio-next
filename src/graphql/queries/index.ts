import { gql } from "graphql-request";

export const GET_ALL_DATA = gql`
  query {
    skills(stage: PUBLISHED) {
      image
      title
      link
    }
    projects(stage: PUBLISHED) {
      id
      title
      description
      demo
      github
      technologies
      image {
        url(
          transformation: {
            document: { output: { format: webp } }
            image: { resize: { width: 700 } }
            validateOptions: true
          }
        )
      }
    }
    smallProjects(stage: PUBLISHED) {
      id
      title
      description
      link
      icon {
        url(
          transformation: {
            document: { output: { format: webp } }
            image: { resize: { height: 40 } }
            validateOptions: true
          }
        )
      }
    }
  }
`;
