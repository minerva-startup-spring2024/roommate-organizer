import Building from "@/app/_components/Building/Building";

export default async function BuildingPage({ params }) {
  return <Building buildingId={params.slug} />;
}
