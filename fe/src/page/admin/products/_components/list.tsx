import { useEffect, useState } from 'react';
import { Modal, Space, Table } from 'antd';
import { AnyAction } from '@reduxjs/toolkit'
import { courseActions } from '@/app/actions/course.actions'
import { useDispatch, useSelector } from 'react-redux'
import { selectCourseData } from '@/app/selectors/course.selectors'
import { Button, Flex } from 'antd';
import ModalAddProduct from './Modal/ModalAddProduct';
const { Column } = Table;

const App = () => {

  const dispatch = useDispatch()
  const courses = useSelector(selectCourseData)

  useEffect(() => {
    dispatch(courseActions.getCourses() as unknown as AnyAction)
  }, [dispatch])

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddModal = () => {
    setIsModalOpen (true)
  }
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>

       <Button type="primary" onClick={handleAddModal}>Add</Button>
       
    <Table dataSource={courses}>
      <Column title="Name" dataIndex="name" key="Name" />
      <Column title="Description" dataIndex="description" key="Description" />
      <Column
        title="Action"
        key="action"
        render={(_, record) => (
          <Space size="middle">
            <Flex gap="small" wrap>
              <ModalAddProduct isModalOpen={isModalOpen}  handleCancel={handleCancel} setIsModalOpen={setIsModalOpen}/>
              <Button>Eidt</Button>
              <Button type="dashed">Delete</Button>
            </Flex>
          </Space>
        )}
      />
    </Table>
    </>

  )

};
export default App;
