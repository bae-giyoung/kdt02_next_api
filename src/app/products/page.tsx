'use client'
import { Product } from "@/types/product";
import { useEffect, useState, type ReactNode } from "react";
import ProductCard from "./ProductCard";

export default function ProductList() {
    const [tdata, setTdata] = useState<Product[]>([]);
    const [tag, setTag] = useState<ReactNode>([]);
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL + "/api/products";

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

        const prlistTag = tdata.map((item: Product, idx) =>
            <ProductCard key={idx} item={item}/>
        );

        setTag(prlistTag);
    }, [tdata]);

    return (
        <div className="p-5">
            <div className="flex justify-between">
                <p className="font-extrabold text-2xl
                                after:block after:w-full after:h-0.5
                                after:bg-black after:mt-1
                                before:block before:w-full before:h-0.5
                                before:bg-black before:mb-1
                                ">상품 목록</p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-5">
                {tag && tag}
            </div>
        </div>
    );
}