import CardPannel from "@/components/CardPanel";
import getVenues from "@/libs/getVenues";
import VenueCatalog from "@/components/ProductCatalog";

export default function Venue() {

    const venues = getVenues();

    return (
        <main className="text-center p-5">
            <h1 className="text-xl font-medium">Select Your Event Partner</h1>
            <VenueCatalog venuesJson={venues} />
        </main>
    );
}