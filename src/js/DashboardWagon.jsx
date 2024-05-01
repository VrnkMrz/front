import React, { useRef, useEffect, useState } from 'react';
import "../css/Dashboard.css";
import Export from './Export'; 
import { Link } from 'react-router-dom';

const { tableau } = window;

function DashboardWagons() {
    const ref = useRef(null);
    const url = "https://public.tableau.com/views/wagon_17142443347190/Dashboard3";
    let viz;
    const [exportPopupVisible, setExportPopupVisible] = useState(false); 

    useEffect(() => {
        const options = {
            width: window.innerWidth,
            height: window.innerHeight,
            hideToolbar: true,
            hideTabs: true
        };

        const resizeViz = () => {
            viz.setFrameSize(window.innerWidth, window.innerHeight);
        };

        viz = new tableau.Viz(ref.current, url, options);

        window.addEventListener('resize', resizeViz);

        return () => {
            window.removeEventListener('resize', resizeViz);
            viz.dispose();
        };
    }, []); 

 const refreshData = () => { 
        console.log("Begin data update");
        viz.refreshDataAsync((err) => {
            if (err) {
                console.error('Помилка під час оновлення даних:', err);
            } else {
                console.log('Підключення до бази даних оновлено успішно');
                viz.getWorkbook().getActiveSheet().getWorksheets().forEach(worksheet => {
                    worksheet.getFiltersAsync().then(filters => {
                        filters.forEach(filter => {
                            filter.clearAsync();
                        });
                    });
                });
            }
        });
    };

    return (
        <div>
            <div>
            <Link to="/admin-panel"><button className='dashboard-btn' link={"/admin-panel"}>Back</button></Link>
                <button className='dashboard-btn' onClick={refreshData}>Data update</button>
                <button className='dashboard-btn' onClick={() => setExportPopupVisible(true)}>Export</button>
            </div>
            <div ref={ref}></div> 
            {exportPopupVisible && <Export onClose={() => setExportPopupVisible(false)} />}
            <link rel="preload" href="https://public.tableau.com/vizql/v_202412404191058/javascripts/formatters-and-parsers.en_US.js" as="script" />
        </div>
    );
}

export default DashboardWagons;
