'use client';
import { ReactNode, useEffect, useState, use } from "react";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetail({params}: {params: Promise<{id:string}>}) {
    const [tdata, setTdata] = useState<Product[]>([]);
    const [dtTag, setDtTag] = useState<ReactNode[]>([]);
    //const {id} = await params; // {} 서버컴포넌트에서는 await으로 받고,
    const {id} = use(params); // 클라이언트에서는 use훅 사용하기!!!

    const getDetailData = async () => {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${id}`;
        const resp = await fetch(url);
        const data = await resp.json();
        setTdata(data);
    }

    useEffect(() => {
        getDetailData();
    }, []);

    useEffect(() => {
        const tag = tdata.map(item =>
                    <div key={item.id} className="flex flex-col justify-center items-center py-5">
                        <Image src={'/file.svg'} width={200} height={200} alt={`${item.name} 이미지 없음`} priority/> 
                        <ul className="mt-5">
                            <li>{item.name}</li>
                            <li>{item.category}</li>
                            <li>{item.price.toLocaleString('ko-KR')}</li>
                            <li>{item.description}</li>
                        </ul>
                    </div>
                );
        setDtTag(tag);
    }, [tdata]);


    return (
        <div className="flex flex-col items-center justify-center
                        px-3 lg:px-5 py-5">
            <h1 className="text-xl font-semibold">상품상세 정보</h1>
            {dtTag && dtTag}
            <div className="mt-5">
                <Link href={'/products'}>
                    <div className="rounded-3xl bg-blue-950 text-white font-medium px-4 py-1">
                        목록으로
                    </div>
                </Link>
            </div>
        </div>
    )
}