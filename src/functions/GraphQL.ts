import axios from "axios";

interface IGraphQL {
  endpoint: string;
  query: string;
  variables?: any;
  headers?: any;
}

interface IGraphQLReturned {
  data: any;
}

export default async function GraphQL({
  endpoint,
  query,
  variables,
  headers,
}: IGraphQL): Promise<IGraphQLReturned> {
  const { data } = await axios.post(
    endpoint,
    {
      query,
      variables,
    },
    {
      headers,
    }
  );

  return data;
}
