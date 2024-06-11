import React, { useState } from "react";
import { Container, VStack, Input, Button, Text, Textarea, useToast } from "@chakra-ui/react";
import { FaDollarSign } from "react-icons/fa";
import axios from "axios";

const Index = () => {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [advice, setAdvice] = useState("");
  const toast = useToast();

  const handleGetAdvice = async () => {
    if (!income || !expenses) {
      toast({
        title: "Input Error",
        description: "Please enter both income and expenses.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await axios.post("/api/get-advice", {
        income,
        expenses,
      });

      setAdvice(response.data.advice);
    } catch (error) {
      toast({
        title: "API Error",
        description: "There was an error fetching advice. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Personal Finance Advisor</Text>
        <Input placeholder="Enter your monthly income" value={income} onChange={(e) => setIncome(e.target.value)} size="lg" />
        <Input placeholder="Enter your monthly expenses" value={expenses} onChange={(e) => setExpenses(e.target.value)} size="lg" />
        <Button leftIcon={<FaDollarSign />} colorScheme="teal" size="lg" onClick={handleGetAdvice}>
          Get Advice
        </Button>
        {advice && <Textarea value={advice} readOnly size="lg" />}
      </VStack>
    </Container>
  );
};

export default Index;
