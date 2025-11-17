import Banner from "@/components/Banner";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<p>Loading...<LinearProgress/></p>} >
      <Banner/>
      </Suspense>
    </main>
  );
}
