import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAuth } from '../src/hooks/useAuth';
import { getAllProjects } from '../src/api/client';
import { Project } from '../src/types/Project';
import { View, Text, Button } from 'react-native-paper';
import { useStyleSheet } from '../src/components/ui/styleSheet';

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const styles = useStyleSheet();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getAllProjects();
        setProjects(response);
        setLoading(false);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProjects();
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading projects...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error loading projects: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      {projects.length > 0 ? (
        projects.map((project) => (
          <View key={project._id} style={styles.projectItem}>
            <Text>{project.name}</Text>
            <Button
              mode="contained"
              onPress={() => {
                // Navigate to project detail page
              }}
            >
              View Project
            </Button>
          </View>
        ))
      ) : (
        <Text>No projects found.</Text>
      )}
    </View>
  );
};

export default Dashboard;