import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HiOutlineMapPin } from "react-icons/hi2";
import { IoStar } from "react-icons/io5";

import { BookingForm } from "@/components/booking-form";
import { GalleryCarousel } from "@/components/gallery-carousel";
import { ReviewStars } from "@/components/review-stars";
import { getCamperById, getCamperReviews, isApiErrorStatus } from "@/lib/api";
import { formatEngine, formatForm, formatLocation, formatPrice, formatRating, formatTransmission } from "@/lib/format";

export const dynamic = "force-dynamic";

type CamperDetailsPageProps = {
  params: Promise<{ camperId: string }>;
};

export async function generateMetadata({ params }: CamperDetailsPageProps): Promise<Metadata> {
  const { camperId } = await params;

  return getCamperById(camperId)
    .then((camper) => ({
      title: camper.name,
      description: camper.description,
    }))
    .catch(() => ({
      title: "Camper details",
      description: "Detailed information about a TravelTrucks camper.",
    }));
}

async function loadCamperPageData(camperId: string) {
  return Promise.all([getCamperById(camperId), getCamperReviews(camperId)])
    .then(([camper, reviews]) => ({ camper, reviews }))
    .catch((error: unknown) => {
      if (isApiErrorStatus(error, 404)) {
        notFound();
      }

      throw error;
    });
}

export default async function CamperDetailsPage({ params }: CamperDetailsPageProps) {
  const { camperId } = await params;
  const { camper, reviews } = await loadCamperPageData(camperId);
  const ratingLabel = `${formatRating(camper.rating)}(${camper.totalReviews} Reviews)`;
  const detailBadges = [
    formatTransmission(camper.transmission),
    camper.amenities.includes("ac") ? "AC" : null,
    formatEngine(camper.engine),
    camper.amenities.includes("kitchen") ? "Kitchen" : null,
    camper.amenities.includes("radio") ? "Radio" : null,
    formatForm(camper.form),
  ].filter((badge): badge is string => Boolean(badge));

  return (
    <main className="details-page">
      <div className="shell">
        <div className="details-layout">
          <section className="details-top">
            <GalleryCarousel images={camper.gallery} camperName={camper.name} />

            <div className="details-stack">
              <section className="info-card info-card--summary">
                <div className="details-summary">
                  <h1>{camper.name}</h1>
                  <div className="details-summary__meta">
                    <span className="meta-inline">
                      <IoStar className="meta-inline__icon is-accent" />
                      {ratingLabel}
                    </span>
                    <span className="meta-inline">
                      <HiOutlineMapPin className="meta-inline__icon" />
                      {formatLocation(camper.location)}
                    </span>
                  </div>
                  <strong className="details-summary__price">{formatPrice(camper.price)}</strong>
                </div>

                <p className="details-description">{camper.description}</p>
              </section>

              <section className="info-card">
                <h2>Vehicle details</h2>
                <div className="details-tags">
                  {detailBadges.map((badge) => (
                    <span key={badge} className="chip chip--plain">
                      {badge}
                    </span>
                  ))}
                </div>

                <dl className="details-table">
                  <div>
                    <dt>Form</dt>
                    <dd>{formatForm(camper.form)}</dd>
                  </div>
                  <div>
                    <dt>Length</dt>
                    <dd>{camper.length}</dd>
                  </div>
                  <div>
                    <dt>Width</dt>
                    <dd>{camper.width}</dd>
                  </div>
                  <div>
                    <dt>Height</dt>
                    <dd>{camper.height}</dd>
                  </div>
                  <div>
                    <dt>Tank</dt>
                    <dd>{camper.tank}</dd>
                  </div>
                  <div>
                    <dt>Consumption</dt>
                    <dd>{camper.consumption}</dd>
                  </div>
                </dl>
              </section>
            </div>
          </section>

          <section className="details-bottom">
            <div className="reviews-column">
              <h2>Reviews</h2>

              {reviews.length ? (
                <div className="reviews-list">
                  {reviews.map((review) => (
                    <article className="review-card" key={review.id}>
                      <div className="review-card__header">
                        <div className="review-card__avatar">
                          {review.reviewer_name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <strong>{review.reviewer_name}</strong>
                          <ReviewStars value={review.reviewer_rating} />
                        </div>
                      </div>
                      <p>{review.comment}</p>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <h2>No reviews yet</h2>
                  <p>Be the first traveler to leave feedback for this camper.</p>
                </div>
              )}
            </div>

            <BookingForm camperId={camperId} />
          </section>
        </div>
      </div>
    </main>
  );
}
