const HeroSection = () => {
  return (
    <div
      className="w-full flex items-start justify-center lg:min-h-[78vh] bg-cover bg-center "
      style={{ backgroundImage: `url(https://usapeptidelab-s3.s3.eu-north-1.amazonaws.com/assets/hero-bg.png)` }}
    >
      <div className="md:w-[80%] w-[90%] flex lg:flex-row lg:mt-5 flex-col xl:gap-8 lg:gap-0 gap-4 sm:mt-10">
        <div className="lg:w-1/2 flex flex-col items-start justify-center gap-4 mb-8">
          <h1 className="text-gradient text-[42px]  leading-tight font-bold">
            HIGHEST QUALITY PEPTIDES FOR SALE
          </h1>
          <p className="text-white text-[16px] leading-7 ">
            We are proud to carry the highest quality peptides and peptide
            blends in the research industry.
          </p>
          <a
            href="/peptides"
            className="text-secondary bg-transparent border-2 font-semibold border-secondary hover:text-white hover:bg-secondary py-1.5 px-5 sm:text-[20px] text-[18px] rounded-2xl"
          >
            BUY PEPTIDES
          </a>
        </div>
        <div className="lg:w-[50%] flex items-center justify-center">
          <img src='https://usapeptidelab-s3.s3.eu-north-1.amazonaws.com/assets/hero-bg-vials.png' alt="product" className="lg:mt-14" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
