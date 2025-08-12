'use client'; // 사용자의 이벤트가 들어가기 때문에 client component
import { useRouter } from 'next/navigation';
import React from 'react';

export default function ProductDel({id} : {id: string}) {
    const router = useRouter();

    const handleDelete = async () => {
        if(confirm("이 상품을 삭제하시겠습니까?")) {
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
            const resp =  await fetch(`${baseUrl}/api/products/${id}`, {
                method: 'DELETE'
            });

            if(resp.ok) {
                alert("정상적으로 삭제 되었습니다.");
                router.push('/products2');
                router.refresh();
            }
            else {
                const data = await resp.json();
                alert(`삭제 실패: ${data.message() || '알 수 없는 오류'}`);
            }
        }
    }

    return (
        <div onClick={handleDelete} 
            className="rounded-3xl bg-blue-950 text-white font-medium px-4 py-2">
            삭제
        </div>
    );
}