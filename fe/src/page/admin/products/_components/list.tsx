import { useEffect } from 'react';
import { Space, Table } from 'antd';
import { AnyAction } from '@reduxjs/toolkit'
import { courseActions } from '@/app/actions/course.actions'
import { useDispatch, useSelector } from 'react-redux'
import { selectCourseData } from '@/app/selectors/course.selectors'
import { Button, Flex } from 'antd';
const { Column } = Table;

const App = () => {

  const dispatch = useDispatch()
  const courses = useSelector(selectCourseData)

  useEffect(() => {
    dispatch(courseActions.getCourses() as unknown as AnyAction)
  }, [dispatch])

  return (

    <Table dataSource={courses}>
      <Column title="Name" dataIndex="name" key="Name" />
      <Column title="Description" dataIndex="description" key="Description" />
      <Column
        title="Action"
        key="action"
        render={(_, record) => (
          <Space size="middle">
            <Flex gap="small" wrap>
              <Button type="primary">Add</Button>
              <Button>Eidt</Button>
              <Button type="dashed">Delete</Button>
            </Flex>
          </Space>
        )}
      />
    </Table>
  )

};
export default App;
