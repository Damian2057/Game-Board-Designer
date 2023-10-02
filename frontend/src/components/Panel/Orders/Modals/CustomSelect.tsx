import {Form} from "react-bootstrap";
import React from "react";
import {CustomSelectProps} from "../Props/CustomSelectProps";


const CustomSelect: React.FC<CustomSelectProps> = ({ value, onChange, employees }) => {
    return (
        <>
            {!value && (
                <Form.Select
                    value={value}
                    onChange={onChange}
                >
                    {employees.map((user) => (
                        <option key={user.id} value={user.email}>
                            {user.email}
                        </option>
                    ))}
                </Form.Select>
            )}
            {value && (
                <Form.Control
                    as="select"
                    defaultValue="None"
                    onChange={onChange}
                >
                    <option value="None">None</option>
                    {employees.map((user) => (
                        <option key={user.id} value={user.email}>
                            {user.email}
                        </option>
                    ))}
                </Form.Control>
            )}
        </>
    );
}

export default CustomSelect;