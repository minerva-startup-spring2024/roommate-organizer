import Chore from "@/app/_components/Chore";
import AddChoreForm from "@/app/_components/CreateChore";
import { getRoomDetails, getUser } from "@/utils/api";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function RoomPage({ params }) {
  const shoppingList = ["Milk", "Eggs", "Bread"];
  const announcements = ["House meeting on Friday", "Rent due next week"];
  const roomDetails = await getRoomDetails({ room: { id: params.slug } });
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  if (!data.session?.user) {
    redirect("/login");
  }

  const user = await getUser(data.session);

  return (
    <div>
      <h1></h1>
      <h1>Chores</h1>
      <ul>
        {roomDetails.ChoresList.ChoreListItem.map((chore, index) => (
          <Chore key={index} chore={chore} />
        ))}
      </ul>
      <AddChoreForm
        context={{ choreList: roomDetails.ChoresList, user: user }}
      />

      <h1>Shopping List</h1>
      <ul>
        {roomDetails.ShoppingList.ShoppingListItem.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
