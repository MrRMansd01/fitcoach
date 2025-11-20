import React from "react";
import { myNewApi } from "@/api/myNewApiClient"; 
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, DollarSign, TrendingUp, Award } from "lucide-react";

import EarningsChart from "../components/coach/EarningsChart";
import ClientList from "../components/coach/ClientList";
import RecentActivity from "../components/coach/RecentActivity";

export default function CoachDashboard() {
  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => myNewApi.auth.me(),
  });

  const { data: programs } = useQuery({
    queryKey: ['coachPrograms', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      return await myNewApi.entities.TrainingProgram.filter({ coach_id: user.id });
    },
    enabled: !!user?.id,
    initialData: [],
  });

  const activeClients = new Set(programs.map(p => p.client_id)).size;
  const totalEarnings = programs.reduce((sum, p) => sum + (p.coach_earnings || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Coach Dashboard</h1>
          <p className="text-slate-600 text-lg">Welcome back, {user?.full_name}!</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium opacity-90">Active Clients</CardTitle>
                <Users className="w-5 h-5 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{activeClients}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-none shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium opacity-90">Total Earnings</CardTitle>
                <DollarSign className="w-5 h-5 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalEarnings.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-none shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium opacity-90">Programs Sold</CardTitle>
                <TrendingUp className="w-5 h-5 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{programs.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-none shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium opacity-90">Avg Rating</CardTitle>
                <Award className="w-5 h-5 opacity-80" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{user?.average_rating?.toFixed(1) || '5.0'}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <EarningsChart programs={programs} />
            <ClientList programs={programs} />
          </div>
          
          <div>
            <RecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
}