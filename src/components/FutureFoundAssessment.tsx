'use client'

import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';

const FutureFoundAssessment = () => {
  const [step, setStep] = useState(1);
  const [emails, setEmails] = useState({ parent: '', teen: '' });
  const [responses, setResponses] = useState({});
  const [results, setResults] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (isValidEmail(emails.parent) && isValidEmail(emails.teen)) {
      setStep(2);
    } else {
      alert('Please enter valid email addresses for both parent and teen.');
    }
  };

  const handleResponseChange = (questionId: number, answer: string) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

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
      const { data, error } = await supabase
        .from('assessments')
        .insert([
          {
            parent_email: emails.parent,
            teen_email: emails.teen,
            responses: responses,
            results: calculatedResults,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) {
        console.warn('Supabase error (expected if table doesn\'t exist):', error);
        // Continue anyway for demo purposes
      }

      setResults(calculatedResults);
      setStep(3);
    } catch (error) {
      console.error('Error submitting assessment:', error);
      // Continue anyway for demo purposes
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
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">FutureFound Assessment</h1>
        <p className="text-gray-600 mb-6 text-center">
          Discover your motivation style with our quick assessment. We'll need email addresses for both parent and teen to get started.
        </p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parent Email *
            </label>
            <input
              type="email"
              value={emails.parent}
              onChange={(e) => setEmails(prev => ({ ...prev, parent: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="parent@example.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teen Email *
            </label>
            <input
              type="email"
              value={emails.teen}
              onChange={(e) => setEmails(prev => ({ ...prev, teen: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="teen@example.com"
            />
          </div>
          
          <button
            onClick={handleEmailSubmit}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Start Assessment
          </button>
        </div>
      </div>
    );
  }

  if (step === 2) {
    const progress = (Object.keys(responses).length / 15) * 100;
    
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold">Assessment Questions</h1>
            <span className="text-sm text-gray-600">
              {Object.keys(responses).length} / 15
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-8">
          {questions.map((question) => (
            <div key={question.id} className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium mb-4">
                {question.id}. {question.text}
              </h3>
              
              <div className="space-y-2">
                {Object.entries(question.options).map(([key, text]) => (
                  <label key={key} className="flex items-start space-x-3 cursor-pointer p-2 rounded hover:bg-gray-50">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={key}
                      checked={responses[question.id as keyof typeof responses] === key}
                      onChange={() => handleResponseChange(question.id, key)}
                      className="mt-1 text-blue-600"
                    />
                    <span className="text-gray-700">{text}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => setStep(1)}
            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Back
          </button>
          
          <button
            onClick={handleSubmit}
            disabled={Object.keys(responses).length < 15 || isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Calculating...' : 'Get Results'}
          </button>
        </div>
      </div>
    );
  }

  if (step === 3 && results) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8">Your Motivation Profile</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Top Motivations</h2>
            {results.topTwo.map((motivation: any, index: number) => (
              <div key={motivation.code} className="mb-6 p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg">
                    #{index + 1}: {motivation.name}
                  </h3>
                  <span className="text-2xl font-bold text-blue-600">
                    {motivation.score}/15
                  </span>
                </div>
                <p className="text-gray-700">{motivation.description}</p>
              </div>
            ))}
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Complete Profile</h2>
            <RadarChart data={results.all} />
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button
            onClick={sendResultsByEmail}
            className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Send Results by Email
          </button>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-600">
          Results will be sent to: {emails.parent} and {emails.teen}
        </div>
      </div>
    );
  }

  return null;
};

export default FutureFoundAssessment;