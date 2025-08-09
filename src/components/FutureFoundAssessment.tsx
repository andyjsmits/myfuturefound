'use client'

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const FutureFoundAssessment = () => {
  const [step, setStep] = useState(1);
  const [emails, setEmails] = useState({ parent: '', teen: '' });
  const [responses, setResponses] = useState({});
  const [results, setResults] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Selected 15 questions (eliminated similar ones)
  const questions = [
    {
      id: 1,
      text: "You get a surprise free afternoon. What do you do first?",
      options: {
        A: "Watch a documentary or dive into a topic rabbit hole.",
        B: "Build or fix something that's been bugging me.",
        C: "Tackle a to-do list I've been putting off.",
        D: "Meet up or call someone I care about.",
        E: "Make something—design, music, video, or writing."
      }
    },
    {
      id: 2,
      text: "In a group project, what role do you naturally take?",
      options: {
        A: "Research lead—find facts, organize info.",
        B: "Materials/setup—get the gear, make it work.",
        C: "Project manager—timeline, tasks, done.",
        D: "Connector—keep everyone talking and on track.",
        E: "Concept creator—pitch ideas, style, presentation."
      }
    },
    {
      id: 3,
      text: "What kind of school assignment makes you weirdly happy?",
      options: {
        A: "Analyzing data or arguing a point with evidence.",
        B: "A lab, shop, or build project.",
        C: "A project with a clear checklist and deadline.",
        D: "Anything with interviews or collaboration.",
        E: "An open-ended creative project."
      }
    },
    {
      id: 4,
      text: "Which 'win' feels most satisfying?",
      options: {
        A: "Figuring out something others couldn't.",
        B: "Making/fixing something that works.",
        C: "Crossing off a big task.",
        D: "Helping someone feel better or succeed.",
        E: "Creating something original."
      }
    },
    {
      id: 5,
      text: "When you hit a tricky problem, your first move is…",
      options: {
        A: "Break it down and research.",
        B: "Try stuff with my hands until I see what works.",
        C: "Make a mini plan and knock out steps.",
        D: "Ask someone and talk it through.",
        E: "Sketch/brainstorm creative angles."
      }
    },
    {
      id: 6,
      text: "What kind of video content do you binge?",
      options: {
        A: "Deep-dives, explainers, 'how it works'.",
        B: "DIY/builds, crafts, mods.",
        C: "Productivity, organization, systems.",
        D: "People stories, advice, vlogs.",
        E: "Art, design, music, filmmaking."
      }
    },
    {
      id: 7,
      text: "Which feedback makes you glow?",
      options: {
        A: "Your insight changed how we see it.",
        B: "You built that so well.",
        C: "You get things done.",
        D: "You made people feel included.",
        E: "That was so creative."
      }
    },
    {
      id: 8,
      text: "Your ideal challenge looks like…",
      options: {
        A: "A tough puzzle with a logic payoff.",
        B: "A hands-on build with moving parts.",
        C: "A target with a clear finish line.",
        D: "A situation that needs care and teamwork.",
        E: "A blank canvas to make something new."
      }
    },
    {
      id: 9,
      text: "When you're tired, which task still gives energy?",
      options: {
        A: "Quiet research or thinking.",
        B: "Light hands-on tinkering.",
        C: "Quick tasks I can finish.",
        D: "A short, positive chat.",
        E: "Doodling, playing music, or editing."
      }
    },
    {
      id: 10,
      text: "Which club would you actually stick with?",
      options: {
        A: "Debate, math, model UN, science.",
        B: "Robotics, maker club, auto.",
        C: "Event committee, yearbook logistics.",
        D: "Peer mentoring, student council.",
        E: "Art, film, music, or creative writing."
      }
    },
    {
      id: 11,
      text: "You're leading a small project. Your first move?",
      options: {
        A: "Gather info and define the problem.",
        B: "Inventory tools and test materials.",
        C: "Create a timeline and assign roles.",
        D: "Kickoff meeting to align people.",
        E: "Moodboard or concept draft."
      }
    },
    {
      id: 12,
      text: "What do you notice first in a workplace?",
      options: {
        A: "How decisions are made and why.",
        B: "The tools, layout, and gear.",
        C: "The systems—who does what, when.",
        D: "The vibe—do people support each other?",
        E: "The brand/design/creativity."
      }
    },
    {
      id: 13,
      text: "What makes you lose track of time (in a good way)?",
      options: {
        A: "Learning about something complicated.",
        B: "Building or crafting.",
        C: "Rapid-fire tasks and crossing things off.",
        D: "Deep conversations or team moments.",
        E: "Creating—design, music, video, writing."
      }
    },
    {
      id: 14,
      text: "You can add one class to your schedule:",
      options: {
        A: "Data science, philosophy, economics.",
        B: "Wood/metal shop, engineering, culinary.",
        C: "Project management or entrepreneurship.",
        D: "Counseling, leadership, communications.",
        E: "Graphic design, film, music production."
      }
    },
    {
      id: 15,
      text: "Big school event tomorrow. Where do you plug in?",
      options: {
        A: "Backstage strategy: plan routes/resources.",
        B: "Setup/teardown: build the space.",
        C: "Run-of-show: keep timing tight.",
        D: "Front-of-house: greet, host, solve people issues.",
        E: "Creative: visuals, soundtrack, photo/video."
      }
    }
  ];

  const motivationTypes = {
    A: { code: 'TH', name: 'Thinking & Research', description: 'You love figuring things out. Give you complex problems and time to dive deep.' },
    B: { code: 'TA', name: 'Tactile & Hands-On', description: 'You learn by doing. Put tools or materials in your hands and you shine.' },
    C: { code: 'AC', name: 'Accomplishment & Results', description: 'You\'re a finisher. Clear goals and visible progress keep you energized.' },
    D: { code: 'PE', name: 'People & Connection', description: 'You thrive with others. Helping, hosting, and teaming bring out your best.' },
    E: { code: 'CR', name: 'Creative & Expressive', description: 'You want to make something original. Ideas and storytelling light you up.' }
  };

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailSubmit = () => {
    const hasValidParent = isValidEmail(emails.parent);
    const hasValidTeen = isValidEmail(emails.teen);
    
    if (hasValidParent || hasValidTeen) {
      setStep(2);
    } else {
      alert('Please enter at least one valid email address.');
    }
  };

  const handleResponseChange = (questionId: number, answer: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: answer
    }));
    
    // Auto-advance to next question with transition
    if (currentQuestionIndex < questions.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setIsTransitioning(false);
      }, 300);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (step !== 2) return;
      
      const currentQuestion = questions[currentQuestionIndex];
      const keys = ['1', '2', '3', '4', '5'];
      const answers = ['A', 'B', 'C', 'D', 'E'];
      
      const keyIndex = keys.indexOf(event.key);
      if (keyIndex !== -1) {
        handleResponseChange(currentQuestion.id, answers[keyIndex]);
      }
      
      // Arrow key navigation
      if (event.key === 'ArrowLeft' && currentQuestionIndex > 0) {
        handlePreviousQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [step, currentQuestionIndex, questions]);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const calculateResults = () => {
    const scores = { A: 0, B: 0, C: 0, D: 0, E: 0 };
    
    Object.values(responses).forEach(answer => {
      scores[answer as keyof typeof scores]++;
    });

    // Convert to motivation types with scores
    const motivationScores = Object.entries(scores).map(([key, score]) => ({
      ...motivationTypes[key as keyof typeof motivationTypes],
      score,
      percentage: Math.round((score / 15) * 100)
    }));

    // Sort by score to get top 2
    const sortedScores = motivationScores.sort((a, b) => b.score - a.score);
    const topTwo = sortedScores.slice(0, 2);

    return {
      all: motivationScores,
      topTwo
    };
  };

  const handleSubmit = async () => {
    if (Object.keys(responses).length < 15) {
      alert('Please answer all questions before submitting.');
      return;
    }

    setIsSubmitting(true);
    const calculatedResults = calculateResults();

    try {
      // Only include email fields that have valid values
      const insertData: any = {
        responses: responses,
        results: calculatedResults,
        created_at: new Date().toISOString()
      };

      if (isValidEmail(emails.parent)) {
        insertData.parent_email = emails.parent;
      }
      
      if (isValidEmail(emails.teen)) {
        insertData.teen_email = emails.teen;
      }

      const { data, error } = await supabase
        .from('assessments')
        .insert([insertData]);

      if (error) {
        console.warn('Supabase error:', error);
        alert('Assessment completed! Results shown below, but there was an issue saving to database. Please contact support if you need the data stored.');
      } else {
        console.log('Assessment data saved successfully:', data);
      }

      setResults(calculatedResults);
      setStep(3);
    } catch (error) {
      console.error('Error submitting assessment:', error);
      alert('Assessment completed! Results shown below, but there was an issue saving to database. Please contact support if you need the data stored.');
      setResults(calculatedResults);
      setStep(3);
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendResultsByEmail = async () => {
    // This would typically integrate with an email service like Resend or SendGrid
    // For now, we'll just show an alert
    alert(`Results have been sent to ${emails.parent} and ${emails.teen}!`);
  };

  // Simple radar chart component
  const RadarChart = ({ data }: { data: any[] }) => {
    const size = 300;
    const center = size / 2;
    const radius = 100;
    
    const angleStep = (2 * Math.PI) / data.length;
    
    const points = data.map((item, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const value = (item.score / 15) * radius;
      const x = center + Math.cos(angle) * value;
      const y = center + Math.sin(angle) * value;
      return { x, y, angle, item };
    });

    const maxPoints = data.map((item, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const x = center + Math.cos(angle) * radius;
      const y = center + Math.sin(angle) * radius;
      return { x, y };
    });

    const pathData = points.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ') + ' Z';

    const maxPathData = maxPoints.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ') + ' Z';

    return (
      <div className="flex flex-col items-center">
        <svg width={size} height={size} className="mb-4">
          {/* Grid circles */}
          {[0.2, 0.4, 0.6, 0.8, 1].map(factor => (
            <circle
              key={factor}
              cx={center}
              cy={center}
              r={radius * factor}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}
          
          {/* Grid lines */}
          {maxPoints.map((point, index) => (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}
          
          {/* Max area */}
          <path
            d={maxPathData}
            fill="none"
            stroke="#d1d5db"
            strokeWidth="2"
          />
          
          {/* Data area */}
          <path
            d={pathData}
            fill="rgba(59, 130, 246, 0.3)"
            stroke="#3b82f6"
            strokeWidth="3"
          />
          
          {/* Data points */}
          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#3b82f6"
            />
          ))}
          
          {/* Labels */}
          {points.map((point, index) => {
            const labelRadius = radius + 20;
            const labelX = center + Math.cos(point.angle) * labelRadius;
            const labelY = center + Math.sin(point.angle) * labelRadius;
            
            return (
              <text
                key={index}
                x={labelX}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm font-medium fill-gray-700"
              >
                {point.item.code}
              </text>
            );
          })}
        </svg>
        
        {/* Legend */}
        <div className="grid grid-cols-1 gap-2 text-sm">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="font-medium">{item.code}:</span>
              <span>{item.name}</span>
              <span className="text-gray-600">({item.score}/15)</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (step === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Future<span className="text-blue-600">Found</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Discover your unique motivation style with our research-backed assessment
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Let's Get Started</h2>
                <p className="text-gray-600">Provide at least one email address for results</p>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Parent Email
                    <span className="text-gray-500 font-normal ml-2">(optional)</span>
                  </label>
                  <input
                    type="email"
                    value={emails.parent}
                    onChange={(e) => setEmails(prev => ({ ...prev, parent: e.target.value }))}
                    className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="parent@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Teen Email
                    <span className="text-gray-500 font-normal ml-2">(optional)</span>
                  </label>
                  <input
                    type="email"
                    value={emails.teen}
                    onChange={(e) => setEmails(prev => ({ ...prev, teen: e.target.value }))}
                    className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="teen@example.com"
                  />
                </div>
                
                <button
                  onClick={handleEmailSubmit}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Begin Assessment
                </button>
              </div>
              
              <div className="text-center pt-4">
                <p className="text-sm text-gray-500">
                  Your information is secure and private
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="w-full max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="flex items-center bg-white rounded-full px-6 py-3 shadow-lg">
                <span className="text-2xl font-bold text-gray-900 mr-3">
                  Question {currentQuestionIndex + 1}
                </span>
                <span className="text-lg text-gray-500">of {questions.length}</span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full max-w-md mx-auto bg-white/30 rounded-full h-3 mb-6 shadow-inner">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className={`transition-all duration-300 transform ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 leading-tight text-center">
                {currentQuestion.text}
              </h2>
              
              <div className="space-y-4">
                {Object.entries(currentQuestion.options).map(([key, text], index) => {
                  const isSelected = responses[currentQuestion.id as keyof typeof responses] === key;
                  const keyNumber = index + 1;
                  
                  return (
                    <button
                      key={key}
                      onClick={() => handleResponseChange(currentQuestion.id, key)}
                      className={`w-full p-6 text-left rounded-xl border-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] group ${
                        isSelected 
                          ? 'border-blue-500 bg-blue-50 shadow-lg' 
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-200 ${
                          isSelected 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-100 text-gray-600 group-hover:bg-blue-100'
                        }`}>
                          {keyNumber}
                        </div>
                        <div className="flex-1">
                          <p className="text-lg leading-relaxed text-gray-800 font-medium">
                            {text}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Hints */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 space-y-2 sm:space-y-0">
                  <div className="flex items-center space-x-4">
                    <span className="inline-flex items-center">
                      <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono mr-2">1-5</kbd>
                      Quick select
                    </span>
                    {currentQuestionIndex > 0 && (
                      <span className="inline-flex items-center">
                        <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono mr-2">←</kbd>
                        Previous
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {currentQuestionIndex > 0 && (
                      <button
                        onClick={handlePreviousQuestion}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                      >
                        ← Back
                      </button>
                    )}
                    
                    {currentQuestionIndex === questions.length - 1 && Object.keys(responses).length === questions.length && (
                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-200 transition-all duration-200 disabled:opacity-50"
                      >
                        {isSubmitting ? 'Calculating...' : 'Get My Results'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 3 && results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Your Motivation Profile
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Based on your responses, here's your unique motivation style breakdown
            </p>
          </div>

          {/* Top Motivations */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Top Motivations</h2>
              {results.topTwo.map((motivation: any, index: number) => (
                <div key={motivation.code} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold ${
                        index === 0 ? 'bg-gold-100 text-gold-600' : 'bg-silver-100 text-silver-600'
                      }`}>
                        {index === 0 ? '🥇' : '🥈'}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {motivation.name}
                        </h3>
                        <p className="text-sm text-gray-500 font-medium">
                          {motivation.code} • Primary Motivation #{index + 1}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-extrabold text-blue-600">
                        {motivation.score}
                      </div>
                      <div className="text-sm text-gray-500 font-medium">
                        out of 15
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {motivation.description}
                  </p>
                  <div className="mt-4">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${motivation.percentage}%` }}
                      />
                    </div>
                    <div className="text-right mt-1">
                      <span className="text-sm font-semibold text-gray-600">
                        {motivation.percentage}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Complete Profile</h2>
              <RadarChart data={results.all} />
            </div>
          </div>

          {/* All Motivations Summary */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Full Motivation Breakdown</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {results.all.map((motivation: any, index: number) => (
                <div key={motivation.code} className="text-center p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {motivation.score}
                  </div>
                  <div className="font-semibold text-gray-900 text-sm mb-1">
                    {motivation.code}
                  </div>
                  <div className="text-xs text-gray-600">
                    {motivation.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Get Your Detailed Results
              </h3>
              <p className="text-gray-600 mb-6">
                We'll send a comprehensive report with career recommendations and next steps to both email addresses.
              </p>
              
              <button
                onClick={sendResultsByEmail}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-200 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
              >
                📧 Send Detailed Results
              </button>
              
              <div className="mt-4 text-sm text-gray-500">
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>
                    Results will be sent to: {
                      [emails.parent, emails.teen]
                        .filter(email => isValidEmail(email))
                        .join(' and ') || 'provided email address'
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default FutureFoundAssessment;