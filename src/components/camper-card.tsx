import Image from "next/image";
import Link from "next/link";
import { HiOutlineMapPin } from "react-icons/hi2";
import { IoStar } from "react-icons/io5";
import { MdLocalGasStation } from "react-icons/md";
import { PiGearSixBold } from "react-icons/pi";
import { TbCamper } from "react-icons/tb";

import { formatEngine, formatForm, formatLocation, formatPrice, formatRating, formatTransmission } from "@/lib/format";
import type { CamperListItem } from "@/lib/types";

export function CamperCard({ camper }: { camper: CamperListItem }) {
  const ratingLabel = `${formatRating(camper.rating)}(${camper.totalReviews} Reviews)`;

  return (
    <article className="camper-card">
      <div className="camper-card__media">
        <Image
          src={camper.coverImage}
          alt={camper.name}
          fill
          sizes="(max-width: 1024px) 100vw, 219px"
          className="camper-card__image"
        />
      </div>

      <div className="camper-card__content">
        <div className="camper-card__top">
          <div>
            <h2 className="camper-card__title">{camper.name}</h2>
            <div className="camper-card__meta">
              <span className="meta-inline">
                <IoStar className="meta-inline__icon is-accent" />
                {ratingLabel}
              </span>
              <span className="meta-inline">
                <HiOutlineMapPin className="meta-inline__icon" />
                {formatLocation(camper.location)}
              </span>
            </div>
          </div>

          <strong className="camper-card__price">{formatPrice(camper.price)}</strong>
        </div>

        <p className="camper-card__description">{camper.description}</p>

        <div className="camper-card__chips">
          <span className="chip">
            <MdLocalGasStation className="chip__icon" />
            {formatEngine(camper.engine)}
          </span>
          <span className="chip">
            <PiGearSixBold className="chip__icon" />
            {formatTransmission(camper.transmission)}
          </span>
          <span className="chip">
            <TbCamper className="chip__icon" />
            {formatForm(camper.form)}
          </span>
        </div>

        <Link
          href={`/catalog/${camper.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="button camper-card__button"
        >
          Show more
        </Link>
      </div>
    </article>
  );
}
