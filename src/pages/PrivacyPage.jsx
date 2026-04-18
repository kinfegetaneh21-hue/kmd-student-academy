import Container from '../components/ui/Container';
import PageHeader from '../components/ui/PageHeader';

export default function PrivacyPage() {
  return (
    <>
      <PageHeader kicker="Legal" title="Privacy Policy" description="Last updated: March 2025" />
      <Container size="narrow" className="prose prose-slate max-w-none py-14 dark:prose-invert">
        <h2>Information we collect</h2>
        <p>Account info (name, email), learning progress, and payment metadata (we never see card numbers).</p>
        <h2>How we use it</h2>
        <p>To run the platform, provide your dashboard, send you announcements about your courses, and improve the product.</p>
        <h2>Sharing</h2>
        <p>We do not sell your data. We share only with trusted processors (payment, email) under strict contracts.</p>
        <h2>Your rights</h2>
        <p>You can access, export, or delete your data at any time from Profile → Data.</p>
      </Container>
    </>
  );
}
