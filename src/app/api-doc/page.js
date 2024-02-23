import getApiDocs from "../../../lib/swagger";
import ReactSwagger from "../_components/ReactSwagger";

export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <div>
      <ReactSwagger spec={spec} />
    </div>
  );
}
