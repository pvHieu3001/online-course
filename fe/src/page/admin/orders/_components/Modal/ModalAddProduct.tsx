import React, { useState } from 'react';
import { Button, Modal, Input } from 'antd';
import { AnyAction } from '@reduxjs/toolkit'
import { useDispatch,useSelector} from 'react-redux';
import { courseActions } from '@/app/actions/course.actions';


const ModalAddProduct = ({ isModalOpen, handleCancel, setIsModalOpen }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
 const courses = useSelector((state) => state.course)
  console.log("course", courses)
  const dispatch = useDispatch();

  const handleOk = () => {
    const objProduct = {
      name,
      description
    };

    dispatch(courseActions.createCourse(objProduct)as unknown as AnyAction);
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Add product modal"
      open={isModalOpen}
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

export default ModalAddProduct;
