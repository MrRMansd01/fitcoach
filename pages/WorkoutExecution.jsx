import React, { useState, useEffect } from "react";
import { myNewApi } from "@/api/myNewApiClient"; 
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, CheckCircle2, Clock, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

import ExerciseCard from "../components/workout/ExerciseCard";
import WorkoutTimer from "../components/workout/WorkoutTimer";

export default function WorkoutExecution() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const urlParams = new URLSearchParams(window.location.search);
  const workoutId = urlParams.get('workout_id');

  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [completedExercises, setCompletedExercises] = useState(new Set());

  const { data: user } = useQuery({
    queryKey: ['currentUser'],
    queryFn: () => myNewApi.auth.me(),
  });

  const { data: workout, isLoading: workoutLoading } = useQuery({
    queryKey: ['workout', workoutId],
    queryFn: () => myNewApi.entities.Workout.filter({ id: workoutId }),
    select: (data) => data[0],
  });

  const { data: exercises, isLoading: exercisesLoading } = useQuery({
    queryKey: ['exercises', workoutId],
    queryFn: async () => {
      const allExercises = await myNewApi.entities.Exercise.filter({ workout_id: workoutId });
      return allExercises.sort((a, b) => (a.order || 0) - (b.order || 0));
    },
    enabled: !!workoutId,
    initialData: [],
  });

  const completeWorkoutMutation = useMutation({
    mutationFn: async () => {
      await myNewApi.entities.Workout.update(workoutId, { completed: true }); 
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workout', workoutId] });
      queryClient.invalidateQueries({ queryKey: ['todaysWorkouts'] });
      navigate(createPageUrl("ClientDashboard"));
    },
  });

  const handleStartWorkout = () => {
    setIsWorkoutStarted(true);
    setStartTime(new Date().toISOString());
  };

  const handleCompleteWorkout = () => {
    if (window.confirm('Are you sure you want to complete this workout?')) { 
      completeWorkoutMutation.mutate();
    }
  };

  const isLoading = workoutLoading || exercisesLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading workout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="outline"
          onClick={() => navigate(createPageUrl("ClientDashboard"))}
          className="mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card className="bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg mb-6">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">{workout?.name}</CardTitle>
                <p className="text-blue-100">Day {workout?.day_number}</p>
              </div>
              {workout?.completed ? (
                <Badge className="bg-green-500 text-white border-none">
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  Completed
                </Badge>
              ) : (
                <Badge className="bg-orange-500 text-white border-none">
                  In Progress
                </Badge>
              )}
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {workout?.notes && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-blue-900 mb-1">Coach's Notes:</p>
                <p className="text-slate-700">{workout.notes}</p>
              </div>
            )}

            {!isWorkoutStarted && !workout?.completed && (
              <Button
                onClick={handleStartWorkout}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-lg py-6"
              >
                <Play className="w-6 h-6 mr-2" />
                Start Workout
              </Button>
            )}

            {isWorkoutStarted && (
              <WorkoutTimer startTime={startTime} />
            )}
          </CardContent>
        </Card>

        <div className="space-y-4">
          {exercises.map((exercise, index) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              index={index}
              isWorkoutStarted={isWorkoutStarted}
              isCompleted={completedExercises.has(exercise.id)}
              onComplete={() => setCompletedExercises(prev => new Set([...prev, exercise.id]))}
              userId={user?.id}
              workoutId={workoutId}
            />
          ))}
        </div>

        {isWorkoutStarted && !workout?.completed && (
          <Card className="mt-6 bg-white/80 backdrop-blur-sm border-slate-200/60 shadow-lg">
            <CardContent className="pt-6">
              <Button
                onClick={handleCompleteWorkout}
                disabled={completedExercises.size < exercises.length}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-lg py-6"
              >
                <CheckCircle2 className="w-6 h-6 mr-2" />
                Complete Workout
              </Button>
              {completedExercises.size < exercises.length && (
                <p className="text-center text-sm text-slate-600 mt-3">
                  Complete all exercises to finish workout
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}