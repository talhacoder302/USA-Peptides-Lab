import HeroSection from "../components/HeroSection";
import NewsLetter from "../components/NewsLetter";
import PeptidesCat from "../components/PeptidesCat";
import PeptidesHome from "../components/PeptidesHome";
import ProductItemms from "../components/ProductItemms";
import Support from "../components/Support";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Support />
      <ProductItemms />
      <PeptidesCat />
      <PeptidesHome />
      <NewsLetter />
    </div>
  );
};

export default Home;
