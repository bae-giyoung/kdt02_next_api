'use client'
import { Product } from "@/types/product";
import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";

export default function ProductList() {
    const [tdata, setTdata] = useState<Product[]>([]);
    const [tag, setTag] = useState<ReactNode>([]);
    let prlistTag: ReactNode = null;
    const baseUrl = "http://localhost:3000/api/products";

    const getData = async () => {
        const resp = await fetch(baseUrl);
        const data = await resp.json();
        console.log(data);
        setTdata(data);
    }

    useEffect(() => {
        getData();
    }, []);
    
    useEffect(() => {
        if(tdata.length == 0) return;

        prlistTag = tdata.map((item: Product, idx) =>
            <div className="relative mb-2 bg-white border-1 border-gray-500">
                <Link href={`/products/${item.id}`}>
                    <p key={idx}
                        className="text-2xl font-bold mb-2">
                        {item.name}
                    </p>
                    <p key={idx}
                        className="absolute right-3 top-3 inline-block rounded-3xl
                                    bg-blue-900 text-white">
                        {item.category}
                    </p>
                    <p key={idx}>
                        {item.price}
                    </p>
                    <p key={idx}>
                        {item.description}
                    </p>
                </Link>
            </div>
        );

        setTag(prlistTag);
    }, [tdata]);

    return (
        <div className="p-5 bg-gray-200">
            <div className="flex justify-between">
                <p className="font-extrabold text-2xl">상품 목록</p>
            </div>
            <div className="mt-5">
                {tag}
            </div>
        </div>
    );
}