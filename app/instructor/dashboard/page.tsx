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
  level: string
  published: boolean
  lessons: any[]
  enrolledStudents: any[]
  createdAt: string
}

export default function InstructorDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    } else if (status === "authenticated" && (session?.user as any)?.role !== "instructor") {
      router.push("/student/dashboard")
    }
  }, [status, router, session])

  useEffect(() => {
    if (status === "authenticated") {
      fetchCourses()
    }
  }, [status])

  const fetchCourses = async () => {
    try {
      const response = await fetch(`/api/courses?instructorId=${(session?.user as any)?.id}`)
      const data = await response.json()
      setCourses(data)
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
            <Link href="/instructor/courses/new">
              <Button className="bg-blue-600 hover:bg-blue-700">Create Course</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">My Courses</h2>
          <p className="text-gray-600">Manage your courses and track student progress</p>
        </div>

        {courses.length === 0 ? (
          <Card>
            <CardContent className="pt-8 text-center">
              <p className="text-gray-600 mb-4">You haven't created any courses yet.</p>
              <Link href="/instructor/courses/new">
                <Button className="bg-blue-600 hover:bg-blue-700">Create Your First Course</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course._id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                      <CardDescription>{course.category}</CardDescription>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        course.published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {course.published ? "Published" : "Draft"}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4">{course.description}</p>
                  <div className="space-y-2 mb-4 text-sm">
                    <p className="text-gray-600">
                      <span className="font-semibold">{course.lessons?.length || 0}</span> Lessons
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">{course.enrolledStudents?.length || 0}</span> Students
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/instructor/courses/${course._id}/edit`} className="flex-1">
                      <Button variant="outline" className="w-full bg-transparent">
                        Edit
                      </Button>
                    </Link>
                    <Link href={`/instructor/courses/${course._id}`} className="flex-1">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">Manage</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
