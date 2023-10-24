import React, {useState} from "react";
import {Button, Carousel, Col, Modal} from "react-bootstrap";
import {GrClose} from "react-icons/gr";
import {Api} from "../../connector/api";
import toast from "react-hot-toast";
import UploadModal from "./UploadModal";
import {Image} from "../../model/image/image";
import {ImageDisplayProps} from "../Panel/ManageProjects/Props/ImageDisplayProps";
import {t} from "i18next";

const ImageDisplayModal: React.FC<ImageDisplayProps> = ({ show, imageIds, onClose, onSave }) => {

    const [editedImageIds, setEditedImageIds] = React.useState([] as number[]);
    const [uploadModalShow, setUploadModalShow] = useState(false);

    React.useEffect(() => {
        if (!imageIds) {
            return;
        }
        setEditedImageIds(imageIds);
    }, [imageIds]);

    const handleClick = () => {
        setUploadModalShow(true);
    };

    function handleRemoveImage(imageId: number) {
        setEditedImageIds((prevIds) => prevIds.filter((id) => id !== imageId));
        Api.image.deleteImage(imageId).then(() => {
            toast.success(t('Image removed successfully'), {icon: "👏"});
        }).catch((err) => {
            toast.error(`${err.response.data.message}`, {icon: "💀"});
        });
    }

    function handleUploadImages(data: Image[] | null) {
        if (!data) {
            return;
        }
        const newImageIds = data.map((image) => image.id);
        setEditedImageIds((prevIds) => [...prevIds, ...newImageIds]);
    }

    function handleSave() {
        onSave(editedImageIds);
        onClose();
    }

    return (
        <Modal show={show} onHide={onClose}>
            <div className='icon-position' style={{ backgroundColor: '#7D53DE' }}>
                <a onClick={onClose}>
                    <div className='icon-circle'>
                        <GrClose />
                    </div>
                </a>
            </div>
            <Col className='d-flex justify-content-center'>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Button
                        onClick={handleClick}
                        style={{
                            backgroundColor: '#ffffff',
                            borderColor: '#ffffff',
                            color: '#7D53DE',
                            borderRadius: '20px',
                            marginBottom: '1rem',
                            paddingInline: '2rem',
                            paddingBlock: '0.5rem',
                        }}
                    >{t('Choose images')}</Button>
                    <div>
                        <Carousel data-bs-theme="dark" className="d-flex justify-content-center align-items-center">
                            {editedImageIds.map((imageId, index) => (
                                <Carousel.Item key={index}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <img
                                            src={Api.image.getImageUrl(imageId)}
                                            alt={`Image ${index}`}
                                            style={{ width: 'auto', height: 'auto', maxWidth: '200px', maxHeight: '200px' }}
                                            className="mx-auto d-block"
                                        />
                                        <Button className='button-workspace' onClick={() => handleRemoveImage(imageId)}>
                                            {t('Remove')}
                                        </Button>
                                    </div>
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                    <Button
                        onClick={handleSave}
                        style={{
                            backgroundColor: '#ffffff',
                            borderColor: '#ffffff',
                            color: '#7D53DE',
                            borderRadius: '20px',
                            marginTop: '1rem',
                            paddingInline: '2rem',
                            paddingBlock: '0.5rem',
                        }}
                    >{t('Done')}</Button>
                </div>
            </Col>
            <UploadModal show={uploadModalShow} onClose={() => setUploadModalShow(false)} onSave={handleUploadImages} />
        </Modal>
    );
}

export default ImageDisplayModal;