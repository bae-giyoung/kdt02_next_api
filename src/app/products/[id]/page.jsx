'use client';
import { Product } from "@/types/product";;
import { products } from "@/app/product/product";
import Link from "next/link";

export default async function ProductDetail({params}: {params: Promise<{id:string}>}) {
    const {id} = await params; // {}
    console.log(id);

    const p = products.filter(item => item.id == id);

    return (
        <div>
            <h1>상품상세 정보</h1>
            {
                p.map(item => 
                    <ul key={item.id}>
                        <li>{item.id}</li>
                        <li>{item.name}</li>
                        <li>{item.category}</li>
                        <li>{item.price}</li>
                        <li>{item.description}</li>
                    </ul>
                )
            }
            <div>
                <Link href={'/product'}>이전</Link>
            </div>
        </div>
    )
}