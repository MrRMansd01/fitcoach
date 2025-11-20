import React from "react";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function ProgramBuilder() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Program Builder</h1>
        
        <Card className="bg-white/80 backdrop-blur-sm p-16 text-center">
          <Calendar className="w-20 h-20 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">Create Programs</h2>
          <p className="text-slate-600">Build custom training programs for your clients</p>
        </Card>
      </div>
    </div>
  );
}