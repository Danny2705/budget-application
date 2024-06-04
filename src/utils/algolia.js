import algoliasearch from "algoliasearch";

//Refers from Demo
export const algoliaConfig = {
  ALGOLIA_APP_ID: process.env.REACT_APP_ALGOLIA_APP_ID ?? "",
  ALGOLIA_ADMIN_KEY: process.env.REACT_APP_ALGOLIA_ADMIN_KEY ?? "",
  ALGOLIA_INDEX_NAME: process.env.REACT_APP_ALGOLIA_INDEX_NAME ?? "",
};

const { ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY } = algoliaConfig;

export const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);

export const restrictedSearchClient = (email) => {
  const key = searchClient.generateSecuredApiKey(
    algoliaConfig.ALGOLIA_ADMIN_KEY,
    { filters: `userEmail:${email}` }
  );
  return algoliasearch(ALGOLIA_APP_ID, key);
};
