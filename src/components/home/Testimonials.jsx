import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "../../data/testimonials";

function RatingStars({ rating }) {
  return (
    <div className="flex items-center gap-0.5 text-amber-400">
      {Array.from({ length: rating }).map((_, index) => (
        <Star key={index} className="h-3.5 w-3.5 fill-current" />
      ))}
    </div>
  );
}

function TestimonialCard({ item, index }) {
  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-[var(--testimonial-card-border)] bg-[var(--testimonial-card-bg)] p-5 shadow-[0_16px_45px_var(--testimonial-card-shadow)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--testimonial-card-hover)] hover:border-violet-400/35 sm:p-6"
      style={{
        animation: `testimonialIn 520ms ease-out both`,
        animationDelay: `${index * 90}ms`,
      }}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="flex items-start gap-4">
        <div
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-full bg-gradient-to-br ${item.gradient} text-sm font-semibold text-white shadow-[0_0_26px_rgba(168,85,247,0.25)] transition-transform duration-300 group-hover:scale-105`}
        >
          {item.avatar}
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h3 className="text-[15px] font-semibold tracking-[-0.01em] text-[var(--text-heading)]">
              {item.name}
            </h3>

            <RatingStars rating={item.rating} />
          </div>

          <p className="mt-1 text-xs font-medium text-[var(--text-soft)]">
            {item.role}
          </p>
        </div>
      </div>

      <p className="mt-5 text-[14px] leading-7 text-[var(--text-body)]">
        “{item.text}”
      </p>
    </article>
  );
}

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("next");

  const visibleTestimonials = useMemo(() => {
    return Array.from({ length: 3 }).map((_, index) => {
      const itemIndex = (activeIndex + index) % testimonials.length;
      return testimonials[itemIndex];
    });
  }, [activeIndex]);

  const handlePrevious = () => {
    setDirection("prev");
    setActiveIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1,
    );
  };

  const handleNext = () => {
    setDirection("next");
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  const handleDotClick = (index) => {
    setDirection(index > activeIndex ? "next" : "prev");
    setActiveIndex(index);
  };

  return (
<section
  className="relative overflow-hidden px-5 py-11 transition-colors duration-[650ms] sm:px-8 sm:py-14 lg:px-14 lg:py-16 xl:px-20"
>
      <style>
        {`
          @keyframes testimonialIn {
            from {
              opacity: 0;
              transform: translateY(12px) scale(0.985);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes slideNext {
            from {
              opacity: 0;
              transform: translateX(24px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slidePrev {
            from {
              opacity: 0;
              transform: translateX(-24px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>

      <div className="theme-testimonials-dark" />
      <div className="theme-testimonials-light" />

      <div className="pointer-events-none absolute left-1/2 top-8 h-44 w-[320px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[80px] sm:w-[520px] sm:blur-[90px]" />

      <div className="relative mx-auto max-w-[1440px]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-[28px] font-semibold leading-tight tracking-[-0.02em] text-[var(--text-heading)] sm:text-[34px] lg:text-[36px]">
            Loved by{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-purple-500 bg-clip-text text-transparent">
              Millions of Users
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-[14px] leading-6 text-[var(--text-muted)] sm:text-[15px]">
            See what our users have to say about LinkFlow.
          </p>
        </div>

        <div className="relative mt-8 sm:mt-10">
          {/* Left Arrow */}
          <button
            type="button"
            onClick={handlePrevious}
            className="absolute left-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-[var(--testimonial-arrow-border)] bg-[var(--testimonial-arrow-bg)] text-[var(--testimonial-arrow-text)] shadow-[0_10px_30px_rgba(2,6,23,0.16)] backdrop-blur transition-all duration-300 hover:border-violet-400/35 hover:text-[var(--text-heading)] lg:grid xl:left-3"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div
            key={activeIndex}
            className="mx-auto grid max-w-[1260px] gap-4 lg:grid-cols-3 lg:px-8 xl:px-10"
            style={{
              animation:
                direction === "next"
                  ? "slideNext 420ms ease-out both"
                  : "slidePrev 420ms ease-out both",
            }}
          >
            {visibleTestimonials.map((item, index) => (
              <TestimonialCard
                key={`${item.name}-${activeIndex}`}
                item={item}
                index={index}
              />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-[var(--testimonial-arrow-border)] bg-[var(--testimonial-arrow-bg)] text-[var(--testimonial-arrow-text)] shadow-[0_10px_30px_rgba(2,6,23,0.16)] backdrop-blur transition-all duration-300 hover:border-violet-400/35 hover:text-[var(--text-heading)] lg:grid xl:right-3"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2">
          {testimonials.map((item, index) => (
            <button
              key={item.name}
              type="button"
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-8 bg-violet-500"
                  : "w-2 bg-[var(--testimonial-dot-bg)] hover:bg-violet-300/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;