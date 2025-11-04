import {getServerSession} from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";
import AddProductForm from "@/components/AddProductForm";

export default async function AddProductPage() {

    const session = await getServerSession(authOptions);
    if(!session || !session.user.token)  return null;

    const profile = await getUserProfile(session.user.token);
    var createdAt = new Date(profile.data.createdAt);

    return (
        <AddProductForm token={session.user.token}/>
    );
}