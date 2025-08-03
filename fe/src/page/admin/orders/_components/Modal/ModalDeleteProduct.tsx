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
   
  };

  return (
    <Modal
      title="Edit product modal"
      open={isModalEditOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      closable
    >
      <h1>Do you want to delete this course</h1>
    </Modal>
  );
};

export default ModalEditProduct;
