import React from 'react';
import { useRouter } from 'next/router';

const HeadPanel = () => {
    const router = useRouter();

    let pageTitle;
    switch (router.pathname) {
        case '/homepage':
            pageTitle = 'Dashboard';
            break;
        case '/calendar':
            pageTitle = 'Your Calendar';
            break;
        case '/timetable':
            pageTitle = 'Your Timetable';
            break;
        default:
            pageTitle = 'Dashboard';
    }

    return (
        <div className="head-panel">
            <h1>{pageTitle}</h1>
        </div>
    );
};

export default HeadPanel;
