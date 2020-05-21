import { gql, useMutation } from "@apollo/client";
import { Mutation, MutationNewSampleArgs } from "../../generated/graphql";

const newSampleMutation = gql`
  mutation uploadSample($sample: SampleInput!) {
    newSample(sample: $sample) {
      name
      id
      tagLink {
        name
      }
      user {
        id
      }
    }
  }
`;

export const useNewSampleMutation = () => {
  const mu = useMutation<Mutation, MutationNewSampleArgs>(newSampleMutation);

  return mu;
};
