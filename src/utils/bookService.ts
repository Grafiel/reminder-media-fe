import { api } from './api';

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  publicationYear: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookInput {
  title: string;
  author: string;
  description: string;
  publicationYear: number;
}

export const bookService = {
  // Get all books
  getBooks: async () => {
    const response = await api.get<Book[]>('/book');
    return response.data;
  },

  // Get a single book by ID
  getBook: async (id: string) => {
    const response = await api.get<Book>(`/book/${id}`);
    return response.data;
  },

  // Create a new book
  createBook: async (bookData: CreateBookInput) => {
    const response = await api.post<Book>('/book', bookData);
    return response.data;
  },

  // Update a book
  updateBook: async (id: string, bookData: Partial<CreateBookInput>) => {
    const response = await api.put<Book>(`/book/${id}`, bookData);
    return response.data;
  },

  // Delete a book
  deleteBook: async (id: string) => {
    const response = await api.delete(`/book/${id}`);
    return response.data;
  },
}; 