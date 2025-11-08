import {getServerSession} from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";
import AddProductForm from "@/components/AddProductForm";
import getProduct from "@/libs/getProduct";
import EditProductForm from "@/components/EditProductForm";

export default async function EditProductPage({params}: {params: Promise<{pid:string}>}) {

    const session = await getServerSession(authOptions);
    if(!session || !session.user.token)  return null;

    const profile = await getUserProfile(session.user.token);
    var createdAt = new Date(profile.data.createdAt);

    const {pid} = await params;
    const productDetail = await getProduct(pid);

    if (!productDetail || !productDetail.data) return null;
    

    return (
        <EditProductForm 
            token={session.user.token} 
            productItem={productDetail.data} 
        />
    );
}