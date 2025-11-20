import React, { useState } from "react";
import { myNewApi } from "@/api/myNewApiClient"; 
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, Target, TrendingUp, CheckCircle2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AICoach() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    goals: "",
    experience_level: "beginner",
    duration_weeks: "4",
    days_per_week: "3"
  });

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => myNewApi.auth.me(),
  });

  const generateProgramMutation = useMutation({
    mutationFn: async () => {
      const prompt = `Create a detailed ${formData.duration_weeks}-week fitness training program for a ${formData.experience_level} level person.
      
Goals: ${formData.goals}
Training frequency: ${formData.days_per_week} days per week
      
Generate a complete program with:
1. Weekly structure with specific workout days
2. For each workout: 5-7 exercises with sets, reps, and rest times
3. Progressive overload strategy
4. Recovery recommendations

Format the response as a structured program with clear workout days and exercises.`;

      // فراخوانی API جدید برای تولید محتوا توسط LLM
      const result = await myNewApi.integrations.Core.InvokeLLM({ 
        prompt: prompt,
        response_json_schema: {
          type: "object",
          properties: {
            program_name: { type: "string" },
            description: { type: "string" },
            weeks: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  week_number: { type: "number" },
                  workouts: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        day: { type: "string" },
                        name: { type: "string" },
                        exercises: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              name: { type: "string" },
                              sets: { type: "number" },
                              reps: { type: "number" },
                              rest_seconds: { type: "number" },
                              notes: { type: "string" }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      });

      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + (parseInt(formData.duration_weeks) * 7));

      // فراخوانی API جدید برای ایجاد برنامه تمرینی
      const program = await myNewApi.entities.TrainingProgram.create({ 
        coach_id: "AI_COACH",
        client_id: user.id,
        name: result.program_name,
        description: result.description,
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
        price: 29.99,
        status: "active",
        is_ai_generated: true,
        coach_earnings: 0,
        platform_commission: 29.99
      });

      let dayCounter = 0;
      for (const week of result.weeks) {
        for (const workout of week.workouts) {
          const workoutDate = new Date(startDate);
          workoutDate.setDate(workoutDate.getDate() + dayCounter);
          
          // فراخوانی API جدید برای ایجاد تمرین
          const workoutRecord = await myNewApi.entities.Workout.create({ 
            program_id: program.id,
            name: workout.name,
            scheduled_date: workoutDate.toISOString().split('T')[0],
            day_number: dayCounter + 1,
            notes: `Week ${week.week_number} - ${workout.day}`,
            completed: false
          });

          for (let i = 0; i < workout.exercises.length; i++) {
            const exercise = workout.exercises[i];
            // فراخوانی API جدید برای ایجاد حرکت تمرینی
            await myNewApi.entities.Exercise.create({ 
              workout_id: workoutRecord.id,
              name: exercise.name,
              sets: exercise.sets,
              reps: exercise.reps,
              rest_time: exercise.rest_seconds,
              notes: exercise.notes,
              order: i + 1
            });
          }
          
          dayCounter += Math.ceil(7 / parseInt(formData.days_per_week));
        }
      }

      return program;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myPrograms'] });
      alert('Your AI-generated program is ready! Check your dashboard to start training.');
      setFormData({
        goals: "",
        experience_level: "beginner",
        duration_weeks: "4",
        days_per_week: "3"
      });
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-4">AI Fitness Coach</h1>
          <p className="text-slate-600 text-xl">Get a personalized training program powered by artificial intelligence</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white/80 backdrop-blur-sm border-purple-200/60 shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Instant Generation</h3>
              <p className="text-sm text-slate-600">Get your program in seconds</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-blue-200/60 shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Personalized</h3>
              <p className="text-sm text-slate-600">Tailored to your goals</p>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-green-200/60 shadow-lg">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Affordable</h3>
              <p className="text-sm text-slate-600">Only $29.99</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Sparkles className="w-6 h-6" />
              Create Your AI Program
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div>
              <Label htmlFor="goals" className="text-slate-900 font-medium">What are your fitness goals?</Label>
              <Textarea
                id="goals"
                placeholder="e.g., Build muscle, lose weight, improve endurance, get stronger..."
                value={formData.goals}
                onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
                className="mt-2 h-32 bg-white"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="experience" className="text-slate-900 font-medium">Experience Level</Label>
                <Select 
                  value={formData.experience_level} 
                  onValueChange={(value) => setFormData({ ...formData, experience_level: value })}
                >
                  <SelectTrigger className="mt-2 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="duration" className="text-slate-900 font-medium">Program Duration</Label>
                <Select 
                  value={formData.duration_weeks} 
                  onValueChange={(value) => setFormData({ ...formData, duration_weeks: value })}
                >
                  <SelectTrigger className="mt-2 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4">4 Weeks</SelectItem>
                    <SelectItem value="8">8 Weeks</SelectItem>
                    <SelectItem value="12">12 Weeks</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="frequency" className="text-slate-900 font-medium">Training Frequency</Label>
              <Select 
                value={formData.days_per_week} 
                onValueChange={(value) => setFormData({ ...formData, days_per_week: value })}
              >
                <SelectTrigger className="mt-2 bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 Days/Week</SelectItem>
                  <SelectItem value="4">4 Days/Week</SelectItem>
                  <SelectItem value="5">5 Days/Week</SelectItem>
                  <SelectItem value="6">6 Days/Week</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-6 border-t border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-2xl font-bold text-slate-900">$29.99</p>
                  <p className="text-sm text-slate-600">One-time payment</p>
                </div>
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Best Value
                </Badge>
              </div>

              <Button
                onClick={() => generateProgramMutation.mutate()}
                disabled={!formData.goals || generateProgramMutation.isPending}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-lg py-6"
              >
                {generateProgramMutation.isPending ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generating Your Program...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate AI Program
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}