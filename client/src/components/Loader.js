import React, { useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import 'bootstrap/dist/css/bootstrap.min.css';
function Loader() {
    let [loading, setLoading] = useState(true);

    return (
        <div style={{marginTop:'150px', display: 'flex', justifyContent: 'center'}}>

            <div className="sweet-loading">
                <HashLoader color="#000" loading={loading} css='' size={80} />
            </div>
        </div>
    );
}

export default Loader;