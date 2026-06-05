"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { loadStripe, type Stripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

// Cache the Stripe.js instance per publishable key (loadStripe should run once).
let stripeCache: { key: string; promise: Promise<Stripe | null> } | null = null;
function getStripe(pk: string) {
  if (!stripeCache || stripeCache.key !== pk) {
    stripeCache = { key: pk, promise: loadStripe(pk) };
  }
  return stripeCache.promise;
}

export function CheckoutDialog({
  planId,
  planTitle,
  onClose,
}: {
  planId: number;
  planTitle?: string;
  onClose: () => void;
}) {
  const [pk, setPk] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/stripe-public-key")
      .then((r) => r.json())
      .then((d) => {
        if (!d.publishableKey || !d.enabled) {
          setError("Payments aren't available right now. Please try again later.");
        } else {
          setPk(d.publishableKey);
        }
      })
      .catch(() => setError("Couldn't load checkout. Please try again."));
  }, []);

  // The embedded checkout asks for a client secret; we mint a session on demand.
  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/create-checkout-session/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan_id: planId }),
    });
    const data = await res.json();
    if (!res.ok || !data.clientSecret) {
      throw new Error(data.error || "Failed to start checkout");
    }
    return data.clientSecret as string;
  }, [planId]);

  const options = useMemo(() => ({ fetchClientSecret }), [fetchClientSecret]);
  const stripePromise = useMemo(() => (pk ? getStripe(pk) : null), [pk]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start sm:items-center justify-center bg-black/50 p-4 overflow-auto"
      onClick={onClose}
    >
      <div
        className="ud-card w-full max-w-lg my-4 overflow-hidden p-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)]">
          <h2 className="font-bold text-[var(--color-ink)]">
            {planTitle ? `Subscribe — ${planTitle}` : "Subscribe"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-[var(--color-muted)] hover:text-[var(--color-ink)] text-2xl leading-none px-1"
          >
            ×
          </button>
        </div>
        <div className="p-2">
          {error && (
            <div className="p-5 text-sm text-[var(--color-danger)] font-semibold">
              {error}
            </div>
          )}
          {!error && stripePromise && (
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          )}
          {!error && !stripePromise && (
            <div className="p-8 text-center text-sm text-[var(--color-muted)]">
              Loading secure checkout…
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
