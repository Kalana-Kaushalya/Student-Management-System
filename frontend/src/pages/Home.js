import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import { Button, ButtonGroup, IconButton } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const Home = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/student/")
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
        setLoading(false); // Set loading to false after fetching data
      })
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  return (
    <div>
      <h4>Students</h4>
      <ButtonGroup size='sm' isAttached variant='outline' paddingTop={"5"}>
        <Button>ADD</Button>
        {/* Link to the AddStudent page */}
        <Link to="/AddStudent">
          <IconButton aria-label='Add New' icon={<AddIcon />} />
        </Link>
      </ButtonGroup>
      <TableContainer paddingTop={"5"}>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Student_id</Th>
              <Th>Degree</Th>
            </Tr>
          </Thead>
          <Tbody>
            {students.map((student) => (
              <Tr key={student._id}>
                <Td>
                  <Link to={`/profile/${student.student_id}`}>
                    {`${student.firstName} ${student.lastName}`}
                  </Link>
                </Td>
                <Td>{student.student_id}</Td>
                <Td>{student.degree}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Home;
