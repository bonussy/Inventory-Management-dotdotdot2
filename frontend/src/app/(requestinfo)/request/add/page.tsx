import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";
import AddRequestForm from "@/components/AddRequestForm";
import { redirect } from "next/navigation";

export default async function AddRequestPage() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.token) return null;

    const profile = await getUserProfile(session.user.token);

    // Access control: only allow staff to create requests
    if (profile?.data?.role !== "staff") {
        redirect("/request"); // send admins back to request list
    }

    return (
        <AddRequestForm token={session.user.token} />
    );
}