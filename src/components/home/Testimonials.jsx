import { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "../../data/testimonials";

const transitionClass =
  "transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)]";

function RatingStars({ rating }) {
  return (
    <div
      className="flex items-center gap-0.5 text-amber-400"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: rating }).map((_, index) => (
        <Star
          key={index}
          className="h-3 w-3 fill-current sm:h-3.5 sm:w-3.5"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function TestimonialAvatar({ item }) {
  return (
    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full shadow-[0_0_24px_rgba(168,85,247,0.22)] transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 sm:h-12 sm:w-12">
      {item.image ? (
        <img
          src={item.image}
          alt={`${item.name} profile`}
          className="h-full w-full object-cover transition-transform duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          loading="lazy"
        />
      ) : (
        <div
          className={`grid h-full w-full place-items-center bg-gradient-to-br ${item.gradient} text-[12px] font-semibold text-white sm:text-sm`}
          aria-hidden="true"
        >
          {item.avatar}
        </div>
      )}
    </div>
  );
}

function TestimonialCard({ item, index }) {
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border border-[var(--testimonial-card-border)] bg-[var(--testimonial-card-bg)] p-4 shadow-[0_10px_28px_var(--testimonial-card-shadow)] backdrop-blur-xl hover:-translate-y-1 hover:border-violet-400/30 hover:bg-[var(--testimonial-card-hover)] sm:p-5 lg:p-6 ${transitionClass}`}
      style={{
        animation: "testimonialIn 520ms ease-out both",
        animationDelay: `${index * 90}ms`,
      }}
    >
      <div
        className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/35 to-transparent opacity-0 group-hover:opacity-100 ${transitionClass}`}
      />

      <div className="flex items-start gap-3 sm:gap-4">
        <TestimonialAvatar item={item} />

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 sm:gap-x-3">
            <h3 className="text-[13.5px] font-semibold leading-none tracking-[-0.01em] text-[var(--text-heading)] sm:text-[14px]">
              {item.name}
            </h3>

            <RatingStars rating={item.rating} />
          </div>

          <p className="mt-1.5 text-[11.5px] font-medium leading-5 text-[var(--text-soft)] sm:text-xs">
            {item.role}
          </p>
        </div>
      </div>

      <blockquote className="mt-4 sm:mt-5">
        <p className="text-[13.5px] leading-7 text-[var(--text-body)] sm:text-[14px]">
          “{item.text}”
        </p>
      </blockquote>
    </article>
  );
}

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("next");

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const visibleTestimonials = useMemo(() => {
    return Array.from({ length: 3 }).map((_, index) => {
      const itemIndex = (activeIndex + index) % testimonials.length;
      return testimonials[itemIndex];
    });
  }, [activeIndex]);

  const handlePrevious = () => {
    setDirection("prev");
    setActiveIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
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

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (event) => {
    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const swipeDistance = touchStartX.current - touchEndX.current;
    const minimumSwipeDistance = 45;

    if (swipeDistance > minimumSwipeDistance) {
      handleNext();
    }

    if (swipeDistance < -minimumSwipeDistance) {
      handlePrevious();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      id="testimonials"
      className={`theme-section relative overflow-hidden px-4 py-10 sm:px-8 sm:py-12 lg:px-14 lg:py-16 xl:px-20 ${transitionClass}`}
      aria-labelledby="testimonials-title"
    >
      <style>
        {`
          @keyframes testimonialIn {
            from {
              opacity: 0;
              transform: translateY(10px) scale(0.985);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @keyframes slideNext {
            from {
              opacity: 0;
              transform: translateX(20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes slidePrev {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>

      <div className="theme-layer theme-testimonials-dark" />
      <div className="theme-layer theme-testimonials-light" />

      <div className="pointer-events-none absolute left-1/2 top-8 z-[1] h-44 w-[320px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[80px] sm:w-[520px] sm:blur-[90px]" />

      <div className="relative z-10 mx-auto max-w-[1440px]">
        <div className="mx-auto max-w-[920px] text-center">
          <div
            className={`mx-auto mb-3 inline-flex rounded-full border border-[var(--badge-border)] bg-[var(--badge-bg)] px-3 py-1.5 text-[11px] font-medium text-[var(--badge-text)] sm:mb-4 sm:px-3.5 sm:text-xs ${transitionClass}`}
          >
            User Reviews
          </div>

          <h2
            id="testimonials-title"
            className="mx-auto max-w-[760px] text-[28px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--text-heading)] min-[420px]:text-[30px] sm:text-[36px] lg:max-w-none lg:whitespace-nowrap lg:text-[42px]"
          >
            Trusted by{" "}
            <span className="bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
              Video Downloader Users
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-[580px] text-[13.5px] leading-7 text-[var(--text-muted)] sm:mt-5 sm:text-[15px] sm:leading-8">
            See why users choose SnapDL to download videos online from YouTube,
            Instagram, Facebook, and X/Twitter in MP4 or MP3 format.
          </p>
        </div>

        <div
          className="relative mt-8 touch-pan-y sm:mt-10"
          aria-label="SnapDL user testimonials"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            onClick={handlePrevious}
            className={`absolute left-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-[var(--testimonial-arrow-border)] bg-[var(--testimonial-arrow-bg)] text-[var(--testimonial-arrow-text)] shadow-[0_10px_30px_rgba(2,6,23,0.16)] backdrop-blur hover:border-violet-400/35 hover:text-[var(--text-heading)] lg:grid xl:left-3 ${transitionClass}`}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <div
            key={activeIndex}
            className="mx-auto grid max-w-[1260px] gap-3 min-[640px]:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:px-8 xl:px-10"
            style={{
              animation:
                direction === "next"
                  ? "slideNext 420ms ease-out both"
                  : "slidePrev 420ms ease-out both",
            }}
          >
            {visibleTestimonials.map((item, index) => (
              <TestimonialCard
                key={`${item.name}-${activeIndex}-${index}`}
                item={item}
                index={index}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className={`absolute right-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-[var(--testimonial-arrow-border)] bg-[var(--testimonial-arrow-bg)] text-[var(--testimonial-arrow-text)] shadow-[0_10px_30px_rgba(2,6,23,0.16)] backdrop-blur hover:border-violet-400/35 hover:text-[var(--text-heading)] lg:grid xl:right-3 ${transitionClass}`}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div
          className="mt-5 flex items-center justify-center gap-2"
          aria-label="Choose testimonial"
        >
          {testimonials.map((item, index) => (
            <button
              key={`${item.name}-${index}`}
              type="button"
              onClick={() => handleDotClick(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-8 bg-violet-500"
                  : "w-2 bg-[var(--testimonial-dot-bg)] hover:bg-violet-300/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
            />
          ))}
        </div>

        <p className="mt-3 text-center text-[11.5px] font-medium text-[var(--text-soft)] sm:hidden">
          Swipe to view more reviews
        </p>
      </div>
    </section>
  );
}

export default Testimonials;