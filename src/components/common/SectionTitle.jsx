function SectionTitle({ eyebrow, title, gradientWord, subtitle }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-400">
          {eyebrow}
        </p>
      )}

      <h2 className="text-3xl font-black tracking-[-0.035em] text-white sm:text-4xl">
        {title}{" "}
        {gradientWord && (
            <span className="bg-linear-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
            {gradientWord}
          </span>
        )}
      </h2>

      {subtitle && (
        <p className="mt-3 text-sm leading-6 text-slate-400">{subtitle}</p>
      )}
    </div>
  );
}

export default SectionTitle;