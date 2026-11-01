import { buttonClass } from "@/components/ui/Button";
import { reviews, type Review } from "@/lib/reviews";
import { site } from "@/lib/site";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-1 text-gold" aria-label={`5 üzerinden ${rating} yıldız`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} aria-hidden viewBox="0 0 24 24" className={`h-4 w-4 ${i < rating ? "fill-current" : "fill-ivory/15"}`}>
          <path d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z" />
        </svg>
      ))}
    </span>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex w-[19rem] shrink-0 flex-col bg-graphite p-6 md:w-[26rem] md:p-8">
      <Stars rating={review.rating} />
      <blockquote className="mt-5 flex-1 text-body text-ivory">{review.text}</blockquote>
      <figcaption className="mt-6 text-small">
        <span className="block text-ivory">{review.author}</span>
        <span className="text-ash">
          {review.service} · {review.sample ? "Örnek yorum" : "Google"}
        </span>
      </figcaption>
    </figure>
  );
}

/** Customer words from Google, drifting slowly sideways; hover or touch holds the row still. */
export function ReviewsSection() {
  const hasSamples = reviews.some((r) => r.sample);

  return (
    <section aria-labelledby="yorumlar-baslik" data-reveal-group className="bg-obsidian pb-32 md:pb-48">
      <div className="flex flex-col gap-8 px-4 md:flex-row md:items-end md:justify-between md:px-8">
        <div>
          <h2 id="yorumlar-baslik" data-reveal className="display text-head text-ivory">
            Değerli yorumlarınız
          </h2>
          {hasSamples && (
            <p data-reveal className="mt-4 text-small text-ash">
              Örnek görünüm: gerçek Google yorumları eklenecek.
            </p>
          )}
        </div>
        <div data-reveal className="flex shrink-0 flex-wrap gap-3 md:flex-nowrap">
          <a href={site.google.writeReviewHref} target="_blank" rel="noopener noreferrer" className={buttonClass("primary")}>
            Yorum yap
          </a>
          <a href={site.google.reviewsHref} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary")}>
            Google&apos;da tüm yorumlar
          </a>
        </div>
      </div>

      {/* Two copies of the row so the loop has no seam; the second is hidden from screen readers */}
      <div data-reveal className="reviews-marquee mt-12 overflow-hidden md:mt-16">
        <div className="reviews-track flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1 || undefined} className="flex gap-2 pr-2">
              {reviews.map((review, i) => (
                <ReviewCard key={i} review={review} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
