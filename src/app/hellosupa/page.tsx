import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

export default async function HelloSupaPage () {
    // const {data, error} : {data: Product[], error: any} error는 무슨 타입을 줘야 할까?
    const {data, error} = await supabase
                                    .from('products')
                                    .select('*')
                                    //.single(); 하나만 가져옴, 배열이 아님 주의!
    
    if(error)
        return <p>데이터를 불러오는 중 에러가 발생했습니다.</p>
  
    return (
        <div className='w-full h-screen flex flex-col justify-center items-center font-extrabold text-5xl'>
            Hello Supabase!
            <div className="mt-8 flex flex-col gap-4 items-center justify-center text-2xl">
                {data && data.map(item => 
                    <div key={item.id}>
                        <Link href={`/hellosupa/${item.id}`}>
                            {item.name}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}