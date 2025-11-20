import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function CoachProfile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Coach Profile</h1>
        
        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
          <CardContent className="py-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 mb-2">Profile Setup</h2>
              <p className="text-slate-600">Complete your profile to start accepting clients</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}