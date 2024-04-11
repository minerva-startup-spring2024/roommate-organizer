// import Card from "@/app/_components/Announcements/Card";
// import CreatePost from "@/app/_components/CreatePost/CreatePost";
import Announcements from "@/app/_components/Announcements/Announcements";
import { getProfileIfMember } from "@/app/api/_utils";

export default async function AnnouncementsPage({ params }) {
  const profile = await getProfileIfMember({
    entityId: params.slug,
    entityType: "room",
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
    <Announcements roomId={params.slug} />
    //     <div>
    //       <Card
    //         image="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800"
    //         title="Note from Kelly Robin"
    //         text="Hey, There is a leak in the bathroom ceiling. Can someone come look at it"
    //         date="10:23pm"
    //       />

    //       <Card
    //         image="https://images.pexels.com/photos/1370750/pexels-photo-1370750.jpeg?auto=compress&cs=tinysrgb&w=800"
    //         title="Note from Kelly Robin"
    //         text="Hey, Can we all make sure that we keep our rooms clean. Its really important"
    //         date="12:39am"
    //       />

    //       <CreatePost />
    //     </div>
  );
}
