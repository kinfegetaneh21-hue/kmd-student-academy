// Payment gateway abstraction. UI calls initiateCheckout() — swap the
// implementation to connect Chapa / Telebirr / Stripe later.
export async function initiateCheckout({ plan, user, provider = 'chapa' }) {
  console.info('[payments] initiateCheckout', { provider, plan: plan.id, user: user?.email });
  return {
    ok: true,
    redirectUrl: `#/checkout/demo?plan=${encodeURIComponent(plan.id)}`,
    provider,
  };
}
