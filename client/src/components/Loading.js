import React, { useState, useEffect } from 'react';

export const Loading = () => {

    return (
        <div className="text-center" style={{"marginTop": "10%"}}>
            <div className="spinner-grow" style={{"width": "3rem", height: "3rem"}} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};