import React, {useState} from "react";
import {Form} from "react-bootstrap";
import {ToggleComponentProps} from "../Props/ToggleComponentProps";

const ToggleComponent: React.FC<ToggleComponentProps> = ({ label, initialValue, labels, onChange }) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = () => {
        setValue(!value);
        onChange(!value);
    };

    return (
        <div className='mt-4'>
            <Form.Group controlId={`${label}Toggle`} className="d-flex align-items-center">
                <Form.Check
                    type="switch"
                    id={`${label.toLowerCase()}Switch`}
                    label={label}
                    checked={value}
                    onChange={handleChange}
                />
                <div className="mx-2"></div>
                <span className='fw-bold'>{value ? labels[0] : labels[1]}</span>
            </Form.Group>
        </div>
    );
};

export default ToggleComponent;