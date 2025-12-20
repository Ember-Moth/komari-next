import ClientPage from './ClientPage';

// Generate static params for static export
// We generate one placeholder path to satisfy Next.js requirements
// Actual instance pages will be handled via client-side navigation
export async function generateStaticParams() {
  return [{ uuid: 'placeholder' }];
}

// This is a server component wrapper that allows the client component to work with static export
export default function InstancePageWrapper() {
  return <ClientPage />;
}
