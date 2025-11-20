import React, { useState } from "react";
import { myNewApi } from "@/api/myNewApiClient"; 
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Star, DollarSign, Award, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

import CoachCard from "../components/marketplace/CoachCard";
import MarketplaceFilters from "../components/marketplace/MarketplaceFilters";

export default function CoachMarketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("all");
  const [sortBy, setSortBy] = useState("rating");

  const { data: coaches, isLoading } = useQuery({
    queryKey: ['coaches'],
    queryFn: async () => {
      const users = await myNewApi.entities.User.list(); 
      return users.filter(u => u.coach_status === 'verified');
    },
    initialData: [],
  });

  const filteredCoaches = coaches
    .filter(coach => {
      const matchesSearch = coach.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           coach.specialties?.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesSpecialty = specialtyFilter === "all" || 
                               coach.specialties?.includes(specialtyFilter);
      return matchesSearch && matchesSpecialty;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return (b.average_rating || 0) - (a.average_rating || 0);
      if (sortBy === "price_low") return (a.hourly_rate || 0) - (b.hourly_rate || 0);
      if (sortBy === "price_high") return (b.hourly_rate || 0) - (a.hourly_rate || 0);
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Find Your Perfect Coach</h1>
          <p className="text-slate-600 text-lg">Connect with certified professionals to reach your fitness goals</p>
        </div>

        <MarketplaceFilters 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          specialtyFilter={specialtyFilter}
          setSpecialtyFilter={setSpecialtyFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {Array(6).fill(0).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <Skeleton className="h-24 w-24 rounded-full mx-auto" />
                  <Skeleton className="h-6 w-32 mx-auto mt-4" />
                  <Skeleton className="h-4 w-48 mx-auto mt-2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredCoaches.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No coaches found</h3>
            <p className="text-slate-600">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredCoaches.map((coach) => (
              <CoachCard key={coach.id} coach={coach} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}