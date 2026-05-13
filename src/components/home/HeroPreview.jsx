import heroPreview from "../../assets/images/hero.png";

function HeroPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[720px] overflow-visible sm:max-w-[820px] md:max-w-[900px] lg:-ml-8 lg:max-w-[1040px] lg:translate-y-4 xl:-ml-14 xl:max-w-[1120px]">
      {/* Soft Glow */}
      <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/14 blur-[90px] sm:h-[340px] sm:w-[340px] lg:h-[380px] lg:w-[380px]" />
      <div className="absolute right-6 top-20 h-[220px] w-[220px] rounded-full bg-blue-500/10 blur-[95px] sm:h-[300px] sm:w-[300px]" />
      <div className="absolute bottom-6 left-1/2 h-[150px] w-[320px] -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-[100px] sm:w-[460px]" />

      <div className="relative z-10 flex min-h-[300px] items-center justify-center sm:min-h-[420px] md:min-h-[500px] lg:min-h-[560px] xl:min-h-[600px]">
        <img
          src={heroPreview}
          alt="LinkFlow video downloader preview"
          className="w-[112%] max-w-none object-contain drop-shadow-[0_28px_90px_rgba(88,28,135,0.32)] transition duration-500 hover:scale-[1.006] sm:w-[108%] md:w-[105%] lg:w-[116%] xl:w-[120%]"
          loading="eager"
        />
      </div>
    </div>
  );
}

export default HeroPreview;