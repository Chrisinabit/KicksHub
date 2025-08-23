import React, { useEffect } from 'react';

function ErrorPage() {

    const goHome = () => {
        localStorage.clear()
        window.location.href = `https://${window.location.hostname}`
    }

    useEffect(() => {
        goHome()
    },[])


    return (
        <div>
            <p>Error Loading Page</p>
        </div>
    );
}

export default ErrorPage;