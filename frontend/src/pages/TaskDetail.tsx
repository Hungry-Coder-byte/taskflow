import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native-paper';
import { useStyleSheet } from '../src/components/ui/styleSheet';
import { useAppDispatch, useAuth } from '../src/hooks/useAuth';
import { getTask } from '../src/api/client';
import { Task } from '../src/types/Task';
import { Alert } from 'react-native';

interface TaskDetailProps {
  route;
}

const TaskDetail = ({ route }: TaskDetailProps) => {
  const { taskId } = route.params;
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const styles = useStyleSheet();

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getTask(taskId);
        if (data) {
          setTask(data);
        } else {
          setError('Failed to fetch task');
        }
      } catch (err: any) {
        setError(err?.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!task) {
    return (
      <View style={styles.container}>
        <Text>Task not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Details</Text>
      <Text>Task Name: {task.name}</Text>
      <Text>Description: {task.description}</Text>
      <Text>Status: {task.status}</Text>
      <Text>Project ID: {task.projectId}</Text>
      {/* Add more task details as needed */}
    </View>
  );
};

export default TaskDetail;