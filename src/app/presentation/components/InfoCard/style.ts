// @ts-ignore
import styled from 'styled-components';
import { Typography } from '@mui/material';

export const CardContainer = styled.div`
    background-color: #ffc5c5;
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    max-width: 400px;
    margin: auto;
`;

export const Title = styled(Typography)`
    color: #FAFAFA;
    font-family: 'Poppins', sans-serif;
    font-size: 0.875rem; /* 14px */
    font-style: normal;
    font-weight: 600; /* Bold */
    line-height: 120%; /* 1.05rem */
`;

export const Description = styled.p`
    font-size: 1rem;
    color: #6d3737;
`;

export const Button = styled.button`
    background-color: #632b2b;
    font-family: 'Poppins', sans-serif;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    border-radius: 8px;
    cursor: pointer;
    margin-top: 10px;
//
    &:hover {
        background-color: #502222;
    }
`;
