import React from "react";
import { myNewApi } from "@/api/myNewApiClient"; 
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, TrendingUp, Flame, Target } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";

import ActivePrograms from "../components/client/ActivePrograms";
import TodaysWorkouts from "../components/client/TodaysWorkouts";
import ProgressOverview from "../components/client/ProgressOverview";

export default function ClientDashboard() {
  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => myNewApi.auth.me(),
  });

  const { data: programs, isLoading: programsLoading } = useQuery({
    queryKey: ['myPrograms', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      return await myNewApi.entities.TrainingProgram.filter({ client_id: user.id });
    },
    enabled: !!user?.id,
    initialData: [],
  });

  const activePrograms = programs.filter(p => p.status === 'active');

  const { data: todaysWorkouts, isLoading: workoutsLoading } = useQuery({
    queryKey: ['todaysWorkouts', user?.id],
    queryFn: async () => {
      if (!user?.id || programs.length === 0) return [];

      const today = new Date().toISOString().split('T')[0];
      const allWorkouts = await myNewApi.entities.Workout.filter({}); 
      
      const userProgramIds = programs.map(p => p.id);
      return allWorkouts.filter(w => 
        userProgramIds.includes(w.program_id) && 
        w.scheduled_date === today
      );
    },
    enabled: !!user?.id && programs.length > 0,
    initialData: [],
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Welcome back, {user?.full_name}!</h1>
          <p className="text-slate-600 text-lg">Let's crush your fitness goals today</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium opacity-90">Active Programs</CardTitle>
                <Target className="w-5 h-5 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activePrograms.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-none shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium opacity-90">Today's Workouts</CardTitle>
                <Flame className="w-5 h-5 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{todaysWorkouts.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-none shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium opacity-90">Completed</CardTitle>
                <TrendingUp className="w-5 h-5 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{todaysWorkouts.filter(w => w.completed).length}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-none shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium opacity-90">This Week</CardTitle>
                <Calendar className="w-5 h-5 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">0</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <TodaysWorkouts workouts={todaysWorkouts} isLoading={workoutsLoading} />
            <ActivePrograms programs={activePrograms} isLoading={programsLoading} />
          </div>
          
          <div>
            <ProgressOverview />
          </div>
        </div>
      </div>
    </div>
  );
}