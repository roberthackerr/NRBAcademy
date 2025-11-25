"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface Course {
  _id: string
  title: string
  description: string
  category: string
  level: string
  price: number
  instructor: { name: string }
  rating: number
  thumbnail?: string
}

const categories = [
  "all",
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Design",
  "Business",
  "Marketing",
  "Programming",
]

export default function CourseBrowsePage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchCourses()
  }, [page, selectedCategory, selectedLevel])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const query = new URLSearchParams()
      query.append("page", page.toString())
      if (selectedCategory !== "all") query.append("category", selectedCategory)
      if (selectedLevel !== "all") query.append("level", selectedLevel)

      const response = await fetch(`/api/courses/published?${query}`)
      const data = await response.json()
      setCourses(data.courses)
      setTotalPages(data.pages)
    } catch (error) {
      console.error("Error fetching courses:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const filtered = courses.filter(
      (course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredCourses(filtered)
  }, [searchTerm, courses])

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">LearnHub</h1>
          <Link href="/student/dashboard">
            <Button variant="outline">My Courses</Button>
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">Explore Courses</h2>
          <p className="text-gray-600 mb-6">Find your next learning opportunity</p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium block mb-2">Search</label>
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setPage(1)
                }}
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value)
                  setPage(1)
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => {
                  setSelectedLevel(e.target.value)
                  setPage(1)
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div className="flex items-end">
              <Button onClick={() => setPage(1)} variant="outline" className="w-full">
                Reset Filters
              </Button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading courses...</div>
        ) : filteredCourses.length === 0 ? (
          <Card>
            <CardContent className="pt-8 text-center">
              <p className="text-gray-600">No courses found matching your criteria.</p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {filteredCourses.map((course) => (
                <Card key={course._id} className="hover:shadow-lg transition-shadow flex flex-col">
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                    <CardDescription>by {course.instructor?.name}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">{course.description}</p>
                    <div className="space-y-2 mb-4 mt-auto">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Level:</span>
                        <span className="font-semibold capitalize">{course.level}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-semibold">${course.price === 0 ? "Free" : course.price.toFixed(2)}</span>
                      </div>
                    </div>
                    <Link href={`/courses/${course._id}`} className="block">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">View Course</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <Button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} variant="outline">
                  Previous
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <Button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    variant={page === pageNum ? "default" : "outline"}
                    className={page === pageNum ? "bg-blue-600 hover:bg-blue-700" : ""}
                  >
                    {pageNum}
                  </Button>
                ))}
                <Button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  variant="outline"
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
