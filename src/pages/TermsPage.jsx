import Container from '../components/ui/Container';
import PageHeader from '../components/ui/PageHeader';

export default function TermsPage() {
  return (
    <>
      <PageHeader kicker="Legal" title="Terms of Service" description="Last updated: March 2025" />
      <Container size="narrow" className="prose prose-slate max-w-none py-14 dark:prose-invert">
        <h2>1. Acceptance of Terms</h2>
        <p>By using KMD Student Academy you agree to these terms. If you don\u2019t agree, please don\u2019t use the platform.</p>
        <h2>2. Accounts</h2>
        <p>You are responsible for keeping your account and password secure. One account per person.</p>
        <h2>3. Free & Premium Content</h2>
        <p>Freshman content is free for all users. Premium content requires an active subscription. You may cancel anytime.</p>
        <h2>4. Payments & Refunds</h2>
        <p>We offer a 7-day refund for new premium subscriptions. After that, subscriptions renew automatically until cancelled.</p>
        <h2>5. Content Ownership</h2>
        <p>All videos, notes and materials are the property of their respective authors or KMD Student Academy. You may not redistribute them.</p>
        <h2>6. Conduct</h2>
        <p>Be respectful. Harassment, cheating and content piracy will result in account termination.</p>
        <h2>7. Changes</h2>
        <p>We may update these terms. We\u2019ll email you when we do.</p>
      </Container>
    </>
  );
}
