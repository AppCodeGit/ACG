// app/pages/StudentPortal/CourseQuiz.tsx
"use client";

import { useState, useEffect } from "react";
import "./style/CourseQuiz.css";

// Types
interface Course {
  id: string;
  name: string;
  color: string;
}

interface Quiz {
  id: number;
  title: string;
  course: string;
  description: string;
  duration: number;
  questions: number;
  points: number;
  difficulty: string;
  status: string;
  score: number | null;
  attempts: number;
  maxAttempts: number;
  dueDate: string;
  timeLeft: string;
  instructor: string;
  topics: string[];
  averageScore: number;
  participants: number;
  lastAttempt: string | null;
}

interface Question {
  id: number;
  question: string;
  type: string;
  options?: string[];
  correctAnswer?: number;
  points: number;
  explanation?: string;
}

interface QuizResults {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
}

interface QuizData {
  courses: Course[];
  quizzes: Quiz[];
  questions: Question[];
}

// Type for difficulty colors
type DifficultyColors = {
  [key: string]: string;
};

// Type for status colors
type StatusColors = {
  [key: string]: string;
};

const CourseQuiz = () => {
  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number | string }>({});
  const [timeLeft, setTimeLeft] = useState<number>(0);

  // Sample quiz data
  const quizData: QuizData = {
    courses: [
      { id: "web-dev", name: "Web Development", color: "#e9691e" },
      { id: "javascript", name: "Advanced JavaScript", color: "#4CAF50" },
      { id: "react", name: "React Masterclass", color: "#61dafb" },
      { id: "database", name: "Database Systems", color: "#FF6B6B" }
    ],
    quizzes: [
      {
        id: 1,
        title: "HTML & CSS Fundamentals",
        course: "web-dev",
        description: "Test your knowledge of HTML structure and CSS styling techniques",
        duration: 30,
        questions: 20,
        points: 100,
        difficulty: "beginner",
        status: "completed",
        score: 85,
        attempts: 2,
        maxAttempts: 3,
        dueDate: "2024-02-10",
        timeLeft: "Completed",
        instructor: "Dr. Sarah Chen",
        topics: ["HTML Semantics", "CSS Selectors", "Box Model", "Responsive Design"],
        averageScore: 72,
        participants: 1247,
        lastAttempt: "2024-02-08"
      },
      {
        id: 2,
        title: "JavaScript ES6+ Features",
        course: "javascript",
        description: "Advanced JavaScript concepts including ES6+ features and modern syntax",
        duration: 45,
        questions: 25,
        points: 150,
        difficulty: "intermediate",
        status: "in-progress",
        score: null,
        attempts: 1,
        maxAttempts: 2,
        dueDate: "2024-02-15",
        timeLeft: "3 days",
        instructor: "Prof. Michael Rodriguez",
        topics: ["Arrow Functions", "Destructuring", "Promises", "Async/Await"],
        averageScore: 68,
        participants: 892,
        lastAttempt: "2024-02-05"
      },
      {
        id: 3,
        title: "React Hooks & State Management",
        course: "react",
        description: "Comprehensive quiz on React Hooks, Context API, and state management patterns",
        duration: 60,
        questions: 30,
        points: 200,
        difficulty: "advanced",
        status: "not-started",
        score: null,
        attempts: 0,
        maxAttempts: 2,
        dueDate: "2024-02-20",
        timeLeft: "8 days",
        instructor: "Dr. Emily Watson",
        topics: ["useState", "useEffect", "Custom Hooks", "Context API"],
        averageScore: 65,
        participants: 567,
        lastAttempt: null
      },
      {
        id: 4,
        title: "Database Normalization",
        course: "database",
        description: "Test your understanding of database normalization forms and relational design",
        duration: 40,
        questions: 22,
        points: 120,
        difficulty: "intermediate",
        status: "overdue",
        score: null,
        attempts: 0,
        maxAttempts: 1,
        dueDate: "2024-02-05",
        timeLeft: "Overdue",
        instructor: "Prof. James Wilson",
        topics: ["1NF", "2NF", "3NF", "Relationships"],
        averageScore: 58,
        participants: 734,
        lastAttempt: null
      },
      {
        id: 5,
        title: "CSS Layout Systems",
        course: "web-dev",
        description: "Master Flexbox, Grid, and modern CSS layout techniques",
        duration: 35,
        questions: 18,
        points: 90,
        difficulty: "beginner",
        status: "completed",
        score: 92,
        attempts: 1,
        maxAttempts: 3,
        dueDate: "2024-01-30",
        timeLeft: "Completed",
        instructor: "Dr. Sarah Chen",
        topics: ["Flexbox", "CSS Grid", "Positioning", "Alignment"],
        averageScore: 75,
        participants: 1045,
        lastAttempt: "2024-01-28"
      },
      {
        id: 6,
        title: "JavaScript Algorithms",
        course: "javascript",
        description: "Algorithmic thinking and problem-solving with JavaScript",
        duration: 50,
        questions: 28,
        points: 180,
        difficulty: "advanced",
        status: "not-started",
        score: null,
        attempts: 0,
        maxAttempts: 2,
        dueDate: "2024-02-25",
        timeLeft: "13 days",
        instructor: "Prof. Michael Rodriguez",
        topics: ["Sorting", "Searching", "Recursion", "Complexity"],
        averageScore: 62,
        participants: 423,
        lastAttempt: null
      }
    ],
    questions: [
      {
        id: 1,
        question: "What is the purpose of the HTML5 semantic element <article>?",
        type: "multiple-choice",
        options: [
          "To define a section of navigation links",
          "To represent a self-contained composition in a document",
          "To create a sidebar for supplementary content",
          "To define a section of introductory content"
        ],
        correctAnswer: 1,
        points: 5,
        explanation: "The <article> element represents a self-contained composition that is independently distributable or reusable."
      },
      {
        id: 2,
        question: "Which CSS property is used to create space between the element's border and its content?",
        type: "multiple-choice",
        options: [
          "margin",
          "padding",
          "border-spacing",
          "gap"
        ],
        correctAnswer: 1,
        points: 5,
        explanation: "Padding creates space between the element's border and its content, while margin creates space outside the border."
      },
      {
        id: 3,
        question: "What will be the output of the following code?\n\nconsole.log(typeof null);",
        type: "multiple-choice",
        options: [
          "'null'",
          "'undefined'",
          "'object'",
          "'boolean'"
        ],
        correctAnswer: 2,
        points: 5,
        explanation: "In JavaScript, typeof null returns 'object', which is a known historical bug in the language."
      },
      {
        id: 4,
        question: "Explain the concept of 'props' in React and how they are used in component communication.",
        type: "essay",
        points: 10,
        explanation: "Props (properties) are a way to pass data from parent to child components in React, enabling component reusability and communication."
      }
    ]
  };

  const getDifficultyColor = (difficulty: string): string => {
    const colors: DifficultyColors = {
      'beginner': '#4CAF50',
      'intermediate': '#FF9800',
      'advanced': '#F44336'
    };
    return colors[difficulty] || '#666';
  };

  const getStatusColor = (status: string): string => {
    const colors: StatusColors = {
      'completed': '#4CAF50',
      'in-progress': '#2196F3',
      'not-started': '#9E9E9E',
      'overdue': '#F44336'
    };
    return colors[status] || '#666';
  };

  const getTimeLeftColor = (timeLeft: string): string => {
    if (timeLeft === 'Overdue') return '#F44336';
    if (timeLeft === 'Completed') return '#4CAF50';
    if (timeLeft.includes('hour') || (timeLeft.includes('day') && parseInt(timeLeft) <= 2)) return '#FF9800';
    return '#2196F3';
  };

  const startQuiz = (quiz: Quiz): void => {
    setActiveQuiz(quiz);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setQuizResults(null);
    setTimeLeft(quiz.duration * 60);
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number | string): void => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const nextQuestion = (): void => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const prevQuestion = (): void => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitQuiz = (): void => {
    let score = 0;
    let correctAnswers = 0;
    
    quizData.questions.forEach((question: Question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        score += question.points;
        correctAnswers++;
      }
    });

    const totalScore = Math.round((score / quizData.questions.reduce((sum: number, q: Question) => sum + q.points, 0)) * 100);
    
    setQuizResults({
      score: totalScore,
      correctAnswers,
      totalQuestions: quizData.questions.length,
      timeSpent: (activeQuiz!.duration * 60) - timeLeft
    });
  };

  const exitQuiz = (): void => {
    setActiveQuiz(null);
    setQuizResults(null);
  };

  const filteredQuizzes = quizData.quizzes.filter((quiz: Quiz) => {
    const matchesCourse = selectedCourse === 'all' || quiz.course === selectedCourse;
    const matchesStatus = selectedStatus === 'all' || quiz.status === selectedStatus;
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCourse && matchesStatus && matchesSearch;
  });

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeQuiz && timeLeft > 0 && !quizResults) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            submitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [activeQuiz, timeLeft, quizResults]);

  if (activeQuiz && !quizResults) {
    const currentQ = quizData.questions[currentQuestion];
    
    return (
      <div className="quiz-taking-container">
        {/* Quiz Header */}
        <div className="quiz-header">
          <div className="quiz-info">
            <h2>{activeQuiz.title}</h2>
            <p>Question {currentQuestion + 1} of {quizData.questions.length}</p>
          </div>
          <div className="quiz-timer">
            <div className="timer-circle">
              <svg width="60" height="60" viewBox="0 0 60 60">
                <circle cx="30" cy="30" r="27" stroke="#e9ecef" strokeWidth="4" fill="none" />
                <circle 
                  cx="30" cy="30" r="27" 
                  stroke="#e9691e" 
                  strokeWidth="4" 
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="169.646"
                  strokeDashoffset={169.646 - (169.646 * timeLeft) / (activeQuiz.duration * 60)}
                  transform="rotate(-90 30 30)"
                />
              </svg>
              <span className="time-text">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="quiz-progress">
          <div 
            className="progress-fill"
            style={{ width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }}
          ></div>
        </div>

        {/* Question */}
        <div className="question-container">
          <div className="question-header">
            <span className="question-number">Question {currentQuestion + 1}</span>
            <span className="question-points">{currentQ.points} points</span>
          </div>
          
          <div className="question-content">
            <h3>{currentQ.question}</h3>
            
            {currentQ.type === 'multiple-choice' ? (
              <div className="options-container">
                {currentQ.options?.map((option: string, index: number) => (
                  <div 
                    key={index}
                    className={`option ${selectedAnswers[currentQ.id] === index ? 'selected' : ''}`}
                    onClick={() => handleAnswerSelect(currentQ.id, index)}
                  >
                    <div className="option-indicator">
                      {selectedAnswers[currentQ.id] === index ? '●' : '○'}
                    </div>
                    <span className="option-text">{option}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="essay-container">
                <textarea 
                  placeholder="Type your answer here..."
                  rows={8}
                  value={selectedAnswers[currentQ.id] as string || ''}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleAnswerSelect(currentQ.id, e.target.value)}
                ></textarea>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="quiz-navigation">
          <button 
            className="nav-btn secondary"
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
          >
            <i className="bi bi-arrow-left"></i>
            Previous
          </button>
          
          <div className="navigation-info">
            <span>{currentQuestion + 1} / {quizData.questions.length}</span>
          </div>

          {currentQuestion === quizData.questions.length - 1 ? (
            <button 
              className="nav-btn primary"
              onClick={submitQuiz}
            >
              Submit Quiz
              <i className="bi bi-send"></i>
            </button>
          ) : (
            <button 
              className="nav-btn primary"
              onClick={nextQuestion}
            >
              Next
              <i className="bi bi-arrow-right"></i>
            </button>
          )}
        </div>

        {/* Exit Button */}
        <button className="exit-quiz-btn" onClick={exitQuiz}>
          <i className="bi bi-x-circle"></i>
          Exit Quiz
        </button>
      </div>
    );
  }

  if (quizResults) {
    return (
      <div className="quiz-results-container">
        <div className="results-card">
          <div className="results-header">
            <div className="results-icon">
              {quizResults.score >= 80 ? '🎉' : quizResults.score >= 60 ? '👍' : '📚'}
            </div>
            <h2>Quiz Completed!</h2>
            <p>You have completed {activeQuiz?.title}</p>
          </div>

          <div className="results-score">
            <div className="score-circle">
              <div className="score-value">{quizResults.score}%</div>
              <div className="score-label">Final Score</div>
            </div>
          </div>

          <div className="results-details">
            <div className="result-item">
              <span className="result-label">Correct Answers</span>
              <span className="result-value">{quizResults.correctAnswers}/{quizResults.totalQuestions}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Time Spent</span>
              <span className="result-value">{Math.floor(quizResults.timeSpent / 60)}:{(quizResults.timeSpent % 60).toString().padStart(2, '0')}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Class Average</span>
              <span className="result-value">{activeQuiz?.averageScore}%</span>
            </div>
          </div>

          <div className="results-actions">
            <button className="action-btn secondary" onClick={exitQuiz}>
              <i className="bi bi-list"></i>
              Back to Quizzes
            </button>
            <button className="action-btn primary">
              <i className="bi bi-eye"></i>
              Review Answers
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="course-quiz-container">
      {/* Header Section */}
      <div className="quiz-header-section">
        <div className="header-content">
          <h1>Course Quizzes</h1>
          <p>Test your knowledge and track your learning progress</p>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <div className="stat-icon">📝</div>
            <div className="stat-info">
              <span className="stat-number">{quizData.quizzes.length}</span>
              <span className="stat-label">Total Quizzes</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <span className="stat-number">
                {quizData.quizzes.filter((q: Quiz) => q.status === 'completed').length}
              </span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <span className="stat-number">
                {Math.round(quizData.quizzes.filter((q: Quiz) => q.score).reduce((acc: number, q: Quiz) => acc + (q.score || 0), 0) / 
                 quizData.quizzes.filter((q: Quiz) => q.score).length)}%
              </span>
              <span className="stat-label">Avg. Score</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏰</div>
            <div className="stat-info">
              <span className="stat-number">
                {quizData.quizzes.filter((q: Quiz) => q.status === 'overdue').length}
              </span>
              <span className="stat-label">Overdue</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="quiz-filters">
        <div className="search-box">
          <i className="bi bi-search"></i>
          <input
            type="text"
            placeholder="Search quizzes..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <select 
            value={selectedCourse} 
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCourse(e.target.value)}
          >
            <option value="all">All Courses</option>
            {quizData.courses.map((course: Course) => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <select 
            value={selectedStatus} 
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>

      {/* Quizzes Grid */}
      <div className="quizzes-grid">
        {filteredQuizzes.length === 0 ? (
          <div className="no-quizzes">
            <i className="bi bi-clipboard"></i>
            <h3>No quizzes found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          filteredQuizzes.map((quiz: Quiz) => (
            <div key={quiz.id} className="quiz-card">
              {/* Card Header */}
              <div className="card-header">
                <div className="course-badge" style={{ 
                  backgroundColor: quizData.courses.find((c: Course) => c.id === quiz.course)?.color 
                }}>
                  {quizData.courses.find((c: Course) => c.id === quiz.course)?.name}
                </div>
                <div className="card-actions">
                  <span 
                    className="difficulty-badge"
                    style={{ backgroundColor: getDifficultyColor(quiz.difficulty) }}
                  >
                    {quiz.difficulty}
                  </span>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(quiz.status) }}
                  >
                    {quiz.status.replace('-', ' ')}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="card-content">
                <h3 className="quiz-title">{quiz.title}</h3>
                <p className="quiz-description">{quiz.description}</p>
                
                <div className="quiz-meta">
                  <div className="meta-item">
                    <i className="bi bi-person"></i>
                    <span>{quiz.instructor}</span>
                  </div>
                  <div className="meta-item">
                    <i className="bi bi-clock"></i>
                    <span>{quiz.duration} min</span>
                  </div>
                  <div className="meta-item">
                    <i className="bi bi-question-circle"></i>
                    <span>{quiz.questions} questions</span>
                  </div>
                  <div className="meta-item">
                    <i className="bi bi-coin"></i>
                    <span>{quiz.points} points</span>
                  </div>
                </div>

                {/* Topics */}
                <div className="topics-list">
                  <h5>Topics Covered:</h5>
                  <div className="topics-tags">
                    {quiz.topics.map((topic: string, index: number) => (
                      <span key={index} className="topic-tag">{topic}</span>
                    ))}
                  </div>
                </div>

                {/* Progress for in-progress quizzes */}
                {quiz.status === 'in-progress' && (
                  <div className="progress-section">
                    <div className="progress-header">
                      <span>Attempt {quiz.attempts} of {quiz.maxAttempts}</span>
                      <span>Continue where you left off</span>
                    </div>
                  </div>
                )}

                {/* Score for completed quizzes */}
                {quiz.status === 'completed' && quiz.score && (
                  <div className="score-section">
                    <div className="score-display">
                      <span className="score-value">{quiz.score}%</span>
                      <span className="score-label">Your Score</span>
                    </div>
                    <div className="score-comparison">
                      <span>Class Average: {quiz.averageScore}%</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer */}
              <div className="card-footer">
                <div className="due-date-section">
                  <div className="due-date">
                    <i className="bi bi-calendar"></i>
                    <span>Due: {new Date(quiz.dueDate).toLocaleDateString()}</span>
                  </div>
                  <div 
                    className="time-left"
                    style={{ color: getTimeLeftColor(quiz.timeLeft) }}
                  >
                    <i className="bi bi-clock"></i>
                    <span>{quiz.timeLeft}</span>
                  </div>
                </div>
                
                <div className="action-buttons">
                  <button className="btn secondary">
                    <i className="bi bi-eye"></i>
                    Preview
                  </button>
                  
                  {quiz.status === 'completed' ? (
                    <button className="btn success">
                      <i className="bi bi-check-circle"></i>
                      Review
                    </button>
                  ) : quiz.status === 'in-progress' ? (
                    <button 
                      className="btn primary"
                      onClick={() => startQuiz(quiz)}
                    >
                      <i className="bi bi-play-circle"></i>
                      Continue
                    </button>
                  ) : (
                    <button 
                      className="btn primary"
                      onClick={() => startQuiz(quiz)}
                      disabled={quiz.status === 'overdue'}
                    >
                      <i className="bi bi-play-circle"></i>
                      Start Quiz
                    </button>
                  )}
                </div>
              </div>

              {/* Stats Overlay */}
              <div className="stats-overlay">
                <div className="stat">
                  <i className="bi bi-people"></i>
                  <span>{quiz.participants} participants</span>
                </div>
                <div className="stat">
                  <i className="bi bi-graph-up"></i>
                  <span>Avg: {quiz.averageScore}%</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="section-card">
          <div className="section-header">
            <h3>Quiz Performance</h3>
            <span className="view-all">View Detailed Analytics</span>
          </div>
          <div className="performance-stats">
            <div className="performance-item">
              <span className="perf-label">Completion Rate</span>
              <div className="perf-bar">
                <div 
                  className="perf-fill"
                  style={{ width: '75%' }}
                ></div>
              </div>
              <span className="perf-value">75%</span>
            </div>
            <div className="performance-item">
              <span className="perf-label">Average Score</span>
              <div className="perf-bar">
                <div 
                  className="perf-fill"
                  style={{ width: '78%' }}
                ></div>
              </div>
              <span className="perf-value">78%</span>
            </div>
            <div className="performance-item">
              <span className="perf-label">Time Management</span>
              <div className="perf-bar">
                <div 
                  className="perf-fill"
                  style={{ width: '82%' }}
                ></div>
              </div>
              <span className="perf-value">82%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseQuiz;