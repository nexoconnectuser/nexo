import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const users = [
  { 
    id: 1, 
    name: 'Alice', 
    age: 28, 
    location: 'New York', 
    interests: ['reading', 'hiking'],
    hobbyReview: 'Alice is an avid reader who enjoys exploring new worlds through books. She also loves hiking and often spends weekends exploring nature trails.',
    contact: { email: 'alice@example.com', phone: '(123) 456-7890' }
  },
  { 
    id: 2, 
    name: 'Bob', 
    age: 32, 
    location: 'Los Angeles', 
    interests: ['sports', 'cooking'],
    hobbyReview: 'Bob is a sports enthusiast who never misses a game. In his free time, he experiments with new recipes in the kitchen.',
    contact: { email: 'bob@example.com', phone: '(234) 567-8901' }
  },
  { 
    id: 3, 
    name: 'Charlie', 
    age: 24, 
    location: 'Chicago', 
    interests: ['music', 'travel'],
    hobbyReview: 'Charlie is a music lover and aspiring guitarist. He combines his passion for music with his love for travel, often attending music festivals around the world.',
    contact: { email: 'charlie@example.com', phone: '(345) 678-9012' }
  },
  { 
    id: 4, 
    name: 'Diana', 
    age: 30, 
    location: 'San Francisco', 
    interests: ['art', 'yoga'],
    hobbyReview: 'Diana is an art enthusiast who spends her weekends at galleries and museums. She also practices yoga daily to maintain balance in her busy life.',
    contact: { email: 'diana@example.com', phone: '(456) 789-0123' }
  },
  { 
    id: 5, 
    name: 'Eva', 
    age: 27, 
    location: 'Boston', 
    interests: ['technology', 'photography'],
    hobbyReview: 'Eva is a tech-savvy individual who loves staying up-to-date with the latest gadgets. She combines her tech knowledge with her passion for photography, creating stunning digital art.',
    contact: { email: 'eva@example.com', phone: '(567) 890-1234' }
  },
];

const locations = ['All', 'New York', 'Los Angeles', 'Chicago', 'San Francisco', 'Boston'];

const UserProfile = ({ user, onClose }) => (
  <div className="p-4">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">{user.name}</h2>
      <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
        <X size={24} />
      </button>
    </div>
    <p className="text-gray-600 mb-2"><span className="font-medium">Age:</span> {user.age}</p>
    <p className="text-gray-600 mb-2"><span className="font-medium">Location:</span> {user.location}</p>
    <p className="text-gray-600 mb-2"><span className="font-medium">Interests:</span> {user.interests.join(', ')}</p>
    <p className="text-gray-600 mb-4"><span className="font-medium">Hobby Review:</span> {user.hobbyReview}</p>
    <div className="bg-gray-100 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
      <p className="text-gray-600"><span className="font-medium">Email:</span> {user.contact.email}</p>
      <p className="text-gray-600"><span className="font-medium">Phone:</span> {user.contact.phone}</p>
    </div>
  </div>
);

const UserFilterApp = () => {
  const [nameFilter, setNameFilter] = useState('');
  const [ageRange, setAgeRange] = useState([18, 60]);
  const [locationFilter, setLocationFilter] = useState('All');
  const [interestFilter, setInterestFilter] = useState('All');
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [availableInterests, setAvailableInterests] = useState(['All']);

  useEffect(() => {
    // Update available interests based on location filter
    const interests = new Set(['All']);
    users.forEach(user => {
      if (locationFilter === 'All' || user.location === locationFilter) {
        user.interests.forEach(interest => interests.add(interest));
      }
    });
    setAvailableInterests(Array.from(interests));

    // Reset interest filter if current selection is not available
    if (!interests.has(interestFilter)) {
      setInterestFilter('All');
    }
  }, [locationFilter]);

  const applyFilters = () => {
    const filtered = users.filter(user => {
      const nameMatch = user.name.toLowerCase().includes(nameFilter.toLowerCase());
      const ageMatch = user.age >= ageRange[0] && user.age <= ageRange[1];
      const locationMatch = locationFilter === 'All' || user.location === locationFilter;
      const interestMatch = interestFilter === 'All' || user.interests.includes(interestFilter);
      return nameMatch && ageMatch && locationMatch && interestMatch;
    });
    setFilteredUsers(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center">
            <Camera className="h-8 w-8 text-blue-500 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">UserTech</h1>
          </div>
          <p className="text-sm text-gray-500">User Management System</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Card className="mb-8 bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-800">User Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <Input
                placeholder="Filter by name"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="w-full"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Age Range: {ageRange[0]} - {ageRange[1]}</label>
                <Slider
                  min={18}
                  max={60}
                  step={1}
                  value={ageRange}
                  onValueChange={setAgeRange}
                  className="w-full"
                />
              </div>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={interestFilter} onValueChange={setInterestFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select interest" />
                </SelectTrigger>
                <SelectContent>
                  {availableInterests.map((interest) => (
                    <SelectItem key={interest} value={interest}>
                      {interest}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={applyFilters} className="w-full bg-blue-500 hover:bg-blue-600 text-white">Apply Filters</Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map(user => (
            <Dialog key={user.id}>
              <DialogTrigger asChild>
                <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-gray-800">{user.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600"><span className="font-medium">Age:</span> {user.age}</p>
                    <p className="text-gray-600"><span className="font-medium">Location:</span> {user.location}</p>
                    <p className="text-gray-600"><span className="font-medium">Interests:</span> {user.interests.join(', ')}</p>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <UserProfile user={user} onClose={() => {}} />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </main>
    </div>
  );
};

export default UserFilterApp;
