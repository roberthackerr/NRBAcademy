import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">LearnHub</h1>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700">Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Learn Anything, Anytime, Anywhere</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join LearnHub and explore thousands of courses taught by expert instructors. From web development to data
            science, find your next learning opportunity.
          </p>
          <div className="flex gap-4 justify-center mb-16">
            <Link href="/courses">
              <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg">Explore Courses</Button>
            </Link>
            <Link href="/signup?role=instructor">
              <Button variant="outline" className="px-8 py-6 text-lg bg-transparent">
                Become an Instructor
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-2">Learn</h3>
            <p className="text-gray-600">Access a wide variety of courses from beginner to advanced levels</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-4xl mb-4">👨‍🏫</div>
            <h3 className="text-xl font-semibold mb-2">Teach</h3>
            <p className="text-gray-600">Share your knowledge and create courses to inspire learners worldwide</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="text-4xl mb-4">✓</div>
            <h3 className="text-xl font-semibold mb-2">Grow</h3>
            <p className="text-gray-600">Track your progress and earn certifications as you complete courses</p>
          </div>
        </div>
      </main>
    </div>
  )
}
