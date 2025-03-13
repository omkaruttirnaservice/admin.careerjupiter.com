"use client";
import { useState, useEffect } from "react";
import {
  FaSave,
  FaArrowRight,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { OPTIONS_ENUMS } from "../../utils/constansts";
import TestClock from "./TestClock";
import { useMutation } from "@tanstack/react-query";
import { sendResult } from "../../api/IQ-api";
import { setTestResult } from "../../store-redux/testResultSlice";

const IQTest = ({ questions, testDuration, title, testId }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();

  const { userId } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: sendResult,
    onSuccess: (response) => {
      toast.success("Test submitted successfully!");
      navigate("/profile/test/?type=result");
      console.log("result after test submit", response.data);
      dispatch(setTestResult(response.data));
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  useEffect(() => {
    setResultData({
      iqTestId: testId,
      userId: userId,
      answers: questions.map((q) => ({
        questionId: q._id,
        selectedOption: "",
      })),
    });
  }, [questions, testId, userId]);

  const [resultData, setResultData] = useState({
    iqTestId: testId,
    userId: userId,
    answers: questions.map((q) => ({ questionId: q._id, selectedOption: "" })),
  });

  const handleOptionSelect = (letter) => {
    console.log({ letter });
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = letter;
    setAnswers(newAnswers);

    setResultData((prevData) => {
      const updatedAnswers = prevData.answers.map((ans) =>
        ans.questionId === questions[currentQuestion]._id
          ? { ...ans, selectedOption: letter }
          : ans
      );
      return { ...prevData, answers: updatedAnswers };
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    navigate("/profile/test/?type=result");
    console.log("Final Result Data:", resultData);
    mutation.mutate(resultData);
  };

  const handleQuestionNavigation = (index) => {
    setCurrentQuestion(index);
  };

  const renderOptions = () => {
    return [
      OPTIONS_ENUMS.OPTION_A,
      OPTIONS_ENUMS.OPTION_B,
      OPTIONS_ENUMS.OPTION_C,
      OPTIONS_ENUMS.OPTION_D,
      OPTIONS_ENUMS.OPTION_E,
    ].map((letter) => {
      const optionValue = questions[currentQuestion][`option${letter}`];
      if (!optionValue) return null;

      return (
        <label
          key={letter}
          className="flex items-center p-2 rounded bg-gray-100 hover:bg-gray-200 cursor-pointer"
        >
          <input
            type="radio"
            name="option"
            value={letter}
            checked={answers[currentQuestion] === letter}
            onChange={() => handleOptionSelect(letter)}
            className="mr-2"
          />
          {letter}. {optionValue}
        </label>
      );
    });
  };

  return (
    <>
      {!isSubmitted && (
        <div className="w-full bg-gray-100 p-4 shadow-lg rounded-xl mb-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">{title}</h1>
          <TestClock testDuration={testDuration} handleSubmit={handleSubmit} />
        </div>
      )}

      <div className="flex flex-col md:flex-row p-4 bg-gray-100">
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md mb-4 md:mb-0 md:mr-4">
          <h2 className="text-xl font-bold mb-4">
            Question {currentQuestion + 1}
          </h2>
          <p className="mb-4">{questions[currentQuestion].question}</p>
          <div className="space-y-2">{renderOptions()}</div>

          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="cursor-pointer flex items-center bg-blue-500 text-white p-2 rounded"
            >
              <FaArrowLeft className="mr-2" /> Previous
            </button>

            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={handleNext}
                className="cursor-pointer flex items-center bg-blue-500 p-2 rounded text-white"
              >
                Next <FaArrowRight className="ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="cursor-pointer flex items-center bg-green-500 p-2 rounded text-white"
              >
                <Link
                  to="/profile/test/?type=result"
                  className="flex items-center"
                >
                  Submit <FaCheckCircle className="ml-2" />
                </Link>
              </button>
            )}
          </div>
        </div>
        <div className="w-full md:w-1/4 h-[60vh] bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-bold mb-4">Questions</h2>
          <div className="grid grid-cols-4 h-[80%] overflow-auto gap-2 py-1.5">
            {questions.map((q, index) => (
              <button
                key={q._id}
                onClick={() => handleQuestionNavigation(index)}
                className={`p-2 rounded-full w-10 h-10 flex items-center justify-center ${
                  currentQuestion === index
                    ? "bg-blue-500 text-white"
                    : answers[index]
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default IQTest;
