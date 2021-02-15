import React, { useState, useEffect } from 'react';
import { getPeople } from '../../axiosApi';
import UserCards from './UserCards';

const People = () => {
    return (
        <UserCards />
    );
} 

export default People;