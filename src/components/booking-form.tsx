"use client";

import { useMutation } from "@tanstack/react-query";
import { FormEvent } from "react";
import toast from "react-hot-toast";

import { createBookingRequest } from "@/lib/api";

export function BookingForm({ camperId }: { camperId: string }) {
  const bookingMutation = useMutation({
    mutationFn: ({ name, email }: { name: string; email: string }) =>
      createBookingRequest(camperId, { name, email }),
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: () => {
      toast.error("Booking request failed. Please try again.");
    },
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();

    if (!name || !email) {
      return;
    }

    bookingMutation.mutate(
      { name, email },
      {
        onSuccess: () => {
          form.reset();
        },
      },
    );
  }

  return (
    <div className="booking-card">
      <div className="booking-card__intro">
        <h2>Book your campervan now</h2>
        <p>Stay connected! We are always ready to help you.</p>
      </div>

      <form className="booking-form" onSubmit={handleSubmit}>
        <input
          className="text-input"
          name="name"
          type="text"
          placeholder="Name*"
          autoComplete="name"
          required
        />
        <input
          className="text-input"
          name="email"
          type="email"
          placeholder="Email*"
          autoComplete="email"
          required
        />
        <button type="submit" className="button" disabled={bookingMutation.isPending}>
          {bookingMutation.isPending ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}
