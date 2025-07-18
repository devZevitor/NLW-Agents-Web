import { BrowserRouter, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { CreateRoom } from "./pages/create-room";
import { Room } from "./pages/rooms";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"

const queryClient = new QueryClient()

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<CreateRoom />} index />
          <Route element={<Room />} path="/room/:roomId" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

