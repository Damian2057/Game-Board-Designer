import React, {useState} from "react";
import {Form} from "react-bootstrap";
import {ToggleComponentProps} from "../Props/ToggleComponentProps";

const ToggleComponent: React.FC<ToggleComponentProps> = ({ label, initialValue, onChange }) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = () => {
        setValue(!value);
        onChange(!value);
    };

    return (
        <div className='mt-4'>
            <Form.Group controlId={`${label}Toggle`}>
                <Form.Check
                    type="switch"
                    id={`${label.toLowerCase()}Switch`}
                    label={label}
                    checked={value}
                    onChange={handleChange}
                />
                <p className='fw-bold'>{value ? 'Admin' : 'Employee'}</p>
            </Form.Group>
        </div>

    );
};

export default ToggleComponent;