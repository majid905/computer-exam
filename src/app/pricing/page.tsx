"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { CheckoutDialog } from "@/components/billing/CheckoutDialog";

export default function PricingPage() {
  const { subscription } = useAuth();
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkoutPlan, setCheckoutPlan] = useState<{ id: number; title: string } | null>(null);

  useEffect(() => {
    fetch("/api/pricing/")
      .then((r) => r.json())
      .then((data) => {
        setPlans(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-5 py-8 sm:py-10">
        <div className="ud-card p-8 text-center text-[var(--color-muted)]">Loading plans...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-8 sm:py-10">
      <header className="mb-8">
        <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand)]">
          Pricing
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--color-ink)]">
          Choose a plan
        </h1>
        <p className="text-[var(--color-muted)] mt-2 max-w-2xl">
          Upgrade to unlock all mock tests and premium features.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        {plans.map((plan) => (
          <article key={plan.id} className="ud-card p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-[var(--color-ink)]">{plan.title}</h2>
                <p className="text-sm text-[var(--color-muted)] mt-1">{plan.description}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-extrabold text-[var(--color-brand)]">
                  {plan.currency} {(plan.price_cents / 100).toFixed(2)}
                </div>
                <div className="text-sm text-[var(--color-muted)]">{plan.interval}</div>
              </div>
            </div>
            <ul className="mt-5 space-y-2 text-sm text-[var(--color-ink-2)]">
              {plan.features.map((feature: string, index: number) => (
                <li key={index} className="flex gap-2">
                  <span aria-hidden>✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <button
                onClick={() => setCheckoutPlan({ id: plan.id, title: plan.title })}
                className="ud-btn ud-btn-primary w-full"
              >
                {subscription ? "Renew Plan" : "Subscribe"}
              </button>
            </div>
          </article>
        ))}
        {plans.length === 0 && (
          <div className="ud-card p-8 text-center text-[var(--color-muted)]">
            No pricing plans available.
          </div>
        )}
      </div>

      {checkoutPlan && (
        <CheckoutDialog
          planId={checkoutPlan.id}
          planTitle={checkoutPlan.title}
          onClose={() => setCheckoutPlan(null)}
        />
      )}
    </div>
  );
}
