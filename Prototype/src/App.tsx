import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import EcoTasks from './components/EcoTasks';
import Quizzes from './components/Quizzes';
import SkillTree from './components/SkillTree';
import Profile from './components/Profile';
import { User, Achievement, Reward } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  // Mock user data
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'Alex Green',
    email: 'alex@example.com',
    level: 3,
    coins: 245,
    streak: 12,
    totalPoints: 1250,
    school: 'Green Valley High School',
    grade: '10th Grade'
  });

  const [completedNodes, setCompletedNodes] = useState<string[]>([
    'energy-basics',
    'waste-basics',
    'renewable-energy'
  ]);

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first eco task',
      icon: '🌱',
      category: 'milestone',
      unlocked: true,
      unlockedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Streak Master',
      description: 'Maintain a 7-day streak',
      icon: '🔥',
      category: 'streak',
      unlocked: true,
      unlockedAt: new Date('2024-01-20')
    },
    {
      id: '3',
      title: 'Quiz Champion',
      description: 'Score 100% on 5 quizzes',
      icon: '🧠',
      category: 'knowledge',
      unlocked: true,
      unlockedAt: new Date('2024-01-25')
    },
    {
      id: '4',
      title: 'Eco Warrior',
      description: 'Complete 50 eco tasks',
      icon: '⚔️',
      category: 'tasks',
      unlocked: false
    },
    {
      id: '5',
      title: 'Community Leader',
      description: 'Organize a community event',
      icon: '👥',
      category: 'community',
      unlocked: false
    },
    {
      id: '6',
      title: 'Tree Hugger',
      description: 'Plant 10 trees',
      icon: '🌳',
      category: 'nature',
      unlocked: false
    }
  ];

  const availableRewards: Reward[] = [
    {
      id: '1',
      title: 'Digital Badge',
      description: 'Custom eco-warrior badge for your profile',
      cost: 50,
      category: 'digital',
      available: true
    },
    {
      id: '2',
      title: 'Eco Stickers Pack',
      description: 'Physical sticker pack with sustainability themes',
      cost: 100,
      category: 'physical',
      available: true
    },
    {
      id: '3',
      title: 'Tree Planting Kit',
      description: 'Everything you need to plant your own tree',
      cost: 200,
      category: 'physical',
      available: true
    },
    {
      id: '4',
      title: 'Virtual Nature Tour',
      description: 'Guided virtual tour of national parks',
      cost: 150,
      category: 'experience',
      available: true
    },
    {
      id: '5',
      title: 'Sustainability Workshop',
      description: 'Access to exclusive online workshop',
      cost: 300,
      category: 'experience',
      available: true
    }
  ];

  const handleTaskComplete = (taskId: string) => {
    // Simulate task completion
    setUser(prev => ({
      ...prev,
      coins: prev.coins + 20,
      totalPoints: prev.totalPoints + 50,
      streak: prev.streak + 1
    }));
    
    // Show success message or animation
    console.log(`Task ${taskId} completed!`);
  };

  const handleQuizComplete = (quizId: string, score: number) => {
    const pointsEarned = Math.floor(score * 0.5); // 50 points for 100% score
    const coinsEarned = Math.floor(score * 0.2); // 20 coins for 100% score
    
    setUser(prev => ({
      ...prev,
      coins: prev.coins + coinsEarned,
      totalPoints: prev.totalPoints + pointsEarned
    }));
    
    console.log(`Quiz ${quizId} completed with ${score}% score!`);
  };

  const handleNodeComplete = (nodeId: string) => {
    setCompletedNodes(prev => [...prev, nodeId]);
    
    // Award points and coins based on node
    setUser(prev => ({
      ...prev,
      coins: prev.coins + 30,
      totalPoints: prev.totalPoints + 75
    }));
    
    console.log(`Skill node ${nodeId} completed!`);
  };

  const handleRewardRedeem = (rewardId: string) => {
    const reward = availableRewards.find(r => r.id === rewardId);
    if (reward && user.coins >= reward.cost) {
      setUser(prev => ({
        ...prev,
        coins: prev.coins - reward.cost
      }));
      
      console.log(`Reward ${reward.title} redeemed!`);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard user={user} onPageChange={setCurrentPage} />;
      case 'tasks':
        return <EcoTasks onTaskComplete={handleTaskComplete} />;
      case 'quizzes':
        return <Quizzes onQuizComplete={handleQuizComplete} />;
      case 'skill-tree':
        return (
          <SkillTree
            userLevel={user.level}
            completedNodes={completedNodes}
            onNodeComplete={handleNodeComplete}
          />
        );
      case 'profile':
        return (
          <Profile
            user={user}
            achievements={achievements}
            availableRewards={availableRewards}
            onRewardRedeem={handleRewardRedeem}
          />
        );
      default:
        return <Dashboard user={user} onPageChange={setCurrentPage} />;
    }
  };

  return (
    <Layout
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      user={user}
    >
      {renderCurrentPage()}
    </Layout>
  );
}

export default App;