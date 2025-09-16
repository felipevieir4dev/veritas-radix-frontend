// Frontend-only mock API for class management

interface ClassData {
  id: string;
  name: string;
  description: string;
  code: string;
  teacher_id: string;
  created_at: string;
  student_count: number;
}

interface StudentData {
  id: string;
  username: string;
  email: string;
  joined_at: string;
  progress: {
    words_analyzed: number;
    challenges_completed: number;
    total_xp: number;
    current_level: number;
  };
}

// Mock delay
const mockDelay = () => new Promise(resolve => setTimeout(resolve, 300));

// Mock data
let mockClasses: ClassData[] = [
  {
    id: '1',
    name: 'Etimologia Avançada',
    description: 'Curso de etimologia para estudantes avançados',
    code: 'ETIM001',
    teacher_id: '1',
    created_at: '2024-01-15',
    student_count: 15
  }
];

let mockStudents: StudentData[] = [
  {
    id: '1',
    username: 'maria_silva',
    email: 'maria@example.com',
    joined_at: '2024-01-20',
    progress: {
      words_analyzed: 25,
      challenges_completed: 12,
      total_xp: 850,
      current_level: 3
    }
  },
  {
    id: '2', 
    username: 'joao_santos',
    email: 'joao@example.com',
    joined_at: '2024-01-22',
    progress: {
      words_analyzed: 18,
      challenges_completed: 8,
      total_xp: 620,
      current_level: 2
    }
  }
];

// Teacher API functions
export const teacherApi = {
  // Get classes for teacher
  getClasses: async (): Promise<ClassData[]> => {
    await mockDelay();
    return [...mockClasses];
  },

  // Create new class
  createClass: async (classData: { name: string; description: string }): Promise<ClassData> => {
    await mockDelay();
    
    const newClass: ClassData = {
      id: Date.now().toString(),
      name: classData.name,
      description: classData.description,
      code: `ETIM${Math.random().toString(36).substr(2, 3).toUpperCase()}`,
      teacher_id: '1',
      created_at: new Date().toISOString().split('T')[0],
      student_count: 0
    };
    
    mockClasses.push(newClass);
    return newClass;
  },

  // Get students in a class
  getClassStudents: async (classId: string): Promise<StudentData[]> => {
    await mockDelay();
    return [...mockStudents];
  },

  // Remove student from class
  removeStudent: async (classId: string, studentId: string): Promise<void> => {
    await mockDelay();
    // Mock removal - in a real app, this would update the backend
  },

  // Delete class
  deleteClass: async (classId: string): Promise<void> => {
    await mockDelay();
    mockClasses = mockClasses.filter(c => c.id !== classId);
  },

  // Get class analytics
  getClassAnalytics: async (classId: string): Promise<any> => {
    await mockDelay();
    
    return {
      total_students: mockStudents.length,
      active_students: Math.floor(mockStudents.length * 0.8),
      average_progress: 65,
      total_words_analyzed: mockStudents.reduce((sum, s) => sum + s.progress.words_analyzed, 0),
      total_challenges_completed: mockStudents.reduce((sum, s) => sum + s.progress.challenges_completed, 0),
      weekly_activity: [
        { day: 'Mon', students: 12 },
        { day: 'Tue', students: 15 },
        { day: 'Wed', students: 18 },
        { day: 'Thu', students: 14 },
        { day: 'Fri', students: 16 },
        { day: 'Sat', students: 8 },
        { day: 'Sun', students: 5 }
      ]
    };
  }
};

// Student API functions
export const studentApi = {
  // Join class by code
  joinClass: async (classCode: string): Promise<{ success: boolean; message: string; class?: ClassData }> => {
    await mockDelay();
    
    const foundClass = mockClasses.find(c => c.code === classCode.toUpperCase());
    
    if (foundClass) {
      foundClass.student_count += 1;
      return {
        success: true,
        message: 'Você foi adicionado à turma com sucesso!',
        class: foundClass
      };
    }
    
    return {
      success: false,
      message: 'Código da turma não encontrado. Verifique o código e tente novamente.'
    };
  },

  // Get student's classes
  getMyClasses: async (): Promise<ClassData[]> => {
    await mockDelay();
    return [...mockClasses]; // In real app, would filter by student
  },

  // Leave class
  leaveClass: async (classId: string): Promise<void> => {
    await mockDelay();
    const foundClass = mockClasses.find(c => c.id === classId);
    if (foundClass && foundClass.student_count > 0) {
      foundClass.student_count -= 1;
    }
  }
};

// Error handling
export const handleClassApiError = (error: any): string => {
  return error?.message || 'Erro ao processar solicitação. Tente novamente.';
};