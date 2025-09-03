import ArtworkPageContent from "./ArtworkPageContent";

// Generate static params for static export
export async function generateStaticParams() {
  // Return a list of possible artwork IDs for static generation
  const ids = [];
  for (let i = 1; i <= 50; i++) {
    ids.push({ id: i.toString() });
  }
  return ids;
}

export default function ArtworkPage() {
  return <ArtworkPageContent />;
}
