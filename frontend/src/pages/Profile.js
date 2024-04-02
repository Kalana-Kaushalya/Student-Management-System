import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Heading, AvatarBadge, Stack, FormControl, FormLabel, Input, Avatar, Flex, Box, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Button, ButtonGroup, useToast } from '@chakra-ui/react';

const Profile = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false); // State to track edit mode
  const toast = useToast();

  useEffect(() => {
    fetchStudentData(studentId);
  }, [studentId]);

  const fetchStudentData = (id) => {
    fetch(`http://localhost:3001/student/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }
        return response.json();
      })
      .then(data => {
        setStudent(data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching student:', error));
  };

  const handleUpdate = () => {
    fetch(`http://localhost:3001/student/${studentId}`, {
      method: 'PATCH', // Use PATCH method for partial updates
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student), // Send the updated student data
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update student data');
      }
      toast({
        title: "Student details updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setLoading(true); // Set loading to true to trigger refetch of student data
    })
    .catch(error => {
      console.error('Error updating student:', error);
      toast({
        title: "Failed to update student.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    });
  };

  const handleDelete = () => {
    fetch(`http://localhost:3001/student/${studentId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to delete student data');
      }
      toast({
        title: "Student deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      window.location.href = '/';
    })
    .catch(error => {
      console.error('Error deleting student:', error);
      toast({
        title: "Failed to delete student.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    });
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  return (
    <div>
      <Stack direction='row' spacing={4}>
        <Avatar>
          <AvatarBadge boxSize='1.25em' bg='green.500' />
        </Avatar>
        <Heading>{`${student.firstName} ${student.lastName}`}</Heading>
      </Stack>
      <Flex gap={"10"}>
        <Box w={"50%"}>
          <Heading paddingTop={8} as='h4' size='md'>Student Details:-</Heading>
          <FormControl paddingTop={5}>
            <FormLabel>Student ID:</FormLabel>
            {editMode ? (
              <Input
                type='text'
                value={student.student_id}
                onChange={(e) => setStudent({ ...student, student_id: e.target.value })}
              />
            ) : (
              <Input type='text' value={student.student_id} readOnly />
            )}
          </FormControl>
          <FormControl paddingTop={1}>
            <FormLabel>Address:</FormLabel>
            {editMode ? (
              <Input
                type='text'
                value={student.address}
                onChange={(e) => setStudent({ ...student, address: e.target.value })}
              />
            ) : (
              <Input type='text' value={student.address} readOnly />
            )}
          </FormControl>
          <FormControl paddingTop={1}>
            <FormLabel>Degree:</FormLabel>
            {editMode ? (
              <Input
                type='text'
                value={student.degree}
                onChange={(e) => setStudent({ ...student, degree: e.target.value })}
              />
            ) : (
              <Input type='text' value={student.degree} readOnly />
            )}
          </FormControl>
          <FormControl paddingTop={1}>
            <FormLabel>Intake:</FormLabel>
            {editMode ? (
              <Input
                type='Number'
                value={student.intake}
                onChange={(e) => setStudent({ ...student, intake: e.target.value })}
              />
            ) : (
              <Input type='Number' value={student.intake} readOnly />
            )}
          </FormControl>
          <FormControl paddingTop={1}>
            <FormLabel>Semester:</FormLabel>
            {editMode ? (
              <Input
                type='Number'
                value={student.semester}
                onChange={(e) => setStudent({ ...student, semester: e.target.value })}
              />
            ) : (
              <Input type='Number' value={student.semester} readOnly />
            )}
          </FormControl>
          <Stack spacing={4} direction='row' align='center'>
            {editMode ? (
              <Button colorScheme='blue' onClick={handleUpdate}>Update</Button>
            ) : (
              <Button colorScheme='blue' onClick={() => setEditMode(true)}>Edit</Button>
            )}
            <Button colorScheme='red' onClick={handleDelete}>Delete</Button>
          </Stack>
        </Box>
        {/* Course List component */}
        <Box bg='pink.100' w={"50%"} >
          <Heading paddingTop={8} as='h4' size='md' paddingLeft={"4"}>Course List:-</Heading>
          <TableContainer>
            <Table variant='striped' colorScheme='teal'>
              <Thead>
                <Tr>
                  <Th>Course</Th>
                  <Th>Course_id</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>SE</Td>
                  <Td>CS02</Td>
                </Tr>
                <Tr>
                  <Td>RM</Td>
                  <Td>CS33</Td>
                </Tr>
                <Tr>
                  <Td>STCC</Td>
                  <Td>SE23</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </div>
  );
};

export default Profile;
