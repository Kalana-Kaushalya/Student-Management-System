import React, { useState } from 'react';
import { FormControl, FormLabel, Input, Button, useToast } from '@chakra-ui/react';

const AddStudent = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    studentId: '',
    address: '',
    degree: '',
    intake: '',
    semester: ''
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    fetch('http://localhost:3001/student', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to add student');
      }
      // If successful, show toast
      toast({
        title: 'Student added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true
      });
      // Optionally, you can reset the form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        studentId: '',
        address: '',
        degree: '',
        intake: '',
        semester: ''
      });
    })
    .catch(error => {
      console.error('Error adding student:', error);
      toast({
        title: 'Failed to add student',
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    });
  };

  return (
    <div>
      <FormControl>
        <FormLabel>First Name:</FormLabel>
        <Input
          type='text'
          name='firstName'
          value={formData.firstName}
          onChange={handleChange}
        />
      </FormControl>

      {/* Repeat the same pattern for the remaining form controls */}
      <FormControl>
  <FormLabel>Last Name:</FormLabel>
  <Input
    type='text'
    name='lastName'
    value={formData.lastName}
    onChange={handleChange}
  />
</FormControl>

<FormControl>
  <FormLabel>Student ID:</FormLabel>
  <Input
    type='text'
    name='student_id'
    value={formData.student_id}
    onChange={handleChange}
  />
</FormControl>

<FormControl>
  <FormLabel>Address:</FormLabel>
  <Input
    type='text'
    name='address'
    value={formData.address}
    onChange={handleChange}
  />
</FormControl>

<FormControl>
  <FormLabel>Degree:</FormLabel>
  <Input
    type='text'
    name='degree'
    value={formData.degree}
    onChange={handleChange}
  />
</FormControl>

<FormControl>
  <FormLabel>Intake:</FormLabel>
  <Input
    type='number'
    name='intake'
    value={formData.intake}
    onChange={handleChange}
  />
</FormControl>

<FormControl>
  <FormLabel>Semester:</FormLabel>
  <Input
    type='number'
    name='semester'
    value={formData.semester}
    onChange={handleChange}
  />
</FormControl>


      <Button colorScheme='blue' onClick={handleSubmit}>ADD</Button>
    </div>
  );
};

export default AddStudent;
