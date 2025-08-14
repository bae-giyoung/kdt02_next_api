// product/page.tsx를 서버 컴포넌트로 바꾸기!
export const dynamic = 'force-dynamic';
import { Product } from "@/types/product";
import { type ReactNode } from "react";
import ProductCard2 from "./ProductCard2";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";

export default async function ProductList2() {
    const {data: listData, error} = await supabase.from('products').select('*');
    let prlistTag: ReactNode[];
    
    if(listData) {
        prlistTag = listData.map((item: Product) =>
            <ProductCard2 key={item.id} item={item} />
        );
    }

    if(error)
        return <p>데이터가 존재하지 않습니다.</p>

    return (
        <div className="p-5">
            <div className="flex justify-between">
                <p className="font-extrabold text-2xl
                                w-full 
                                after:block after:w-full after:h-0.5
                                after:bg-black after:mt-1
                                before:block before:w-full before:h-0.5
                                before:bg-black before:mb-1
                                ">상품 목록
                </p>
                <div className="shrink-0 grid grid-cols-2">
                    <Link href={'/supaproducts/new'}>
                        <div className="h-full flex items-center justify-center
                                        bg-black text-white px-3
                                        border-white border-2">
                            상품 추가
                        </div>
                    </Link>
                    <Link href={'/'}>
                        <div className="h-full flex items-center justify-center
                                        bg-white px-3
                                        border-black border-2">
                            홈으로
                        </div>
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mt-5">
                {prlistTag && prlistTag}
            </div>
        </div>
    );
}