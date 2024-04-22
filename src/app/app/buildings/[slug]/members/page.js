import MemberList from "@/app/_components/MemberList/MemberList";
import { getProfileIfMember } from "@/app/api/_utils";
import "@/app/globals.css";

export default async function MembersPage({ params }) {
  const profile = await getProfileIfMember({
    entityId: params.slug,
    entityType: "building",
  });

  if (!profile) {
    return {
      redirect: {
        destination: "/app",
        permanent: false,
      },
    };
  }

  return (
    <>
      <MemberList entityId={params.slug} entityType={"buildings"} />
    </>
  );
}
