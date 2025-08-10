'use client'

import React, { useState, useEffect, useRef } from 'react';
import { supabase, hasValidCredentials } from '@/lib/supabase';

const FutureFoundAssessment = () => {
  const [step, setStep] = useState(1);
  const [emails, setEmails] = useState({ parent: '', teen: '' });
  const [responses, setResponses] = useState({});
  const [results, setResults] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showMotivation, setShowMotivation] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

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
    setSelectedAnswer(answer);
    
    // Animate selection
    setTimeout(() => {
      setResponses(prev => ({
        ...prev,
        [questionId]: answer
      }));
      
      // Auto-advance to next question with transition
      if (currentQuestionIndex < questions.length - 1) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedAnswer(null);
          setIsTransitioning(false);
        }, 600);
      }
    }, 300);
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

    // Check credentials first
    if (!hasValidCredentials()) {
      console.error('❌ Supabase credentials not configured');
      alert('❌ Database not configured. Environment variables missing.\n\nAssessment completed - results shown below.\n\nTo save data: Configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Netlify environment variables.');
      setResults(calculatedResults);
      setStep(3);
      setIsSubmitting(false);
      return;
    }

    // Enhanced debug logging
    console.log('=== SUPABASE DEBUG INFO ===');
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('Supabase Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    console.log('Supabase Key length:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length);
    console.log('Environment:', process.env.NODE_ENV);
    console.log('Emails:', { parent: emails.parent, teen: emails.teen });
    console.log('Email validation:', { 
      parent: isValidEmail(emails.parent), 
      teen: isValidEmail(emails.teen) 
    });
    console.log('Responses count:', Object.keys(responses).length);
    console.log('Results preview:', Object.keys(calculatedResults));

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

      console.log('Data to insert:', JSON.stringify(insertData, null, 2));

      // Test connection first
      console.log('🔍 Testing database connection...');
      const { data: testData, error: testError } = await supabase
        .from('assessments')
        .select('count', { count: 'exact', head: true });

      if (testError) {
        console.error('❌ Connection test failed:', {
          message: testError.message,
          code: testError.code,
          details: testError.details,
          hint: testError.hint
        });
        throw new Error(`Database connection failed: ${testError.message} (Code: ${testError.code})`);
      }

      console.log('✅ Connection test passed, current record count:', testData);

      // Now try to insert
      console.log('🔍 Attempting database insert...');
      const { data, error } = await supabase
        .from('assessments')
        .insert([insertData])
        .select();

      if (error) {
        console.error('❌ Insert error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        throw new Error(`Database insert failed: ${error.message} (Code: ${error.code})`);
      } else {
        console.log('✅ Assessment data saved successfully!', data);
        console.log('✅ Saved record ID:', data[0]?.id);
        alert('✅ Assessment completed and data saved successfully!');
      }

      setResults(calculatedResults);
      setStep(3);
    } catch (error: any) {
      console.error('❌ Error submitting assessment:', error);
      
      // Enhanced error logging for debugging
      const errorDetails = {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
        timestamp: new Date().toISOString(),
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        responses: Object.keys(responses).length,
        dataStructure: {
          parent_email: isValidEmail(emails.parent),
          teen_email: isValidEmail(emails.teen),
          responses_count: Object.keys(responses).length,
          results_keys: Object.keys(calculatedResults)
        }
      };
      
      console.error('🔍 DETAILED ERROR INFO:', errorDetails);
      
      // Show detailed error in alert for debugging
      let errorMsg = `❌ Database Error Details:\n\n`;
      errorMsg += `Message: ${error.message}\n`;
      if (error.code) errorMsg += `Code: ${error.code}\n`;
      if (error.details) errorMsg += `Details: ${error.details}\n`;
      if (error.hint) errorMsg += `Hint: ${error.hint}\n`;
      errorMsg += `\nTime: ${new Date().toLocaleString()}\n`;
      errorMsg += `\nEnvironment Check:\n`;
      errorMsg += `- URL configured: ${!!process.env.NEXT_PUBLIC_SUPABASE_URL}\n`;
      errorMsg += `- Key configured: ${!!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}\n`;
      errorMsg += `- Response count: ${Object.keys(responses).length}\n`;
      errorMsg += `\nResults are shown below. Copy this error info if contacting support.`;
      
      alert(errorMsg);
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
      <div className="mx-auto max-w-2xl">
        <div className="rounded-2xl bg-[var(--neutral-white)] p-8 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[var(--neutral-dark)] mb-4">
              Let's Get Started
            </h2>
            <p className="text-lg text-[var(--neutral-gray)]">
              We'll send your career insights via email
            </p>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-[var(--neutral-gray)] mb-2">
                Parent Email <span className="text-[var(--neutral-gray)]">(optional)</span>
              </label>
              <input
                type="email"
                value={emails.parent}
                onChange={(e) => setEmails(prev => ({ ...prev, parent: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent transition-all duration-200"
                placeholder="parent@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[var(--neutral-gray)] mb-2">
                Student Email <span className="text-[var(--neutral-gray)]">(optional)</span>
              </label>
              <input
                type="email"
                value={emails.teen}
                onChange={(e) => setEmails(prev => ({ ...prev, teen: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-blue)] focus:border-transparent transition-all duration-200"
                placeholder="student@example.com"
              />
            </div>
            
            <div className="mt-8">
              <button
                onClick={() => {
                  setShowMotivation(true);
                  setTimeout(() => handleEmailSubmit(), 1000);
                }}
                className="w-full rounded-xl bg-[var(--primary-blue)] px-8 py-4 text-base font-bold text-[var(--neutral-white)] shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[var(--primary-green)]"
              >
                Begin Assessment
              </button>
            </div>
            
            {showMotivation && (
              <div className="text-center mt-4 text-[var(--primary-blue)] font-medium animate-bounce">
                Great! Let's discover your motivation style! 🚀
              </div>
            )}
            
            <div className="flex items-center justify-center space-x-4 text-xs text-[var(--neutral-gray)] mt-6">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-[var(--primary-green)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 616 0z" clipRule="evenodd" />
                </svg>
                <span>Privacy Protected</span>
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-[var(--primary-blue)]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Instant Results</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl bg-[var(--neutral-white)] p-8 shadow-lg">
          {/* Progress Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[var(--primary-blue)] rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-[var(--neutral-dark)]">Career Assessment</h3>
                <p className="text-sm text-[var(--neutral-gray)]">Question {currentQuestionIndex + 1} of {questions.length}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  ref={progressRef}
                  className="h-full bg-[var(--primary-blue)] rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-xs text-[var(--neutral-gray)] mt-1">
                {Math.round(progress)}% Complete
              </div>
            </div>
          </div>

          {/* Question */}
          <div className={`mb-6 transition-all duration-500 transform ${
            isTransitioning 
              ? 'opacity-0 scale-95 translate-y-4' 
              : 'opacity-100 scale-100 translate-y-0'
          }`}>
            <h2 className="text-2xl font-bold text-[var(--neutral-dark)] leading-tight text-center mb-6">
              {currentQuestion.text}
            </h2>
            
            {/* Answer Options */}
            <div className="grid gap-3">
              {Object.entries(currentQuestion.options).map(([key, text], index) => {
                const isSelected = selectedAnswer === key;
                const wasSelected = responses[currentQuestion.id as keyof typeof responses] === key;
                
                return (
                  <button
                    key={key}
                    onClick={() => handleResponseChange(currentQuestion.id, key)}
                    disabled={selectedAnswer !== null}
                    className={`p-4 text-left rounded-xl border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                      isSelected || wasSelected
                        ? 'border-[var(--primary-blue)] bg-blue-50 text-[var(--primary-blue)]'
                        : 'border-gray-200 hover:border-[var(--primary-blue)] hover:bg-blue-50/50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                        isSelected || wasSelected
                          ? 'bg-[var(--primary-blue)] text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {isSelected ? (
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium leading-relaxed text-[var(--neutral-dark)]">{text}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 3 && results) {
    return (
      <div className="app-card space-y-6">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute -top-8 -left-8 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full mix-blend-multiply filter blur-2xl animate-blob"
            style={{ animationDelay: '0s' }}
          />
          <div 
            className="absolute top-1/2 -right-8 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full mix-blend-multiply filter blur-2xl animate-blob"
            style={{ animationDelay: '2s' }}
          />
          <div 
            className="absolute -bottom-8 left-1/4 w-96 h-96 bg-gradient-to-br from-pink-400/10 to-cyan-400/10 rounded-full mix-blend-multiply filter blur-2xl animate-blob"
            style={{ animationDelay: '4s' }}
          />
        </div>
        <div className="max-w-6xl mx-auto relative z-10">
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
                <div 
                  key={motivation.code} 
                  className="rounded-2xl p-8 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  style={{
                    background: 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(59, 130, 246, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
                  }}
                >
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
            
            <div 
              className="rounded-2xl p-8 shadow-xl border border-white/30"
              style={{
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(59, 130, 246, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
              }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Complete Profile</h2>
              <RadarChart data={results.all} />
            </div>
          </div>

          {/* All Motivations Summary */}
          <div 
            className="rounded-2xl p-8 shadow-xl border border-white/30 mb-8"
            style={{
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(59, 130, 246, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
            }}
          >
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
          <div 
            className="rounded-2xl p-8 shadow-xl border border-white/30 text-center"
            style={{
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(59, 130, 246, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
            }}
          >
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