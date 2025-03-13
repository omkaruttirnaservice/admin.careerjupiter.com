import React from "react";
import { useSelector } from "react-redux";

function TestResult() {
  const resultData = useSelector((state) => state.testResult?.resultData);
  if (!resultData) {
    return (
      <div className="text-center text-xl font-semibold p-6">
        Loading results...
      </div>
    );
  }

  return (
    <div className="text-center space-y-6 w-full max-w-4xl mx-auto p-4 sm:p-6">
      <h2 className="text-3xl font-bold mb-6">Test Results</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Total Questions</h3>
          <p className="text-3xl font-bold text-blue-600">
            {resultData?.result?.totalQuestions}
          </p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Wrong Answers</h3>
          <p className="text-3xl font-bold text-red-600">
            {resultData?.result?.wrongAnswers}
          </p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-2">Correct Answers</h3>
          <p className="text-3xl font-bold text-green-600">
            {resultData?.result?.correctAnswers}
          </p>
        </div>
      </div>
      <div className="bg-yellow-100 p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2">
          Total Marks / Gained Marks
        </h3>
        <p className="text-3xl font-bold text-yellow-600">
          {resultData?.result?.totalMarks} / {resultData?.result?.marksGained}
        </p>
      </div>
      <div className="bg-purple-100 p-6 rounded-lg shadow mt-6">
        <p className="mt-2 text-lg">
          You answered {resultData?.result?.correctAnswers} out of{" "}
          {resultData?.result?.totalQuestions} questions correctly.
        </p>
      </div>
    </div>
  );
}

export default TestResult;
