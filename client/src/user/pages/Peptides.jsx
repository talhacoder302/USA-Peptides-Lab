import ProductItemms from "../components/ProductItemms";

const Peptides = () => {
  return (
    <div>
      <div
        className="w-full lg:h-[78vh] flex items-start justify-center bg-cover bg-center "
        style={{ backgroundImage: `url(https://usapeptidelab-s3.s3.eu-north-1.amazonaws.com/assets/peptides-bg.png)` }}
      >
        <div className="md:w-[80%] w-[90%] md:mt-5 flex gap-8 lg:flex-row flex-col">
          <div className="lg:w-1/2 flex flex-col items-center justify-center gap-10 ">
            <h1 className="text-gradient lg:text-[50px] sm:text-[50px] sm:mb-12 text-[40px] lg:mt-16 lg:mr-16 lg:mb-16 leading-tight lg:w-[90%] font-bold">
              RESEARCH PEPTIDES FOR SALE
            </h1>
          </div>
          <div className="lg:w-1/2 flex items-center justify-center">
            <img src='https://usapeptidelab-s3.s3.eu-north-1.amazonaws.com/assets/hero-bg-vials.png' alt="product" className="lg:mt-14"/>
          </div>
        </div>
      </div>
      <ProductItemms />
    </div>
  );
};

export default Peptides;
