import React from 'react';

const AppContext = React.createContext(
    {
        studentId: "",
        infoStudent: [],
        getID: (studentId) => { }
    }
);

export default AppContext;