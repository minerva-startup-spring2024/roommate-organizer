import getApiDocs from "../../../lib/swagger";

import dynamic from "next/dynamic";

const ReactSwagger = dynamic(() => import("../_components/ReactSwagger"), {
  ssr: false,
});

export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <div>
      <ReactSwagger spec={spec} />
    </div>
  );
}
