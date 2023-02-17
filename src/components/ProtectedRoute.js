 

import React from 'react';
import { Redirect  } from "react-router-dom";

// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
const ProtectedRoute = ({ сomponent: Component, ...props  }) => {
  return (
    props.loggedIn ? <Component {...props} /> : <Redirect  to="/sing_up" />
)}

export default ProtectedRoute; 