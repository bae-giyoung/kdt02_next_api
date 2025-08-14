export const dynamic = 'force-dynamic';
import { ReactNode} from "react";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import ProductDel from "../ProductDel";
import { supabase } from "@/lib/supabase/client";

export default async function ProductDetail({params}: {params: Promise<{id:string}>}) {
    const {id} = await params;
    const {data: detailData, error} = await supabase.from('products').select('*').eq('id', id);
    let dtTag: ReactNode;

    if(detailData) {
        dtTag = detailData.map(item =>
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
    }

    if(error)
        return <p>해당 상품이 존재하지 않습니다.</p>


    return (
        <div className="flex flex-col items-center justify-center
                        px-3 lg:px-5 py-5">
            <h1 className="text-xl font-semibold">상품상세 정보</h1>
            {dtTag && dtTag}
            <div className="mt-5 flex gap-2">
                <Link href={'/supaproducts'}>
                    <div className="rounded-full border border-solid border-black/[.08] 
                    dark:border-white/[.145] transition-colors flex items-center 
                    justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] 
                    hover:border-transparent font-medium text-sm sm:text-base h-10 
                    sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]">
                        목록으로
                    </div>
                </Link>

                <Link href={`/supaproducts/${id}/edit`}>
                    <div className="rounded-full border border-solid border-black/[.08] 
                    dark:border-white/[.145] transition-colors flex items-center bg-[#8f8f8f] text-white
                    justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] 
                    hover:border-transparent font-medium text-sm sm:text-base h-10 
                    sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]">
                        수정
                    </div>
                </Link>

                <ProductDel id={id}/>
            </div>
        </div>
    )
}