'use client'
import React from 'react';
import { useFormStatus } from 'react-dom';

interface SubmitButtonProps {
    isEditMode: boolean
}

export default function ({isEditMode} : SubmitButtonProps) {
    const { pending } = useFormStatus();
    return (
        <button type="submit"
                disabled={pending}
                className="text-white bg-blue-900 hover:bg-blue-800 
                focus:ring-4 focus:outline-none focus:ring-blue-300 
                font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 
                text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                dark:focus:ring-blue-800">
            {
                isEditMode 
                    ? (pending ? '수정중...' : '수정하기')
                    : (pending ? '추가중...' : '추가하기')
            }
        </button>
    );
}