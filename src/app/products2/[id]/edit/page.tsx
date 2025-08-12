export const dynamic = 'force-dynamic';

export default async function ({params} : {params: Promise<{id:string}>}) {
    const { id } = await params;
    console.log(id);
    return (
        <div className='w-full h-screen flex flex-col justify-center items-center font-extrabold text-5xl'>
            ID: {id}
            <br />
            EDIT PAGE
        </div>
    );
}