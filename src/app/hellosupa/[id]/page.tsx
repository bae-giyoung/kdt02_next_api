import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

export default async function helloSupaDetail({params} : {params: Promise<{id: string}>}) {
    const { id } = await params;
    const {data, error} = await supabase.from('products').select('*').eq('id', id);

    if(error)
        return <p>데이터를 불러오는 중 에러가 발생했습니다.</p>

    return (
        <div className='w-full h-screen flex flex-col justify-center items-center
                        gap-4 text-2xl font-extrabold'>
            {
                data && data.map(item => 
                    <ul key={item.id}>
                        <li>{item.name}</li>
                        <li>{item.category}</li>
                        <li>{item.price}</li>
                        <li>{item.description}</li>
                    </ul>
                )
            }
            <Link href='/hellosupa'>
                <div className="mt-10">
                    {'<'}목록으로{'>'}
                </div>
            </Link>
        </div>
    );
}