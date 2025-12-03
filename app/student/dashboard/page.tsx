"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Course {
  _id: string
  title: string
  description: string
  category: string
  instructor: { name: string }
  thumbnail?: string
}

interface Progress {
  _id: string
  course: string
  progressPercentage: number
}

export default function StudentDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([])
  const [progress, setProgress] = useState<{ [key: string]: number }>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (status === "authenticated" && (session?.user as any)?.role === "instructor") {
      router.push("/instructor/dashboard")
    }
  }, [status, router, session])

  useEffect(() => {
    if (status === "authenticated") {
      fetchEnrolledCourses()
    }
  }, [status])

  const fetchEnrolledCourses = async () => {
    try {
      const response = await fetch(`/api/users/${(session?.user as any)?.id}/courses`)
      const data = await response.json()
      setEnrolledCourses(data.courses)

      const progressMap: { [key: string]: number } = {}
      data.progress.forEach((p: any) => {
        progressMap[p.course] = p.progressPercentage
      })
      setProgress(progressMap)
    } catch (error) {
      console.error("Error fetching courses:", error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">LearnHub</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">{session?.user?.name}</span>
            <Link href="/courses">
              <Button className="bg-blue-600 hover:bg-blue-700">Browse Courses</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">My Learning</h2>
          <p className="text-gray-600">Continue learning with your enrolled courses</p>
        </div>

        {enrolledCourses.length === 0 ? (
          <Card>
            <CardContent className="pt-8 text-center">
              <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet.</p>
              <Link href="/courses">
                <Button className="bg-blue-600 hover:bg-blue-700">Browse Available Courses</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <Card key={course._id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                  <CardDescription>by {course.instructor?.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">{course.description}</p>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm font-semibold text-blue-600">{progress[course._id] || 0}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${progress[course._id] || 0}%` }}
                      />
                    </div>
                  </div>
                  <Link href={`/courses/${course._id}`}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">Continue Learning</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
