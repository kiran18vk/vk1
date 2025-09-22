import React, { useState } from 'react';
import { BookOpen, Clock, Star, Trophy, CheckCircle, XCircle } from 'lucide-react';
import { Quiz, Question } from '../types';

interface QuizzesProps {
  onQuizComplete: (quizId: string, score: number) => void;
}

export default function Quizzes({ onQuizComplete }: QuizzesProps) {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  const quizzes: Quiz[] = [
    {
      id: '1',
      title: 'Climate Change Basics',
      category: 'Environment',
      difficulty: 'easy',
      points: 30,
      coins: 12,
      questions: [
        {
          id: '1',
          question: 'What is the main cause of climate change?',
          options: [
            'Natural weather patterns',
            'Greenhouse gas emissions from human activities',
            'Solar radiation changes',
            'Ocean currents'
          ],
          correctAnswer: 1,
          explanation: 'Human activities, particularly burning fossil fuels, release greenhouse gases that trap heat in the atmosphere.'
        },
        {
          id: '2',
          question: 'Which gas contributes most to global warming?',
          options: [
            'Oxygen',
            'Nitrogen',
            'Carbon dioxide',
            'Hydrogen'
          ],
          correctAnswer: 2,
          explanation: 'Carbon dioxide (CO2) is the most significant greenhouse gas contributing to global warming.'
        },
        {
          id: '3',
          question: 'What can individuals do to reduce their carbon footprint?',
          options: [
            'Use more electricity',
            'Drive more often',
            'Use renewable energy and reduce consumption',
            'Buy more products'
          ],
          correctAnswer: 2,
          explanation: 'Using renewable energy, reducing consumption, and making sustainable choices help reduce individual carbon footprints.'
        }
      ]
    },
    {
      id: '2',
      title: 'Renewable Energy',
      category: 'Energy',
      difficulty: 'medium',
      points: 50,
      coins: 20,
      questions: [
        {
          id: '1',
          question: 'Which of these is NOT a renewable energy source?',
          options: [
            'Solar power',
            'Wind power',
            'Coal',
            'Hydroelectric power'
          ],
          correctAnswer: 2,
          explanation: 'Coal is a fossil fuel and not renewable. Solar, wind, and hydroelectric are all renewable energy sources.'
        },
        {
          id: '2',
          question: 'What is the main advantage of solar panels?',
          options: [
            'They work only at night',
            'They convert sunlight directly into electricity',
            'They require fossil fuels',
            'They produce pollution'
          ],
          correctAnswer: 1,
          explanation: 'Solar panels convert sunlight directly into electricity without producing pollution or requiring fossil fuels.'
        }
      ]
    },
    {
      id: '3',
      title: 'Waste Management',
      category: 'Waste',
      difficulty: 'easy',
      points: 25,
      coins: 10,
      questions: [
        {
          id: '1',
          question: 'What does the "3 Rs" stand for in waste management?',
          options: [
            'Read, Write, Recite',
            'Reduce, Reuse, Recycle',
            'Run, Rest, Repeat',
            'Red, Green, Blue'
          ],
          correctAnswer: 1,
          explanation: 'The 3 Rs of waste management are Reduce, Reuse, and Recycle - the hierarchy for managing waste sustainably.'
        },
        {
          id: '2',
          question: 'How long does it take for a plastic bottle to decompose?',
          options: [
            '1 year',
            '10 years',
            '100 years',
            '450+ years'
          ],
          correctAnswer: 3,
          explanation: 'Plastic bottles can take 450+ years to decompose, which is why reducing plastic use and recycling is so important.'
        }
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestion < selectedQuiz!.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz complete
      const correctAnswers = newAnswers.reduce((count, answer, index) => {
        return count + (answer === selectedQuiz!.questions[index].correctAnswer ? 1 : 0);
      }, 0);
      
      const score = Math.round((correctAnswers / selectedQuiz!.questions.length) * 100);
      onQuizComplete(selectedQuiz!.id, score);
      setQuizComplete(true);
    }
  };

  const handleShowResult = () => {
    setShowResult(true);
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setQuizComplete(false);
  };

  if (selectedQuiz && !quizComplete) {
    const question = selectedQuiz.questions[currentQuestion];
    const isCorrect = selectedAnswer === question.correctAnswer;

    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Quiz Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{selectedQuiz.title}</h2>
                <p className="text-blue-100 mt-1">
                  Question {currentQuestion + 1} of {selectedQuiz.questions.length}
                </p>
              </div>
              <button
                onClick={resetQuiz}
                className="text-blue-100 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-blue-400 rounded-full h-2">
                <div
                  className="bg-white h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / selectedQuiz.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Question Content */}
          <div className="p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              {question.question}
            </h3>

            <div className="space-y-3 mb-6">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedAnswer === index
                      ? showResult
                        ? index === question.correctAnswer
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : 'border-red-500 bg-red-50 text-red-800'
                        : 'border-blue-500 bg-blue-50'
                      : showResult && index === question.correctAnswer
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === index
                        ? showResult
                          ? index === question.correctAnswer
                            ? 'border-green-500 bg-green-500'
                            : 'border-red-500 bg-red-500'
                          : 'border-blue-500 bg-blue-500'
                        : showResult && index === question.correctAnswer
                        ? 'border-green-500 bg-green-500'
                        : 'border-gray-300'
                    }`}>
                      {showResult && (
                        selectedAnswer === index
                          ? index === question.correctAnswer
                            ? <CheckCircle className="w-4 h-4 text-white" />
                            : <XCircle className="w-4 h-4 text-white" />
                          : index === question.correctAnswer
                          ? <CheckCircle className="w-4 h-4 text-white" />
                          : null
                      )}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {showResult && (
              <div className={`p-4 rounded-lg mb-6 ${
                isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-start space-x-3">
                  {isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className={`font-medium ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </p>
                    <p className={`text-sm mt-1 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                      {question.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <div className="text-sm text-gray-500">
                {selectedAnswer !== null && !showResult && (
                  <span>Click "Check Answer" to see the result</span>
                )}
              </div>
              <div className="space-x-3">
                {selectedAnswer !== null && !showResult && (
                  <button
                    onClick={handleShowResult}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Check Answer
                  </button>
                )}
                {showResult && (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all"
                  >
                    {currentQuestion < selectedQuiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (quizComplete && selectedQuiz) {
    const correctAnswers = answers.reduce((count, answer, index) => {
      return count + (answer === selectedQuiz.questions[index].correctAnswer ? 1 : 0);
    }, 0);
    const score = Math.round((correctAnswers / selectedQuiz.questions.length) * 100);

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
          <p className="text-gray-600 mb-6">Great job on completing "{selectedQuiz.title}"</p>
          
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{score}%</div>
              <div className="text-sm text-gray-600">Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{selectedQuiz.points}</div>
              <div className="text-sm text-gray-600">Points Earned</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500">{selectedQuiz.coins}</div>
              <div className="text-sm text-gray-600">Coins Earned</div>
            </div>
          </div>
          
          <div className="text-center mb-6">
            <p className="text-gray-600">
              You answered {correctAnswers} out of {selectedQuiz.questions.length} questions correctly!
            </p>
          </div>
          
          <button
            onClick={resetQuiz}
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all font-medium"
          >
            Take Another Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Knowledge Quizzes</h2>
        <div className="text-sm text-gray-600">
          Test your eco-knowledge and earn rewards!
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer"
            onClick={() => setSelectedQuiz(quiz)}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz.difficulty)}`}>
                  {quiz.difficulty}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{quiz.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{quiz.category}</p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-gray-600">{quiz.points} pts</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                    <span className="text-gray-600">{quiz.coins} coins</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{quiz.questions.length} questions</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}