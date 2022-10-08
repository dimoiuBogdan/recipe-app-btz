import { NextPage } from "next";
import AllRecipes from "../src/components/Overview/AllRecipes";
import OverviewHeader from "../src/components/Overview/OverviewHeader";
import SearchAndFilters from "../src/components/Overview/SearchAndFilters";
import TopRated from "../src/components/Overview/TopRated";

const OverviewPage: NextPage = () => {
  return (
    <div>
      <OverviewHeader />
      <SearchAndFilters />
      <TopRated />
      <AllRecipes />
    </div>
  );
};

export default OverviewPage;
