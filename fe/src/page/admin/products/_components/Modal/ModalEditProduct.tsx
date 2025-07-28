import { useEffect, useState } from 'react';
import { Modal, Input } from 'antd';
import { AnyAction } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { courseActions } from '@/app/actions/course.actions';

const ModalEditProduct = ({ isModalEditOpen, handleCancel, setIsModalEditOpen, selectedCourse }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedCourse) {
      setName(selectedCourse.name);
      setDescription(selectedCourse.description);
    }
  }, [selectedCourse]);

  const handleOk = () => {
    const updatedCourse = {
      name,
      description
    };

    dispatch(courseActions.updateCourse(selectedCourse.id, updatedCourse) as unknown as AnyAction);
    setIsModalEditOpen(false);
  };

  return (
    <Modal
      title="Edit product modal"
      open={isModalEditOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      closable
    >
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-2"
      />
      <Input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </Modal>
  );
};

export default ModalEditProduct;
