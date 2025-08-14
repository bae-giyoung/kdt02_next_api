//'use client'
export const dynamic = 'force-dynamic';
import Link from "next/link";
import ProductForm from "../../ProductForm";
import { supabase } from "@/lib/supabase/client";

export default async function ({params} : {params: Promise<{id:string}>}) {
    const { id } = await params;
    const {data: product, error} = await supabase.from('products').select('*').eq('id', id);

    if(error)
        return <p>에러 발생</p>

    return (
        <div className='w-full p-5 bg-[#e8e8e8]'>
            <div className="w-full flex justify-between items-center">
                <h2 className="font-semibold text-2xl">
                    상품 수정 페이지
                </h2>
                <Link href='/supaproducts'>
                <div className="inline-block font-medium
                            after:block after:w-full after:h-[1px]
                        after:bg-black after:mt-1
                            before:block before:w-full before:h-[1px]
                        before:bg-black before:mb-[5px]">
                    목록으로
                </div>
                </Link>
            </div>
            { product && <ProductForm product={product[0]} /> }
        </div>
    );
}