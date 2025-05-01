import { api } from './api';

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  publicationYear: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookInput {
  title: string;
  author: string;
  description: string;
  publicationYear: string;
}

export const bookService = {
  // Get all books
  getBooks: async () => {
    const response = await api.get<Book[]>('/books');
    return response.data;
  },

  // Get a single book by ID
  getBook: async (id: string) => {
    const response = await api.get<Book>(`/books/${id}`);
    return response.data;
  },

  // Create a new book
  createBook: async (bookData: CreateBookInput) => {
    const response = await api.post<Book>('/books', bookData);
    return response.data;
  },

  // Update a book
  updateBook: async (id: string, bookData: Partial<CreateBookInput>) => {
    const response = await api.put<Book>(`/books/${id}`, bookData);
    return response.data;
  },

  // Delete a book
  deleteBook: async (id: string) => {
    const response = await api.delete(`/books/${id}`);
    return response.data;
  },
}; 