import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import BaseLayout from "./layouts/BaseLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Books from "./pages/Books";
import Movies from "./pages/Movies";
import Songs from "./pages/Songs";
import Games from "./pages/Games";
import Profile from "./pages/Profile";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import { AuthProvider } from "./utils/AuthProvider";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5, // 5 minutes
			retry: 1,
		},
	},
});

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<>
				{/* Public Routes - no Navbar */}
				<Route element={<BaseLayout />}>
					<Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
					<Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
				</Route>

				{/* Private Routes - with Navbar */}
				<Route element={<RootLayout />}>
					<Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
					{/* Book Routes */}
					<Route path="/books" element={<PrivateRoute><Books /></PrivateRoute>} />
					<Route path="/books/create" element={<PrivateRoute><AddBook /></PrivateRoute>} />
					<Route path="/books/:id/edit" element={<PrivateRoute><EditBook /></PrivateRoute>} />

					{/* Movie Routes */}
					<Route path="/movies" element={<PrivateRoute><Movies /></PrivateRoute>} />

					{/* Song Routes */}
					<Route path="/songs" element={<PrivateRoute><Songs /></PrivateRoute>} />

					{/* Game Routes */}
					<Route path="/games" element={<PrivateRoute><Games /></PrivateRoute>} />

					{/* Profile Route */}
					<Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

					{/* 404 fallback */}
					<Route path="*" element={<h1>404 Not Found</h1>} />
				</Route>
			</>
		)
	);

	return (
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</AuthProvider>
	);
}

export default App;