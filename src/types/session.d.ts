export interface LeadSession {
  id: string;
  user: {
    name: string;
    phone: string;
    email: string;
  };
  course: {
    course: {
      name: string;
    };
  };
  exam: {
    score: number;
  };
}
