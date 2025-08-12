export const dynamic = 'force-dynamic';
import { ReactNode} from "react";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import ProductDel from "../ProductDel";
//import { useRouter } from "next/router";

async function getDetailData(id: string): Promise<Product[]> {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/products/${id}`;
    const resp = await fetch(url, {cache: 'no-cache'});
    const data = await resp.json();
    return data;
}

export default async function ProductDetail({params}: {params: Promise<{id:string}>}) {
    const {id} = await params; // 서버 컴포넌트에서 사용하는 방법
    const detailData: Product[] = await getDetailData(id);
    
    const dtTag: ReactNode = detailData.map(item =>
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


    return (
        <div className="flex flex-col items-center justify-center
                        px-3 lg:px-5 py-5">
            <h1 className="text-xl font-semibold">상품상세 정보</h1>
            {dtTag && dtTag}
            <div className="mt-5">
                <Link href={'/products2'}>
                    <div className="rounded-3xl bg-blue-950 text-white font-medium px-4 py-2">
                        목록으로
                    </div>
                </Link>

                <Link href={`/products2/${id}/edit`}>
                    <div className="rounded-3xl bg-blue-950 text-white font-medium px-4 py-2">
                        수정
                    </div>
                </Link>

                <ProductDel id={id}/>
            </div>
        </div>
    )
}