import Header from '../components/Header.jsx'
import AddExpense from '../components/AddExpense.jsx';
import {useEffect,useState} from 'react'
import axios from 'axios';
import RightPanel from '../components/RightPanel.jsx';

const DashBoard = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header/>
            <div className="max-w-7xl mx-auto p-2 sm:p-4 lg:p-6">
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                <AddExpense />
                <RightPanel />
                </div>
            </div>
        </div>
    )
}

export default DashBoard;