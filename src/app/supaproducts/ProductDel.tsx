'use client'; // 사용자의 이벤트가 들어가기 때문에 client component
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function ProductDel({id} : {id: string}) {
    const router = useRouter();

    const handleDelete = async () => {
        if(confirm("이 상품을 삭제하시겠습니까?")) {
            
            const { error } = await supabase.from('products').delete().eq('id', id);

            if(error) {
                alert(`삭제 오류: ${error.message}`);
            }
            else {
                alert("정상적으로 삭제 되었습니다.");
                router.push('/supaproducts');
                router.refresh();
            }
        }
    }

    return (
        <div onClick={handleDelete} 
            className="rounded-full border border-solid border-black/[.08] 
                    dark:border-white/[.145] transition-colors flex items-center bg-[#0a0b42] text-white
                    justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] 
                    hover:border-transparent font-medium text-sm sm:text-base h-10 
                    sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]">
            삭제
        </div>
    );
}