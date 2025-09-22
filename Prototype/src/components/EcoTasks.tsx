import React, { useState } from 'react';
import { Zap, Droplets, Recycle, Car, TreePine, Clock, Star, Camera, CheckCircle } from 'lucide-react';
import { EcoTask } from '../types';

interface EcoTasksProps {
  onTaskComplete: (taskId: string) => void;
}

export default function EcoTasks({ onTaskComplete }: EcoTasksProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTask, setSelectedTask] = useState<EcoTask | null>(null);

  const categories = [
    { id: 'all', label: 'All Tasks', icon: Star },
    { id: 'energy', label: 'Energy', icon: Zap },
    { id: 'water', label: 'Water', icon: Droplets },
    { id: 'waste', label: 'Waste', icon: Recycle },
    { id: 'transport', label: 'Transport', icon: Car },
    { id: 'nature', label: 'Nature', icon: TreePine },
  ];

  const tasks: EcoTask[] = [
    {
      id: '1',
      title: 'Switch to LED Bulbs',
      description: 'Replace traditional bulbs with energy-efficient LED bulbs in your room',
      category: 'energy',
      difficulty: 'easy',
      points: 25,
      coins: 10,
      estimatedTime: '15 mins',
      instructions: [
        'Identify all traditional bulbs in your room',
        'Purchase LED bulbs of appropriate wattage',
        'Safely replace the bulbs',
        'Take a photo of the new LED bulbs installed'
      ],
      verificationMethod: 'photo'
    },
    {
      id: '2',
      title: 'Create a Compost Bin',
      description: 'Set up a small compost system for organic waste',
      category: 'waste',
      difficulty: 'medium',
      points: 50,
      coins: 20,
      estimatedTime: '45 mins',
      instructions: [
        'Find a suitable container or designated area',
        'Layer brown materials (dry leaves, paper)',
        'Add green materials (food scraps, grass)',
        'Mix and maintain proper moisture'
      ],
      verificationMethod: 'photo'
    },
    {
      id: '3',
      title: 'Plant a Tree',
      description: 'Plant a native tree species in your community',
      category: 'nature',
      difficulty: 'hard',
      points: 100,
      coins: 40,
      estimatedTime: '2 hours',
      instructions: [
        'Research native tree species for your area',
        'Get permission if planting on public land',
        'Dig appropriate hole and plant the sapling',
        'Water and mark the location for future care'
      ],
      verificationMethod: 'photo'
    },
    {
      id: '4',
      title: 'Water Conservation Audit',
      description: 'Conduct a water usage audit in your home',
      category: 'water',
      difficulty: 'medium',
      points: 35,
      coins: 15,
      estimatedTime: '30 mins',
      instructions: [
        'Check all faucets for leaks',
        'Time your shower duration',
        'Measure water usage for daily activities',
        'Create a conservation plan'
      ],
      verificationMethod: 'quiz'
    },
    {
      id: '5',
      title: 'Bike to School Week',
      description: 'Use bicycle or walk to school for one week',
      category: 'transport',
      difficulty: 'easy',
      points: 40,
      coins: 18,
      estimatedTime: 'Daily',
      instructions: [
        'Plan safe route to school',
        'Check bicycle condition and safety gear',
        'Track daily trips for one week',
        'Calculate carbon footprint saved'
      ],
      verificationMethod: 'self-report'
    }
  ];

  const filteredTasks = selectedCategory === 'all' 
    ? tasks 
    : tasks.filter(task => task.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    const iconMap = {
      energy: Zap,
      water: Droplets,
      waste: Recycle,
      transport: Car,
      nature: TreePine,
    };
    return iconMap[category as keyof typeof iconMap] || Star;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Eco Tasks</h2>
        <div className="text-sm text-gray-600">
          Complete tasks to earn points and coins!
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
                selectedCategory === category.id
                  ? 'bg-green-500 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-green-50 border border-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{category.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((task) => {
          const Icon = getCategoryIcon(task.category);
          return (
            <div
              key={task.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer"
              onClick={() => setSelectedTask(task)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon className="w-6 h-6 text-green-600" />
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(task.difficulty)}`}>
                    {task.difficulty}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{task.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{task.description}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-gray-600">{task.points} pts</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                      <span className="text-gray-600">{task.coins} coins</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{task.estimatedTime}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    {React.createElement(getCategoryIcon(selectedTask.category), {
                      className: "w-8 h-8 text-green-600"
                    })}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedTask.title}</h2>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedTask.difficulty)}`}>
                        {selectedTask.difficulty}
                      </span>
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{selectedTask.estimatedTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
                  <p className="text-gray-600">{selectedTask.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Instructions</h3>
                  <ol className="space-y-2">
                    {selectedTask.instructions.map((instruction, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-gray-600">{instruction}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{selectedTask.points}</div>
                      <div className="text-sm text-gray-600">Points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-500">{selectedTask.coins}</div>
                      <div className="text-sm text-gray-600">Coins</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    {selectedTask.verificationMethod === 'photo' && <Camera className="w-4 h-4" />}
                    {selectedTask.verificationMethod === 'quiz' && <CheckCircle className="w-4 h-4" />}
                    <span className="capitalize">{selectedTask.verificationMethod} verification</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      onTaskComplete(selectedTask.id);
                      setSelectedTask(null);
                    }}
                    className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all"
                  >
                    Start Task
                  </button>
                  <button
                    onClick={() => setSelectedTask(null)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}