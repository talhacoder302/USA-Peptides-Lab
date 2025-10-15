const PeptidesCat = () => {
  return (
    <div
      className="w-full flex items-center justify-center py-10 bg-cover bg-center "
      style={{ backgroundImage: `url(https://usapeptidelab-s3.s3.eu-north-1.amazonaws.com/assets/blend&peptidebg.png)` }}
    >
      <div className="flex lg:flex-row flex-col items-center lg:gap-0 gap-16 lg:py-4 py-10 justify-between w-[60%] ">
        <div className="flex flex-col items-center gap-4">
          <img
            src='https://usapeptidelab-s3.s3.eu-north-1.amazonaws.com/assets/Ipamorelin.png'
            className="h-72 "
            alt="Peptides Category"
          />
          <a href="/peptides" className="text-[#9E6A2B] font-medium sm:text-lg text-[15px] border-2 border-[#9E6A2B] px-4 py-2 rounded-2xl hover:bg-[#9E6A2B] hover:text-white transition-all duration-500 ease-in-out">
            PEPTIDES
          </a>
        </div>
        <div className=" flex flex-col items-center gap-10">
          <img
            src='https://usapeptidelab-s3.s3.eu-north-1.amazonaws.com/assets/dnaStrand.png'
            
            alt="Blend Category"
          />
          <a href="/peptides" className="text-[#D14D90] font-medium sm:text-lg text-[15px] border-2 border-[#D14D90] px-4 py-2 rounded-2xl hover:bg-[#D14D90] hover:text-white transition-all duration-500 ease-in-out">
            PEPTIDE BLENDS
          </a>
        </div>
      </div>
    </div>
  );
};

export default PeptidesCat;
