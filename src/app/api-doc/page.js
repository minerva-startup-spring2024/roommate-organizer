import { getApiDocs } from "@/lib/swagger";
import ReactSwagger from "./react-swagger";

export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "white",
        position: "absolute",
      }}
    >
      <ReactSwagger spec={spec} />
    </div>
  );
}
