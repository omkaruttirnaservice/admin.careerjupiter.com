import React, { useState } from "react";

const UploadExcelTest = () => {
  const [questions, setQuestions] = useState([
    { id: 1, question: "What is React?", options: ["Library", "Framework", "Language", "None"], answer: "Library", marks: 2 },
    { id: 2, question: "What is JSX?", options: ["JS", "XML", "Both", "None"], answer: "Both", marks: 3 },
  ]);

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg mt-4">
      <h3 className="text-xl font-bold mb-4">Upload Excel</h3>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Question</th>
            <th className="border p-2">Option 1</th>
            <th className="border p-2">Option 2</th>
            <th className="border p-2">Option 3</th>
            <th className="border p-2">Option 4</th>
            <th className="border p-2">Answer</th>
            <th className="border p-2">Marks</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q.id} className="text-center">
              <td className="boredr p-2">{q.question}</td>
              <td className="boredr p-2">{q.options[0]}</td>
              <td className="boredr p-2">{q.options[1]}</td>
              <td className="boredr p-2">{q.options[2]}</td>
              <td className="boredr p-2">{q.options[3]}</td>
              <td className="boredr p-2">{q.answer}</td>
              <td className="boredr p-2">{q.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UploadExcelTest;
