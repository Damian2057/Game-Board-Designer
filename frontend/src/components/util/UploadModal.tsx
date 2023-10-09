import React from "react";
import toast from "react-hot-toast";
import {Button, Col, Form, Modal} from "react-bootstrap";
import {GrClose} from "react-icons/gr";
import {UploadProps} from "./UploadProps";
import {Api} from "../../connector/api";


const UploadModal: React.FC<UploadProps> = ({show, onClose, onSave }) => {

    const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles: FileList | null = event.target.files;

        if (selectedFiles) {
            const formData = new FormData();
            for (const element of selectedFiles) {
                formData.append('file', element);
            }
            Api.image.uploadImage(formData)
                .then((images) => {
                    onSave(images);
                }).catch((err) => {
                toast.error(`${err.response.data.message}`, {icon: '💀'});
            });
        }
    };

    const handleClick = () => {
        const fileInput = document.querySelector('input[type=file]') as HTMLInputElement;
        if (fileInput) {
            fileInput.click();
        }
    };

    return (
        <Modal show={show} onHide={onClose} className='text-white'>
            <div className='icon-position rounded-md' style={{ backgroundColor: '#7D53DE' }}>
                <a onClick={onClose} >
                    <div className='icon-circle' >
                        <GrClose />
                    </div>
                </a>
            </div>
            <Modal.Title className='fs-2 fw-bold text-center' style={{ backgroundColor: '#7D53DE' }}>Upload Image</Modal.Title>
            <div className='game-info rounded'>
                <Modal.Body className=' fs-5 rounded-md'>
                    <Form as={Col} lg={8} className='mx-auto mb-5'>
                        <Col>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageSelect}
                                style={{ display: 'none' }}
                            />
                            <Button
                                onClick={handleClick}
                                style={{
                                    backgroundColor: '#ffffff',
                                    borderColor: '#ffffff',
                                    borderRadius: '20px',
                                    marginBottom: '1rem',
                                    paddingInline: '2rem',
                                    paddingBlock: '0.5rem',
                                    display: 'block',
                                    margin: '0 auto',
                                    color: 'black',
                                }}
                            >Choose images
                            </Button>
                        </Col>
                    </Form>
                </Modal.Body>
            </div>
        </Modal>
    )
}

export default UploadModal;