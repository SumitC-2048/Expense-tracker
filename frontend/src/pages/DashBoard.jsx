import Header from '../components/Header.jsx'
import AddExpense from '../components/AddExpense.jsx';
import {useEffect,useState} from 'react'
import axios from 'axios';
import RightPanel from '../components/RightPanel.jsx';

const DashBoard = () => {
    return (
        <div className="min-h-screen min-h-dvh bg-gray-50 flex flex-col">
            <Header/>
            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col min-h-0 p-2 sm:p-4 lg:p-6">
                <div className="flex min-h-0 flex-1 flex-col gap-4 lg:min-h-[min(95dvh,calc(100dvh-5.5rem))] lg:flex-row lg:items-stretch lg:gap-6">
                <AddExpense />
                <RightPanel />
                </div>
            </div>
        </div>
    )
}

export default DashBoard;