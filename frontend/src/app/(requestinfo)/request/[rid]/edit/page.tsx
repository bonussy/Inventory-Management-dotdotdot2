import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";
import getRequest from "@/libs/getRequest";
import EditRequestForm from "@/components/EditRequestForm";


export default async function EditRequestPage(props: { params: Promise<{ rid: string }> }) {

    const session = await getServerSession(authOptions);
    if (!session || !session.user.token) return null;

    const profile = await getUserProfile(session.user.token);
    const createdAt = new Date(profile.data.createdAt);

    const params = await props.params;
    const rid = params.rid;
    const requestDetail = await getRequest(session.user.token, rid);

    if (!requestDetail || !requestDetail.data) return null;

    return (
        <EditRequestForm
            token={session.user.token}
            requestItem={requestDetail.data}
        />
    );
}