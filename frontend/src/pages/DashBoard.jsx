import Header from '../components/Header.jsx'
import AddExpense from '../components/AddExpense.jsx';
import {useEffect,useState} from 'react'
import axios from 'axios';
import RightPanel from '../components/RightPanel.jsx';

const DashBoard = () => {
    return (
        <div>
            <Header/>
            <div className="flex flex-col md:flex-row gap-5 p-5 justify-around">
                <AddExpense />
                <RightPanel />
            </div>
        </div>
    )
}

export default DashBoard;