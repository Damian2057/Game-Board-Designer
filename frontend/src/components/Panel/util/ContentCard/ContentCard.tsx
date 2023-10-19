import { Card } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import './ContentCard.css'
import React from "react";
import {ContentCardProps} from "./Props/ContentCardProps";

const ContentCard: React.FC<ContentCardProps> = ({ linkTo, icon, title, description }) => {

    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate(linkTo);
    };

    return (
        <Card onClick={handleRedirect} id="panelCard" className="mt-5 p-2 shadow" style={{
            backgroundColor: '#7D53DE',
            borderColor: '#7D53DE',
            color: 'white',
            borderRadius: '20px'
        }}>
            <Card.Body>
                <div className="text-start flex gap-3 items-center">
                    {icon}
                </div>
                <div className="py-2">
                    <span className="fs-3 fw-bold">{title}</span>
                </div>
                <div className="font-semibold py-3">{description}</div>
            </Card.Body>
        </Card>
    )
}
export default ContentCard