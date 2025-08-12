// hello2페이지를 서버 컴포넌트로 바꾸기
export const dynamic = 'force-dynamic'; // SSR: fetch니까 dynamic mode여야함!

type helloT = {
    msg: string
}

async function getFetchData(): Promise<helloT[]> {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const resp = await fetch(`${baseUrl}/api/hello`, {cache: 'no-store'}); // 서버컴포넌트에서 fetch를 하려면 {cashe:'no-store'} 옵션을 줘야 한다! => fetch니까 dynamic mode여야함!
    const data = await resp.json();
    return data;
}

export default async function Hello3Page () {
    const tdata: helloT[] = await getFetchData();
  
    return (
        <div className='w-full h-screen flex flex-col justify-center items-center font-extrabold text-5xl'>
            {tdata.map((item:helloT, idx) => <p key={idx}>{item.msg}</p>)}
        </div>
    );
}