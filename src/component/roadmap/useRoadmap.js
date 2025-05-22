import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  getAllRoadmaps,
  getAllTypes,
  createNewRoadmap
} from "./roadmap-api";

export const useRoadmapsData = () => {
  return useQuery({
    queryKey: ['roadmaps'],
    queryFn: getAllRoadmaps,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
};

export const useTypesData = () => {
  return useQuery({
    queryKey: ['types'],
    queryFn: getAllTypes,
    refetchOnWindowFocus: false
  });
};

export const useCreateRoadmap = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createNewRoadmap,
    onSuccess: () => {
      queryClient.invalidateQueries(['roadmaps']);
    },
    onError: (error) => {
      console.error("Error creating roadmap:", error);
    }
  });
};