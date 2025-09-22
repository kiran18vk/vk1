import React, { useState } from 'react';
import { Lock, CheckCircle, Star, Trophy, Zap, Droplets, Recycle, Car, TreePine } from 'lucide-react';
import { SkillTreeNode } from '../types';

interface SkillTreeProps {
  userLevel: number;
  completedNodes: string[];
  onNodeComplete: (nodeId: string) => void;
}

export default function SkillTree({ userLevel, completedNodes, onNodeComplete }: SkillTreeProps) {
  const [selectedNode, setSelectedNode] = useState<SkillTreeNode | null>(null);

  const skillNodes: SkillTreeNode[] = [
    // Level 1 - Foundation
    {
      id: 'energy-basics',
      title: 'Energy Awareness',
      description: 'Learn the basics of energy conservation and renewable sources',
      category: 'energy',
      level: 1,
      unlocked: true,
      completed: completedNodes.includes('energy-basics'),
      prerequisites: [],
      rewards: { points: 50, coins: 20, badge: 'Energy Novice' }
    },
    {
      id: 'waste-basics',
      title: 'Waste Reduction',
      description: 'Master the 3 Rs: Reduce, Reuse, Recycle',
      category: 'waste',
      level: 1,
      unlocked: true,
      completed: completedNodes.includes('waste-basics'),
      prerequisites: [],
      rewards: { points: 50, coins: 20, badge: 'Waste Warrior' }
    },
    {
      id: 'water-basics',
      title: 'Water Conservation',
      description: 'Understand water cycle and conservation techniques',
      category: 'water',
      level: 1,
      unlocked: true,
      completed: completedNodes.includes('water-basics'),
      prerequisites: [],
      rewards: { points: 50, coins: 20, badge: 'Water Guardian' }
    },

    // Level 2 - Intermediate
    {
      id: 'renewable-energy',
      title: 'Renewable Energy',
      description: 'Deep dive into solar, wind, and other renewable sources',
      category: 'energy',
      level: 2,
      unlocked: userLevel >= 2 && completedNodes.includes('energy-basics'),
      completed: completedNodes.includes('renewable-energy'),
      prerequisites: ['energy-basics'],
      rewards: { points: 75, coins: 30, badge: 'Solar Champion' }
    },
    {
      id: 'composting',
      title: 'Composting Master',
      description: 'Learn advanced composting and organic waste management',
      category: 'waste',
      level: 2,
      unlocked: userLevel >= 2 && completedNodes.includes('waste-basics'),
      completed: completedNodes.includes('composting'),
      prerequisites: ['waste-basics'],
      rewards: { points: 75, coins: 30, badge: 'Compost King' }
    },
    {
      id: 'sustainable-transport',
      title: 'Green Transportation',
      description: 'Explore eco-friendly transportation options',
      category: 'transport',
      level: 2,
      unlocked: userLevel >= 2,
      completed: completedNodes.includes('sustainable-transport'),
      prerequisites: [],
      rewards: { points: 75, coins: 30, badge: 'Eco Traveler' }
    },

    // Level 3 - Advanced
    {
      id: 'climate-action',
      title: 'Climate Action Leader',
      description: 'Become a climate change advocate and community leader',
      category: 'nature',
      level: 3,
      unlocked: userLevel >= 3 && completedNodes.includes('renewable-energy') && completedNodes.includes('composting'),
      completed: completedNodes.includes('climate-action'),
      prerequisites: ['renewable-energy', 'composting'],
      rewards: { points: 100, coins: 50, badge: 'Climate Hero' }
    },
    {
      id: 'biodiversity',
      title: 'Biodiversity Champion',
      description: 'Protect and promote local ecosystems and wildlife',
      category: 'nature',
      level: 3,
      unlocked: userLevel >= 3 && completedNodes.includes('sustainable-transport'),
      completed: completedNodes.includes('biodiversity'),
      prerequisites: ['sustainable-transport'],
      rewards: { points: 100, coins: 50, badge: 'Nature Protector' }
    },

    // Level 4 - Expert
    {
      id: 'sustainability-mentor',
      title: 'Sustainability Mentor',
      description: 'Guide others on their sustainability journey',
      category: 'community',
      level: 4,
      unlocked: userLevel >= 4 && completedNodes.includes('climate-action') && completedNodes.includes('biodiversity'),
      completed: completedNodes.includes('sustainability-mentor'),
      prerequisites: ['climate-action', 'biodiversity'],
      rewards: { points: 150, coins: 75, badge: 'Eco Mentor' }
    }
  ];

  const getCategoryIcon = (category: string) => {
    const iconMap = {
      energy: Zap,
      water: Droplets,
      waste: Recycle,
      transport: Car,
      nature: TreePine,
      community: Trophy,
    };
    return iconMap[category as keyof typeof iconMap] || Star;
  };

  const getCategoryColor = (category: string) => {
    const colorMap = {
      energy: 'from-yellow-400 to-orange-500',
      water: 'from-blue-400 to-cyan-500',
      waste: 'from-green-400 to-emerald-500',
      transport: 'from-purple-400 to-indigo-500',
      nature: 'from-green-500 to-teal-500',
      community: 'from-pink-400 to-rose-500',
    };
    return colorMap[category as keyof typeof colorMap] || 'from-gray-400 to-gray-500';
  };

  const getNodesByLevel = (level: number) => {
    return skillNodes.filter(node => node.level === level);
  };

  const renderNode = (node: SkillTreeNode) => {
    const Icon = getCategoryIcon(node.category);
    const colorClass = getCategoryColor(node.category);

    return (
      <div
        key={node.id}
        className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all transform hover:scale-105 ${
          node.completed
            ? 'border-green-500 bg-green-50 shadow-lg'
            : node.unlocked
            ? 'border-blue-300 bg-white hover:border-blue-500 shadow-md'
            : 'border-gray-300 bg-gray-100 cursor-not-allowed opacity-60'
        }`}
        onClick={() => node.unlocked && setSelectedNode(node)}
      >
        <div className="flex flex-col items-center text-center space-y-3">
          <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${colorClass} flex items-center justify-center relative`}>
            {node.completed ? (
              <CheckCircle className="w-8 h-8 text-white" />
            ) : node.unlocked ? (
              <Icon className="w-8 h-8 text-white" />
            ) : (
              <Lock className="w-8 h-8 text-gray-400" />
            )}
            
            {/* Level badge */}
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full border-2 border-gray-300 flex items-center justify-center">
              <span className="text-xs font-bold text-gray-600">{node.level}</span>
            </div>
          </div>
          
          <div>
            <h3 className={`font-semibold ${node.unlocked ? 'text-gray-800' : 'text-gray-500'}`}>
              {node.title}
            </h3>
            <p className={`text-xs mt-1 ${node.unlocked ? 'text-gray-600' : 'text-gray-400'}`}>
              {node.description}
            </p>
          </div>
          
          <div className="flex items-center space-x-2 text-xs">
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 text-yellow-500" />
              <span className={node.unlocked ? 'text-gray-600' : 'text-gray-400'}>
                {node.rewards.points}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <span className={node.unlocked ? 'text-gray-600' : 'text-gray-400'}>
                {node.rewards.coins}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Sustainability Skill Tree</h2>
        <p className="text-gray-600">
          Progress through levels to unlock new skills and become a sustainability expert!
        </p>
      </div>

      {/* Skill Tree Levels */}
      <div className="space-y-12">
        {[1, 2, 3, 4].map(level => {
          const levelNodes = getNodesByLevel(level);
          if (levelNodes.length === 0) return null;

          return (
            <div key={level} className="relative">
              {/* Level Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center space-x-2 bg-white px-6 py-2 rounded-full border-2 border-gray-200 shadow-sm">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="font-bold text-gray-800">Level {level}</span>
                </div>
              </div>

              {/* Nodes Grid */}
              <div className={`grid gap-6 ${
                levelNodes.length === 1 ? 'grid-cols-1 justify-items-center' :
                levelNodes.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}>
                {levelNodes.map(renderNode)}
              </div>

              {/* Connection Lines */}
              {level < 4 && (
                <div className="flex justify-center mt-8">
                  <div className="w-px h-8 bg-gray-300"></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Node Detail Modal */}
      {selectedNode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full">
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${getCategoryColor(selectedNode.category)} flex items-center justify-center`}>
                    {React.createElement(getCategoryIcon(selectedNode.category), {
                      className: "w-8 h-8 text-white"
                    })}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{selectedNode.title}</h2>
                    <p className="text-gray-600 text-sm">Level {selectedNode.level}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
                  <p className="text-gray-600">{selectedNode.description}</p>
                </div>

                {selectedNode.prerequisites.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Prerequisites</h3>
                    <div className="space-y-1">
                      {selectedNode.prerequisites.map(prereq => {
                        const prereqNode = skillNodes.find(n => n.id === prereq);
                        return (
                          <div key={prereq} className="flex items-center space-x-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-gray-600">{prereqNode?.title}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Rewards</h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">{selectedNode.rewards.points}</div>
                      <div className="text-xs text-gray-600">Points</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-500">{selectedNode.rewards.coins}</div>
                      <div className="text-xs text-gray-600">Coins</div>
                    </div>
                    <div>
                      <div className="text-lg">🏆</div>
                      <div className="text-xs text-gray-600">{selectedNode.rewards.badge}</div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  {selectedNode.unlocked && !selectedNode.completed && (
                    <button
                      onClick={() => {
                        onNodeComplete(selectedNode.id);
                        setSelectedNode(null);
                      }}
                      className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all"
                    >
                      Start Learning
                    </button>
                  )}
                  {selectedNode.completed && (
                    <div className="flex-1 bg-green-100 text-green-800 py-3 px-6 rounded-lg font-medium text-center">
                      ✓ Completed
                    </div>
                  )}
                  {!selectedNode.unlocked && (
                    <div className="flex-1 bg-gray-100 text-gray-500 py-3 px-6 rounded-lg font-medium text-center">
                      🔒 Locked
                    </div>
                  )}
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
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