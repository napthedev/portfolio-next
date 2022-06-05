import { gql } from "graphql-request";

export const GET_ALL_DATA = gql`
  query {
    skills {
      image
      title
      link
    }
    projects {
      id
      title
      description
      demo
      github
      technologies
      image {
        url(
          transformation: {
            image: { resize: { width: 700 } }
            validateOptions: true
          }
        )
      }
    }
    smallProjects {
      id
      title
      description
      link
      icon {
        url(
          transformation: {
            image: { resize: { height: 40 } }
            validateOptions: true
          }
        )
      }
    }
  }
`;
