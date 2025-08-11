'use client';
import { Product } from "@/types/product";
import { products } from "@/data/product";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductDetail({params}: {params: Promise<{id:string}>}) {
    const [tdata, setTdata] = useState<Product[]>([]);

    const getData = async () => {
        const {id} = await params; // {}
        console.log(id);
        setTdata(products.filter(item => item.id == id));
    }

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {

    }, [tdata]);


    return (
        <div>
            <h1>상품상세 정보</h1>
            {
                tdata.map(item => 
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