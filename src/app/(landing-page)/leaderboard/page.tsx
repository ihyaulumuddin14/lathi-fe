
import { Metadata } from "next"
import ProtectedRoute from "../ProtectedRoute"
import Leaderboard from "./Leaderboard"

export const metadata: Metadata = {
   title: "Papan peringkat",
   description: "Klasemen pemain teratas berdasar pada progres penyelesaian dan seberapa baik cerita dilalui oleh pemain"
}

const LeaderboardPage = () => {
   return (
      <ProtectedRoute>
         <Leaderboard />
      </ProtectedRoute>
   )
}

export default LeaderboardPage