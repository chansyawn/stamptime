import dynamic from "next/dynamic";

const Timestamp = dynamic(() => import("./_timestamp"), { ssr: false });

function Page() {
  return <Timestamp />;
}

export default Page;
