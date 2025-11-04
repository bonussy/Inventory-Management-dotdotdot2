import Link from "next/link";
import Card from "./Card";

interface ProductItem {
  _id: string;
  name: string;
  sku: string;
  description: string;
  category: string;
  price: number;
  stockQuantity: number;
  unit: string;
  picture: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

interface ProductJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: ProductItem[];
}


export default async function ProductCatalog({productsJson}: {productsJson: Promise<ProductJson>}) {

    const resolvedProductsJson = await productsJson;

    return (
        <>
        Explore {resolvedProductsJson.count} products in our catalog

        <div style={{margin:"20px", display:"flex", flexDirection:"row",
                alignContent: "space-around", justifyContent: "space-around", flexWrap: "wrap", padding:"10px"}}>
                {
                    resolvedProductsJson.data.map((productItem: ProductItem)=>(
                        <Link href={`/product/${(productItem.id)}`} className="w-1/5" key={(productItem.name)}>
                        <Card key={productItem.id} venueName={productItem.name} imgSrc={productItem.picture} />
                        </Link>
                    ))
                }

            </div>
        </>
    )
}