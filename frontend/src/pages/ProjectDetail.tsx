import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator } from 'react-native-paper';
import { useStyleSheet } from '../src/components/ui/styleSheet';
import { useAppDispatch, useAuth } from '../src/hooks/useAuth';
import { getAllProjects } from '../src/api/client';
import { Project } from '../src/types/Project';

const ProjectDetail = ({ route }) => {
  const { projectId } = route.params;
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const styles = useStyleSheet();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllProjects(user?.token || '');
        if (response.success) {
          setProject(response.data);
        } else {
          setError(response.message);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch project.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [user?.token || '', projectId]);

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

  if (!project) {
    return (
      <View style={styles.container}>
        <Text>Project not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Project Details</Text>
      <Text>Project Name: {project.name}</Text>
      <Text>Description: {project.description}</Text>
      <Text>Tasks: {project.tasks.length}</Text>
    </View>
  );
};

export default ProjectDetail;