import { useMutation, gql } from "@apollo/client";

const refetch = gql`
  mutation Refetch {
    ping
  }
`;

export const useRefetch = (names: Array<string>) => {
  const [submit] = useMutation(refetch);
  return () => {
    submit({
      refetchQueries: names,
    })
      .then(() => {
        console.log("refetched");
      })
      .catch(() => {
        console.log("problem refetching");
      });
  };
};
