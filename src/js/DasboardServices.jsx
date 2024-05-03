import React, { useRef, useEffect, useState } from 'react';
import "../css/Dashboard.css";
import Export from './Export';
import { Link } from 'react-router-dom';

const { tableau } = window;

function DashdoardServices() {
    const ref = useRef(null);
    const url = "https://public.tableau.com/views/services_optimize/Dashboard2";
    const options = {
        width: window.innerWidth,
        height: window.innerHeight,
        hideToolbar: true,
        hideTabs: true
    };

    const [viz, setViz] = useState(null);
    const [exportPopupVisible, setExportPopupVisible] = useState(false);

    useEffect(() => {
        const resizeViz = () => {
            if (viz) {
                viz.setFrameSize(window.innerWidth, window.innerHeight);
            }
        };

        const initializeViz = () => {
            const vizInstance = new tableau.Viz(ref.current, url, options);
            setViz(vizInstance);
        };

        initializeViz();
        window.addEventListener('resize', resizeViz);

        return () => {
            window.removeEventListener('resize', resizeViz);
            if (viz) {
                viz.dispose();
            }
        };
    }, []);

    const refreshData = () => {
        console.log("Begin data update");
        console.log(viz);
        if (viz) {
            viz.refreshDataAsync();
            console.log("Refresh");
        }
        else{
            console.log("No viz");
        }
    };

    return (
        <div>
            <div>
                <Link to="/admin-panel"><button className='dashboard-btn' link={"/admin-panel"}>Back</button></Link>
                <button className='dashboard-btn' onClick={() => setExportPopupVisible(true)}>Export</button>
            </div>
            <div ref={ref}></div>
            {exportPopupVisible && <Export onClose={() => setExportPopupVisible(false)} />}
            <link rel="preload" href="https://public.tableau.com/vizql/v_202412404191058/javascripts/formatters-and-parsers.en_US.js" as="script" />
        </div>
    );
}

export default DashdoardServices;