import Banner from "@/components/Banner";
import PromoteCard from "@/components/PromoteCard";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<p>Loading...<LinearProgress/></p>} >
      <Banner/>
      {/* <PromoteCard/> */}
      </Suspense>
    </main>
  );
}
