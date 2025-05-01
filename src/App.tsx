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
import AddBook from "./pages/AddBook";
// import EditBook from "./pages/EditBook";

import { AuthProvider } from "./utils/AuthProvider";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";

const queryClient = new QueryClient();
function App() {
	const router = createBrowserRouter(
	createRoutesFromElements(
		<>
		<Route element={<BaseLayout />}>
			<Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
			<Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
		</Route>

		<Route element={<RootLayout />}>
			<Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
			<Route path="/books" element={<PrivateRoute><Books /></PrivateRoute>} />
			<Route path="/books/create" element={<PrivateRoute><AddBook /></PrivateRoute>} />
			{/* <Route path="/books/:id/edit" element={<PrivateRoute><EditBook /></PrivateRoute>} /> */}
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